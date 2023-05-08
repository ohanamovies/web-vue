<template>
  <div class="moviepage">
    <!-- overview -->

    <div v-if="loading">
      <v-progress-linear indeterminate color="green"></v-progress-linear>
    </div>

    <MoviePopup :imdb="imdb" :hideCloseButton="true" />

    <br />

    <div v-if="!item.type">Hmm, something seems off.</div>
    <div v-else>
      <v-tabs v-model="tab">
        <v-tab>Content</v-tab>
        <v-tab>Filters</v-tab>
        <v-tab>Values</v-tab>
        <v-tab>Providers</v-tab>
        <v-tab v-if="showEpisodes">Episodes</v-tab>
        <v-tab>dev</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <!-- CONTENT -->
        <v-tab-item>
          <!-- filterStatus -->
          <div style="margin-top: 5px">
            <h4>Movie Content</h4>
            <p>{{ movieContentSummary }}</p>

            <MovieRating :item="item" />
            <FilterStatusChips small :item="item" />

            <EditTags v-if="false" :imdb="imdb" :original="item.filterStatus" />
          </div>

          <!-- values -->
          <h4>Values</h4>
          <EditValues :imdb="imdb" :original="item.movieValues" />

          <!-- Scenes -->
          <h4>All filters ({{ Object.keys(item.movieFilters).length }})</h4>
          <ScenesList :items="item.movieFilters" />

          <!-- providers -->
          <h4>Where to watch</h4>
          <ProvidersStatus :item="item" />

          <!-- Feedback -->
          <div>
            <hr />
            <a class="modern-link" :href="feedback_link" target="_blank">{{
              $t('feedbackPopUp')
            }}</a>
          </div>
        </v-tab-item>

        <!--movieFilters-->
        <v-tab-item>
          <ScenesList :items="item.movieFilters" />

          <code>
            {{ item.movieFilters }}
          </code>
        </v-tab-item>

        <!-- movie values -->
        <v-tab-item>
          <EditValues3 :imdb="imdb" :original="item.movieValues" />
        </v-tab-item>

        <!-- PROVIDERS -->
        <v-tab-item>
          <br />

          <div v-if="tmdbAvailability.lenght">
            <div v-for="(p, i) in tmdbAvailability" :key="i">
              {{ p }}
            </div>
          </div>

          <div v-for="(p, index) in item.providers" :key="index">
            <b>{{ p.provider }}</b>
            <div>
              <p>
                Link:
                <a
                  :href="getLink(p.provider, p.providerID)"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ getLink(p.provider, p.providerID) }}</a
                >
              </p>
              Countries available:
              <v-chip small v-for="(a, ai) in p.availability" :key="ai">{{ a }}</v-chip>
              <br />
              <br />
              <div>FilterStatus joinStatus: {{ joinStatus(p.filterStatus) }}</div>
              <code>{{ p.filterStatus }}</code>
            </div>
          </div>
        </v-tab-item>

        <!-- EPISODES -->
        <v-tab-item v-if="showEpisodes">
          <h4>Episodes are work in progress</h4>
          <div v-if="episodes">
            <router-link
              class="no-link"
              :to="'./' + episode.tconst"
              v-for="episode of episodes"
              :key="episode.tconst"
            >
              <div
                class="episodeListItem"
                :style="{ fontWeight: episode.tconst == imdb ? 'bold' : 'normal' }"
              >
                <div>
                  {{
                    'S' +
                    episode.seasonNumber +
                    'E' +
                    episode.episodeNumber +
                    ': ' +
                    episode.primaryTitle +
                    ' (' +
                    episode.runtimeMinutes +
                    ' min)'
                  }}
                </div>
                <div>
                  <v-icon :color="joinStatus(episode.filterStatus).color">{{
                    joinStatus(episode.filterStatus).icon2
                  }}</v-icon>
                </div>
              </div>
            </router-link>
          </div>
          <div v-else>Hmmm. No data?</div>
        </v-tab-item>

        <!-- DEV DATA -->
        <v-tab-item>
          <br />
          <p>This is data at {{ item.type }} level</p>

          <!-- some quick dev actions-->
          <div>
            <v-btn depressed @click="refreshMovieData">refresh movie data</v-btn>
          </div>

          <v-tabs v-model="movieDataTab">
            <v-tab>Raw data</v-tab>
            <v-tab>Raw data + AddInfo</v-tab>
            <v-tab>join status</v-tab>
            <v-tab>brief status</v-tab>
            <v-tab>providers status v2</v-tab>
          </v-tabs>

          <v-tabs-items v-model="movieDataTab">
            <!-- RAW DATA -->
            <v-tab-item>
              <div>
                <b>raw data</b>
                <pre
                  style="
                    background-color: rgba(200, 200, 200, 0.4);
                    padding: 10px;
                    white-space: pre-wrap;
                  "
                  >{{ item }}</pre
                >
              </div>
            </v-tab-item>

            <!-- RAW DATA + AddInfo -->
            <v-tab-item>
              <div>
                <b>raw data</b>
                <pre
                  style="
                    background-color: rgba(200, 200, 200, 0.4);
                    padding: 10px;
                    white-space: pre-wrap;
                  "
                  >{{ item_with_add_data }}</pre
                >
              </div>
            </v-tab-item>
            <!-- join_status -->
            <v-tab-item>
              <h4>join status</h4>
              <code>{{ item.join_status }}</code>
            </v-tab-item>

            <!-- brief status -->
            <v-tab-item>
              <h4>brief status</h4>
              <code>{{ item.brief_status }}</code>
            </v-tab-item>

            <v-tab-item>
              <h4>Providers v2</h4>
              <ProvidersStatus :item="item" />
            </v-tab-item>
          </v-tabs-items>
        </v-tab-item>
      </v-tabs-items>

      <div></div>
    </div>

    <br /><br /><br />
  </div>
