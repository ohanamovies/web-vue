function searchMatch_Aux(searchText, searchInText) {
  //this one cleans up the special characters, so no need to type them write. Also removes the lower/upper case matching.
  //Best to use the searchMatch_Smart() one
  searchText = searchText == undefined ? '' : searchText
  searchText = searchText == null ? '' : searchText

  searchInText = searchInText
    .toLowerCase()
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n')

  searchText = searchText
    .toLowerCase()
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n')

  if (searchInText.indexOf(searchText) > -1) {
    return true
  } else {
    return false
  }
}

function searchMatch(searchText, searchInText) {
  //this one checks each word separately, so it's easier to search for stuff
  searchText = searchText == undefined ? '' : searchText
  searchText = searchText == null ? '' : searchText

  var words = searchText.split(' ')

  var all_good = true

  words.forEach((word) => {
    if (!searchMatch_Aux(word, searchInText)) {
      all_good = false
    }
  })

  return all_good
}

/**
 * This is a helper function to create the head object used by the vue-head plugin, to generate the metadata. Pending clarify if Search Engines crawl this properly as it is generated via javascript...
 * @param {*} title
 * @param {*} description
 * @param {*} path Current Path (use: this.$router.currentRoute.path)
 * @returns
 */
function headObject(title, description, path) {
  let siteName = 'Ohana TV'
  let url = window.location.host + '/#' + path

  url = window.location.href
  let image = {
    url: 'https://ohana.tv/icons/apple-touch-icon-180x180.png',
    width: 180,
    height: 180,
  }

  let xx = {
    link: [{ id: 'canonical', rel: 'canonical', href: url }],
    meta: [
      { id: 'meta-description', name: 'description', content: description },

      //Open graph
      { id: 'og:title', name: 'og:title', content: title },
      { id: 'og:type', name: 'og:title', content: 'website' },
      { id: 'og:locale', name: 'og:locale', content: 'en_US' },
      { id: 'og:url', name: 'og:url', content: url },
      { id: 'og:site_name', name: 'og:site_name', content: siteName },
      { id: 'og:image', name: 'og:image', content: image.url },
      { id: 'og:image:width', name: 'og:image:width', content: image.width },
      { id: 'og:image:height', name: 'og:image:height', content: image.height },

      //Twitter
      { id: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      //TODO: { id: 'twitter:site', name: 'twitter:site', content:'@ohanamovies' },
      { id: 'twitter:title', name: 'twitter:title', content: title },
      { id: 'twitter:url', name: 'twitter:url', content: url },
      { id: 'twitter:description', name: 'twitter:description', content: description },
      { id: 'twitter:image', name: 'twitter:image', content: image.url },
    ],

    title: {
      inner: title || 'Ohana Movies',
      complement: '',
      separator: '',
      id: 'meta-title',
    },
  }

  return xx
}

module.exports = {
  searchMatch,
  headObject,
}
