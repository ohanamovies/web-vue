<template>
  <div>
    <!-- Login dialog -->
    <v-dialog v-model="dialog_login" max-width="500" style="z-index: 999999">
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          <Login />
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- A: if we have valid data  -->
    <v-card v-if="item.title" @keydown.esc="closeMe()" style="position: relative">
      <!-- {{ close me }} -->

      <span style="margin: 0 5px auto auto; position: absolute; top: 5px; right: 5px">
        <v-icon @click="closeMe">mdi-close</v-icon>
      </span>

      <!-- TITLE -->
      <v-card-text class="pb-3">
        <v-row>
          <v-col cols="4" v-if="!isMobile" class="pa-0">
            <img
              :src="poster"
              :alt="item.title"
              :style="{
                objectFit: 'contain',
                width: '100%',
                padding: '20px 10px 0px',
              }"
              :class="[item.join_status.status == 'missing' && blur_if_missing ? 'blur_image' : '']"
            />

            <div
              class="modern-link"
              style="text-align: center; font-size: 80%"
              v-if="item.join_status.status == 'missing'"
              @click="blur_if_missing = !blur_if_missing"
            >
              {{ blur_if_missing ? 'See poster' : 'Blur poster' }}
            </div>
          </v-col>
          <v-col class="pa-0">
            <v-card-title
              primary-title
              style="
                white-space: pre-wrap;
                word-break: keep-all;
                line-height: normal;
                margin-bottom: 5px;
              "
            >
              <span style="max-width: calc(100% - 30px)">{{ title }}</span>
              <span style="font-size: 60%; font-color: rgba(0, 0, 0, 0.6); margin-top: 3px">
                ({{ item.released }})</span
              >
            </v-card-title>

            <!-- SUBTITLE -->
            <v-card-subtitle style="display: flex">
              <div style="font-size: 110%">
                <fc-tooltip text="IMDb rating">
                  <v-icon class="star">mdi-star</v-icon><span>{{ item.imdbRating }}</span
                  ><span style="font-size: 70%">/10</span>
                </fc-tooltip>
                - {{ item.runtime + ' mins' }}
              </div>

              <div style="margin-left: 10px">
                <fc-tooltip text="Check on IMDb">
                  <a
                    class="provider-link-rectangle"
                    target="_blank"
                    :href="'https://www.imdb.com/title/' + item.imdb"
                  >
                    <img src="images/providers/imdb-rectangle.png" />
                  </a>
                </fc-tooltip>

                <fc-tooltip text="Check on The Movie Database (TMBDb)">
                  <a
                    class="provider-link-rectangle"
                    target="_blank"
                    :href="'https://www.themoviedb.org/' + item.tmdb"
                  >
                    <img src="images/providers/tmdb-rectangle.png" />
                  </a>
                </fc-tooltip>

                <router-link :to="'/item/' + item.imdb">Ohana</router-link>
              </div>

              <div v-if="false">
                <!-- movie scenes -->
                <span>
                  <fc-tooltip
                    v-for="(g, index) in item.brief_status"
                    :key="index"
                    :text="getText(g, index)"
                  >
                    <v-chip
                      :color="getColor(index, g)"
                      :x-small="isMobile"
                      :small="!isMobile"
                      class="mr-1"
                      :style="{
                        color: ['red', 'green', 'orange'].includes(getColor(index, g))
                          ? 'white'
                          : 'default',
                      }"
                      >{{ index }}</v-chip
                    >
                  </fc-tooltip>
                </span>

                <!-- movie values -->
                <span>
                  <fc-tooltip
                    v-for="(g, index) in item.movieValues"
                    :key="index"
                    :text="getText(index, g)"
                  >
                    <v-chip
                      :color="getValueColor(index, g)"
                      :x-small="isMobile"
                      :small="!isMobile"
                      class="mr-1"
                      >{{ index }}</v-chip
                    >
                  </fc-tooltip>
                </span>
              </div>
            </v-card-subtitle>

            <!-- CONTENT -->
            <v-card-text>
              <!-- Rest of info -->

              <div :style="{ height: textHeight, overflowY: 'auto' }">
                <!-- Genres -->
                <div style="display: flex; justify-content: space-between">
                  <b>Overview </b>
                  <i style="font-size: 85%">{{ item.genres.join(' - ') }}</i>
                </div>

                <!-- Overview -->
                <div>
                  <div class="overview" v-if="plot.length < 200 || viewMore">
                    {{ plot }}
                    <a v-if="plot.length >= 200" @click="viewMore = false" class="modern-link">
                      Read less</a
                    >
                  </div>
                  <div v-else>
                    {{ plot.slice(0, 200 - 40) }}...
                    <a @click="viewMore = true" class="modern-link" style="font-size: 80%"
                      >Read more</a
                    >
                  </div>
                </div>

                <div style="text-align: center; margin: 15px 0px 5px; font-weight: 500">
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

                <div style="display: flex; justify-content: center">
                  <!-- chips - scenes -->
                  <span>
                    <fc-tooltip
                      v-for="(g, index) in item.brief_status"
                      :key="index"
                      :text="getText(g, index)"
                    >
                      <v-chip
                        :color="getColor(index, g)"
                        :x-small="isMobile"
                        :small="!isMobile"
                        class="mr-1"
                        :style="{
                          color: ['red', 'green', 'orange'].includes(getColor(index, g))
                            ? 'white'
                            : 'default',
                        }"
                        >{{ index }}</v-chip
                      >
                    </fc-tooltip>
                  </span>

                  <!-- chips - movie values -->
                  <span>
                    <fc-tooltip
                      v-for="(g, index) in item.movieValues"
                      :key="index"
                      :text="getText(index, g)"
                    >
                      <v-chip
                        :color="getValueColor(index, g)"
                        :x-small="isMobile"
                        :small="!isMobile"
                        class="mr-1"
                        >{{ index }}</v-chip
                      >
                    </fc-tooltip>
                  </span>
                </div>

                <!-- Watch on -->
                <div style="margin-top: 20px">
                  <movie-watch-options :selection="item"></movie-watch-options>
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
            </v-card-text>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- B: if no data, show "error" -->
    <v-card v-else>
      <v-card-text style="height: 310px">
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

import Login from './Settings/Login.vue'

export default {
  components: {
    MovieWatchOptions,

    Login,
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

      dialog_login: false,

      blur_if_missing: true,
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
    textHeight() {
      return this.isMobile ? '350px' : '300px'
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
      //return ohana.user.language()
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
        text = `This ${type} is healthy for your settings. Nothing to filter here.`
      } else if (status == 'done') {
        text = `We've created filters for this ${type} to make it healthy as per your settings.`
      } else if (status == 'missing') {
        text = `This ${type} contains scenes you consider unhealthy. But we don't have filters yet to help you skip them.`
      } else if (status == 'mixed') {
        text = `This ${type} might contain content you consider unhealthy. We are not sure. 🤷‍♂️`
      } else {
        text = `Ouch! We don't know if this content if healthy for your settings! `
      }

      return text
    },
  },

  methods: {
    resetPopup() {
      this.viewMore = false
      this.blur_if_missing = true
    },
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

    async getData() {
      this.item = this.selection
      if (this.item.imdb) {
        this.item = await ohana.api.getMovie(this.item.imdb)
        this.item = ohana.movies.addInfo(this.item, this.skipTags)
      } else {
        console.warn('[alex] need imdb id to get data...')
      }
    },
  },
  mounted() {
    this.resetPopup()
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
  margin-top: 1px !important;
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
