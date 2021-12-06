<template>
  <div id="app">
    <v-app>
      <v-main v-if="!isPopup">
        <div v-if="devMode" style="position: fixed; top: 0px; left: 50%; z-index: 999999">
          <v-btn
            color="red"
            fab
            bottom
            right
            small
            dark
            @click="showDevMenu = !showDevMenu"
            style="z-index: 99999; cursor: pointer"
          >
            <!-- progress circle within the go-to-top button -->

            <v-icon color="white" style="cursor: pointer">mdi-xml</v-icon>
            <!-- TODO: may use mdi-tune -->
          </v-btn>

          <div
            v-if="showDevMenu"
            style="background-color: lightblue; padding: 10px; border-radius: 5px"
          >
            <b>Override:</b>
            <v-switch v-model="hasApp_dev" hide-details :label="'hasApp: ' + hasApp_dev"></v-switch>
            <br />
            User Feedback:
            <a
              href="https://docs.google.com/forms/d/1zthFWG8OGugKAPxYpcKwBSbOnwfNRIGJ4Q66UIuJUvs/edit#responses"
              target="_blank"
              >check responses</a
            >
          </div>
        </div>
        <!-- Header: Needs to be put in each page, using <my-header></my-header> (why: because styling is different subpage vs home -->
        <my-header></my-header>
        <div>
          <!-- Router view loads the current route. Router defines which .vue file is now loaded in router/index.js -->

          <router-view />
        </div>

        <!-- Footer: Imported here as component (Towards more modular coding) -->
        <!-- todo: for now forced to all pages by putting it in this App.vue component. If needed, remove from here and put the line of code in each subpage (if styling would depends on parent classes etc.) -->
        <my-footer></my-footer>
      </v-main>
      <v-main v-else>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import ohana from '@/assets/ohana'
import { mutations } from '@/vuex/types'
import { mapState } from 'vuex'

export default {
  watch: {
    hasApp_dev(newValue) {
      //Override what we received from the extension
      this.$store.commit(mutations.SET_HAS_APP, newValue)
    },
  },
  data() {
    return {
      windowWidth: 0,
      hasApp_dev: false,
      showDevMenu: false,
    }
  },
  computed: {
    ...mapState(['isChrome', 'isMobile', 'hasApp']),
    isPopup() {
      return this.$router.currentRoute.path.includes('/extension/popup')
    },
    devMode() {
      return window.location.hostname == 'localhost'
    },
  },
  mounted() {
    //check if hasApp by listening to hook from the extension.
    this.checkExtension()

    this.hasApp_dev = this.hasApp //default value for hasApp_dev (we can always override)

    //resize:
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
      let is_mobile = false
      if (this.windowWidth < 960) {
        is_mobile = true
      }
      this.$store.commit(mutations.SET_IS_MOBILE, is_mobile)
      //TODO: we should also re-evaluate the isChrome... as mobiles are not valid browsers
    },
    checkExtension() {
      //0. listen to changes on localStorage (in case things change in another page and we don't have the extension)
      window.addEventListener('storage', (e) => {
        //Note: this is not fired for changes on same page, so should be safe :)
        if (e.key == 'settings') {
          if (e.newValue != e.oldValue) {
            console.log('Changes detected on local storage on another page: Updating store here')
            let new_settings = JSON.parse(e.newValue)
            this.$store.commit(mutations.SET_SETTINGS, new_settings)
          }
        }
      })

      //extension:
      const events = ohana.extension.events

      //Settings?
      const default_settings = this.$store.state.default_settings

      console.log('localStorage.settings', localStorage.settings)
      let settings = localStorage.settings ? JSON.parse(localStorage.settings) : default_settings

      this.$store.commit(mutations.SET_SETTINGS, settings)

      //Settings change from the extension (propagate here)
      document.addEventListener(events.SETTINGS_EXT_TO_WEB, (e) => {
        let s = e.detail
        if (s.welcomed) {
          console.log('[web] Settings from extension received. Updating store!', s)
          this.$store.commit(mutations.SET_SETTINGS, s)
        } else {
          settings.welcomed = new Date().getTime()
          console.log('[web] welcoming: ', settings.welcomed)
          console.log(
            `[web] Extension tried to push settings, but those aren't yet welcomed, so ignoring and sending back our web ones, with updated settings.welcome`
          )
          this.$store.dispatch('updateSettings', settings)
        }
      })

      //Extension detected
      document.addEventListener(events.EXTENSION_PRESENT, (e) => {
        let payload = e.detail
        console.log('extesion detected!! v' + payload.version, e)
        this.$store.commit(mutations.SET_HAS_APP, true)
        this.$store.commit(mutations.SET_EXTENSION_VERSION, payload.version)
      })

      // Chrome?
      let is_chrome = ohana.utils.isGoogleChrome()
      this.$store.commit(mutations.IS_GOOGLE_CHROME, is_chrome)
    },
  },
}
</script>

<style></style>
