let rawTags = require('./../../raw_tags.js')

const movies = {
  sevText: [
    'None',
    'None-Slight',
    'Slight',
    'Slight-Mild',
    'Mild',
    'Mild-Moderate',
    'Moderate',
    'Moderate-Severe',
    'Severe',
  ],
  severities: ['Very', 'Moderately', 'Mildly', 'Slightly'],
  categories: ['gory', 'erotic', 'profane'],
  th: { trust: 0.15, unhealthy: -0.35, healthy: 0.35, trustWarning: 1 },
  isHealthy(h) {
    if (h && h.health) h = h.health
    return !!(h >= this.th.healthy)
  },

  isUnhealthy(h) {
    if (h && h.health) h = h.health
    return !!(h < this.th.unhealthy)
  },

  isTrusted(t) {
    if (!t) return false
    if (t && t.trust) t = t.trust
    return !!(t >= this.th.trust)
  },

  getFS(filterStatus, tag) {
    let fs = filterStatus[tag] || {}
    fs.health = fs.health || 0
    fs.trust = fs.trust || 0
    fs.scenes = fs.scenes || []
    return fs
  },

  getTagsHealth(filterStatus, skip_tags) {
    let status = { trust: Infinity, health: Infinity, cuts: 0 }
    for (var i = 0; i < skip_tags.length; i++) {
      let fs = this.getFS(filterStatus, skip_tags[i])
      status.trust = Math.min(status.trust, fs.trust)
      status.health = Math.min(status.health, fs.health)
      status.cuts += fs.scenes.length
    }
    // If there are no scenes to skip, trust & health are Infinity (This is intended behaviour)
    return this.addColors(status)
  },

  addColors(status) {
    let props = {}
    if (status.trust < this.th.trust) {
      props = { color: 'orange', icon: 'mdi-progress-question' }
    } else if (this.isHealthy(status)) {
      props = { color: 'green', icon: 'mdi-emoticon-happy' }
    } else if (this.isUnhealthy(status)) {
      props = { color: 'red', icon: 'mdi-flag-variant' }
    } else {
      props = { color: 'orange', icon: 'mdi-flag-variant' }
    }
    if (status.trust < this.th.trustWarning) {
      props.icon = 'mdi-progress-question'
    }
    props.use_icon = props.icon != 'mdi-emoticon-happy'
    return { ...status, ...props }
  },

  getMySev(catIndex, filterStatus, skip_tags) {
    //Note: this returns the "visible" severity based on original movie content, filters available, and user settings.
    let sevs = rawTags.severitiesR[catIndex]
    let tag = 'Unknown'
    let healthyTags = 0
    let sevTrust = Infinity

    for (let i = 0; i < sevs.length; i++) {
      const sev = sevs[i]
      let cares = skip_tags.includes(sev)

      let fs = this.getFS(filterStatus, sev)

      if (this.isHealthy(fs) && fs.scenes.length && !cares) {
        // It's clean && original was not && user does not care about filtering => Stop here
        break
      } else if (this.isHealthy(fs)) {
        // Healthy
        healthyTags += 1
        sevTrust = Math.min(sevTrust, fs.trust)
        continue
      } else if (this.isUnhealthy(fs)) {
        // Unhealthy
        sevTrust = Math.min(sevTrust, fs.trust)
        break
      } else {
        // Mixed
        healthyTags += 0.5
        sevTrust = Math.min(sevTrust, fs.trust)
        break
      }
    }
    if (sevTrust == Infinity) sevTrust = 0

    const skip_sevs = skip_tags.filter((tag) => sevs.includes(tag))
    let myHealth = this.getTagsHealth(filterStatus, skip_sevs)

    if (this.isTrusted(sevTrust)) {
      let sevsR = [...this.sevText].reverse()
      tag = sevsR[parseInt(2 * healthyTags)]
      if (myHealth.cuts == 1) tag += ' (' + myHealth.cuts + ' edit)'
      if (myHealth.cuts > 1) tag += ' (' + myHealth.cuts + ' edits)'
    }

    return { tag, sevTrust, ...myHealth }
  },

  movieSev(catIndex, filterStatus) {
    // No need to reinvent the wheel
    return this.getMySev(catIndex, filterStatus, [])
  },

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
    if (!tagged) return { status: 'unknown', cuts: 0, trust: 0, icon2: 'mdi-help-circle' }
    if (!skipTags || !skipTags.length) {
      return { status: 'unset', cuts: 0, trust: 0, icon2: 'mdi-help-circle' }
    }
    let health = 100
    let cuts = 0
    let trust = Infinity
    let status = 'unset'
    let color = 'red'
    let icon = ''
    let icon2 = ''

    for (var tag of skipTags) {
      // Set default
      let s = tagged[tag] || {}
      // Set num cuts/scenes & min user level
      if (s.cuts) cuts += s.cuts
      trust = Math.min(trust, s.trust || 0)
      health = Math.min(health, s.health || 0)
    }

    if (health > this.th.healthy) {
      status = cuts ? 'done' : 'clean'
      color = 'green'
      icon = 'none'
      //icon = 'mdi-shield-check'
      icon2 = trust > 3 ? 'mdi-shield-check' : 'mdi-shield-check-outline'
    } else if (health < this.th.unhealthy) {
      status = 'missing'
      color = 'red'
      icon = 'mdi-heart-broken'
      //icon = 'mdi-shield-alert'
      icon2 = trust > 3 ? 'mdi-shield-alert' : 'mdi-shield-alert-outline'
    } else {
      status = 'mixed'
      color = 'orange'
      icon = 'mdi-heart-broken'
      //icon = 'mdi-help-circle'
      icon2 = 'mdi-help-circle'
    }
    if (trust <= this.th.trust || trust == Infinity) {
      status = 'unknown'
      color = 'lightgray'
      icon = 'mdi-progress-question'
      icon2 = 'mdi-help-circle'
    }

    return {
      status: status,
      health: health,
      cuts: cuts,
      trust: trust,
      icon: icon,
      color: color,
      icon2: icon2,
    }
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

  addInfo_old(movie, skipTags) {
    //TODO: somewhere we should remove the providers that are not edited, if we are going to say that the movie is edited.
    movie.join_status = movies.joinStatus3(movie.movieContent, movie.providers, skipTags)

    //clarify which providers are done and which ones not!
    movie.healthyProviders = []
    movie.unhealthyProviders = []

    if (movie.providers && skipTags) {
      for (let i = 0; i < movie.providers.length; i++) {
        const p = movie.providers[i]

        if (!p.cleanTags) {
          movie.unhealthyProviders.push(p)
          continue
        }

        const cleanTags = p.cleanTags.split(' ')

        let clean = true
        for (let j = 0; j < skipTags.length; j++) {
          const tag = skipTags[j].toLowerCase().replace(/\s/g, '_')
          if (!cleanTags.includes(tag)) clean = false
        }

        if (clean) {
          movie.healthyProviders.push(p)
        } else {
          movie.unhealthyProviders.push(p)
        }
      }
    }
    //------------------

    movie.brief_status = movies.getSummary(movie)
    if (typeof movie.movieValues == 'string')
      movie.movieValues = movies.parse(movie.movieValues, {})
    return movie
  },

  addInfo(movie, skipTags) {
    //This version now just looks at the movie.filterStatus section, regardless of the providers
    let m = movie //JSON.parse(JSON.stringify(movie))

    //-1: missing | 0: unknown | 1: done

    let trustThreshold = 3

    let status = skipTags.length ? 'done' : 'unset' //until proved otherwise below
    let minTrust = Infinity
    let minHealth = Infinity
    let editsCount = 0

    if (!m.filterStatus) m.filterStatus = {}

    for (let i = 0; i < skipTags.length; i++) {
      const t = skipTags[i]

      if (!m.filterStatus[t]) {
        if (status != 'missing') status = 'unknown'
        continue
      }

      if (m.filterStatus[t].trust < minTrust) minTrust = m.filterStatus[t].trust
      if (m.filterStatus[t].health < minHealth) minHealth = m.filterStatus[t].health
      editsCount += m.filterStatus[t].scenes.length

      if (m.filterStatus[t].trust < trustThreshold) {
        if (status != 'missing') status = 'unknown'
      }

      if (Math.abs(m.filterStatus[t].health) < this.th.healthy) {
        if (status != 'missing' && status != 'unknown') status = 'mixed'
        continue
      } else if (m.filterStatus[t].health < this.th.unhealthy) {
        status = 'missing'
        continue
      }
    }

    if (status == 'done' && editsCount == 0) {
      status = 'clean'
    }

    //console.log('SSSSSSSSSSS', status)

    const mapping = {
      unknown: {
        icon: 'mdi-help-circle',
        color: 'lightgray',
      },
      missing: {
        icon: 'none', //mdi-heart-broken
        color: 'red',
      },
      mixed: {
        icon: 'none', //mdi-heart-broken
        color: 'orange',
      },
      done: {
        icon: 'mdi-content-cut',
        color: 'green',
      },
      clean: {
        icon: 'none', //'mdi-shield-check',
        color: 'green',
      },
      unset: {
        icon: 'none',
        color: 'none',
      },
    }

    m.join_status = {
      status: status,
      health: minHealth,
      cuts: editsCount,
      trust: minTrust,
      icon: mapping[status].icon,
      color: mapping[status].color,
    }

    //other checks
    m.brief_status = movies.getSummary(movie)
    if (typeof m.movieValues == 'string') m.movieValues = movies.parse(m.movieValues, {})

    //deprecated stuff (should get rid of this)
    m.healthyProviders = []
    m.unhealthyProviders = []

    return m
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
          if (s.health > this.th.healthy && s.trust > this.th.trust) continue
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

module.exports = { movies }
