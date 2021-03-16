import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './components/' // this takes components/index.js to import our global componets for all the project
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
//^_ as learned here: https://stackoverflow.com/questions/52644198/registering-vue-components-globally

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
