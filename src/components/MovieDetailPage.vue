<template>
  <div>
    <!-- A: if we have valid data  -->
    <v-card v-if="item.metadata" @keydown.esc="closeMe()">
      <!-- TITLE -->

      <v-card-title
        primary-title
        style="white-space: pre-wrap; word-break: keep-all; line-height: normal; margin-bottom: 5px"
      >
        <span
          >{{
            language == 'es' && item.metdata.title_es ? item.metadata.title_es : item.metadata.title
          }}
          <span style="font-size: 70%; color: gray"> ({{ mapping.year }})</span></span
        >
        <!-- {{ selection }} -->
        <span class="mbutton">
          <v-icon @click="closeMe">mdi-close</v-icon>
        </span>
      </v-card-title>

      <!-- SUBTITLE -->
      <v-card-subtitle>
        {{ 'TMDb Rating: ' + item.metadata.tmdb_rating }} |
        {{ 'Runtime: ' + item.metadata.runtime + ' mins' }}
      </v-card-subtitle>

      <!-- CONTENT -->
      <v-card-text>
        <v-row>
          <!-- Image only if not isMobile -->
          <v-col cols="4" v-if="!isMobile">
            <img
              :src="'https://image.tmdb.org/t/p/w200' + item.metadata.poster"
              :alt="item.metadata.title"
              style="object-fit: contain; width: 100%"
            />
          </v-col>

          <!-- Rest of info (in tabs for now) -->
          <v-col class="pt-0">
            <v-tabs v-model="tab" class="mb-3 pa-0">
              <v-tabs-slider></v-tabs-slider>
              <v-tab>IMDb</v-tab>
              <v-tab>Ohana </v-tab>
              <v-tab>Advanced</v-tab>
              <v-tab v-if="false">Image</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab" style="height: 250px; overflow-y: auto">
              <!-- TAB 1: IMDB -->
              <v-tab-item>
                <!-- Overview -->
                <div class="overview">
                  {{
                    language == 'es' && item.metadata.plot_es
                      ? item.metadata.plot_es
                      : item.metadata.plot
                      ? item.metadata.plot
                      : item.metadata.overview
                  }}
                </div>

                <!-- Genres -->
                <div style="margin-top: 5px">
                  <b style="font-size: 0.8em">Genres: </b>
                  <v-chip
                    v-for="(g, index) in item.metadata.genres"
                    :key="index"
                    x-small
                    class="mr-1"
                    >{{ g }}</v-chip
                  >
                </div>

                <!-- Link to IMDb -->
                <div>
                  <a
                    :href="'https://www.imdb.com/title/' + item.metadata.imdb"
                    target="_blank"
                    style="font-size: 0.8em"
                    >Read more on IMDb</a
                  >
                </div>
              </v-tab-item>

              <!-- TAB 2: OHANA -->
              <v-tab-item>
                <!-- Ohana Summary -->

                <div class="ohana-summary">
                  <v-icon :color="selection.color" style="margin-right: 5px">
                    {{ selection.icon == 'none' ? 'mdi-alert' : selection.icon }}
                  </v-icon>
                  <div style="margin: auto; margin-left: 0px">
                    <span v-html="ohanaSummaryHtml"></span>
                    <!-- TODO: figure this out -->
                    <div v-if="false">
                      <span
                        v-if="
                          selection.join_status.status == 'done' && selection.join_status.level < 6
                        "
                        class="modern-link"
                        >Request certification</span
                      >
                      <span v-else-if="selection.join_status.status != 'done'" class="modern-link"
                        >Ask community to check this movie</span
                      >
                    </div>
                  </div>
                </div>

                <!-- Watch on -->
                <div>
                  <movie-watch-options
                    style="margin-top: 20px"
                    :isMobile="isMobile"
                    :isChrome="isChrome"
                    :hasApp="hasApp"
                    :selection="selection"
                  ></movie-watch-options>
                </div>

                <!--
                <div
                  v-for="(watch_url, index) in selection.watch_url"
                  :key="index"
                  style="margin-bottom: 10px"
                >
                  <a :href="watch_url" target="_blank" class="button"
                    >Watch on {{ getProvider(watch_url) }}
                  </a>
                </div>
                -->
              </v-tab-item>

              <!-- TAB 3: ADVANCED -->
              <v-tab-item>
                <!-- Ohana Details (cuts by category) -->
                <span class="modern-link" @click="showOhanaDetails = !showOhanaDetails">
                  {{ showOhanaDetails ? 'Hide Ohana details' : 'Show Ohana details' }}
                </span>
                <div id="filter-details" v-if="showOhanaDetails">
                  <!-- tagged chips-->
                  <div
                    v-for="(cat, index) in categories"
                    :key="index"
                    style="display: inline-block"
                  >
                    <div v-if="cat != 'Other'" style="display: inline-block">
                      <b style="font-size: 0.8em">{{ cat }}: </b>
                      <div
                        v-for="(sev, index2) in severities[index]"
                        :key="index2"
                        style="display: inline-block"
                      >
                        <v-chip x-small class="ma-1">
                          <v-icon left x-small :color="tagged(sev).color">{{
                            tagged(sev).icon
                          }}</v-icon>
                          {{ tagged(sev).tag + tagged(sev).badge }}
                        </v-chip>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Change my settings? -->
                <div>
                  <br />
                  <router-link class="modern-link" to="/settings">Change my settings</router-link>
                </div>

                <!-- Report an error -->
                <div id="report-an-error">
                  <br />
                  <a
                    class="modern-link"
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfIi64Ge0or3yOHn9TaEJY4y4rw2irHTeTmnLI_W7kMHx79CQ/viewform"
                    target="_blank"
                    >Report an error</a
                  >
                </div>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- B: if no data, show "loading" or "error" -->
    <v-card v-else>
      <v-card-text style="height: 250px">
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
const provider = require('../assets/provider')
const rawTags = require('../assets/raw_tags')

