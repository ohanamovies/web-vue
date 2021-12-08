<template>
  <div class="moviepage">
    <!-- overview -->

    <div v-if="loading">
      <v-progress-linear indeterminate color="green"></v-progress-linear>
    </div>

    <v-alert type="warning" outlined
      >Hey! please notice this page is under construction, and things don't work.</v-alert
    >

    <MoviePopup :imdb="imdb" :hideCloseButton="true" />

    <br />

    <div v-if="!item.type">Hmm, something seems off.</div>
    <div v-else>
      <v-tabs v-model="tab">
        <v-tab>Movie Data</v-tab>
        <v-tab>Providers</v-tab>
        <v-tab>Episodes</v-tab>
        <v-tab>Raw data</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <!-- MOVIE DATA -->
        <v-tab-item>
          <br />
          <p>This is data at {{ item.type }} level</p>
          <v-tabs v-model="movieDataTab">
            <v-tab>movieContent</v-tab>
            <v-tab>join status</v-tab>
            <v-tab>brief status</v-tab>
            <v-tab>values</v-tab>
          </v-tabs>

          <v-tabs-items v-model="movieDataTab">
            <!-- movieContent -->
            <v-tab-item>
              <h4>movieContent</h4>
              <table id="myBeautifulTable" style="max-width: 350px" border="1">
                <tr>
                  <th>Tag</th>
                  <th>Health</th>
                  <th>Trust</th>
                  <th>Color</th>
                  <th>Cuts</th>
                </tr>
                <tr v-for="(v, k) in item.movieContent" :key="k">
                  <td>{{ k }}</td>
                  <td>
                    {{ item.movieContent[k].health }}
                  </td>
                  <td>{{ item.movieContent[k].trust }}</td>
                  <td>
                    <v-icon small :color="getColor(item.movieContent[k])"
                      >mdi-checkbox-blank-circle</v-icon
                    >
                  </td>
                  <td>0</td>
                </tr>
              </table>
              <code>{{ item.movieContent }}</code>
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
            <!-- movie values -->
            <v-tab-item>
              <h4>Movie values</h4>
              <code>
                {{ item.movieValues }}
              </code>
            </v-tab-item>
          </v-tabs-items>
        </v-tab-item>

        <!-- PROVIDERS -->
        <v-tab-item>
          <br />
          <p>This is data at provider level</p>

          <v-tabs v-model="providerTab">
            <v-tab v-for="(p, index) in item.providers" :key="index">{{ p.provider }}</v-tab>
            <v-tab>+ Add Provider</v-tab>
          </v-tabs>

          <v-tabs-items v-model="providerTab">
            <v-tab-item v-for="(p, index) in item.providers" :key="index">
              <br />
              <p>
                status for you: <b>{{ joinStatus(p.filterStatus).status }}</b>
              </p>
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
                <div>
                  FilterStatus joinStatus: {{ joinStatus(p.filterStatus) }}

                  <div>
                    <table id="myBeautifulTable" style="max-width: 350px" border="1">
                      <tr>
                        <th>Tag</th>
                        <th>Health</th>
                        <th>Trust</th>
                        <th>Color</th>
                        <th>Cuts</th>
                      </tr>
                      <tr v-for="(v, k) in p.filterStatus" :key="k">
                        <td>{{ k }}</td>
                        <td>
                          {{ p.filterStatus[k].health }}
                        </td>
                        <td>{{ p.filterStatus[k].trust }}</td>
                        <td>
                          <v-icon small :color="getColor(p.filterStatus[k])"
                            >mdi-checkbox-blank-circle</v-icon
                          >
                        </td>
                        <td>
                          {{ getCuts(k, p) }}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <code>{{ p.filterStatus }}</code>
                <div>
                  <h4>Filters</h4>
                  <div
                    v-for="(scene, sid) in p.sceneFilters"
                    :key="sid"
                    style="
                      border: 1px solid grey;
                      border-radius: 5px;
                      padding: 10px;
                      margin-bottom: 10px;
                    "
                  >
                    <div v-if="scene">
                      <h5>Filter {{ sid }}</h5>
                      <p>
                        Duration: {{ formatTime(scene.end - scene.start) }}
                        <span style="font-size: 80%">
                          ({{ formatTime(scene.start) }} to {{ formatTime(scene.end) }})</span
                        >
                      </p>
                      <div>
                        <p :style="{ color: scene.plot_description ? 'default' : 'grey' }">
                          <b>What you need to know:</b>
                          <i>
                            {{ scene.plot_description || 'No replacing text provided.' }}
                          </i>
                        </p>
                      </div>

                      <div>
                        <b>Filter Tags</b>
                        <v-chip x-small class="ml-1" v-for="(t, it) in scene.tags" :key="it">{{
                          t
                        }}</v-chip>
                      </div>

                      <div style="margin-top: 5px" v-if="scene.modified">
                        Edited by @{{ scene.modified[0] }} (level {{ scene.modified[1] }}) on
                        {{ new Date(scene.modified[2]).toISOString() }}
                      </div>
                      <div v-else>edited: {{ scene.modified }}</div>
                      <div style="margin-top: 5px">Accessed: {{ scene.accessed }} times</div>
                    </div>
                    <div style="font-size: 60%; font-family: consolas">
                      <code> {{ scene }}</code>
                    </div>
                  </div>
                </div>
              </div>
            </v-tab-item>

            <v-tab-item>
              <div v-if="!settings.username">
                <b>Sorry, only registered users can edit stuff.</b>
                <Login style="border: 3px solid lightblue; padding: 10px; border-radius: 8px" />
              </div>
              <div v-else>
                <AddProvider />
              </div>
            </v-tab-item>
          </v-tabs-items>
        </v-tab-item>

        <v-tab-item>
          <h4>Episodes are work in progress</h4>
          <div v-if="episodes">
            {{ episodes }}
          </div>
          <div v-else>Hmmm. No data?</div>
        </v-tab-item>

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
      </v-tabs-items>

      <div></div>
    </div>

    <br /><br /><br />
  </div>
