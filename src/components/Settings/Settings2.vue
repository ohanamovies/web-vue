<template>
  <div>
    <div style="position: relative">
      <v-tabs
        v-model="tab"
        style="margin-top: 0px; position: sticky; top: 0px"
        :fixed-tabs="isMobile"
        center-active
      >
        <v-tab><v-icon class="mr-2" small>mdi-cog</v-icon>Settings</v-tab>
        <v-tab><v-icon class="mr-2" small>mdi-television</v-icon>Platforms</v-tab>
        <v-tab><v-icon class="mr-2" small>mdi-account</v-icon>Account</v-tab>
        <v-tab><v-icon class="mr-2" small>mdi-download</v-icon>Install</v-tab>
        <v-tab v-if="false"><v-icon class="mr-2" small>mdi-cog</v-icon>Settings old</v-tab>
      </v-tabs>

      <div
        :style="{
          maxHeight: isMobile ? '' : '550px',
          height: isMobile ? '' : '550px',
          overflowY: 'auto',
          padding: '10px 20px',
        }"
      >
        <div style="min-height: 400px">
          <!--sensitivity-->
          <div v-if="tab == 0">
            <Tags2 />
          </div>

          <!-- Extension check-->
          <div v-if="tab == 1">
            <providers-select></providers-select>
          </div>

          <!-- Log-in / out -->
          <div v-if="tab == 2">
            <!-- <h2>3. Login</h2>-->
            <!-- Already signed in -->
            <div v-if="loggedIn">
              <UserPage />
            </div>
            <div v-else>
              <Login />
            </div>
          </div>

          <!-- Extension check-->
          <div v-if="tab == 3">
            <check-extension></check-extension>
          </div>

          <div v-if="tab == 4">
            <sensitivity short_version />
          </div>
        </div>
      </div>
    </div>
    <!-- <div style="margin-top: 40px; font-size: 80%">-->
  </div>
</template>

<script>
import Sensitivity from '@/components/Settings/Sensitivity.vue'
import ProvidersSelect from '@/components/Settings/ProvidersSelect.vue'
import CheckExtension from '@/components/Settings/CheckExtension.vue'
import Tags2 from '@/components/Settings/Tags2.vue'
import Login from '@/components/Settings/Login.vue'
import UserPage from '@/components/Settings/UserPage.vue'
import { mapState } from 'vuex'

export default {
  components: { Sensitivity, Login, ProvidersSelect, CheckExtension, Tags2, UserPage },

  data() {
    return {
      key: 'value',
      tab: 0,
    }
  },

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
  methods: {},
}
</script>

<style scoped>
h2 {
  font-size: 18pt;
  padding-top: 10px;
}
</style>
