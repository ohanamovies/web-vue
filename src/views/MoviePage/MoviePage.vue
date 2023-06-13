<template>
  <div class="moviepage">
    <!-- overview -->

    <MoviePopup :imdb="imdb" :hideCloseButton="true" />

    <br />

    <div v-if="!item.type">
      <div v-if="loading"></div>
      <div v-else>Hmm, something seems off.</div>
    </div>
    <div v-else>
      <v-tabs v-model="tab" class="mb-4" style="min-height: 50px">
        <v-tab>Content</v-tab>
        <v-tab>Values</v-tab>
        <v-tab v-if="showEpisodes">Episodes</v-tab>
        <v-tab v-if="item.type != 'series'">Filters</v-tab>
        <v-tab v-if="isAdmin">Providers</v-tab>
        <v-tab v-if="isAdmin">dev</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <!-- CONTENT -->
        <v-tab-item>
          <!-- filterStatus -->
          <div style="margin-top: 5px">
            <!--<p v-if="false">{{ movieContentSummary }}</p> MAE: Deprecate -->

            <MovieRating :item="item" />
            <!--<FilterStatusChips v-if="false" small :item="item" /> MAE: Deprecate -->

            <!-- <EditTags v-if="false" :imdb="imdb" :original="item.filterStatus" /> MAE: Deprecate -->
          </div>
        </v-tab-item>

        <!-- movie values -->
        <v-tab-item>
          <EditValues :imdb="imdb" :original="item.movieValues" />
        </v-tab-item>

        <!-- EPISODES -->
        <v-tab-item v-if="showEpisodes">
          <EpisodesView :item="item" />
        </v-tab-item>

        <!--movieFilters-->
        <v-tab-item v-if="item.type != 'series'">
          <ScenesList :items="item.movieFilters" />
        </v-tab-item>

        <!-- PROVIDERS -->
        <v-tab-item v-if="isAdmin">
          <p>Providers where ohana was used (kind of)</p>
          <br />

          <div v-if="tmdbAvailability.length">
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
            </div>
          </div>
        </v-tab-item>

        <!-- DEV DATA -->
        <v-tab-item v-if="isAdmin">
          <br />
          <p>This is data at {{ item.type }} level</p>

          <!-- some quick dev actions-->
          <div>
            <v-btn depressed @click="refreshMovieData">refresh movie data</v-btn>
          </div>

          <v-tabs v-model="movieDataTab">
            <v-tab>Raw data</v-tab>
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

import EditValues from '@/views/MoviePage/EditValues3.vue'
//import EditTags from '@/views/MoviePage/EditTags.vue' MAE: deprecate

import ScenesList from '@/views/MoviePage/ScenesList.vue'

import sharedjs from '@/sharedjs'
//import FilterStatusChips from '@/components/Movies/FilterStatusChips.vue' MAE: Deprecate
import ProvidersStatus from '@/components/Movies/ProvidersStatus.vue'
import MovieRating from '@/components/Movies/MovieRating.vue'

import EpisodesView from './EpisodesView.vue'

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
    //EditTags,  MAE: deprecate
    ScenesList,
    //FilterStatusChips, MAE: Deprecate
    ProvidersStatus,
    MovieRating,
    EpisodesView,
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
    }
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings']),
    isAdmin() {
      return ['sope', 'miguel', 'miguel2'].includes(this.settings.username)
    },
    movieContentSummary() {
      let fs = ohana.movies.getTagsHealth(this.item.filterStatus, this.settings.skip_tags)
      fs = ohana.movies.addText(fs, this.item.type)
      return fs.summary
    },
    showEpisodes() {
      return this.item.parent || this.item.type == 'series' || this.item.type == 'episode'
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