</template>

<script>
const provider = require('@/assets/provider')
import ohana from '@/assets/ohana'
import { mapState } from 'vuex'
import MoviePopup from '@/components/MoviePopup/MoviePopup.vue'
import Login from '@/components/Settings/Login.vue'
import AddProvider from '@/views/MoviePage/AddProvider.vue'

export default {
  components: {
    MoviePopup,
    Login,
    AddProvider,
  },
  props: {
    imdb: {
      type: String,
      default: '',
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
        poster: { en: '' },
        title: { en: '' },
        plot: { en: '' },
        genres: [],
        join_status: { color: '', icon: '', status: '', cuts: -1 },
      },
      episodes: false,
    }
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings']),
  },
  methods: {
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
      //TODO: use vuex to maintain reactiveness?
      return this.$i18n.locale.toLowerCase().split('-')[0]
      //return ohana.user.language()
    },

    poster() {
      let path = this.item.poster[this.language()] || this.item.poster['en']
      return 'https://image.tmdb.org/t/p/w200' + path
    },

    title() {
      if (!this.item.title) return ''
      return this.item.title[this.language()] || this.item.title['primary']
    },

    plot() {
      return this.item.plot[this.language()] || this.item.plot['en']
    },

    parsedURL() {
      return provider.parseURL(this.item.watch_url) //TODO: taking the first URL because legacy we weren't using an array but a fixed value.
    },
  },
  async mounted() {
    this.loading = true
    //item
    this.item = await ohana.api.getMovie(this.imdb)
    this.item = ohana.movies.addInfo(this.item, this.skipTags)

    //episodes
    if (this.item.type == 'series') {
      this.episodes = await ohana.api.getEpisodes(this.imdb) //not doing await
    }
    this.loading = false
  },
}
</script>

<style scoped>
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
</style>
