<template>
  <div style="padding: 10px">
    <p v-if="!settings.username">Hey! It seems you are new around here. Let's get you all set!</p>
    <p v-else-if="settings.username != 'guest'">Hello {{ settings.username }}</p>

    <!-- Sensitivity -->

    <div>
      <h2>1. Define unhealthy</h2>

      <p>{{ $t('whatDoYouSkip_tip') }}</p>
      <sensitivity short_version />
    </div>

    <!-- Extension check-->
    <div>
      <h2>2. Install Ohana TV</h2>
      <p>
        Our
        <a
          href="https://chrome.google.com/webstore/detail/ohana/nfkbclgkdifmoidnkapblfipbdkcppcf"
          class="modern-link"
          target="_blank"
          style="font-size: 100%"
        >
          Ohana Chrome Extension</a
        >
        works as a TV remote: it automagically skips the unhealthy content, based on your above
        preferences.
      </p>
      <v-alert v-if="hasApp" type="success" outlined
        >Well done! You have our
        <a
          href="https://chrome.google.com/webstore/detail/ohana/nfkbclgkdifmoidnkapblfipbdkcppcf"
          target="_blank"
          class="modern-link"
          style="font-size: 100%"
          >Chrome Extension</a
        >
        installed in this browser (version {{ extension_version }}).
      </v-alert>

      <div v-else-if="isChrome">
        <v-alert type="warning" outlined
          >Ohana extension is not installed in this browser.
        </v-alert>
        To install Ohana TV, go to
        <a
          href="https://chrome.google.com/webstore/detail/ohana/nfkbclgkdifmoidnkapblfipbdkcppcf"
          class="modern-link"
          target="_blank"
          style="font-size: 13pt"
        >
          our Chrome Store page</a
        >
        and click on "Add to Chrome".
      </div>

      <div v-else>
        <v-alert type="error" outlined
          >It seems this browser is not compatible with our Chrome Extension. Please make sure you
          are using
          <a
            href="https://www.google.com/chrome/"
            target="_blank"
            class="modern-link"
            style="font-size: 100%"
            >Google Chrome</a
          >
          on a desktop computer (Windows, Mac, or Linux...)</v-alert
        >

        <p>
          Without the Chrome Extension, you can't watch edited content. You can still check this
          website for information about movies.
        </p>
      </div>
    </div>

    <!-- Log-in / out -->
    <div>
      <div v-if="settings"></div>
    </div>

    <div>
      <h2>3. Login</h2>
      <login />
    </div>

    <div style="margin-top: 40px; font-size: 80%">
      You can open this section anytime by clicking "Settings" or the
      <v-icon>mdi-cog</v-icon> button.
    </div>
  </div>
</template>

<script>
import Sensitivity from '@/components/Sensitivity.vue'
import { mapState } from 'vuex'
import Login from './Login.vue'

export default {
  components: { Sensitivity, Login },

  data() {
    return {
      key: 'value',
    }
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings', 'extension_version']),
  },
}
</script>

<style scoped>
h2 {
  font-size: 18pt;
  padding-top: 10px;
}
</style>
