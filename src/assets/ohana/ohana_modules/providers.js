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
  },
  getLink(provider, providerID) {
    providerID = providerID.split('_')[1]
    if (provider == 'netflix') return 'https://www.netflix.com/watch/' + providerID
    if (provider == 'hboespana') return 'https://es.hboespana.com/movies/-/' + providerID + '/play'
    if (provider == 'disneyplus') return 'https://www.disneyplus.com/en-gb/video/' + providerID
    if (provider == 'primevideo') return 'https://primevideo.com/watch?gti=' + providerID
    if (provider == 'movistarplus') return 'https://ver.movistarplus.es/ficha?id=' + providerID
    if (provider == 'imdb') return 'https://www.imdb.com/title/' + providerID
  },
  getLink2(id) {
    let provider = id.split('_')[0]
    let providerID = id.split('_')[1]

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
