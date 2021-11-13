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
        <!-- {{ item }} -->
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
            <v-chip :color="getColor(index, g)" small class="mr-1">{{ index }}</v-chip>
          </fc-tooltip>
        </span>

        <span>
          <fc-tooltip v-for="(g, index) in item.movieValues" :key="index" :text="getText(index, g)">
            <v-chip :color="getValueColor(index, g)" small class="mr-1">{{ index }}</v-chip>
          </fc-tooltip>
        </span>
      </v-card-subtitle>

      <!-- CONTENT -->
      <v-card-text>
        <v-row>
          <!-- Image only if not isMobile -->
          <v-col cols="4" v-if="!isMobile">
            <img
              :src="poster"
              :alt="item.title"
              style="object-fit: contain; width: 100%"
              :class="[item.join_status.status == 'missing' ? 'blur_image' : '']"
            />
          </v-col>

          <!-- Rest of info -->
          <v-col>
            <div style="height: 350px; overflow-y: auto">
              <!-- Genres -->
              <div style="display: flex; justify-content: space-between">
                <b>Overview: </b>
                <i style="font-size: 85%">{{ item.genres.join(' - ') }}</i>
              </div>

              <!-- Overview -->
              <div class="overview" v-if="plot.length < 400 || viewMore">
                {{ plot }}
                <a v-if="plot.length >= 400" @click="viewMore = false"> view less</a>
              </div>
              <div v-else>
                {{ plot.slice(0, 300) }}...
                <a @click="viewMore = true">view more</a>
              </div>

              <div style="text-align: center; margin: 10px 0px">
                <v-icon
                  v-if="item.join_status.icon != 'none'"
                  :color="item.join_status.color"
                  style="margin-right: 5px"
                >
                  {{ item.join_status.icon }}
                </v-icon>
                <span :style="'color: ' + item.join_status.color">
                  {{ ohanaSummary }}
                </span>
              </div>

              <!-- Watch on -->
              <div style="margin: 10px 0">
                <movie-watch-options :selection="item"></movie-watch-options>
              </div>

              <!-- Link to IMDb -->
              <div style="margin: 20px 0">
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

    <!-- B: if no data, show "error" -->
    <v-card v-else>
      <v-card-text style="height: 350px">
        <div>
          <span> Error!</span>
          <br />
          <span>{{ item }}</span>
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
      item: {},
      categories: [],
      severities: [],
      viewMore: false,
    }
  },

  watch: {
    selection: {
      handler: function () {
        console.log('updated selection', this.selection)
        this.getData()
      },
      deep: true,
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
      return this.item.join_status.status == 'unknown' || this.item.join_status.status == 'unkown'
    },
    is_missing() {
      return this.item.join_status.status == 'missing'
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
      return provider.parseURL(this.item.watch_url) //TODO: taking the first URL because legacy we weren't using an array but a fixed value.
    },

    ohanaSummary() {
      //TODO: Draft (shall we add here a link to watch, if healthy?)
      let status = this.item.join_status.status
      let type = this.item.type
      let text = ''
      if (status == 'unset') {
        text = `To know if this ${type} is healthy for you, let us know your preferences.`
      } else if (status == 'clean') {
        text = `This ${type} is healthy for your settings.`
      } else if (status == 'done') {
        text = `We've created filters for this ${type} to make it healthy.`
      } else if (status == 'missing') {
        text = `Watchout! This ${type} is not ready to be watched healthily.`
      } else if (status == 'mixed') {
        text = `Watchout! This ${type} might contain unhealthy content.`
      } else {
        text = `Ouch! We don't know if this content if healthy!`
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
    getValueColor(key, value) {
      //if (value.trust < 2) return 'orange'
      if (value.health < -0.5) return 'red'
      if (value.health > 0.5) return 'green'
      return 'lightgray'
    },
    getText(key, value) {
      console.log(value)
      return 'this a tooltip explaining the tag underneath... ' + JSON.stringify(key)
    },
    closeMe() {
      //TODO: This doesn't apply if ESC or click outside, as dialog closes itself
      //emit close action
      this.$emit('close', false)
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
        imdb: this.item.imdb,
        newAPI: true,
      })
      console.log('[alex] getting movie data', url)
      fetch(url)
        .then((r) => r.text())
        .then((data) => {
          data = data.replaceAll('Slighty', 'Slightly') //data might come with "Slighty" instead of "Slightly".
          let d = JSON.parse(data)
          if (!d.title) return console.log('wrong data...')
          console.log('getData ', d)
          this.item = ohana.movies.addInfo(d, this.skipTags)
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

/*.ohana-summary {
  display: flex;
  border: solid 1px lightgray;
  padding: 5px;
  margin-bottom: 0px;
  margin-top: 0px;
  white-space: pre-wrap;
  word-break: keep-all;
  line-height: normal;
}*/

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

.v-chip {
  padding: 0 10px;
  margin-bottom: 2px;
}

.v-chip.v-size--small {
  font-size: 12px;
}
</style>
