<template>
  <!-- Sensitivity -->
  <div>
    <div class="filterr">
      <h4 style="padding: 0px; margin: 0px">{{ $t('whatDoYouSkip') }}</h4>
      <p>Mark below the kind of content you want to avoid while watching movies.</p>

      <b>Sex/Nudity:</b>
      <div class="sliderticks">
        <my-tooltip :text="tagsDescription['Very erotic']">
          <v-chip
            dense
            small
            :class="{ skip: sexSlider > 1 }"
            @click="sexSlider = sexSlider > 1 ? 1 : 2"
          >
            {{ $t('severe') }}
          </v-chip>
        </my-tooltip>

        <my-tooltip :text="tagsDescription['Moderately erotic']">
          <v-chip
            dense
            small
            :class="{ skip: sexSlider > 2 }"
            @click="sexSlider = sexSlider > 2 ? 2 : 3"
            >{{ $t('moderate') }}</v-chip
          >
        </my-tooltip>
        <my-tooltip :text="tagsDescription['Mildly erotic']">
          <v-chip
            dense
            small
            :class="{ skip: sexSlider > 3 }"
            @click="sexSlider = sexSlider > 3 ? 3 : 4"
            >{{ $t('mild') }}</v-chip
          >
        </my-tooltip>
        <my-tooltip :text="tagsDescription['Slightly erotic']">
          <v-chip
            dense
            small
            :class="{ skip: sexSlider > 4 }"
            @click="sexSlider = sexSlider > 4 ? 4 : 5"
            >{{ $t('slight') }}</v-chip
          ></my-tooltip
        >
      </div>
      <!--  cols="12" sm="6" md="4" -->
      <b>Violence/Gore: </b>
      <div class="sliderticks">
        <my-tooltip :text="tagsDescription['Very gory']">
          <v-chip
            dense
            small
            :class="{ skip: vioSlider > 1 }"
            @click="vioSlider = vioSlider > 1 ? 1 : 2"
            >{{ $t('severe') }}</v-chip
          >
        </my-tooltip>
        <my-tooltip :text="tagsDescription['Moderately gory']">
          <v-chip
            dense
            small
            :class="{ skip: vioSlider > 2 }"
            @click="vioSlider = vioSlider > 2 ? 2 : 3"
            >{{ $t('moderate') }}</v-chip
          >
        </my-tooltip>
        <my-tooltip :text="tagsDescription['Mildly gory']">
          <v-chip
            dense
            small
            :class="{ skip: vioSlider > 3 }"
            @click="vioSlider = vioSlider > 3 ? 3 : 4"
            >{{ $t('mild') }}</v-chip
          >
        </my-tooltip>
        <my-tooltip :text="tagsDescription['Slightly gory']">
          <v-chip
            dense
            small
            :class="{ skip: vioSlider > 4 }"
            @click="vioSlider = vioSlider > 4 ? 4 : 5"
            >{{ $t('slight') }}</v-chip
          >
        </my-tooltip>
      </div>

      <b>Profanity: </b>
      <div class="sliderticks">
        <my-tooltip :text="tagsDescription['Very profane']">
          <v-chip
            dense
            small
            :class="{ skip: profSlider > 1 }"
            @click="profSlider = profSlider > 1 ? 1 : 2"
            >{{ $t('severe') }}</v-chip
          >
        </my-tooltip>
        <my-tooltip :text="tagsDescription['Moderately profane']">
          <v-chip
            dense
            small
            :class="{ skip: profSlider > 2 }"
            @click="profSlider = profSlider > 2 ? 2 : 3"
            >{{ $t('moderate') }}</v-chip
          >
        </my-tooltip>
        <my-tooltip :text="tagsDescription['Mildly profane']">
          <v-chip
            dense
            small
            :class="{ skip: profSlider > 3 }"
            @click="profSlider = profSlider > 3 ? 3 : 4"
            >{{ $t('mild') }}</v-chip
          >
        </my-tooltip>
        <my-tooltip :text="tagsDescription['Slightly profane']">
          <v-chip
            dense
            small
            :class="{ skip: profSlider > 4 }"
            @click="profSlider = profSlider > 4 ? 4 : 5"
            >{{ $t('slight') }}</v-chip
          >
        </my-tooltip>
      </div>
    </div>
    <span class="modern-link" @click="removeOhanaSettings()" style="margin-bottom: 30px">{{
      $t('restore_deafult_values')
    }}</span>
  </div>
