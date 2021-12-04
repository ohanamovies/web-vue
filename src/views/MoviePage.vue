<template>
  <div class="moviepage">
    <!-- overview -->
    <div v-if="loading">
      <v-progress-linear indeterminate color="green"></v-progress-linear>
    </div>
    <div v-if="!loading">
      <h2>
        {{ title() }}
        <span style="font-size: 60%; font-color: rgba(0, 0, 0, 0.6); margin-top: 3px">
          ({{ item.released }})</span
        >
      </h2>
      <span style="font-color: rgba(0, 0, 0, 0.6); margin-top: 3px">type: {{ item.type }}</span>
      <v-row>
        <v-col>
          <img
            :src="poster()"
            :alt="title()"
            :style="{
              borderBottom: '4px solid ' + (item.join_status ? item.join_status.color : 'black'),
            }"
          />
        </v-col>
        <v-col>
          <div style="display: flex; justify-content: space-between">
            <b>Overview </b>
            <i style="font-size: 85%">{{ item.genres.join(' - ') }}</i>
          </div>
          <p>{{ plot() }}</p>
        </v-col>
      </v-row>
    </div>

    <div>
      <v-tabs v-model="tab">
        <v-tab>Movie Data</v-tab>
        <v-tab>Providers</v-tab>
        <v-tab>All data</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <!-- Movie Data -->
        <v-tab-item>
          <div>
            <h2>Movie Data</h2>
            <div>
              <h4>movieContent</h4>
              <code>{{ item.movieContent }}</code>
            </div>

            <div>
              <h4>join status</h4>
              <code>{{ item.join_status }}</code>
            </div>

            <div>
              <h4>brief status</h4>
              <code>{{ item.brief_status }}</code>
            </div>

            <div>
              <h4>Movie values</h4>
              <code>
                {{ item.movieValues }}
              </code>
            </div>
          </div>
        </v-tab-item>

        <!--Providers-->
        <v-tab-item>
          <div>
            <v-tabs v-model="providerTab">
              <v-tab v-for="(p, index) in item.providers" :key="index">{{ p.provider }}</v-tab>
            </v-tabs>

            <v-tabs-items v-model="providerTab">
              <v-tab-item v-for="(p, index) in item.providers" :key="index">
                {{ p.provider }}: {{ joinStatus(p.filterStatus).status }}
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
                      <table id="filterStatusTable" style="max-width: 300px" border="1">
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

                        <div style="margin-top: 5px">
                          Edited by @{{ scene.modified[0] }} (level {{ scene.modified[1] }}) on
                          {{ new Date(scene.modified[2]).toISOString() }}
                        </div>
                        <div style="margin-top: 5px">Accessed: {{ scene.accessed }} times</div>
                      </div>
                      <div style="font-size: 60%; font-family: consolas">
                        <code> {{ scene }}</code>
                      </div>
                    </div>
                  </div>
                </div>
              </v-tab-item>
            </v-tabs-items>

            <div v-for="(p, index) in item.providers" :key="index">
              <h3 class="providerH3" @click="focusProvider(index, $event)"></h3>
            </div>
          </div>
        </v-tab-item>

        <v-tab-item>
          <div>
            <b>all data</b>
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

export default {
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
      loading: false,

      item: {
        poster: { en: '' },
        title: { en: '' },
        plot: { en: '' },
        genres: [],
        join_status: { color: '', icon: '', status: '', cuts: -1 },
      },
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
    this.item = await ohana.api.getMovie(this.imdb)
    this.item = ohana.movies.addInfo(this.item, this.skipTags)
    this.loading = false
  },
}
</script>

<style scoped>
.moviepage {
  margin-top: 40px;
  padding: 10px;
  max-width: 800px;
  margin: auto;

  /*background-color: #141414;
  color: white;*/
}

.providerH3 {
  color: white;
  background-color: darkred;
  padding: 2px 10px;
  margin: 10px 0px;
  cursor: pointer;
}

/* TABLE */

#filterStatusTable {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#filterStatusTable td,
#filterStatusTable th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

#filterStatusTable tr:nth-child(even) {
  background-color: #f2f2f2;
}

#filterStatusTable tr:hover {
  background-color: #ddd;
}

#filterStatusTable th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}
</style>
