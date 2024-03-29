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

  includesAny: function (arr1, arr2) {
    if (arr1.indexOf('All') !== -1) return true
    if (arr2.indexOf('All') !== -1) return true
    return arr1.some((v) => arr2.indexOf(v) !== -1)
  },
  includesAll: function (arrBig, arrSmall) {
    for (const iterator of arrSmall) {
      if (!arrBig.includes(iterator)) return false
    }
    return true
  },

  //https://stackoverflow.com/a/32922084
  deepEqual: function (x, y) {
    const ok = Object.keys,
      tx = typeof x,
      ty = typeof y
    return x && y && tx === 'object' && tx === ty
      ? ok(x).length === ok(y).length && ok(x).every((key) => this.deepEqual(x[key], y[key]))
      : x === y
  },
}

module.exports = { utils }
