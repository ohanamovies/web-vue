import Vue from 'vue'
import Vuex from 'vuex'

import { mutations } from './types'
import ohana from '@/assets/ohana'
//import ohana from '@/assets/ohana'
//TODO: it'd be intereseting to use the vuex store to manage things like hasApp, isChrome... rather than using props all the time...

//NOTE: we are setting the first values of the store in App.vue

Vue.use(Vuex)

function checkSettings(settings) {
  if (settings && settings.ignore_default_settings) {
    // Force default values if any key has a different data type
    for (var key in store.state.default_settings) {
      if (typeof store.state.default_settings[key] !== typeof settings[key]) {
        settings[key] = store.state.default_settings[key]
      }
    }
    return settings
  } else {
    console.error('[alex] ouch', settings)
    return store.state.default_settings
  }
}

const store = new Vuex.Store({
  state: {
    settings: {},
    default_settings: {
      username: '',
      skip_tags: [], //['Very erotic', 'Moderately erotic', 'Very profane'],
      ignore_default_settings: true,
      pause_after_adding_scene: false,
      playbackRate_on_mark: 1.5,
      mute_on_mark: true,
      blur_on_mark: 12,
      mute_on_edit: true,
      blur_on_edit: 8,
      level: 0,
      authToken: '',
      welcomed: 0,
    },
    skipTags: [],
    hasApp: false,
    extension_version: false,

    isChrome: false,
    isMobile: false,
  },
  getters: {
    //getters are like computed properties for the store. Use store.getters.testPlus1 toa access
  },
  mutations: {
    //trigger mutations by using store.commit(mutationName, payload)

    [mutations.SET_SETTINGS](state, settings) {
      //0. validate settings structure, use default where not right
      settings = checkSettings(settings)

      //1. Save locally as fallback (in case no extension or removed later)
      localStorage.settings = JSON.stringify(settings)

      //2. Save in store (where it is really used)
      state.settings = { ...settings }
    },
    [mutations.SET_HAS_APP](state, value) {
      state.hasApp = value
    },
    [mutations.SET_EXTENSION_VERSION](state, value) {
      state.extension_version = value
    },
    [mutations.IS_GOOGLE_CHROME](state, value) {
      state.isChrome = value
    },
    [mutations.SET_IS_MOBILE](state, value) {
      state.isMobile = value
    },
  },
  actions: {
    updateSettings({ commit }, settings) {
      console.log('[alex] action: updateSettings', settings)

      settings = checkSettings(settings)

      console.log('[alex] action: cleaned settings: ', settings)

      //1. Update web
      commit(mutations.SET_SETTINGS, settings)
      //commit(mutations.IS_GOOGLE_CHROME, true)

      //2. Ask the extension to save (they will trigger save extension when done too)
      let e = ohana.extension.events.SETTINGS_WEB_TO_EXTENSION
      const event = new CustomEvent(e, { detail: settings })
      document.dispatchEvent(event)
    },
  },

  //we can also use ACTOINS, if we want to do something async (like fetching data from API)
})

export default store
