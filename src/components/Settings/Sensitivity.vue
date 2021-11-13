<template>
  <!-- Sensitivity -->
  <div>
    <div class="filterr" style="width: 100%">
      <div v-if="!short_version">
        <h4 style="padding: 0px; margin: 0px">{{ $t('whatDoYouSkip') }}</h4>
        <p>{{ $t('whatDoYouSkip_tip') }}</p>
      </div>

      <div v-for="(cat, i) in categories" :key="i">
        <b>{{ cat == 'Profanity' ? 'Language' : cat }}</b>
        <div class="sliderticks">
          <my-tooltip
            :text="tagsDescription[tag]"
            v-for="(tag, j) in raw_tags.severitiesR[i]"
            :key="j"
          >
            <v-chip
              dense
              small
              :class="{ skip: skip_tags ? skip_tags.includes(tag) : false }"
              @click="toggleTag(i, j)"
            >
              {{ $t(severities[j]) }}
            </v-chip>
          </my-tooltip>
        </div>
      </div>
    </div>
    <div style="text-align: right">
      <span class="modern-link" @click="reset2default()" style="margin-bottom: 30px">{{
        $t('restore_deafult_values')
      }}</span>
    </div>
  </div>
</template>

<script>
const rawTags = require('../../assets/raw_tags')

//import ohana from '@/assets/ohana'
import { mapState } from 'vuex'
//import sharedjs from '@/sharedjs'

export default {
  data() {
    return {}
  },
  props: {
    short_version: {
      type: Boolean,
      default: false,
    },
  },
  watch: {},
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings']),
    skip_tags() {
      return this.$store.state.settings.skip_tags
    },
    categories() {
      return this.raw_tags.categories.slice(0, 3) //remove "others"
    },
    severities() {
      return ['severe', 'moderate', 'mild', 'slight']
    },
    raw_tags() {
      return rawTags
    },
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
    toggleTag(cat_index, sev_index) {
      let skip_tags = [...this.skip_tags]

      let tag = this.raw_tags.severitiesR[cat_index][sev_index]

      let n = skip_tags.indexOf(tag) == -1 ? sev_index + 1 : sev_index //n will tell us how many tags of this sev we need to add (adding/removing the clicked one)

      //remove all tags in this category (will re-add soon)
      for (let j = 0; j < this.raw_tags.severitiesR[cat_index].length; j++) {
        const tag = this.raw_tags.severitiesR[cat_index][j]
        let i = skip_tags.indexOf(tag)
        if (i != -1) skip_tags.splice(i, 1)
      }

      //add the ones that make sense based on the one clicked
      for (let j = 0; j < n; j++) {
        const tag = this.raw_tags.severitiesR[cat_index][j]
        skip_tags.push(tag)
      }

      let settings = this.$store.state.settings
      settings.skip_tags = skip_tags

      this.$store.dispatch('updateSettings', settings)
    },

    reset2default() {
      let settings = this.$store.state.settings
      settings.skip_tags = ['Very erotic', 'Moderately erotic'] //[...this.$store.state.default_settings.skip_tags]

      this.$store.dispatch('updateSettings', settings)
    },
  },
}
</script>

<style lang="css">
.sliderticks .v-chip {
  margin: 4px;
}

.skip .v-chip__content::before {
  content: url('https://api.iconify.design/mdi:eye-off.svg?height=12&color=white');
  color: white !important;
  opacity: 0.9;
  /*padding-top: 3px;*/
  padding-top: 2px;
  padding-right: 3px;
}

.skip {
  background-color: #6cc091 !important; /* #9e9e9e !important;*/
  border-color: #9e9e9e !important;
  color: white !important;
  padding: 10px !important;
  /*color: white !important;*/
}
</style>
