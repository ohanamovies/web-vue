<template>
  <div class="moviepage">
    <!-- overview -->
    <div>
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

        <div v-for="(p, index) in item.providers" :key="index">
          <h3>{{ p.provider }}</h3>
          <v-chip small v-for="(a, ai) in p.availability" :key="ai">{{ a }}</v-chip>
          <br />
          <div>
            {{ p.filterStatus }}
          </div>
          <div>
            <h4>Filters</h4>
            <div
              v-for="(scene, sid) in p.sceneFilters"
              :key="sid"
              style="border: 1px solid grey; border-radius: 5px; padding: 10px; margin-bottom: 10px"
            >
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
              {{ p.sceneFilters }}
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
      {{ item }}
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
    ...mapState(['isChrome', 'hasApp', 'isMobile']),
  },
  methods: {
    formatTime(t) {
      let sec = t / 1000
      let h = Math.floor(sec / 3600)
      let m = Math.floor((sec % 3600) / 60)
      let s = Math.floor((sec % 3600) % 60)

      let xh = h < 10 ? '0' + h : h
      let xm = m < 10 ? '0' + m : m
      let xs = s < 10 ? '0' + s : s
      return xh + ':' + xm + ':' + xs
    },
    language() {
      //TODO: use vuex?
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
    this.item = await ohana.api.getMovie(this.imdb)
    this.item = ohana.movies.addInfo(this.item, this.skipTags)
  },
}
</script>

<style scoped>
.moviepage {
  margin-top: 40px;
  padding: 10px;
  /*background-color: #141414;
  color: white;*/
}
</style>
