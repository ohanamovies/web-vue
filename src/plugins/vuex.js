import Vue from 'vue'
import Vuex from 'vuex'

//TODO: it'd be intereseting to use the vuex store to manage things like hasApp, isChrome... rather than using props all the time...

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    store_example: 0,
  },
  mutations: {
    increment(state) {
      state.store_example++
    },
  },
})

export default store
