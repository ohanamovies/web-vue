<template>
  <div>
    <!-- Log-in dialog -->
    <v-dialog v-model="dialog_login" max-width="500" style="z-index: 999999">
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          <Login />
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- A: if we have valid data  -->
    <v-card v-if="loading" style="background-color: white">
      <v-card-text>
        <div
          style="
            margin: auto;
            justify-content: center;
            display: flex;
            align-items: center;
            min-height: 360px;
          "
        >
          <v-progress-circular indeterminate color="cyan" :size="60"></v-progress-circular>
        </div>
      </v-card-text>
    </v-card>
    <v-card v-else-if="item.title" @keydown.esc="closeMe()" style="position: relative">
      <!-- {{ close me }} -->
      <span
        v-if="!hideCloseButton"
        style="margin: 0 5px auto auto; position: absolute; top: 5px; right: 5px"
      >
        <v-icon @click="closeMe()">mdi-close</v-icon>
      </span>

      <!-- TITLE -->
      <v-card-text class="pb-3">
        <v-row>
          <v-col cols="4" v-if="!isMobile2" class="pa-0" style="position: relative">
            <img
              :src="poster"
              :alt="item.title"
              :style="{
                objectFit: 'contain',
                width: '100%',
                padding: '20px 10px 0px',
                cursor:
                  item.join_status.status == 'missing' && !blur_if_missing ? 'pointer' : 'auto',
              }"
              :class="[item.join_status.status == 'missing' && blur_if_missing ? 'blur_image' : '']"
              @click="blur_if_missing = !blur_if_missing"
            />

            <div
              class="modern-link"
              style="
                position: absolute;
                bottom: 50px;
                text-align: center;
                width: 100%;

                font-size: 80%;
              "
              v-if="item.join_status.status == 'missing'"
              @click="blur_if_missing = !blur_if_missing"
            >
              {{ blur_if_missing ? 'See poster' : '' }}
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
                display: block;
              "
            >
              <!-- part of show -->
              <div v-if="item.parent" style="font-size: 70%; margin-bottom: 10px">
                <b>
                  <router-link
                    :target="onExtensionIframe ? '_blank' : '_self'"
                    :to="'./' + item.parent"
                    v-if="item.parent"
                    >{{ item.parentData.title.primary }}</router-link
                  ></b
                >
              </div>
              <div>
                <span style="max-width: calc(100% - 30px)">{{ finalTitle }}</span>
                <span style="font-size: 60%; font-color: rgba(0, 0, 0, 0.6); margin-top: 3px">
                  ({{ item.released }})</span
                >
              </div>
            </v-card-title>

            <!-- SUBTITLE -->
            <v-card-subtitle style="display: flex">
              <div style="font-size: 110%">
                <fc-tooltip v-if="item.imdbRating" text="IMDb rating">
                  <v-icon class="star">mdi-star</v-icon><span>{{ item.imdbRating }}</span
                  ><span style="font-size: 70%">/10</span> -
                </fc-tooltip>
                {{ item.runtime + ' mins' }}
              </div>

              <div style="margin-left: 10px">
                <fc-tooltip text="Check on IMDb">
                  <a
                    class="provider-link-rectangle"
                    target="_blank"
                    :href="'https://www.imdb.com/title/' + (item.imdb ? item.imdb : imdb)"
                  >
                    <img src="images/providers/imdb-rectangle.png" />
                  </a>
                </fc-tooltip>

                <fc-tooltip text="Check on The Movie Database (TMBDb)">
                  <a
                    class="provider-link-rectangle"
                    target="_blank"
                    :href="
                      'https://www.themoviedb.org/' + item.tmdb + '?locale=' + settings.country
                    "
                  >
                    <img src="images/providers/tmdb-rectangle.png" />
                  </a>
                </fc-tooltip>
              </div>
            </v-card-subtitle>

            <!-- CONTENT -->
            <v-card-text>
              <!-- Rest of info -->
              <div :style="{ maxHeight: textHeight, overflowY: 'auto' }">
                <!-- TODO: poster for mobile - for this to be nice we should start with the poster hidden by scroll, so user can scroll back to see it-->

                <!-- title -->
                <div v-if="isMobile2 && false" style="text-align: center">
                  <img :src="poster" :alt="item.title" />
                </div>

                <!-- Genres -->
                <div style="display: flex; justify-content: space-between">
                  <b>{{ $t('overview') }} </b>
                  <i style="font-size: 85%">{{ item.genres.join(' - ') }}</i>
                </div>

                <!-- Overview -->
                <ReadMore :text="plot" :max="200" />

                <!-- Ohana summary -->
                <div style="text-align: center; margin: 15px 0px 5px; font-weight: 500">
                  <!-- icon -->
                  <v-icon
                    v-if="item.join_status.use_icon"
                    :color="item.join_status.color"
                    style="margin-right: 5px"
                  >
                    {{ item.join_status.icon }}
                  </v-icon>

                  <!-- summary text -->

                  <span :style="'color: ' + item.join_status.color || 'orange'">
                    {{ ohanaSummary }}
                  </span>

                  <!-- brief tags -->
                  <div style="margin-top: 5px; margin-bottom: 0px; text-align: center">
                    <div>
                      <FilterStatusBriefTags
                        :filterStatus="item.filterStatus"
                        style="
                          padding-bottom: 0px;
                          display: flex;
                          justify-content: center;
                          flex-wrap: wrap;
                        "
                      />
                    </div>

                    <div
                      v-if="item.type == 'series'"
                      style="color: orange; padding: 5px 0px; text-align: center"
                    >
                      <span v-if="isDetailPage">{{ $t('check_the_list_of') }}</span>
                      <span v-else>{{ $t('go_to_the_series') }}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <!-- Chips: movie values -->
                  <div v-if="movieValues.length > 0" style="margin-top: 0px">
                    <b>{{ $t('popup.movieValues') }}: </b>

                    <!--<i> {{ movieValues.map((x) => x.name).join(' - ') }}</i>-->

                    <div v-if="true">
                      <fc-tooltip
                        v-for="(value, index) in movieValues"
                        :key="index"
                        :text="value.tip"
                      >
                        <span :style="{ color: valueColor(value) }">{{ value.name }}</span>
                        <span v-if="index < movieValues.length - 1"> - </span>
                      </fc-tooltip>
                    </div>
                  </div>
                </div>

                <!-- Watch on -->
                <div style="margin-top: 10px" v-if="!onExtensionIframe">
                  <movie-watch-options :selection="item"></movie-watch-options>
                </div>
              </div>
              <div v-if="onExtensionIframe" style="margin-top: 10px" class="align-center">
                <a class="button special" @click="$emit('edit')"
                  >{{ $t('edit') }} {{ mediaType }}</a
                >
              </div>
            </v-card-text>
          </v-col>
        </v-row>

        <!-- Contributors / Feedbak buttons -->
        <div style="position: relative; height: 20px">
          <div
            style="
              position: absolute;
              left: 0px;
              display: flex;
              overflow-x: auto;
              max-width: calc(100% - 40px);
            "
          >
            <b v-if="contributors.length > 0">{{ $t('popup.contributors') }}:</b>
            <div v-for="(contributor, index) of contributors" :key="index">
              <v-chip
                v-if="contributor"
                class="ml-1"
                x-small
                :to="'/editors/user/' + cleanContributor(contributor)"
              >
                {{ cleanContributor(contributor) }}
              </v-chip>
            </div>
          </div>
          <div style="position: absolute; right: 0px">
            <!--<a
              v-if="is_unknown || is_missing"
              class="modern-link"
              :href="feedback_link"
              target="_blank"
              >{{ $t('request_review') }}
            </a>-->

            <!-- +info link (not visible if alraedy in detail page)-->
            <span v-if="!isDetailPage">
              <router-link
                :target="onExtensionIframe ? '_blank' : '_self'"
                :to="'/item/' + item.imdb"
                class="modern-link"
                >{{ $t('popup.goToFullDetails') }}</router-link
              >
            </span>
            <a v-else class="modern-link" :href="feedback_link" target="_blank">{{
              $t('feedbackPopUp')
            }}</a>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- B: if no data, show "error" -->
    <v-card v-else>
      <v-card-text style="height: 310px">
        {{ item }}
        <div>
          <span> {{ $t('error_please_try_again') }}</span>
          <br />
          <v-btn depressed text @click="getData()">{{ $t('try_again') }}</v-btn>
          <span
            ><br /><br />{{ $t('you_may_check') }}
            <a
              :href="'https://www.imdb.com/title/' + imdb"
              target="_blank"
              rel="noopener noreferrer"
              >IMDb</a
            >
            {{ $t('you_may_check_2') }}</span
          >
          <!-- <span>{{ item }}</span>-->
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
const rawTags = require('@/assets/ohana/raw_tags')
import ohana from '@/assets/ohana/index'
import values_list from '@/assets/ohana/values'
import FilterStatusBriefTags from '../Movies/FilterStatusBriefTags.vue'

