<template>
  <div class="subpage">
    <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
      <div class="inner">
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
        <Sensitivity @change="test1 = JSON.stringify($event)" style="margin-bottom: 30px" />

        <router-link class="button" to="/find-movies">{{ $t('discoverContent') }}</router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Sensitivity from '../components/Sensitivity.vue'

//import sharedjs from '@/sharedjs'
export default {
  components: {
    Sensitivity,
  },

  data() {
    return {
      test1: 0,
    }
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings', 'extension_version']),
  },
}
</script>

<style lang="css" scoped>
.sliderticks .v-chip {
  margin: 4px;
}

.skip .v-chip__content:before {
  content: url('https://api.iconify.design/mdi:eye-off.svg?height=12');
  color: white !important;
  opacity: 0.4;
  /*padding-top: 3px;*/
  padding-right: 2px;
}

.skip {
  background-color: #9e9e9e !important;
  border-color: #9e9e9e !important;
  padding: 10px !important;
  /*color: white !important;*/
}
</style>
