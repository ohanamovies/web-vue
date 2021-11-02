<template>
  <div>
    <!-- A: if we have valid data  -->
    <v-card v-if="item.title" @keydown.esc="closeMe()">
      <!-- TITLE -->

      <v-card-title
        primary-title
        style="white-space: pre-wrap; word-break: keep-all; line-height: normal; margin-bottom: 5px"
      >
        <span style="max-width: calc(100% - 30px)">{{ title }}</span>
        <!-- {{ selection }} -->
        <span style="margin: 0 5px auto auto">
          <v-icon @click="closeMe">mdi-close</v-icon>
        </span>
      </v-card-title>

      <!-- SUBTITLE -->
      <v-card-subtitle>
        {{ item.imdbRating }}
        <v-icon class="star">mdi-star</v-icon>
        - {{ item.runtime + ' mins' }} - {{ item.released }} -

        <span>
          <fc-tooltip
            v-for="(g, index) in item.brief_status"
            :key="index"
            :text="getText(g, index)"
          >
            <v-chip :color="getColor(index, g)" x-small class="mr-1">{{ index }}</v-chip>
          </fc-tooltip>
        </span>

        <span>
          <fc-tooltip v-for="(g, index) in item.movieValues" :key="index" :text="getText(index, g)">
            <v-chip :color="g.status > 0 ? 'green' : 'red'" x-small class="mr-1">{{
              index
            }}</v-chip>
          </fc-tooltip>
        </span>
      </v-card-subtitle>

      <!-- CONTENT -->
      <v-card-text>
        <v-row>
          <!-- Image only if not isMobile -->
          <v-col cols="4" v-if="!isMobile && selection.join_status.status != 'missing'">
            <img
              :src="poster"
              :alt="item.title"
              style="object-fit: contain; width: 100%"
              :class="[selection.join_status.status == 'missing' ? 'blur_image' : '']"
            />
          </v-col>

          <!-- Rest of info (in tabs for now) -->
          <v-col>
            <div style="height: 350px; overflow-y: auto">
              <div>
                <!-- Genres -->
                <div style="display: flex; justify-content: space-between">
                  <b>Overview: </b>
                  <i style="font-size: 85%">{{ item.genres.join(' - ') }}</i>
                </div>

                <!-- Overview -->
                <div class="overview" v-if="plot.length < 400 || viewMore">
                  {{ plot }}
                  <a v-if="plot.length >= 400" @click="viewMore = false">view less</a>
                </div>
                <div v-else>
                  {{ plot.slice(0, 300) }}...
                  <a @click="viewMore = true">view more</a>
                </div>

                <!-- Link to IMDb -->
                <div style="margin: 10px 0 -10px 0">
                  <b>More on: </b>
                  <div>
                    <a
                      class="provider-link"
                      target="_blank"
                      :href="'https://www.imdb.com/title/' + item.imdb"
                    >
                      <img src="images/imdb.png" />
                    </a>

                    <a
                      class="provider-link"
                      target="_blank"
                      :href="'https://www.themoviedb.org/' + item.tmdb"
                    >
                      <img src="images/tmdb.png" />
                    </a>
                  </div>
                </div>
              </div>

              <!-- Watch on -->
              <div>
                <movie-watch-options
                  style="margin-top: 20px"
                  :selection="selection"
                  :title="item ? item.title : ''"
                ></movie-watch-options>
              </div>

              <!-- Ohana Summary HIDING WHILE BROKEN -->
              <div v-if="false" class="ohana-summary">
                <v-icon :color="selection.color" style="margin-right: 5px">
                  {{ selection.icon == 'none' ? 'mdi-alert' : selection.icon }}
                </v-icon>
                <div style="margin: auto; margin-left: 0px">
                  <span v-html="ohanaSummaryHtml"></span>
                </div>
              </div>

              <!-- Feedbak button -->
              <div style="text-align: right; padding-right: 10px">
                <a
                  v-if="is_unknown || is_missing"
                  class="modern-link"
                  :href="feedback_link"
                  target="_blank"
                  >Request review
                </a>
                <a v-else class="modern-link" :href="feedback_link" target="_blank">{{
                  $t('feedbackPopUp')
                }}</a>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- B: if no data, show "loading" or "error" -->
    <v-card v-else>
      <v-card-text style="height: 350px">
        <div v-if="loading">Loading...</div>
        <div v-else>
          <span> Error!</span>
          <br />
          <span v-if="false">{{ selection }}</span>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
const provider = require('@/assets/provider')
const rawTags = require('@/assets/raw_tags')
import ohana from '@/assets/ohana'

import MovieWatchOptions from './MovieWatchOptions2.vue'
import { mapState } from 'vuex'

