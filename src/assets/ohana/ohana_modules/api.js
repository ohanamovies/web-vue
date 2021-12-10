const utils = require('./utils').utils

const api = {
  async query(query) {
    return new Promise((resolve, reject) => {
      let url = utils.buildURL(query)

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

module.exports = { api }
