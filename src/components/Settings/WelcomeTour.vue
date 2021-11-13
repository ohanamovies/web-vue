<template>
  <div>
    <div style="height: 60px"></div>

    <v-carousel v-model="carrousel" show-arrows-on-hover class="carrousel">
      <v-carousel-item>
        <v-sheet color="white" height="100%" tile class="sheet" style="max-width: 700px">
          <v-row class="fill-height" align="center" justify="center">
            <div>
              <WelcomeSheet />
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet color="white" height="100%" tile class="sheet" style="max-width: 500px">
          <v-row class="fill-height" align="center" justify="center">
            <div>
              <Login />
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet color="white" height="100%" tile class="sheet" style="max-width: 500px">
          <v-row class="fill-height" align="center" justify="center">
            <div>
              <ProvidersSelect />
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>

      <v-carousel-item>
        <v-sheet color="white" height="100%" tile class="sheet" style="max-width: 500px">
          <v-row class="fill-height" align="center" justify="center">
            <div>
              <Sensitivity />
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
      <v-carousel-item>
        <v-sheet color="white" height="100%" tile class="sheet" style="max-width: 500px">
          <v-row class="fill-height" align="center" justify="center">
            <div>
              <CheckExtension />
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
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
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings', 'extension_version']),
  },
  data() {
    return {
      carrousel: 0,
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
.carrousel {
  max-width: 800px;
  margin: auto;
}
.sheet {
  margin: auto !important;
}
</style>
