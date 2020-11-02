import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './components/' // this takes components/index.js to import our global componets for all the project
//^_ as learned here: https://stackoverflow.com/questions/52644198/registering-vue-components-globally

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