export default {
  components: {
    MovieWatchOptions,
  },
  props: {
    selection: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  data() {
    return {
      showOhanaDetails: true,
      showMyPreferences: true,

      tab: 1, //0: overview, 1: Ohana -> shall we start with Ohana?
      item: {},

      categories: [],
      severities: [],
      loading: false,
      viewMore: false,
    }
  },

  watch: {
    selection() {
      this.item = {} //reset
      this.getData()
      this.resetView()
    },
  },

  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile']),
    skipTags() {
      return this.$store.state.settings.skip_tags || []
    },

    feedback_link() {
      return (
        'https://docs.google.com/forms/d/e/1FAIpQLScnTNbXu79Sbinmlw6QhBIa5T76T0QCEMFLt4OIiSN08aHQKw/viewform?usp=pp_url&entry.2077317668=' +
        '[request]: ' +
        this.item.title.primary +
        ' - imdb:' +
        this.item.imdb
      )
    },
    is_unknown() {
      return (
        this.selection.join_status.status == 'unknown' ||
        this.selection.join_status.status == 'unkown'
      )
    },
    is_missing() {
      return this.selection.join_status.status == 'missing'
    },

    language() {
      //TODO: use vuex?
      return this.$i18n.locale.toLowerCase().split('-')[0]
      //return ohana.user.language
    },

    poster() {
      let path = this.item.poster[this.language] || this.item.poster['en']
      return 'https://image.tmdb.org/t/p/w200' + path
    },

    title() {
      return this.item.title[this.language] || this.item.title['primary']
    },

    plot() {
      return this.item.plot[this.language] || this.item.plot['en']
    },

    parsedURL() {
      return provider.parseURL(this.selection.watch_url) //TODO: taking the first URL because legacy we weren't using an array but a fixed value.
    },

    ohanaSummaryHtml() {
      //TODO: Draft (shall we add here a link to watch, if safe?)
      let status = this.selection.join_status.status
      let cuts = this.selection.join_status.cuts
      let level = this.selection.join_status.level

      let type = this.item.type

      let text = ''
      if (status == 'unset') {
        text = `To know if this ${type} is safe for you, let us know your preferences.`
      } else if (status == 'done' && cuts == 0) {
        text = `${
          level > 5 ? 'This' : 'Our community says that this'
        } ${type} is clean for your settings. Nothing to edit here.`
      } else if (status == 'done' && cuts > 0) {
        text = `${
          level > 5 ? 'We' : 'Our community'
        } created filters for this ${type} to make it safe.`
      } else if (status == 'missing') {
        text = `Watchout! This ${type} is not ready to be watched safely.`
      } else {
        text = `Ouch! We don't have enough information about this ${type}. Sorry!`
      }

      return text
    },
  },

  methods: {
    getColor(key, value) {
      console.log(value)
      if (this.skipTags.includes(key)) {
        if (value.health < -0.5) return 'red'
        return 'orange'
      }
      return 'lightgray'
    },
    getText(key, value) {
      console.log(value)
      return 'this a tooltip explaining the tag underneath... ' + JSON.stringify(key)
    },
    getSummary(status) {
      let brief_status = {}
      for (let cat of ['erotic', 'gory', 'profane']) {
        for (let sev of ['Very', 'Moderately', 'Mildly', 'Slightly']) {
          let tag = sev + ' ' + cat
          let s = status[tag]
          if (s.health > 0.5 && s.trust > 1) continue
          brief_status[tag] = s
          break
        }
      }
      return brief_status
    },

    closeMe() {
      //TODO: This doesn't apply if ESC or click outside, as dialog closes itself
      //Reset view
      this.resetView()

      //emit close action
      this.$emit('close', false)
    },
    resetView() {
      this.tab = 1 //let's force this by default
      this.show_watch_options = false
      this.showOhanaDetails = true
      this.showMyPreferences = true
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

    getData() {
      this.item = this.selection
      let url = ohana.utils.buildURL({
        action: 'getMovie',
        imdb: this.selection.imdb,
        newAPI: true,
      })
      console.log('[alex] getting movie data', this.selection.watch_url, url)
      this.loading = true
      fetch(url)
        .then((r) => r.text())
        .then((data) => {
          let x = data.replaceAll('Slighty', 'Slightly') //data might come with "Slighty" instead of "Slightly". Let's fix here to avoid other ifelse around
          this.item = JSON.parse(x)
          this.item.brief_status = this.getSummary(this.item.movieContent)
          this.item.movieValues = {} //{ Family: { status: -1 }, 'Cuidado necesitados': { status: 1 } }
          this.loading = false
        })
    },
  },
  mounted() {
    this.categories = rawTags.categories
    this.severities = rawTags.severitiesR
    this.getData()
  },
}
</script>

<style>
.v-slide-group__prev {
  display: none !important;
}

.ohana-summary {
  display: flex;
  border: solid 1px lightgray;
  padding: 5px;
  margin-bottom: 0px;
  margin-top: 0px;
  white-space: pre-wrap;
  word-break: keep-all;
  line-height: normal;
}

.star {
  font-size: 100% !important;
  vertical-align: text-top !important;
  color: orange !important;
  margin-left: -3px !important;
  /*margin: -3px 3px 3px 0px !important*/
}

.v-overlay--active {
  /** tbc: this should prevent background scroll in iOS */
  touch-action: none !important;
}

.modern-link {
  cursor: pointer;
  color: #0070d7;
  font-weight: bold;
  font-size: 10pt;
  text-decoration: none;
}
</style>
