<template>
  <div>
    <div style="position: relative">
      <v-carousel
        :continuous="false"
        v-model="slide"
        hide-delimiters
        :show-arrows="false"
        class="carrousel"
        hide-delimiter-background
      >
        <v-carousel-item style="width: 100%; cursor: pointer" @click="slide = 1">
          <v-sheet
            color="white"
            height="100%"
            tile
            class="sheet"
            style="padding: 0px; overflow: hidden"
          >
            <v-row class="fill-height" align="center">
              <WelcomeSheet />
            </v-row>
          </v-sheet>
        </v-carousel-item>
        <v-carousel-item>
          <v-sheet color="white" height="100%" tile class="sheet" style="max-width: 500px">
            <v-row class="fill-height roww" align="center">
              <Login />
            </v-row>
          </v-sheet>
        </v-carousel-item>
        <v-carousel-item>
          <v-sheet color="white" height="100%" tile class="sheet" style="max-width: 500px">
            <v-row class="fill-height roww" align="center">
              <ProvidersSelect />
            </v-row>
          </v-sheet>
        </v-carousel-item>

        <v-carousel-item>
          <v-sheet color="white" height="100%" tile class="sheet" style="max-width: 500px">
            <v-row class="fill-height roww" align="center">
              <div>
                <b style="padding: 0px; margin: 0px">{{ $t('whatDoYouSkip') }}</b>
                <p>{{ $t('whatDoYouSkip_tip') }}</p>
                <Sensitivity :short_version="true" />
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
        <v-carousel-item>
          <v-sheet color="white" height="100%" tile class="sheet" style="max-width: 500px">
            <v-row class="fill-height roww" align="center">
              <CheckExtension />
            </v-row>
          </v-sheet>
        </v-carousel-item>

        <!-- Exit page -->
        <v-carousel-item>
          <v-sheet color="white" height="100%" tile class="sheet" style="max-width: 500px">
            <v-row class="fill-height roww" align="center" style="padding: 50px">
              <p>That's it. Let's go find some great content!</p>
              <div style="margin-top: 50px; font-size: 80%">
                <b>Note:</b> You can do this tour again anytime, by clicking "Settings" or the
                <v-icon class="mb-1">mdi-account-cog</v-icon> button.
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <div v-if="slide != 0">
        <div class="nextSlide" @click="slide++">{{ nextStepText }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Sensitivity from '@/components/Settings/Sensitivity.vue'
import ProvidersSelect from '@/components/Settings/ProvidersSelect.vue'
import CheckExtension from '@/components/Settings/CheckExtension.vue'
import WelcomeSheet from '@/components/Settings/WelcomeSheet.vue'
import Login from '@/components/Settings/Login.vue'
import { mapState } from 'vuex'

export default {
  components: { Sensitivity, Login, ProvidersSelect, CheckExtension, WelcomeSheet },
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
        this.loggedIn ? 'Continue' : 'Continue as guest',
        'Next',
        'Next',
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
