const user = {
  language() {
    return this.$i18n.locale.toLowerCase().split('-')[0]
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
    if (!movieContent) return { status: 'unknown', cuts: 0, trust: 0 }
    if (!skipTags || !skipTags.length) return { status: 'unset', cuts: 0, trust: 0 }
    let health = 100
    let cuts = 0
    let trust = Infinity
    let status = 'unset'
    let color = 'red'
    let icon = ''

    for (var tag of skipTags) {
      // Set default
      let ms = movieContent[tag] || {}
      //todo: check providers

      // Set num cuts/scenes & min user level
      if (ms.cuts) cuts += ms.cuts
      trust = Math.min(trust, ms.trust || 0)
      health = Math.min(health, ms.health || 0)
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

  addInfo(movie, skipTags) {
    movie.join_status = movies.joinStatus2(movie.movieContent, skipTags)
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

  getSummary(movie) {
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
}
