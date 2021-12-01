<template>
  <v-card class="pa-0" max-height="600px" height="600px">
    <v-card-title v-if="false" style="background-color: #141414; color: white">
      Welcome to Ohana TV
    </v-card-title>
    <v-card-text class="pa-0" style="overflow-y: auto">
      <v-tabs-items v-model="slide" style="height: 100%; margin: auto; overflow-y: auto">
        <v-tab-item class="pa-0 ma-0" style="margin: auto" @click="slide = slide + 1">
          <WelcomeSheet />
        </v-tab-item>
        <v-tab-item class="pa-2 ma-2">
          <div style="max-width: 400px; margin: auto">
            <h4>What do you want to skip?</h4>

            <Tags2 />
          </div>
        </v-tab-item>
        <v-tab-item class="pa-2 ma-2">
          <ProvidersSelect />
        </v-tab-item>
        <v-tab-item class="pa-2 ma-2">
          <div style="max-width: 400px; margin: auto">
            <Login />
          </div>
        </v-tab-item>
        <v-tab-item class="pa-2 ma-2">
          <div style="max-width: 400px; margin: auto">
            <CheckExtension />
          </div>
        </v-tab-item>
        <v-tab-item>
          <div style="text-align: center">
            <h2>You are all set!</h2>
            <p>We hope you will love Ohana TV</p>
            <p class="modern-link">Discover Ohana TV</p>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>

    <v-card-actions style="border-top: 1px solid black; color: white" v-if="slide != 0">
      <div v-if="isMobile">slide: {{ slide }}</div>
      <div v-else>
        <v-btn text class="mb-1" @click="slide--" max-width="35%" style="margin-right: 20px"
          >Back</v-btn
        >

        <v-btn text class="mb-1" @click="slide++" max-width="50%">
          {{ nextStepText }}
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
//import Sensitivity from '@/components/Settings/Sensitivity.vue'
import ProvidersSelect from '@/components/Settings/ProvidersSelect.vue'
import CheckExtension from '@/components/Settings/CheckExtension.vue'
import WelcomeSheet from '@/components/Settings/WelcomeSheet.vue'
import Login from '@/components/Settings/Login.vue'
import Tags2 from './Tags2.vue'
import { mapState } from 'vuex'

export default {
  components: { Login, ProvidersSelect, CheckExtension, WelcomeSheet, Tags2 },
  props: {
    page: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings', 'extension_version']),
    nextStepText() {
      let x = [
        'Start',

        'Next',
        'Next',
        this.loggedIn ? 'Continue' : 'Continue as guest',
        'Next',
        'Discover movies and shows',
      ]
      return x[this.slide]
    },
    loggedIn() {
      return this.settings.username && this.settings.authToken
    },
  },
  watch: {
    page(newValue) {
      this.slide = newValue
    },
    slide(newValue) {
      if (newValue == 6) {
        let s = this.settings
        s.web_tour = new Date()
        this.$store.dispatch('updateSettings', s)
        this.$emit('exit')
      }
    },
  },
  data() {
    return {
      slide: 0,
    }
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
.nextSlide {
  background-color: darkgreen;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;

  color: white;

  padding: 10px 0px;

  text-decoration: none;

  position: absolute;
  bottom: 0px;
  width: 100%;
  z-index: 99999;
  cursor: pointer;
}

.row > * {
  padding: 0px;
  margin: 0px;
}
.carrousel {
  max-width: 800px !important;

  margin: auto;
}
.sheet {
  padding: 10px 15px 0px;
  overflow-y: auto;
  margin: auto !important;
  padding-bottom: 20px;
}
.roww {
  text-align: left;
  padding: 20px;
}
</style>
