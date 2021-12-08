//const provider = require('@/assets/provider')

const i18n = require('@/plugins/i18n').default
const providerjs = require('./provider')

const user = {
  language() {
    return i18n.locale.toLowerCase().split('-')[0]
  },
}

const api = {
  async getMovie(imdb) {
    return new Promise((resolve, reject) => {
      let url = utils.buildURL({
        action: 'getMovie',
        imdb: imdb,
        newAPI: true,
      })
      console.log('[alex] [api] getting movie data', url)
      fetch(url)
        .then((r) => r.text())
        .then((data) => {
          data = data.replaceAll('Slighty', 'Slightly') //data might come with "Slighty" instead of "Slightly".
          let d = JSON.parse(data)
          if (!d.title) reject('wrong data...')
          console.log('getData ', d)

          resolve(d)
        })
    })
  },
  async getEpisodes(imdb) {
    return new Promise((resolve, reject) => {
      let url = utils.buildURL({
        action: 'getEpisodes',
        imdb: imdb,
        newAPI: true,
      })
      console.log('[alex] [api] getting episodes data', url)
      fetch(url)
        .then((r) => r.text())
        .then((data) => {
          data = data.replaceAll('Slighty', 'Slightly') //data might come with "Slighty" instead of "Slightly".

          let d = JSON.parse(data)
          if (!d.length) reject('wrong data...')
          console.log('getData ', d)

          resolve(d)
        })
    })
  },
}

const movies = {
  /**
   *
   * @param {*} tagged
   * @param {Array} skipTags e.g.: ["Very erotic", "Very profane"]
   * @returns {{status: string, cuts: number, level: number}}
   */
  joinStatus(tagged, skipTags) {
    if (!tagged) return { status: 'unknown', cuts: 0, level: 0 }
    if (!skipTags || !skipTags.length) return { status: 'unset', cuts: 0, level: 0 }
    let status = 'done'
    let cuts = 0
    let level = Infinity

    for (var tag of skipTags) {
      // Set default
      let s = tagged[tag] || {}
      // Set num cuts/scenes & min user level
      if (s.cuts) cuts += s.cuts
      level = Math.min(level, s.level || 0)
      // Set watchability status
      if (s.status == 'missing') {
        status = 'missing'
      } else if (s.status != 'done') {
        status = 'unknown'
      }
    }
    return { status: status, cuts: cuts, level: level }
  },

  joinStatus2(tagged, skipTags) {
    if (!tagged) return { status: 'unknown', cuts: 0, trust: 0 }
    if (!skipTags || !skipTags.length) return { status: 'unset', cuts: 0, trust: 0 }
    let health = 100
    let cuts = 0
    let trust = Infinity
    let status = 'unset'
    let color = 'red'
    let icon = ''

    for (var tag of skipTags) {
      // Set default
      let s = tagged[tag] || {}
      // Set num cuts/scenes & min user level
      if (s.cuts) cuts += s.cuts
      trust = Math.min(trust, s.trust || 0)
      health = Math.min(health, s.health || 0)
    }

    if (health > 0.5) {
      status = cuts ? 'done' : 'clean'
      color = 'green'
      icon = 'none'
    } else if (health < -0.5) {
      status = 'missing'
      color = 'red'
      icon = 'mdi-heart-broken'
    } else {
      status = 'mixed'
      color = 'orange'
      icon = 'mdi-heart-broken'
    }
    if (trust <= 1 || trust == Infinity) {
      status = 'unknown'
      color = 'lightgray'
      icon = 'mdi-progress-question'
    }

    return { status: status, health: health, cuts: cuts, trust: trust, icon: icon, color: color }
  },

  joinStatus3(movieContent, providers, skipTags) {
    //This ones combines the movie.join_status with the top provider.join_status (trust wise)
    let ms = this.joinStatus2(movieContent, skipTags)

    let ps = []
    for (let p = 0; p < providers.length; p++) {
      const provider = providers[p]
      let x = this.joinStatus2(provider.filterStatus, skipTags)
      if (provider.sceneFilters) {
        x.cuts = Object.keys(provider.sceneFilters).length
      }
      ps.push(x)
    }

    //to have a quick fix, let's take the provider join-status with highest trust
    //TODO: improve
    let final_ps = { trust: 0 }
    for (let i = 0; i < ps.length; i++) {
      if (ps[i].trust >= final_ps.trust) final_ps = ps[i]
    }

    if (
      (ms.status == 'missing' || ms.status == 'mixed') &&
      (final_ps.status == 'done' || final_ps.status == 'clean') &&
      final_ps.cuts > 0
    ) {
      ms = final_ps
      ms.status = 'done'
      ms.icon = 'mdi-content-cut'
    }

    return ms
  },

  addInfo(movie, skipTags) {
    movie.join_status = movies.joinStatus3(movie.movieContent, movie.providers, skipTags)
    movie.brief_status = movies.getSummary(movie)
    if (typeof movie.movieValues == 'string')
      movie.movieValues = movies.parse(movie.movieValues, {})
    return movie
  },

  parse(json, def) {
    try {
      let data = JSON.parse(json)
      if (data) return data
    } catch (e) {
      console.log(e)
    }
    return def
  },

  /**
   * Status per category, without redundant tags.
   * @param {object} movie
   * @param {object} movie.movieContent The tag
   * @returns One tag per category with its status: only the top tag per category (so if it has ver erotic + moderately erotic, for sex/nudity = very erotic (moderately erotic is redundant))
   */
  getSummary(movie) {
    //TODO: if very erotic is mixed, and moderately erotic is missing, how do we put it?
    let content = movie.movieContent
    //let status = movie.filterStatus
    let brief_status = {}
    try {
      if (!content) return brief_status
      for (let cat of ['erotic', 'gory', 'profane']) {
        for (let sev of ['Very', 'Moderately', 'Mildly', 'Slightly']) {
          let tag = sev + ' ' + cat
          let s = content[tag]
          if (!s) continue // TODO: this continues if there is no info...
          if (s.health > 0.5 && s.trust > 1) continue
          brief_status[tag] = s
          break
        }
      }
    } catch (e) {
      console.error('[getSummary]', e)
    }
    return brief_status
  },

  /**
   *
   * @param {string} status done, missing, unknown
   * @param {number} level Level this is filtered with (min of the skipTags)
   * @returns
   */
  getShieldColor(status, level) {
    if (status == 'done') {
      if (level > 5) return 'blue'
      return 'green'
    } else if (status == 'missing' || status == 'pending') {
      return 'red'
    } else {
      return 'gray'
    }
  },

  /**
   * Pick the icon for the given status
   * @param {string} status One of done, missing, unknown
   * @param {number} cuts
   * @returns {string} mdi name of the icon (e.g.: mid-emoticon-happy)
   */
  getShieldIcon(status, cuts) {
    if (status == 'done' && cuts == 0) {
      return 'mdi-emoticon-happy'
    } else if (status == 'done') {
      return 'mdi-content-cut'
    } else if (status == 'missing' || status == 'pending') {
      return 'mdi-flag-variant'
    } else {
      return 'mdi-progress-question'
    }
  },
}