import MovieWatchOptions from '@/components/MoviePopup/MovieWatchOptions2.vue'

import { mapState } from 'vuex'

import Login from '@/components/Settings/Login.vue'

export default {
  components: {
    MovieWatchOptions,
    Login,
    FilterStatusBriefTags,
  },
  props: {
    imdb: {
      type: String,
      default: '',
    },
    hideCloseButton: {
      type: Boolean,
      default: false,
    },
    onExtensionIframe: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      showDetails: false,
      //item: {},
      raw_item: {},
      loading: false,

      categories: [],
      severities: [],

      dialog_login: false,
      blur_if_missing: true,
    }
  },

  watch: {
    imdb() {
      this.getData()
    },
  },

  computed: {
    isMobile2() {
      return this.screen_width <= 700
    },
    isDetailPage() {
      return this.$route.path.includes('/item/')
    },
    movieValues() {
      let values = values_list.flat
      let output = []

      for (const key in this.item.movieValues) {
        if (!this.item.movieValues[key].health) continue
        if (!values[key]) {
          console.error('Missing value!! ', key)
          continue
        }
        if (values[key].items) continue // ignore parent elements
        const value = values[key] || { tooltip: {}, title: {} }
        output.push({
          health: this.item.movieValues[key].health,
          trust: this.item.movieValues[key].trust,
          //tip: value.tooltip[this.lang] || '',
          name: value.title[this.lang] || key,
        })
      }
      return output
    },
    contributors() {
      if (!this.item.contributors) return []
      let c = this.item.contributors.split(' ')
      let remove = ['excel', 'imdb'] // ['excel', 'imdb'] //let's put this back for now, otherwise hard to understand what's going on for f33 // mae: put it back
      c = c.filter((e) => !remove.includes(e))
      return c
    },
    item() {
      if (this.raw_item.movieContent) {
        let movie = this.raw_item
        movie.join_status = ohana.movies.getMovieHealth(movie, this.skipTags)
        return movie
      } else {
        return {}
      }
    },
    briefStatus() {
      return ohana.movies.getSummary(this.raw_item)
    },
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings', 'screen_width']),
    skipTags() {
      return this.$store.state.settings.skip_tags || []
    },
    textHeight() {
      return this.isMobile ? '400px' : '300px'
    },

    feedback_link() {
      return (
        '/contact-us/?reason=movie&title=' +
        this.item.title.primary +
        '&imdb=' +
        this.item.imdb +
        '&ref=feedbackPopUp'
      )
    },

    lang() {
      return this.settings.language
    },

    poster() {
      //TODO: optimize poster size? (e.g.: w154)
      const emptyPoster = 'https://ohana.tv/images/empty-poster.png'
      let item = this.item
      if (item.parentData) item = item.parentData
      if (!item || !item.poster) return emptyPoster

      let path = ''
      if (item.poster[this.lang]) path = item.poster[this.lang]
      else if (item.poster['en']) path = item.poster['en']
      if (path) return 'https://image.tmdb.org/t/p/w200' + path
      else return emptyPoster
    },

    finalTitle() {
      if (this.item.season && this.item.episode) {
        return 'S' + this.item.season + 'E' + this.item.episode + ': ' + this.title
      } else {
        return this.title
      }
    },

    title() {
      if (this.item.title[this.lang]) return this.item.title[this.lang]
      if (this.item.title['primary']) return this.item.title['primary']
      return ''
    },

    plot() {
      if (this.item.plot[this.lang]) return this.item.plot[this.lang]
      if (this.item.plot['primary']) return this.item.plot['primary']
      return ''
    },

    parsedURL() {
      return ohana.providers.parseURL(this.item.watch_url) //TODO: taking the first URL because legacy we weren't using an array but a fixed value.
    },

    mediaType() {
      return this.$t('popup.types.' + this.item.type, { s: '' }).toLowerCase()
    },

    ohanaSummary() {
      //TODO: Draft (shall we add here a link to watch, if healthy?)
      let status = this.item.join_status.status
      let type = this.mediaType
      let edits = 0
      for (const tag of this.skipTags) {
        edits += this.item.filterStatus[tag] ? this.item.filterStatus[tag].scenes.length : 0
      }
      let s = edits == 1 ? '' : 's'
      let text = ''
      if (status == 'unset') {
        text = this.$t('popup.ohanaSummary.unset', { type, s })
      } else if (status == 'clean') {
        text = this.$t('popup.ohanaSummary.clean', { type, s })
      } else if (status == 'done') {
        text = this.$t('popup.ohanaSummary.done', { type, edits, s })
      } else if (status == 'missing') {
        text = text = this.$t('popup.ohanaSummary.missing', { type })
      } else if (status == 'mixed') {
        if (edits == 0) {
          text = this.$t('popup.ohanaSummary.mixed_no_edits', { type })
        } else {
          text = this.$t('popup.ohanaSummary.mixed_with_edits', { type, edits, s })
        }
      } else {
        text = this.$t('popup.ohanaSummary.unknown')
      }

      return text
    },
  },

  methods: {
    cleanContributor(text) {
      let newtext = text.replace(/\s/g, '')
      newtext = newtext.replace(/@.*/g, '')
      newtext = newtext.toLowerCase()
      return newtext
    },
    resetPopup() {
      console.log('reset popup')
      this.blur_if_missing = true
    },
    valueColor(health) {
      //if (value.trust < ohana.movies.th.trust) return 'orange'
      if (ohana.movies.isUnhealthy(health)) return 'red'
      if (ohana.movies.isHealthy(health)) return 'green'
      return 'lightgray'
    },
    closeMe() {
      //TODO: This doesn't apply if ESC or click outside, as dialog closes itself
      //emit close action
      this.resetPopup()
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
      //this.item = this.selection
      this.resetPopup() //read more = false, etc.
      this.raw_item = {}
      this.loading = true
      if (this.imdb) {
        try {
          this.raw_item = await ohana.api.getMovie(this.imdb)

          //workaround to get the info from the imdbTable for movies not yet found
          try {
            if (!this.raw_item.imdb) {
              let tconst = await ohana.api.query({ action: 'getTconst', imdbID: this.imdb }, true)
              tconst = tconst[0]
              this.raw_item = {
                tconst,
                title: { en: tconst.originalTitle },
                movieContent: {},
                filterStatus: {},
                movieFilters: {},
                movieValues: {},
                plot: { en: '' },
                sceneFilters: {},
                providers: [],
                genres: [],
              }
            }
          } catch (error) {
            console.log(error)
          }
        } catch (error) {
          console.log('error 10612 loading popup', error)
        }
      } else {
        console.warn('[alex] need imdb id to get data...')
      }
      this.loading = false
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

.row {
  margin-bottom: 0px !important;
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

.rotate {
  transform: rotate(-180deg);
}
</style>