import MovieWatchOptions from './MovieWatchOptions.vue'

export default {
  components: {
    MovieWatchOptions,
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
    isChrome: {
      type: Boolean,
      default: false,
    },
    hasApp: {
      type: Boolean,
      default: false,
    },
    selection: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  data() {
    return {
      showOhanaDetails: false,

      tab: 1, //0: overview, 1: Ohana -> shall we start with Ohana?
      item: {},

      categories: [],
      severities: [],
      loading: false,
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
    language() {
      //TODO: use vuex?
      return this.$i18n.locale.toLowerCase().split('-')[0]
    },
    mapping() {
      return {
        year: this.item.metadata.released ? this.item.metadata.released.substring(0, 4) : '',
      }
    },

    parsedURL() {
      return provider.parseURL(this.selection.watch_url) //TODO: taking the first URL because legacy we weren't using an array but a fixed value.
    },

    ohanaSummaryHtml() {
      //TODO: Draft (shall we add here a link to watch, if safe?)
      let status = this.selection.join_status.status
      let cuts = this.selection.join_status.cuts
      let level = this.selection.join_status.level

      let type = this.item.metadata.type

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
    tagged(tag) {
      tag = tag.replace('Slighty', 'Slightly')
      console.log('checking tag ' + tag, this.item)
      //this returns the icon, color, and number of scenes for the given tags (used for the chips.)
      let icon
      let color

      let badge = ''
      let status
      let level

      let auxx = this.item.scenes.filter((x) => x.tags.includes(tag))
      let count = auxx.length

      try {
        status = this.item.tagged[tag].status
        level = this.item.tagged[tag]['modified'][1]
      } catch (error) {
        status = 'unknown'
        level = '-1'
        badge = ' (??)'
      }

      if (status == 'done') {
        color = level > 5 ? 'blue' : 'green'
        icon = count > 0 ? 'mdi-content-cut' : 'mdi-emoticon-happy'

        if (count > 0) badge = ' (' + count + ')'
      } else if (status == 'missing' || status == 'pending') {
        color = 'red'
        icon = 'mdi-flag-variant'
      } else {
        icon = 'mdi-progress-question'
        color = 'gray'
      }

      return { color, icon, count, badge, tag }
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
      this.showOhanaDetails = false
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
    buildURL(query) {
      // Build url
      var out = []
      for (var key in query) {
        out.push(key + '=' + encodeURIComponent(query[key]))
      }
      var url = 'https://api.ohanamovies.org/dev?' + out.join('&')
      console.log(query, url)
      return url
    },
    getData() {
      let url = this.buildURL({
        action: 'getMovie',
        id: this.selection.id,
        season: this.parsedURL.season,
        episode: this.parsedURL.episode,
        title: this.parsedURL.title,
      })
      console.log('[alex] getting movie data', this.selection.watch_url, url)
      this.loading = true
      fetch(url)
        .then((r) => r.text())
        .then((data) => {
          let x = data.replaceAll('Slighty', 'Slightly') //data might come with "Slighty" instead of "Slightly". Let's fix here to avoid other ifelse around
          this.item = JSON.parse(x)
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

.mbutton {
  margin-left: auto;
  margin-right: 15px;
}

.ohana-summary {
  display: flex;
  border: solid 1px lightgray;
  padding: 5px;
  margin-bottom: 8px;
  margin-top: 0px;
  white-space: pre-wrap;
  word-break: keep-all;
  line-height: normal;
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