const providers = {
  getName(watchUrl) {
    let u = new URL(watchUrl)
    let h = u.hostname.replace('www.', '')
    if (h.includes('netflix')) return 'Netflix'
    if (h.includes('hbo')) return 'HBO'
    if (h.includes('movistar')) return 'Movistar'
    if (h.includes('primevideo')) return 'Prime Video'
    if (h.includes('disneyplus')) return 'Disney Plus'
    return h
  },
  getLogo(provider) {
    if (provider == 'netflix') return 'images/providers/netflix.png'
    if (provider == 'justwatch') return 'images/providers/justwatch.jpg'
    if (provider == 'primevideo') return 'images/providers/primevideo.png'
    if (provider == 'disneyplus') return 'images/providers/disneyplus.png'
    if (provider == 'movistarplus') return 'images/providers/movistarplus.png'
    if (provider == 'hboespana') return 'images/providers/hbomax.png'
    if (provider == 'hbomax') return 'images/providers/hbomax.png'
  },
  getLink(provider, providerID) {
    providerID = providerID.split('_')[1]
    if (provider == 'netflix') return 'https://www.netflix.com/watch/' + providerID
    if (provider == 'hboespana') return 'https://es.hboespana.com/movies/-/' + providerID + '/play'
    if (provider == 'disneyplus') return 'https://www.disneyplus.com/en-gb/video/' + providerID
    if (provider == 'primevideo') return 'https://primevideo.com/watch?gti=' + providerID
    if (provider == 'movistarplus') return 'https://ver.movistarplus.es/ficha?id=' + providerID
  },
  async getID(url) {
    return providerjs.parseURL(url).id //.pid
  },
}

const utils = {
  buildURL(query) {
    //source:
    query.source = 'web'
    // Build url
    var out = []
    for (var key in query) {
      out.push(key + '=' + encodeURIComponent(query[key]))
    }
    var url = 'https://api.ohanamovies.org/dev?' + out.join('&')
    console.log(query, url)
    return url
  },
  isGoogleChrome() {
    //TODO: make this robust, as this is not as accurate (MS Edge returns true)
    //return window.navigator.vendor == 'Google Inc.'
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
  },
  formatTime(t) {
    let sec = t / 1000
    let h = Math.floor(sec / 3600)
    let m = Math.floor((sec % 3600) / 60)
    let s = Math.floor((sec % 3600) % 60)

    let xh = h < 10 ? '0' + h : h
    let xm = m < 10 ? '0' + m : m
    let xs = s < 10 ? '0' + s : s
    return xh + ':' + xm + ':' + xs
  },
}

const extension = {
  events: {
    //This is shared between extension/content-script-web and web/App.vue
    EXTENSION_PRESENT: 'EXTENSION_PRESENT',
    SETTINGS_WEB_TO_EXTENSION: 'SETTINGS_WEB_TO_EXTENSION',
    SETTINGS_EXT_TO_WEB: 'SETTINGS_EXT_TO_WEB',
  },
}

module.exports = {
  user,
  movies,
  providers,
  utils,
  extension,
  api,
}
