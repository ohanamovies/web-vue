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
        <v-tab>movie Content</v-tab>
        <v-tab>movie Scenes</v-tab>
        <v-tab>values</v-tab>
        <v-tab>Providers</v-tab>
        <v-tab>Episodes</v-tab>
        <v-tab>dev</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
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

        <!--movieScenes-->
        <v-tab-item>
          <div v-for="(scene, sid) in item.movieScenes" :key="sid">
            <SceneItem :scene="scene" />
          </div>
          <code>
            {{ item.movieScenes }}
          </code>
        </v-tab-item>

        <!-- movie values -->
        <v-tab-item>
          <EditValues :imdb="imdb" />
          <br />
          Current data:
          <code>
            {{ item.movieValues }}
          </code>
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
                      <SceneItemOld :scene="scene" />
                    </div>
                  </div>
                </div>
              </div>
            </v-tab-item>

            <!-- Add Provider -->
            <v-tab-item>
              <div style="margin-top: 10px">
                To add a provider, you must open the {{ item.type }} in that provider, and start
                editing. We will guide you there.
              </div>
              <div v-if="false">
                <div v-if="!settings.username">
                  <b>Sorry, only registered users can edit stuff.</b>
                  <Login style="border: 3px solid lightblue; padding: 10px; border-radius: 8px" />
                </div>
                <div v-else>
                  <AddProvider />
                </div>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </v-tab-item>

        <!-- EPISODES -->
        <v-tab-item>
          <h4>Episodes are work in progress</h4>
          <div v-if="episodes">
            <router-link
              :to="'./' + episode.tconst"
              v-for="episode of episodes"
              :key="episode.tconst"
            >
              <div
                class="episodeListItem"
                :style="{ fontWeight: episode.tconst == imdb ? 'bold' : 'normal' }"
              >
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
                <br />
              </div>
            </router-link>
          </div>
          <div v-else>Hmmm. No data?</div>
        </v-tab-item>

        <!-- DEV DATA -->
        <v-tab-item>
          <br />
          <p>This is data at {{ item.type }} level</p>
          <v-tabs v-model="movieDataTab">
            <v-tab>Raw data</v-tab>
            <v-tab>Raw data + AddInfo</v-tab>
            <v-tab>join status</v-tab>
            <v-tab>brief status</v-tab>
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
import Login from '@/components/Settings/Login.vue'
import AddProvider from '@/views/MoviePage/AddProvider.vue'
import EditValues from '@/views/MoviePage/EditValues2.vue'
import SceneItem from '@/views/MoviePage/SceneItem.vue'
import SceneItemOld from '@/views/MoviePage/SceneItemOld.vue'
import sharedjs from '@/sharedjs'

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
    Login,
    AddProvider,
    EditValues,
    SceneItem,
    SceneItemOld,
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
    item_with_add_data() {
      return ohana.movies.addInfo(this.item, this.settings.skip_tags)
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
      this.item = ohana.movies.addInfo(this.item, this.skipTags)

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
</style>
