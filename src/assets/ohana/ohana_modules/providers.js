const providers = {
  fromApi: require('./../copied_from_api/provider'),
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
    if (provider == 'apple') return 'images/providers/apple.png'
  },
  getLink(provider, providerID, type = '', settings = {}) {
    providerID = providerID.split('_')[1]
    if (provider == 'netflix') return 'https://www.netflix.com/watch/' + providerID
    if (provider == 'hboespana') return 'https://es.hboespana.com/movies/-/' + providerID + '/play'
    if (provider == 'disneyplus') return 'https://www.disneyplus.com/en-gb/video/' + providerID

    if (provider == 'primevideo') {
      if (settings.country == 'GB') {
        return 'https://watch.amazon.co.uk/detail?gti=' + providerID
      } else {
        return 'https://app.primevideo.com/watch?gti=' + providerID
      }
    }
    if (provider == 'movistarplus') return 'https://ver.movistarplus.es/ficha?id=' + providerID
    if (provider == 'imdb') return 'https://www.imdb.com/title/' + providerID
    //Apple
    if (provider == 'apple')
      return `https://tv.apple.com/${settings.country ? settings.country.toLowerCase() : 'us'}/${
        type == 'episode' ? 'show' : type //TODO: do they have a link to the series? (in ohana we use movie, episode, series)
      }/-/umc.cmc.${providerID}`
    if (provider == 'hbomax') {
      if (type == 'show') {
        return 'https://play.hbomax.com/page/urn:hbo:page:' + providerID + ':type:episode'
      } else {
        return 'https://play.hbomax.com/page/urn:hbo:page:' + providerID + ':type:feature'
      }
    }
  },
  getLink2(id) {
    let provider = id.split('_')[0]
    let providerID = id.split('_')[1]

    let settings = localStorage.settings ? JSON.parse(localStorage.settings) : { country: 'US' }

    //imdb fallback
    if (provider == id && /tt\d+/g.test(id)) {
      provider = 'imdb'
      providerID = id
    }

    if (provider == 'netflix') return 'https://www.netflix.com/watch/' + providerID
    if (provider == 'hboespana') return 'https://es.hboespana.com/movies/-/' + providerID + '/play'
    if (provider == 'disneyplus') return 'https://www.disneyplus.com/en-gb/video/' + providerID
    if (provider == 'primevideo') return 'https://primevideo.com/watch?gti=' + providerID
    if (provider == 'movistarplus') return 'https://ver.movistarplus.es/ficha?id=' + providerID
    if (provider == 'imdb') return 'https://www.imdb.com/title/' + providerID
    if (provider == 'hbomax') return 'https://play.hbomax.com/player/urn:hbo:feature:' + providerID //alex-20230414
    if (provider == 'apple') return this.getLink('apple', providerID, 'movie', settings) //FIXME: this is not correct, it does not work for episodes
  },
  parseURL(url) {
    this.fromApi.parseURL(url)
  },
  /**
   *
   * @param {*} url
   * @returns
   * @deprecated the real id comes from the browser (e.g.: rakuten), not the pure URL...
   */
  getID(url) {
    return this.fromApi.parseURL(url).id //.pid
  },
}

module.exports = { providers }
