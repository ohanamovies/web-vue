<template>
  <v-card class="pa-0" max-height="600px" height="600px">
    <v-card-title v-if="false" style="background-color: #141414; color: white">
      {{ $t('welcome_to_ohana_tv') }}
    </v-card-title>
    <v-card-text class="pa-0" style="overflow-y: auto">
      <v-tabs-items
        v-model="slide"
        style="height: 100%; margin: auto; overflow-y: auto"
        id="tour_tabsElement"
      >
        <v-tab-item
          class="pa-0 ma-0 outerr"
          style="margin: auto; cursor: pointer; position: relative"
        >
          <div @click="slide = slide + 1">
            <WelcomeSheet />
          </div>
          <div
            style="
              width: 200px;
              position: absolute;
              bottom: 40px;
              left: calc(50% - 100px);
              z-index: 9999999;
            "
          >
            <LanguageSelect dark />
          </div>
        </v-tab-item>

        <v-tab-item
          class="outerr"
          style="text-align: center; cursor: pointer"
          @click="slide = slide + 1"
        >
          <div class="middlee">
            <div class="innerr" v-html="$t('welcome_tour')"></div>
          </div>
        </v-tab-item>

        <v-tab-item class="outerr">
          <div style="max-width: 500px; margin: auto">
            <h4>{{ $t('what_do_you_want') }}</h4>
            <Tags2 />
          </div>
        </v-tab-item>
        <!--<v-tab-item class="outerr">
          <ProvidersSelect />
        </v-tab-item>-->
        <!-- <v-tab-item class="outerr"> <OtherSettings /> </v-tab-item> -->
        <!--<v-tab-item class="outerr">
          <div style="max-width: 500px; margin: auto">
            <Login />
          </div>
        </v-tab-item>-->
        <v-tab-item class="outerr">
          <div style="max-width: 500px; margin: auto">
            <CheckExtension />
          </div>
        </v-tab-item>
        <!--<v-tab-item class="outerr">
          <div class="middlee">
            <div class="innerr" style="text-align: center">
              <h2>{{ $t('you_are_all_set') }}</h2>
              <p>{{ $t('we_think_you_are') }}</p>
              <!- - <p class="modern-link" @click="slide++">{{ $t('lets_go') }}</p> - ->
            </div>
          </div>
        </v-tab-item>-->
      </v-tabs-items>
    </v-card-text>

    <v-card-actions style="display: flex; justify-content: space-between">
      <div>
        <v-btn v-if="slide > 0" text style="box-shadow: none" @click="slide--">{{
          $t('back')
        }}</v-btn>
        <v-btn
          v-else
          text
          style="box-shadow: none; visibility: hidden"
          @click="slide = nSlides + 1"
          >{{ $t('skip') }}</v-btn
        >
      </div>
      <div style="display: flex">
        <span
          v-for="i in nSlides"
          :key="i"
          :class="{ 'slide-delimiter': true, 'slide-delimiter-selected': slide == i - 1 }"
          @click="slide = i - 1"
        ></span>
      </div>
      <div>
        <v-btn text style="box-shadow: none" @click="slide++">
          {{ $t(nextStepText) }}
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
//import Sensitivity from '@/components/Settings/Sensitivity.vue'
//import ProvidersSelect from '@/components/Settings/ProvidersSelect.vue'
import CheckExtension from '@/components/Settings/CheckExtension.vue'
import WelcomeSheet from '@/components/Settings/WelcomeSheet.vue'
//import OtherSettings from '@/components/Settings/OtherSettings.vue'
import LanguageSelect from '@/components/Settings/LanguageSelect.vue'
//import Login from '@/components/Settings/Login.vue'
import Tags2 from './Tags2.vue'
import { mapState } from 'vuex'

export default {
  components: {
    //Login,
    //ProvidersSelect,
    CheckExtension,
    WelcomeSheet,
    Tags2,
    //OtherSettings,
    LanguageSelect,
  },
  props: {
    page: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings', 'extension_version']),

    nextSteps() {
      return ['start', 'next', 'next', this.hasApp ? 'go_to_movies' : 'skip_to_movies']
    },
    nextStepText() {
      return this.nextSteps[this.slide]
    },
    nSlides() {
      return this.nextSteps.length
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
      document.getElementById('tour_tabsElement').scrollIntoView(true)

      if (newValue >= this.nSlides) {
        this.slide = 0 //reset (in case reopened!)

        //let's save the date user did the tour in its own settings.
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
.slide-delimiter {
  border: 1px solid black;
  border-radius: 50%;
  margin: 5px;
  background-color: white;
  height: 10px;
  width: 10px;
  cursor: pointer;
}

.slide-delimiter-selected {
  background-color: green;
}

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

/****** */
.outerr {
  display: table;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.middlee {
  display: table-cell;
  vertical-align: middle;
}

.innerr {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  /* Whatever width you want */
}
</style>