</template>

<script>
const rawTags = require('../assets/raw_tags')
//import sharedjs from '@/sharedjs'
export default {
  props: {
    isMobile: { type: Boolean, default: false },
    isChrome: { type: Boolean, default: false },
    hasApp: { type: Boolean, default: false },
  },
  data() {
    return {
      skipTags: ['Very erotic'],
      sexSlider: 2,
      vioSlider: 1,
      profSlider: 1,
    }
  },
  watch: {
    sexSlider() {
      this.sliders2skipTags()
    },
    vioSlider() {
      this.sliders2skipTags()
    },
    profSlider() {
      this.sliders2skipTags()
    },
    skipTags() {
      this.skipTags2sliders()
      this.saveSkipTags()
      this.$emit('change', this.skipTags)
    },
  },
  computed: {
    tagsDescription() {
      let x = {} //tag:desc
      rawTags.content.forEach((cat) => {
        cat.severity.forEach((sev) => {
          x[sev.value] = sev.description
        })
      })
      return x
    },
  },
  methods: {
    sliders2skipTags() {
      var sex = rawTags.severities[0].slice(5 - this.sexSlider, 4)
      var vio = rawTags.severities[1].slice(5 - this.vioSlider, 4)
      var prof = rawTags.severities[2].slice(5 - this.profSlider, 4)
      var tags = [...sex, ...vio, ...prof]
      this.skipTags = tags
    },
    skipTags2sliders() {
      //Convert the array of skipTags into sliders' values

      for (let i = 0; i < rawTags.severities.length; i++) {
        //Reversed, so we go from very to slight:
        for (let j = rawTags.severities[i].length - 1; j >= 0; j--) {
          const tag = rawTags.severities[i][j]

          if (this.skipTags.includes(tag)) {
            if (i == 0) this.sexSlider = 5 - j
            if (i == 1) this.vioSlider = 5 - j
            if (i == 2) this.profSlider = 5 - j
          }
        }
      }
    },
    sendEvent(name, detail) {
      console.log('would send event ' + name + ', but not yet', detail)
      //let event = new CustomEvent(name, { detail: detail })
      //document.dispatchEvent(event)
    },
    listenEvent(name, callback) {
      document.addEventListener(name, function (e) {
        console.log('[web] raw listen', name, e.detail)
        callback(e.detail)
      })
    },
    saveSkipTags() {
      //Save on localStorage (just in caes)
      localStorage.skipTags = JSON.stringify(this.skipTags)

      //Send event for hooks in extension (so it can save on chrome.storage)
      this.sendEvent('ohana-skipTags-change', this.skipTags)
    },

    loadSkipTags() {
      //We load from localStorage. If settings in extension, these will be overriden.

      if (!this.hasApp) {
        if (localStorage.skipTags) {
          this.skipTags = JSON.parse(localStorage.skipTags)
        } else {
          this.skipTags = ['Very erotic']
        }
      } else {
        //subscribe to changes from the extension, and override when they arrive
        //TODO: Confirm this subscriction to listener isn't too late...
        console.log('[web] listening to skiptags change')
        this.listenEvent('ohana-skipTags-change', (skipTags) => {
          console.log('[web] skipTags changed listened ', skipTags)
          this.skipTags = skipTags
        })
      }
    },
    removeOhanaSettings() {
      localStorage.removeItem('ohanaSettings')
      localStorage.removeItem('skipTags')
      location.reload() //ugly, but was fast to do.
    },
  },
  mounted() {
    this.loadSkipTags()

    this.listenEvent('ohana-skipTags-change', (skipTags) => {
      console.log('[web] skipTags changed listened ', skipTags)
      this.skipTags = skipTags
    })
  },
}
</script>

<style lang="css" scoped>
.sliderticks .v-chip {
  margin: 4px;
}

.skip .v-chip__content:before {
  content: url('https://api.iconify.design/mdi:eye-off.svg?height=12');
  color: white !important;
  opacity: 0.4;
  /*padding-top: 3px;*/
  padding-right: 2px;
}

.skip {
  background-color: #9e9e9e !important;
  border-color: #9e9e9e !important;
  padding: 10px !important;
  /*color: white !important;*/
}
</style>
