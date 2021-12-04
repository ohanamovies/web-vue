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

    <!-- movieContent -->
    <div>
      <!-- wihtouth ohana -->
      <div>
        <b>Wihtouth Ohana</b>
        <div>
          {{ item.movieContent }}
        </div>

        <b>With Ohana</b>

        <h2>Providers</h2>

        <div v-for="(p, index) in item.providers" :key="index">
          <h3
            class="providerH3"
            @click="visibleProvider == index ? (visibleProvider = -1) : (visibleProvider = index)"
          >
            {{ p.provider }}: {{ joinStatus(p.filterStatus).status }}
          </h3>
          <div v-if="visibleProvider == index">
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
              FilterStatus: {{ joinStatus(p.filterStatus) }}

              <div>
                <table id="filterStatus" style="max-width: 300px" border="1">
                  <tr>
                    <th>Tag</th>
                    <th>Health</th>
                    <th>Trust</th>
                    <th>Color</th>
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
                    <p>
                      <b>What you need to know:</b>
                      {{ scene.plot_description || 'No replacing text provided.' }}
                    </p>
                  </div>

                  <div>
                    <b>Filter Tags</b>
                    <v-chip x-small class="ml-1" v-for="(t, it) in scene.tags" :key="it">{{
                      t
                    }}</v-chip>
                  </div>

                  <div style="margin-top: 5px">
                    Edited by @{{ scene.modified[0] }} on
                    {{ new Date(scene.modified[2]).toISOString() }}
                  </div>
                  <div style="margin-top: 5px">Accessed: {{ scene.accessed }} times</div>
                </div>
                <div style="font-size: 60%; font-family: consolas">
                  <code> {{ p.sceneFilters }}</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />

        <b>Movie values</b>
        <div>
          {{ item.movieValues }}
        </div>
      </div>

      <div></div>
    </div>

    <div>
      <b>all data</b>
      <pre
        style="background-color: rgba(200, 200, 200, 0.4); padding: 10px; white-space: pre-wrap"
        >{{ item }}</pre
      >
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
      loading: false,
      visibleProvider: -1,
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

#filterStatus {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#filterStatus td,
#filterStatus th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

#filterStatus tr:nth-child(even) {
  background-color: #f2f2f2;
}

#filterStatus tr:hover {
  background-color: #ddd;
}

#filterStatus th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}
</style>
