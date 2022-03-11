import Vue from 'vue'
import MyHeader from './MyHeader'
import MyFooter from './MyFooter'
import MyTooltip from './MyTooltip'
import FcTooltip from './FcTooltip'
import ReadMore from './ReadMore.vue'
import Navigation from './Navigation.vue'

//here we put the custom global components.
Vue.component('my-header', MyHeader)
Vue.component('MyFooter', MyFooter)
Vue.component('my-tooltip', MyTooltip)
Vue.component('fc-tooltip', FcTooltip)
Vue.component('ReadMore', ReadMore)
Vue.component('Navigation', Navigation)
