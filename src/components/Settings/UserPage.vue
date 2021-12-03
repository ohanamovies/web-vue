<template>
  <div>
    <h2>hello</h2>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings', 'extension_version']),
  loggedIn() {
    if (this.settings) {
      return this.settings.username != '' && this.settings.authToken != ''
    } else {
      return false
    }
  },
}
</script>

<style lang="scss" scoped></style>
