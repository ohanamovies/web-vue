<template>
  <div></div>
</template>

<script>
import Sensitivity from '@/components/Settings/Sensitivity.vue'
import ProvidersSelect from '@/components/Settings/ProvidersSelect.vue'
import CheckExtension from '@/components/Settings/CheckExtension.vue'
import WelcomeSheet from '@/components/Settings/WelcomeSheet.vue'
import Login from '../Login.vue'
import { mapState } from 'vuex'

export default {
  components: { Sensitivity, Login, ProvidersSelect, CheckExtension, WelcomeSheet },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings', 'extension_version']),
  },
  methods: {
    logout() {
      let settings = this.$store.state.settings
      settings.username = ''
      settings.authToken = ''
      //this.$store.commit(mutations.SET_SETTINGS, settings)
      this.$store.dispatch('updateSettings', settings)
      this.tab = 1
    },
  },
}
</script>

<style lang="scss" scoped></style>
