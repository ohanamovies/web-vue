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

    if (health > 0.5) {
      status = cuts ? 'done' : 'clean'
      color = 'green'
      icon = 'none'
      //icon = 'mdi-shield-check'
      icon2 = trust > 3 ? 'mdi-shield-check' : 'mdi-shield-check-outline'
    } else if (health < -0.5) {
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
    if (trust <= 1 || trust == Infinity) {
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

      if (Math.abs(m.filterStatus[t].health) < 0.5) {
        if (status != 'missing' && status != 'unknown') status = 'mixed'
        continue
      } else if (m.filterStatus[t].health < -0.5) {
        status = 'missing'
        continue
      }
    }

    if (status == 'done' && editsCount == 0) {
      status = 'clean'
    }

    console.log('SSSSSSSSSSS', status)

    const mapping = {
      unknown: {
        icon: 'mdi-help-circle',
        color: 'lightgray',
      },
      missing: {
        icon: 'mdi-heart-broken',
        color: 'red',
      },
      mixed: {
        icon: 'mdi-heart-broken',
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

module.exports = { movies }
