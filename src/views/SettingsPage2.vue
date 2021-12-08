<template>
  <div class="subpage">
    <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
      <div class="inner">
        <!-- IF USER JUST INSTALLED OHANA -->
        <div v-if="welcoming" style="padding: 10px; margin-bottom: 50px">
          <h1 style="font-size: 18pt; font-weigth: 700">Thanks for installing Ohana!</h1>
          <p>Here some next steps you may find useful:</p>
          <ul>
            <li>Review your settings below</li>
            <li>
              Check the <router-link to="/get-started">get started guide</router-link> to learn how
              to use Ohana to both watch and edit movies.
            </li>
            <li>
              Learn how you can help: <router-link to="/community">support ohana</router-link>
            </li>
          </ul>
          <hr />
        </div>

        <!-- user info -->
        <h1 v-if="hasApp && settings.username">
          <b>Hello {{ settings.username }} (level {{ settings.level }})</b>
        </h1>

        <div v-if="hasApp">
          <p>You have our extension installed (v {{ extension_version }})</p>

          <p>
            <b>Note:</b>
            These settings apply only to this browser. If you sign in in a separated browser (e.g.:
            Firefox, or other device like a phone), you will have to set your preferences again.
          </p>
        </div>

        <div v-else style="margin-bottom: 20px">
          <p>
            <b>Warning:</b>
            <span v-if="isChrome">
              You don't have our extension installed (or are using an old version). You will need it
              if you want to watch edited content.
            </span>
            <span v-else>
              To watch edited content, you need to switch to a compatible browser, and install our
              Chrome Extension.
            </span>

            <a
              v-if="isChrome && !hasApp"
              href="https://chrome.google.com/webstore/detail/family-cinema/nfkbclgkdifmoidnkapblfipbdkcppcf"
              target="_blank"
              style="margin: 5px"
              >{{ $t('install') }}</a
            >

            <router-link v-else-if="!isChrome" to="get-started">{{ $t('learnMore') }}</router-link>
          </p>
        </div>

        <!-- Sensitivity -->
        <div>
          <Settings2 style="margin-bottom: 30px" />
        </div>

        <router-link class="button" to="/find-movies">{{ $t('discoverContent') }}</router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Settings2 from '../components/Settings/Settings2.vue'

//import sharedjs from '@/sharedjs'
export default {
  components: {
    Settings2,
  },

  data() {
    return {
      test1: 0,
    }
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings', 'extension_version']),
    welcoming() {
      var urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('source') == 'install') {
        return true
      } else {
        return false
      }
    },
  },
}
</script>

<style lang="css" scoped>
.sliderticks .v-chip {
  margin: 4px;
}

.skip_old {
  background-color: #9e9e9e !important;
  border-color: #9e9e9e !important;
  padding: 10px !important;
  /*color: white !important;*/
}
</style>
