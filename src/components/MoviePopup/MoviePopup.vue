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
    <v-card v-if="loading" style="background-color: white">
      <v-card-text>
        <div style="margin: auto; text-align: center">
          <v-progress-circular indeterminate color="cyan"></v-progress-circular>
        </div>
      </v-card-text>
    </v-card>
    <v-card v-else-if="item.title" @keydown.esc="closeMe()" style="position: relative">
      <!-- {{ close me }} -->

      <span
        style="margin: 0 5px auto auto; position: absolute; top: 5px; right: 5px"
        v-if="!hideCloseButton"
      >
        <v-icon @click="closeMe()">mdi-close</v-icon>
      </span>

      <!-- TITLE -->
      <v-card-text class="pb-3">
        <v-row>
          <v-col cols="4" v-if="!isMobile" class="pa-0" style="position: relative">
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
              "
            >
              <span style="max-width: calc(100% - 30px)">{{ finalTitle }}</span>
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
              <div :style="{ height: textHeight, overflowY: 'auto' }">
                <!-- poster for mobile -->
                <!-- TODO: for this to be nice we should start with the poster hidden by scroll, so user can scroll back to see it-->
                <div v-if="isMobile && false" style="text-align: center">
                  <img :src="poster" :alt="item.title" />
                </div>

                <!-- Genres -->
                <div style="display: flex; justify-content: space-between">
                  <b>Overview </b>
                  <i style="font-size: 85%">{{ item.genres.join(' - ') }}</i>
                </div>

                <!-- part of show -->
                <div v-if="item.parent" style="font-size: 90%; margin-bottom: 10px">
                  Part of
                  <b>
                    <router-link :to="'./' + item.parent" v-if="item.parent">{{
                      item.parentData.title.primary
                    }}</router-link></b
                  >
                </div>

                <!-- Overview -->
                <ReadMore :text="plot" :max="200" />

                <!-- Ohana summary -->
                <div style="text-align: center; margin: 15px 0px 5px; font-weight: 500">
                  <v-icon
                    v-if="item.join_status.icon != 'none'"
                    :color="item.join_status.color"
                    style="margin-right: 5px"
                  >
                    {{ item.join_status.icon }}
                  </v-icon>

                  <span :style="'color: ' + item.join_status.color || 'orange'">
                    {{ ohanaSummary }}
                  </span>

                  <span
                    v-if="this.settings.skip_tags.length"
                    @click="showDetails = !showDetails"
                    style="cursor: pointer; font-size: 90%; color: #0070d7; white-space: nowrap"
                    >{{ $t('popup.details') }}
                    <v-icon
                      small
                      :class="['ml-0', 'pl-0', showDetails ? 'rotate' : '']"
                      color="#0070d7"
                      >mdi-chevron-down
                    </v-icon>
                  </span>
                </div>

                <!-- Tags -->

                <div>
                  <v-slide-y-transition>
                    <!-- chips: scenes for your skipTags -->
                    <div
                      v-if="showDetails"
                      style="
                        padding-bottom: 5px;
                        display: flex;
                        justify-content: center;
                        flex-wrap: wrap;
                      "
                    >
                      <fc-tooltip
                        v-for="(tag, index) in skipTags"
                        :key="index"
                        :text="getTooltip3(tag, index)"
                      >
                        <v-chip
                          :color="getColor3(tag)"
                          :x-small="isMobile"
                          :small="!isMobile"
                          class="ml-1"
                          :style="{
                            color: ['red', 'green', 'orange'].includes(getColor3(tag))
                              ? 'white'
                              : 'default',
                          }"
                        >
                          {{
                            tag +
                            ' (' +
                            getEditsCount3(tag) +
                            (getEditsCount3(tag) == 0 && getColor3(tag) == 'green'
                              ? ' scenes)'
                              : getEditsCount3(tag) == 1
                              ? ' filter)'
                              : ' filters)')
                          }}
                        </v-chip>
                      </fc-tooltip>
                    </div>
                  </v-slide-y-transition>

                  <!-- chips: movie values -->

                  <div v-if="movieValues.length > 0" style="margin-top: 10px">
                    <b>{{ $t('popup.movieValues') }}: </b>

                    <i> {{ movieValues.map((x) => x.name).join(' - ') }}</i>

                    <div v-if="false">
                      <fc-tooltip
                        v-for="(value, index) in movieValues"
                        :key="index"
                        :text="value.description"
                      >
                        <v-chip
                          :color="getValueColor(value.health)"
                          :x-small="isMobile"
                          :small="!isMobile"
                          outlined
                          dark
                          class="ml-1"
                          >{{ value.name }}</v-chip
                        >
                      </fc-tooltip>
                    </div>
                  </div>
                </div>

                <!-- Watch on -->
                <div style="margin-top: 10px">
                  <movie-watch-options :selection="item"></movie-watch-options>
                </div>
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
          <!--
          <div style="position: absolute; right: 0px">
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
          -->

          <div
            style="position: absolute; right: 0px"
            v-if="$router.currentRoute.path != '/item/' + item.imdb"
          >
            <router-link :to="'/item/' + item.imdb" class="modern-link">{{
              $t('popup.goToFullDetails')
            }}</router-link>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- B: if no data, show "error" -->
    <v-card v-else>
      <v-card-text style="height: 310px">
        {{ item }}
        <div>
          <span> Error! Please try again.</span>
          <br />
          <v-btn depressed text @click="getData()">Try again</v-btn>
          <span
            ><br /><br />You may check
            <a
              :href="'https://www.imdb.com/title/' + imdb"
              target="_blank"
              rel="noopener noreferrer"
              >IMDb</a
            >
            as fallback</span
          >
          <!-- <span>{{ item }}</span>-->
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
const rawTags = require('@/assets/raw_tags')
import ohana from '@/assets/ohana/index'
import tags_excel from '@/assets/tags_excel'

