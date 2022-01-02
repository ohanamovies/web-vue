const SOURCE = 'web'

const utils = require('./utils').utils

const api = {
  async query(query, newAPI = true) {
    query.newAPI = newAPI
    query.source = SOURCE

    return new Promise((resolve, reject) => {
      let url = utils.buildURL(query)

      console.log('[alex] [api] getting movie data', url)
      fetch(url)
        .then((r) => r.text())
        .then((data) => {
          data = data.replaceAll('Slighty', 'Slightly') //data might come with "Slighty" instead of "Slightly".
          let d = JSON.parse(data)
          //if (!d.title) reject('wrong data...')  //TODO: why did we put this? maybe for "getMovie?"
          console.log('getData ', d)

          resolve(d)
        })
        .catch((e) => reject(e))
    })
  },
  async getMovie(imdb) {
    let params = {
      action: 'getMovie',
      imdb: imdb,
    }
    return this.query(params)
  },
  async getEpisodes(imdbParent) {
    let params = { action: 'getEpisodes', imdbParent: imdbParent }
    return this.query(params)
  },
}

module.exports = { api }
