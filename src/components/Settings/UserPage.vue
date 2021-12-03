<template>
  <div>
    <h2>Hello {{ settings.username }}!</h2>
    You are level {{ settings.level }}

    <br />
    <span class="modern-link" @click="logout()" style="font-size: 70%">Logout</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings', 'extension_version']),
    loggedIn() {
      if (this.settings) {
        return this.settings.username != '' && this.settings.authToken != ''
      } else {
        return false
      }
    },
  },
  data() {
    return {
      key: '',
    }
  },
  methods: {
    logout() {
      let settings = this.$store.state.settings
      settings.username = ''
      settings.authToken = ''
      //this.$store.commit(mutations.SET_SETTINGS, settings)
      this.$store.dispatch('updateSettings', settings)
    },
  },
}
</script>

<style lang="scss" scoped></style>
