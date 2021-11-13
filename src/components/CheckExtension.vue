<template>
  <div>
    <!-- <h2>2. Install Ohana TV</h2> -->
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
      automagically skips the unhealthy content, based on your preferences. It only works while
      watching from a Chrome Browser.
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
      <v-alert type="warning" outlined>Ohana extension is not installed in this browser. </v-alert>
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
        >It seems this browser is not compatible with our Chrome Extension. Please make sure you are
        using
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
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings', 'extension_version']),
  },
}
</script>

<style lang="scss" scoped></style>
