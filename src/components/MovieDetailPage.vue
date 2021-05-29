<template>
  <div class="mcontainer">
    <!-- Close Button -->
    <div @click="closeMe()" class="closeButton">
      <v-btn icon small><v-icon>mdi-close</v-icon></v-btn>
    </div>

    <!-- info -->
    <div v-if="item.metadata" class="minfo">
      <!-- image -->
      <div class="image" hidden>
        <img
          :src="'https://image.tmdb.org/t/p/w200' + item.metadata.poster"
          :alt="item.metadata.title"
          style="object-fit: contain;"
        />
      </div>

      <!-- header -->
      <div class="headerr">
        <h2 style="margin-bottom: 0px; padding-bottom: 0px;">
          {{ item.metadata.title }}
        </h2>
        <span style="font-size: 0.8em;  margin-bottom: 2em;"
          >{{ 'Year: ' + mapping.year }} | {{ 'TMDb Rating: ' + item.metadata.tmdb_rating }} |
          {{ 'Runtime: ' + item.metadata.runtime + ' minutes' }}</span
        >
      </div>

      <!-- overview -->
      <div class="overview">
        <h3>Overview</h3>
        {{ item.metadata.overview }}
      </div>

      <!-- Genres -->
      <div>
        <b style="font-size: 0.8em">Genres: </b>
        <v-chip v-for="(g, index) in item.metadata.genres" :key="index" x-small class="mr-1">{{
          g
        }}</v-chip>
      </div>

      <!-- Tagged Chips -->
      <div>
        <h3>Ohana guide</h3>
        <div v-for="(cat, index) in categories" :key="index" style="display: inline-block">
          <div v-if="cat != 'Other'" style="display: inline-block">
            <b style="font-size: 0.8em">{{ cat }}: </b>
            <div
              v-for="(sev, index2) in severities[index]"
              :key="index2"
              style="display: inline-block"
            >
              <v-chip x-small class="ma-1">
                <v-icon left x-small :color="tagged(sev).color">{{ tagged(sev).icon }}</v-icon>
                {{ tagged(sev).tag + tagged(sev).badge }}
              </v-chip>
            </div>
          </div>
        </div>
      </div>

      <!-- Watch Button -->
      <div class="watch_url" style="margin-top: 10px;">
        <h3>Stream options</h3>

        <a :href="watch_url" class="button">Watch on {{ platform }} </a>
      </div>
    </div>

    <!-- loading / error -->
    <div v-else style="margin: 30px; text-align: center ">
      <v-progress-circular
        indeterminate
        width="2"
        size="50"
        color="green"
        v-if="loading"
      ></v-progress-circular>
      <span v-else>Error</span>
    </div>
  </div>
</template>

<script>
const provider = require('../assets/provider')
const rawTags = require('../assets/raw_tags')

export default {
  props: {
    watch_url: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      item: {},

      categories: [],
      severities: [],
      loading: false
    }
  },

  watch: {
    watch_url() {
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
    platform() {
      let hostname = new URL(this.watch_url).hostname
      return hostname.replace('www.', '')
    },
    metadata() {
      return provider.parseURL(this.watch_url)
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
        id: this.metadata.id,
        season: this.metadata.season,
        episode: this.metadata.episode,
        title: this.metadata.title
      })
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
  }
}
</script>

<style>
.mcontainer {
  /*display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch; / * others: center, baseline, stretch (default) ...* /
*/
  position: relative;
  background-color: white;
  margin-right: 0px !important;
  margin-left: 0px !important;
  padding: 10px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.overview {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 0.9em;
}

.closeButton {
  position: absolute;

  top: 10px;

  right: 10px;
  z-index: 99999999999999;
}
h3 {
  font-size: 1.4em;
  margin-top: 1em;
  margin-bottom: 0.5em;
}
</style>
