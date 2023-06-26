import Vue from 'vue'
import VueRouter from 'vue-router'

import ExtensionPopup from '@/views/Extension/ExtensionPopup'

//import Home from '@/views/Home.vue'
//import AboutOld from '@/views/AboutOld.vue'
import Home2 from '@/views/Home2.vue'
//import About2 from '@/views/Tutorials/About.vue'
import Community from '@/views/Community.vue'
//import Content from '@/views/Content.vue'
import Stats from '@/views/Stats.vue'
//import GetStarted from '@/views/Tutorials/GetStarted.vue'
import FAQs from '@/views/Tutorials/FAQs.vue'
import NotFoundComponent from '@/views/Tutorials/NotFoundComponent.vue'
import SettingsPage2 from '@/views/SettingsPage2.vue'
import Bye from '@/views/Extension/Bye.vue'
//import Welcome from '@/views/Extension/Welcome.vue'
import ReleaseNotes from '@/views/Extension/ReleaseNotes.vue'
import MoviePage from '@/views/MoviePage/MoviePage.vue'
import Privacy from '@/views/Legal/Privacy.vue'
import TermsOfUse from '@/views/Legal/TermsOfUse.vue'
import ContactUs from '@/views/Legal/ContactUs.vue'
import Editors from '@/views/Editors/Editors.vue'
import UsernamePage from '@/views/Editors/UsernamePage.vue'
import PendingMapping from '@/views/Editors/PendingMapping.vue'
import EditorsLeaderboard from '@/views/Editors/EditorsLeaderboard.vue'
import RemoteControl from '@/views/Extension/RemoteControl.vue'
import News from '@/views/News/Index.vue'
import OhanaConsole from '@/views/Console/OhanaConsole.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home2',
    component: Home2,
    props: true,
  },
  {
    path: '/news',
    name: 'News',
    component: News,
  },
  /*{
    path: '/old',
    name: 'Home',
    component: Home,
  },*/
  {
    path: '/magic',
    redirect: '/',
  },

  {
    path: '/find-movies',
    redirect: '/',
  },

  {
    path: '/editors/:page?',
    name: 'Editors',
    component: Editors,
    props: true,
  },
  {
    path: '/extension/remote/:target',
    name: 'RemoteControl',
    component: RemoteControl,
    props: true,
  },
  {
    path: '/editors/user/:username/:page?',
    name: 'UsernamePage',
    component: UsernamePage,
    props: true,
  },
  {
    path: '/editors/stats/pending-mapping',
    name: 'PendingMapping',
    component: PendingMapping,
    props: false,
  },
  {
    path: '/editors/stats/leaderboard',
    name: 'EditorsLeaderboard',
    component: EditorsLeaderboard,
    props: false,
  },
  {
    path: '/item/:imdb',
    name: 'MoviePage',
    component: MoviePage,
    props: true,
  },
  /*{
    path: '/about_old',
    name: 'AboutOld',
    component: AboutOld,
  },*/
  {
    path: '/community',
    name: 'Community',
    component: Community,
  },
  /*{
    path: '/content',
    name: 'Content',
    component: Content,
  },
  {
    path: '/find-movies-old',
    name: 'find-movies-old',
    component: Content,
  },*/
  {
    path: '/stats',
    name: 'Stats',
    component: Stats,
  },
  {
    path: '/console',
    name: 'OhanaConsole',
    component: OhanaConsole,
  },
  {
    path: '/extension/bye',
    name: 'Bye',
    component: Bye,
  },
  {
    path: '/extension/welcome',
    name: 'Welcome',
    redirect: '/',
  },
  {
    path: '/extension/release-notes',
    name: 'ReleaseNotes',
    component: ReleaseNotes,
  },
  {
    path: '/extension/popup/:imdb',
    name: 'ExtensionPopup',
    props: true,
    component: ExtensionPopup,
  },
  {
    path: '/bye',
    name: 'Bye',
    component: Bye,
    deprecated: true,
  },
  {
    path: '/about',
    name: 'About2',
    component: FAQs,
    props: { focus: '#about' },
  },
  {
    path: '/get-started',
    name: 'GetStarted',
    component: FAQs,
    props: { focus: '#get-started' },
  },
  {
    path: '/start-editing',
    name: 'StartEditing',
    component: FAQs,
    props: { focus: '#start-editing' },
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
