<!-- Open by extension when user uninstalls it -->
<template>
  <div class="subpage">
    <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
      <div class="inner">
        <h4>See you soon! 👋</h4>
        <p>
          We are sad to see you removed our extension. If you had trouble using it, please notice
          that our volunteers are doing their best to fix bugs and improve everything.
        </p>

        <p>If you want us improving faster, consider giving a hand. There's work for everyone!</p>
        <router-link to="/community" class="button special">Learn how you can help</router-link>

        <p>Feel free to share your experience in the contact form at the end of this page.</p>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

//import sharedjs from '@/sharedjs'
export default {
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

<style></style>
