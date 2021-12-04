<template>
  <div>
    <div style="position: relative">
      <v-tabs
        v-model="tab"
        style="margin-top: 0px; position: sticky; top: 0px; z-index: 99999"
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
        <v-tabs-items v-model="tab" style="min-height: 400px" id="tabsElement">
          <!--sensitivity-->
          <v-tab-item>
            <Tags2 />
          </v-tab-item>

          <!-- Extension check-->
          <v-tab-item>
            <providers-select></providers-select>
          </v-tab-item>

          <!-- Log-in / out -->
          <v-tab-item>
            <!-- <h2>3. Login</h2>-->
            <!-- Already signed in -->
            <div v-if="loggedIn">
              <UserPage />
            </div>
            <div v-else>
              <Login />
            </div>
          </v-tab-item>

          <!-- Extension check-->
          <v-tab-item>
            <check-extension></check-extension>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </div>
    <!-- <div style="margin-top: 40px; font-size: 80%">-->
  </div>
</template>

<script>
//import Sensitivity from '@/components/Settings/Sensitivity.vue'
import ProvidersSelect from '@/components/Settings/ProvidersSelect.vue'
import CheckExtension from '@/components/Settings/CheckExtension.vue'
import Tags2 from '@/components/Settings/Tags2.vue'
import Login from '@/components/Settings/Login.vue'
import UserPage from '@/components/Settings/UserPage.vue'
import { mapState } from 'vuex'

export default {
  components: { Login, ProvidersSelect, CheckExtension, Tags2, UserPage },

  props: {
    page: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    tab() {
      document.getElementById('tabsElement').scrollIntoView(true)
    },
    page(newValue) {
      this.tab = newValue
    },
  },
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
