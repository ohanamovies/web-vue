const i18n = require('@/plugins/i18n').default

const user = {
  language() {
    return i18n.locale.toLowerCase().split('-')[0]
  },
}

const api = require('./ohana_modules/api').api

const movies = require('./ohana_modules/movies').movies

const providers = require('./ohana_modules/providers').providers

const utils = require('./ohana_modules/utils').utils

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
  api,
}
