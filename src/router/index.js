import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Home2 from '../views/Home2.vue'
import About2 from '../views/About2.vue'
import Community from '../views/Community.vue'
import Content from '../views/Content.vue'
import Elements from '../views/Elements.vue'
import Stats from '../views/Stats.vue'
import GetStarted from '../views/Tutorials/GetStarted.vue'
import FAQs from '../views/Tutorials/FAQs.vue'
import NotFoundComponent from '../views/Tutorials/NotFoundComponent.vue'
import Settings from '../views/Settings.vue'
import Bye from '../views/Bye.vue'
import WelcomeTour from '@/components/Settings/WelcomeTour.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/welcometour',
    name: 'WelcomeTour',
    component: WelcomeTour,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/magic',
    name: 'Home2',
    component: Home2,
  },
  {
    path: '/about2',
    name: 'About2',
    component: About2,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/community',
    name: 'Community',
    component: Community,
  },
  {
    path: '/content',
    name: 'Content',
    component: Content,
  },
  {
    path: '/find-movies',
    name: 'find-movies',
    component: Content,
  },
  {
    path: '/stats',
    name: 'Stats',
    component: Stats,
  },
  {
    path: '/get-started',
    name: 'GetStarted',
    component: GetStarted,
  },
  {
    path: '/bye',
    name: 'Bye',
    component: Bye,
  },
  {
    path: '/faqs',
    name: 'FAQs',
    component: FAQs,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
  {
    path: '/elements',
    name: 'Elements',
    component: Elements,
  },
  {
    path: '/:catchAll(.*)',
    component: NotFoundComponent,
    name: 'NotFound',
  },
]

const router = new VueRouter({
  //this wasn't working on netlify, it should (hopefully) work now that we created the public/_redirects file as per https://answers.netlify.com/t/vue-app-not-routing-correctly-when-deployed/6363/4
  mode: 'history',
  routes: routes,
  scrollBehavior: function (to) {
    if (to.hash) {
      return {
        selector: to.hash,
      }
    } else {
      return { x: 0, y: 0 }
    }
  },
})

/*
//This is useful if we switch to history mode
router.beforeEach((to, from, next) => {
  // Redirect if fullPath begins with a hash (ignore hashes later in path)
  if (to.fullPath.substr(0, 2) === "/#") {
    const path = to.fullPath.substr(2);
    next(path);
    return;
  }
  next();
});
*/

export default router
