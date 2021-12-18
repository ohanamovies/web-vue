import Vue from 'vue'
import VueRouter from 'vue-router'

import MoviePopup from '@/components/MoviePopup/MoviePopup.vue'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Home2 from '@/views/Home2.vue'
import About2 from '@/views/About2.vue'
import Community from '@/views/Community.vue'
import Content from '@/views/Content.vue'
import Elements from '@/views/Elements.vue'
import Stats from '@/views/Stats.vue'
import GetStarted from '@/views/Tutorials/GetStarted.vue'
import FAQs from '@/views/Tutorials/FAQs.vue'
import NotFoundComponent from '@/views/Tutorials/NotFoundComponent.vue'
import SettingsPage2 from '@/views/SettingsPage2.vue'
import Bye from '@/views/Extension/Bye.vue'
import Welcome from '@/views/Extension/Welcome.vue'
import MoviePage from '@/views/MoviePage/MoviePage.vue'
import Privacy from '@/views/Legal/Privacy.vue'
import TermsOfUse from '@/views/Legal/TermsOfUse.vue'
import ContactUs from '@/views/Legal/ContactUs.vue'
import Editors from '@/views/Editors/Editors.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home2',
    component: Home2,
  },
  {
    path: '/old',
    name: 'Home',
    component: Home,
  },
  {
    path: '/magic',
    redirect: '/',
  },
  {
    path: '/editors',
    name: 'Editors',
    component: Editors,
  },
  {
    path: '/item/:imdb',
    name: 'MoviePage',
    component: MoviePage,
    props: true,
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
    path: '/extension/bye',
    name: 'Bye',
    component: Bye,
  },
  {
    path: '/extension/welcome',
    name: 'Welcome',
    component: Welcome,
  },
  {
    path: '/extension/popup/:imdb',
    name: 'MoviePopup',
    props: true,
    component: MoviePopup,
  },
  {
    path: '/bye',
    name: 'Bye',
    component: Bye,
    deprecated: true,
  },
  {
    path: '/faqs',
    name: 'FAQs',
    component: FAQs,
  },
  {
    path: '/settings',
    name: 'SettingsPage2',
    component: SettingsPage2,
  },
  {
    path: '/elements',
    name: 'Elements',
    component: Elements,
  },
  {
    path: '/privacy-policy',
    name: 'Privacy',
    component: Privacy,
  },
  {
    path: '/terms-of-use',
    name: 'TermsOfUse',
    component: TermsOfUse,
  },
  {
    path: '/contact-us',
    name: 'ContactUs',
    component: ContactUs,
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
