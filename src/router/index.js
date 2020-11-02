import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Community from '../views/Community.vue'
import Content from '../views/Content.vue'
import Elements from '../views/Elements.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/community',
    name: 'Community',
    component: Community
  },
  {
    path: '/content',
    name: 'Content',
    component: Content
  },
  {
    path: '/elements',
    name: 'Elements',
    component: Elements
  }
]

const router = new VueRouter({
  //mode: 'history',
  routes: routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router