import MovieWatchOptions from '@/components/MoviePopup/MovieWatchOptions2.vue'

import { mapState } from 'vuex'

import Login from '@/components/Settings/Login.vue'

export default {
  components: {
    MovieWatchOptions,
    Login,
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
    movieValues() {
      let output = []
      const values = tags_excel.getTagsLocal(this.settings.language).values

      for (const key in this.item.movieValues) {
        const value = values.find((v) => v.key == key)
        if (!value) continue

        if (value.parents && value.parents.length == 0) {
          output.push({
            health: this.item.movieValues[key].health,
            trust: this.item.movieValues[key].trust,
            description: value.tip ? value.tip : '',
            name: value.name,
          })
        }
      }
      return output
    },
    contributors() {
      if (!this.item.contributors) return []
      let c = this.item.contributors.split(' ')
      let remove = [] // ['excel', 'imdb'] //let's put this back for now, otherwise hard to understand what's going on for f33
      c = c.filter((e) => !remove.includes(e))
      return c
    },
    item() {
      if (this.raw_item.movieContent) {
        return ohana.movies.addInfo(this.raw_item, this.skipTags)
      } else {
        return {}
      }
    },
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings']),
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
      return this.settings.language
    },

    poster() {
      //TODO: optimize poster size? (e.g.: w154)
      const emptyPoster = 'https://ohana.tv/images/empty-poster.png'
      let item = this.item
      if (item.parentData) item = item.parentData
      if (!item || !item.poster) return emptyPoster

      let path = ''
      if (item.poster[this.language]) path = item.poster[this.language]
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
      if (this.item.title[this.language]) return this.item.title[this.language]
      if (this.item.title['primary']) return this.item.title['primary']
      return ''
    },

    plot() {
      if (this.item.plot[this.language]) return this.item.plot[this.language]
      if (this.item.plot['primary']) return this.item.plot['primary']
      return ''
    },

    parsedURL() {
      return ohana.providers.parseURL(this.item.watch_url) //TODO: taking the first URL because legacy we weren't using an array but a fixed value.
    },

    ohanaSummary() {
      //TODO: Draft (shall we add here a link to watch, if healthy?)
      let status = this.item.join_status.status
      let type = this.$t('popup.types.' + this.item.type, { s: '' }).toLowerCase()
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
        text = this.$t('popup.ohanaSummary.done', { type, edits, s: edits > 1 ? 's' : '' })
      } else if (status == 'missing') {
        text = text = this.$t('popup.ohanaSummary.missing', { type })
      } else if (status == 'mixed') {
        if (edits == 0) {
          text = this.$t('popup.ohanaSummary.mixed_no_edits', { type })
        } else {
          text = this.$t('popup.ohanaSummary.mixed_with_edits', {
            type,
            edits,
            s: edits > 1 ? 's' : '',
          })
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
    joinStatus(item) {
      return ohana.movies.joinStatus3(item.movieContent, item.providers, this.settings.skipTags)
    },
    resetPopup() {
      console.log('reset popup')
      this.blur_if_missing = true
    },
    getTooltip3(tag) {
      const edits = this.getEditsCount3(tag)
      const color = this.getColor3(tag)

      let text = ''

      if (color == 'green' && edits == 0) text = 'No need to filter this tag'
      else if (color == 'green' && edits > 0)
        text = `All ${edits} edits to filter this tag are created`
      else if (color == 'red' && edits == 0)
        text =
          'There is content of this type not yet filtered' +
          (edits > 0 ? ', although we have filters' : '')
      else if (color == 'orange') text = 'We are not 100% sure all this content is filtered'
      else text = `We don't have enough information about this tag.`
      return text
    },
    getColor3(tag) {
      if (!this.item.filterStatus[tag]) return 'lightgrey'
      else if (this.item.filterStatus[tag].health > 0.5) return 'green'
      else if (this.item.filterStatus[tag].health < -0.5) return 'red'
      else return 'orange'
    },
    getEditsCount3(tag) {
      if (!this.item.filterStatus[tag]) return 0
      else return this.item.filterStatus[tag].scenes.length
    },
    getColor(key, value) {
      console.log(value)
      if (this.skipTags.includes(key)) {
        if (value.health < -0.5) return 'red'
        return 'orange'
      }
      return 'lightgray'
    },
    getValueColor(health) {
      //if (value.trust < 2) return 'orange'
      if (health < -0.5) return 'red'
      if (health > 0.5) return 'green'
      return 'lightgray'
    },
    getText(key, value) {
      console.log(value)
      return 'this a tooltip explaining the tag underneath... ' + JSON.stringify(key)
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
          //this.item = ohana.movies.addInfo(this.item, this.skipTags)
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
