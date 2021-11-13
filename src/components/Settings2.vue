<template>
  <div style="padding: 10px">
    <p v-if="!settings.username">Hey! It seems you are new around here. Let's get you all set!</p>
    <p v-else-if="settings.username != 'guest'">
      Hello {{ settings.username }} <span class="modern-link" @click="logout()">logout</span>
    </p>

    <!-- Sensitivity -->
    <v-tabs v-model="tab" style="margin-bottom: 20px" :fixed-tabs="isMobile" center-active>
      <v-tab><v-icon class="mr-2" small>mdi-cog</v-icon>Settings</v-tab>
      <v-tab><v-icon class="mr-2" small>mdi-account</v-icon>Account</v-tab>
      <v-tab><v-icon class="mr-2" small>mdi-download</v-icon>Install</v-tab>
    </v-tabs>

    <div style="min-height: 400px">
      <div v-if="tab == 0">
        <!-- <h2>1. Define unhealthy</h2> -->

        <p>{{ $t('whatDoYouSkip_tip') }}</p>
        <sensitivity short_version />

        <providers-select></providers-select>
      </div>

      <!-- Log-in / out -->

      <div v-if="tab == 1">
        <!-- <h2>3. Login</h2>-->
        <!-- Already signed in -->
        <div v-if="settings.username && settings.username != 'guest'">
          <p>Well done! You are logged in as {{ settings.username }}.</p>
        </div>
        <div v-else>
          <login />
        </div>
      </div>

      <!-- Extension check-->
      <div v-if="tab == 2">
        <check-extension></check-extension>
      </div>
    </div>

    <div style="margin-top: 40px; font-size: 80%">
      You can open this section anytime by clicking "Settings" or the
      <v-icon>mdi-cog</v-icon> button.
    </div>
  </div>
</template>

<script>
import Sensitivity from '@/components/Settings/Sensitivity.vue'
import ProvidersSelect from '@/components/Settings/ProvidersSelect.vue'
import CheckExtension from '@/components/Settings/CheckExtension.vue'
import Login from '@/components/Settings/Login.vue'
import { mapState } from 'vuex'

export default {
  components: { Sensitivity, Login, ProvidersSelect, CheckExtension },

  data() {
    return {
      key: 'value',
      tab: 0,
    }
  },

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

<style scoped>
h2 {
  font-size: 18pt;
  padding-top: 10px;
}
</style>
