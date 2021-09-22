import Vue from 'vue'
import MyHeader from './MyHeader'
import MyFooter from './MyFooter'
import MyTooltip from './MyTooltip'
import FcTooltip from './FcTooltip'

//here we put the custom global components.
Vue.component('my-header', MyHeader)
Vue.component('my-footer', MyFooter)
Vue.component('my-tooltip', MyTooltip)
Vue.component('fc-tooltip', FcTooltip)
