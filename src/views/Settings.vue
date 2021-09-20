<template>
  <div class="subpage">
    <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
      <div class="inner">
        <p style="color: red"><b>Warning:</b> This page is now work in progress</p>
        <p>
          Right now, these settings apply only to this website. Make sure you manage your settings
          on the extension too!
        </p>

        <p>We are working to make it possible that:</p>

        <ul>
          <li>
            This settings would apply to this browser everywhere: both in the extension and while
            searching for movies
          </li>
          <li>
            If you sign in, your preferences follow you everywhere, even to your mobile - to be
            confirmed
          </li>
        </ul>

        <!-- Sensitivity -->
        <Sensitivity @change="test1 = JSON.stringify($event)" style="margin-bottom: 30px" />

        <router-link class="button" to="/find-movies">{{ $t('discoverContent') }}</router-link>
      </div>
    </section>
  </div>
</template>

<script>
import Sensitivity from '../components/Sensitivity.vue'
//import sharedjs from '@/sharedjs'
export default {
  components: {
    Sensitivity,
  },
  props: {
    isMobile: { type: Boolean, default: false },
    isChrome: { type: Boolean, default: false },
    hasApp: { type: Boolean, default: false },
  },
  data() {
    return {
      test1: 0,
    }
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