</template>

<script>
import ohana from '@/assets/ohana/index'
import { mapState } from 'vuex'
import MoviePopup from '@/components/MoviePopup/MoviePopup.vue'

import EditValues from '@/views/MoviePage/EditValues2.vue'
import EditValues3 from '@/views/MoviePage/EditValues3.vue'
import EditTags from '@/views/MoviePage/EditTags.vue'

import ScenesList from '@/views/MoviePage/ScenesList.vue'

import sharedjs from '@/sharedjs'
import FilterStatusChips from '@/components/Movies/FilterStatusChips.vue'
import ProvidersStatus from '@/components/Movies/ProvidersStatus.vue'
import MovieRating from '@/components/Movies/MovieRating.vue'

export default {
  head: function () {
    //This is used to generate the meta tags needed for better SEO and stuff.
    //TODO: this is not reactive
    const titlejs = this.item.parent ? this.item.parentData.title : this.item.title
    let title = titlejs ? titlejs[this.settings.language] : 'Movie Page for ' + this.imdb
    let desc = 'Details about the movie ' + this.imdb // this.item.plot ? this.item.plot[this.settings.language]
    return sharedjs.headObject(title, desc)
  },
  components: {
    MoviePopup,
    EditValues,
    EditTags,
    ScenesList,
    FilterStatusChips,
    ProvidersStatus,
    MovieRating,
    EditValues3,
  },
  props: {
    imdb: {
      type: String,
      default: '',
    },
  },
  watch: {
    async imdb() {
      await this.getData()
    },
  },
  data() {
    return {
      tab: 0,
      providerTab: 0,
      movieDataTab: 0,
      loading: false,

      confirmCountry: false,

      item: {
        poster: { en: '', es: '' },
        title: { en: '', es: '' },
        plot: { en: '', es: '' },
        genres: [],
        join_status: { color: '', icon: '', status: '', cuts: -1 },
      },

      episodes: false,
    }
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings']),
    feedback_link() {
      return (
        'https://docs.google.com/forms/d/e/1FAIpQLScnTNbXu79Sbinmlw6QhBIa5T76T0QCEMFLt4OIiSN08aHQKw/viewform?usp=pp_url&entry.2077317668=' +
        '[request]: ' +
        this.item.title.primary +
        ' - imdb:' +
        this.item.imdb
      )
    },
    movieContentSummary() {
      let nFilters = 0
      const type = this.item.type
      let minHealth = null
      let minTrust = null
      for (const tag of this.settings.skip_tags) {
        nFilters += this.item.filterStatus[tag] ? this.item.filterStatus[tag].scenes.length : 0
        let h = this.item.filterStatus[tag] ? this.item.filterStatus[tag].health : 0
        let t = this.item.filterStatus[tag] ? this.item.filterStatus[tag].trust : 0
        if (!minHealth || h <= minHealth) minHealth = h
        if (!minTrust || t <= minTrust) minTrust = t
      }

      if (minHealth > 0.5 && minTrust > 1) {
        //TODO: Confirm minTrust threshold
        if (nFilters == 0) {
          return 'No need to filter this movie: the original is healthy for your as it is.'
        } else {
          return 'It takes ' + nFilters + ' filters to make this movie healthy for your settings.'
        }
      } else {
        if (nFilters == 0) {
          //TODO
          return 'This movie contains unhealthy scenes for your settings. But no one has created filters yet to make it healthy.'
        } else {
          return `We have ${nFilters} filters, but we are not sure if that's enough to make this ${type} healthy for your settings.`
        }
      }
    },
    item_with_add_data() {
      return ohana.movies.addInfo(this.item, this.settings.skip_tags)
    },
    showEpisodes() {
      return this.item.parent || this.episodes.length
    },
    tmdbAvailability() {
      if (!this.item.availability) return this.item.providers.map((p) => p.provider) //let's take the ones from our db
      let a = this.item.availability.split(' ')
      a = a.filter((x) => x.split('_')[1] == this.settings.country)
      return a.map((x) => x.split('_')[0])
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
  },
  methods: {
    async refreshMovieData() {
      let x = await ohana.api.query({
        action: 'refreshData',
        imdb: this.imdb,
      })
      alert(JSON.stringify(x))
    },
    includesAny(arr1, arr2) {
      return ohana.utils.includesAny(arr1, arr2)
    },
    getCuts(tag, providerData) {
      let cuts = 0

      for (const key in providerData.sceneFilters) {
        if (Object.hasOwnProperty.call(providerData.sceneFilters, key)) {
          const scene = providerData.sceneFilters[key]
          if (scene && scene.tags && scene.tags.includes(tag)) {
            cuts++
          }
        }
      }
      return cuts
    },

    joinStatus(filterStatus) {
      return ohana.movies.joinStatus2(filterStatus, this.settings.skip_tags)
    },
    getColor(tagStatus) {
      //TODO: use ohana.movies.xxx function instead of copy-pasting here...
      let color = ''

      if (tagStatus.health > 0.5) {
        color = 'green'
      } else if (tagStatus.health < -0.5) {
        color = 'red'
      } else {
        color = 'orange'
      }
      if (tagStatus.trust <= 1 || tagStatus.trust == Infinity) {
        color = 'lightgray'
      }
      return color
    },
    getLink(provider, providerID) {
      return ohana.providers.getLink(provider, providerID)
    },
    formatTime(t) {
      return ohana.utils.formatTime(t)
    },
    language() {
      return this.settings.language
    },

    parsedURL() {
      return ohana.providers.parseURL(this.item.watch_url) //TODO: taking the first URL because legacy we weren't using an array but a fixed value.
    },
    async getData() {
      this.loading = true
      //item
      this.item = await ohana.api.getMovie(this.imdb)
      this.item = ohana.movies.addInfo(this.item, this.settings.skip_tags)

      //episodes
      if (this.item.parent) {
        // this.parent_item = await ohana.api.getMovie(this.item.parent)
        this.episodes = await ohana.api.getEpisodes(this.item.parent)
      } else if (this.item.type == 'series') {
        this.episodes = await ohana.api.getEpisodes(this.imdb) //TODO: may not need to do await...
      }

      this.loading = false

      this.$emit('updateHead')
    },
  },
  async mounted() {
    await this.getData()
  },
}
</script>

<style scoped>
h4 {
  border-left: 5px solid rgb(108, 192, 145);
  padding-left: 5px;
  line-height: normal;
  margin-top: 40px;
  margin-bottom: 10px;
}

.episodeListItem {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

.episodeListItem:hover {
  background-color: #eee;
}

.moviepage {
  margin-top: 80px !important;
  padding: 10px;
  max-width: 800px;
  margin: auto;

  /*background-color: #141414;
  color: white;*/
}

/* TABLE */

#myBeautifulTable {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#myBeautifulTable td,
#myBeautifulTable th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

#myBeautifulTable tr:nth-child(even) {
  background-color: #f2f2f2;
}

#myBeautifulTable tr:hover {
  background-color: #ddd;
}

#myBeautifulTable th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}

.no-link:hover {
  text-decoration: none;
}
</style>
