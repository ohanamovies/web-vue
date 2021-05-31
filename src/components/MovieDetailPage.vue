<template>
  <div>
    <v-card v-if="item.metadata">
      <!-- header -->
      <v-card-title
        primary-title
        style="white-space: pre-wrap;word-break: keep-all; line-height: normal; margin-bottom: 5px;"
      >
        <span
          >{{ item.metadata.title }}
          <span style="font-size: 70%; color: gray"> ({{ mapping.year }})</span></span
        >
      </v-card-title>
      <v-card-subtitle>
        {{ 'TMDb Rating: ' + item.metadata.tmdb_rating }} |
        {{ 'Runtime: ' + item.metadata.runtime + ' mins' }} |
        <a :href="'https://www.imdb.com/title/' + item.metadata.imdb" target="_blank">IMDb</a>
      </v-card-subtitle>
      <!-- Tabs -->
      <v-card-text>
        <v-row>
          <v-col cols="3" v-if="!isMobile">
            <img
              :src="'https://image.tmdb.org/t/p/w200' + item.metadata.poster"
              :alt="item.metadata.title"
              style="object-fit: contain; width: 100%"
            />
          </v-col>
          <v-col class="pt-0">
            <v-tabs v-model="tab" class="mb-3 pa-0">
              <v-tabs-slider></v-tabs-slider>
              <v-tab>Overview</v-tab>
              <v-tab>Ohana </v-tab>
              <v-tab v-if="selection.joinStatus.status != 'missing'">Stream</v-tab>
              <v-tab v-if="false">Image</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab" style="height: 250px; overflow-y: auto">
              <!-- overview -->
              <v-tab-item>
                <div class="overview">
                  {{ item.metadata.overview }}
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
              </v-tab-item>

              <!-- Ohana -->
              <v-tab-item>
                <!-- Summary -->

                <div class="notification">
                  <v-row>
                    <v-col cols="1">
                      <v-icon :color="selection.color">{{ selection.icon }}</v-icon>
                    </v-col>
                    <v-col>
                      <span v-html="ohanaSummaryHtml"></span>
                    </v-col>
                  </v-row>
                </div>
                <!-- tagged chips-->
                <b>Filter details</b>
                <div v-for="(cat, index) in categories" :key="index" style="display: inline-block">
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
                <br />
                <a style="font-size: 0.8em" href="#">Report error</a>
              </v-tab-item>

              <!-- Stream optoins -->
              <!-- TODO: for now, removing the wathc options if status == missing (to protect users a bit) -->
              <v-tab-item v-if="selection.joinStatus.status != 'missing'">
                <a :href="selection.watch_url" class="button">Watch on {{ selection.provider }} </a>
              </v-tab-item>

              <!-- image -->

              <v-tab-item v-if="false">
                <img
                  :src="'https://image.tmdb.org/t/p/w200' + item.metadata.poster"
                  :alt="item.metadata.title"
                  style="object-fit: contain;"
                />
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" class="mbutton" text @click="closeMe()">Close</v-btn>
      </v-card-actions>
    </v-card>

    <!-- if no data -->
    <v-card v-else>
      <v-card-text style="height: 200px;">
        <div v-if="loading">Loading...</div>
        <div v-else>Error</div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
const provider = require('../assets/provider')
const rawTags = require('../assets/raw_tags')

export default {
  props: {
    isMobile: {
      type: Boolean,
      default: false
    },
    selection: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      tab: 0,
      item: {},

      categories: [],
      severities: [],
      loading: false
    }
  },

  watch: {
    selection() {
      this.item = {} //reset
      this.getData()
    }
  },

  computed: {
    mapping() {
      return {
        year: this.item.metadata.released ? this.item.metadata.released.substring(0, 4) : ''
      }
    },

    parsedURL() {
      return provider.parseURL(this.selection.watch_url)
    },

    ohanaSummaryHtml() {
      //TODO: Draft (shall we add here a link to watch, if safe?)
      let status = this.selection.joinStatus.status
      let cuts = this.selection.joinStatus.cuts
      let level = this.selection.joinStatus.level

      let type = this.item.metadata.type

      let text = ''
      if (status == 'done' && cuts == 0) {
        text = `${
          level > 5 ? 'We have certified that' : 'Our community says that'
        } this ${type} is clean for your settings (no filters needed).`
      } else if (status == 'done' && cuts > 0) {
        text = `${
          level > 5 ? 'We' : 'Our community'
        } have created filters for this ${type}, so that you can watch it safely with our Ohana Chrome extension.`
      } else if (status == 'missing') {
        text = `Watchout! This ${type} has unsafe content for your settings.`
      } else {
        text = `Careful! We don't yet have enough information for all your settings.`
      }

      return text
    }
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

      let auxx = this.item.scenes.filter(x => x.tags.includes(tag))
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
      this.$emit('close', false)
    },
    tagsDescription() {
      let x = {} //tag:desc
      rawTags.content.forEach(cat => {
        cat.severity.forEach(sev => {
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
        id: this.parsedURL.id,
        season: this.parsedURL.season,
        episode: this.parsedURL.episode,
        title: this.parsedURL.title
      })
      console.log('[alex] getting movie data', this.selection.watch_url, url)
      this.loading = true
      fetch(url)
        .then(r => r.text())
        .then(data => {
          let x = data.replaceAll('Slighty', 'Slightly') //data might come with "Slighty" instead of "Slightly". Let's fix here to avoid other ifelse around
          this.item = JSON.parse(x)
          this.loading = false
        })
    }
  },
  mounted() {
    this.categories = rawTags.categories
    this.severities = rawTags.severitiesR
    this.getData()
  }
}
</script>

<style>
.v-slide-group__prev {
  display: none !important;
}

.mbutton {
  border: none !important;
}

.notification {
  border: solid 1px lightgray;
  padding: 5px;
  margin-bottom: 8px;
  margin-top: 0px;
  white-space: pre-wrap;
  word-break: keep-all;
  line-height: normal;
}
</style>
