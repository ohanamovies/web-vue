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
            language == 'es' && item.metadata && item.metadata.title_es
              ? item.metadata.title_es
              : item.metadata.title
          }}
        </span>
        <!-- {{ selection }} -->
        <span class="mbutton">
          <v-icon @click="closeMe">mdi-close</v-icon>
        </span>
      </v-card-title>

      <!-- SUBTITLE -->
      <v-card-subtitle>
        {{ item.metadata.tmdb_rating }}
        <v-icon style="font-size: 100%; vertical-align: text-top; color: orange; margin-left: -3px"
          >mdi-star</v-icon
        >
        | {{ item.metadata.runtime + ' mins' }} |
        {{ mapping.year }}
      </v-card-subtitle>

      <!-- CONTENT -->
      <v-card-text>
        <v-row>
          <!-- Image only if not isMobile -->
          <v-col cols="4" v-if="!isMobile && selection.join_status.status != 'missing'">
            <img
              :src="'https://image.tmdb.org/t/p/w200' + item.metadata.poster"
              :alt="item.metadata.title"
              style="object-fit: contain; width: 100%"
              :class="[selection.join_status.status == 'missing' ? 'blur_image' : '']"
            />
          </v-col>

          <!-- Rest of info (in tabs for now) -->
          <v-col class="pt-0">
            <v-tabs v-model="tab" class="mb-3 pa-0">
              <v-tabs-slider></v-tabs-slider>
              <v-tab>Overview</v-tab>
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
                    language == 'es' && item.metadata && item.metadata.plot_es
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
                  </div>
                </div>

                <!-- Confidence badge -->
                <!--<fc-tooltip
                  :text="
                    cofidence(selection.join_status.level) > 99
                      ? 'Information has been verified by Ohana trusted editors'
                      : `Information hasn't been verified by Ohana directly`
                  "
                  :bottom="true"
                  style="z-index: 99999999"
                >
                  <span
                    style="
                      font-size: 0.7rem;
                      font-weight: 600;
                      text-align: right;
                      cursor: pointer;
                      margin-right: 5px;
                    "
                    >{{ $t('confidence') }}: {{ cofidence(selection.join_status.level) }}%</span
                  ><v-icon color="blue" x-small v-if="cofidence(selection.join_status.level) > 99"
                    >mdi-check-decagram
                  </v-icon>
                </fc-tooltip>-->

                <!-- Watch on -->
                <div>
                  <movie-watch-options
                    style="margin-top: 20px"
                    :selection="selection"
                    :title="item.metadata ? item.metadata.title : ''"
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
                        <fc-tooltip
                          :text="$t('confidence') + ': ' + cofidence(tagged(sev).level) + '%'"
                          :top="true"
                        >
                          <v-chip x-small class="ma-1">
                            <v-icon left x-small :color="tagged(sev).color">{{
                              tagged(sev).icon
                            }}</v-icon>
                            {{ tagged(sev).tag + tagged(sev).badge }}
                          </v-chip>
                        </fc-tooltip>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Change my settings? -->
                <div>
                  <br />
                  <span
                    class="modern-link"
                    @click="showMyPreferences = true"
                    v-if="!showMyPreferences"
                  >
                    Check my preferences
                  </span>
                  <div v-if="showMyPreferences">
                    <b style="font-size: 90%">This is what you asked to skip:</b>
                    <br />
                    <v-chip
                      class="ma-1"
                      x-small
                      dense
                      v-for="(item, k) in skipTags"
                      :key="k"
                      :class="{ chipdown: skipTags.includes(item) }"
                    >
                      {{ item }}
                    </v-chip>

                    <v-chip color="blue" class="ma-1" dense x-small outlined to="/settings"
                      >Change...</v-chip
                    >
                  </div>
                </div>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- Feedbak button -->

        <a
          class="modern-link"
          target="_blank"
          :href="
            'https://docs.google.com/forms/d/e/1FAIpQLScnTNbXu79Sbinmlw6QhBIa5T76T0QCEMFLt4OIiSN08aHQKw/viewform?usp=pp_url&entry.2077317668=' +
            '[feedback]' +
            item.metadata.title +
            ' - imdb:' +
            item.metadata.imdb
          "
          >{{ $t('feedbackPopUp') }}</a
        >
      </v-card-actions>
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
const rawTags = require('@/assets/raw_tags')
import ohana from '@/assets/ohana'

import MovieWatchOptions from './MoviePopup/MovieWatchOptions2.vue'
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

    language() {
      return this.settings.language
    },
    mapping() {
      return {
        year: this.item.metadata.released ? this.item.metadata.released.substring(0, 4) : '',
      }
    },

    parsedURL() {
      return ohana.providers.parseURL(this.selection.watch_url) //TODO: taking the first URL because legacy we weren't using an array but a fixed value.
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
    cofidence(level) {
      return Math.round((level / 6) * 50 + 40, 2)
    },
    final_status(tag) {
      //For the given tag, get the status{} with the highest level, out of all the providers
      let status = {}
      let max_level = -1
      this.selection.providers.forEach((p) => {
        try {
          if (p.status[tag].level > max_level) {
            max_level = p.status[tag].level
            status = p.status[tag]
          }
        } catch (error) {
          //nothing
        }
      })

      return status
    },

    tagged(tag) {
      tag = tag.replace('Slighty', 'Slightly') //just in case!
      let final_status = this.final_status(tag)
      return {
        color: ohana.movies.getShieldColor(final_status.status, final_status.level),
        icon: ohana.movies.getShieldIcon(final_status.status, final_status.cuts),
        count: final_status.count,
        level: final_status.level || 0,
        badge:
          final_status.status == 'unknown'
            ? ' (??)'
            : final_status.cuts > 0
            ? ` (${final_status.cuts})`
            : '',
        tag: tag,
      }
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
      let url = ohana.utils.buildURL({
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
  margin-bottom: 0px;
  margin-top: 0px;
  white-space: pre-wrap;
  word-break: keep-all;
  line-height: normal;
}

.v-overlay--active {
  /** tbc: this should prevent background scroll in iOS */
  touch-action: none !important;
}
</style>
