const movies = {
  /**
   *
   * @param {*} tagged
   * @param {Array} skipTags e.g.: ["Very erotic", "Very profane"]
   * @returns {{status, cuts, level}}
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
    // Build url
    var out = []
    for (var key in query) {
      out.push(key + '=' + encodeURIComponent(query[key]))
    }
    var url = 'https://api.ohanamovies.org/dev?' + out.join('&')
    console.log(query, url)
    return url
  },
}

module.exports = {
  movies,
  providers,
  utils,
}
