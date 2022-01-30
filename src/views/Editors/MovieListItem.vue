<template>
  <div style="padding: 5px; margin: 5px; border-radius: 5px; border: 1px solid #e0e0e0">
    <table style="margin: 0">
      <router-link :to="'/item/' + item.imdb" class="no_hover">
        <tr v-if="item.title && Object.keys(item.title).length">
          <td v-if="poster" style="vertical-align: top; padding: 0px 5px" width="80">
            <img width="80" :src="poster" />
          </td>
          <td style="vertical-align: top; padding: 0px 5px">
            <h3 style="margin-bottom: 5px">
              {{ finalTitle }}
              <span style="font-size: 50%">({{ item.released }})</span>
            </h3>
            <span v-if="parentData" style="font-size: 75%; color: black"
              >Part of
              <router-link :to="'/item/' + parentData.imdb">
                {{ localize(parentData.title) }}</router-link
              ></span
            >

            <p v-if="false">{{ item.plot ? item.plot.en : '' }}</p>

            <div>
              <!-- providers (v2) -->
              <br />
              <ProvidersStatus v-if="true" :item="item" />
            </div>
          </td>
        </tr>
        <tr v-else style="color: black">
          Unknown/Invalid item
        </tr>
      </router-link>

      <tr>
        <td colspan="2">
          <span style="font-size: 80%"
            >Edited by:
            <v-chip
              :to="'/editors/user/' + cleanContributor(contributor)"
              v-for="(contributor, index2) in item.contributors.split(' ')"
              :key="index2"
              x-small
              class="ml-1"
              >{{ cleanContributor(contributor) }}</v-chip
            >
          </span>

          <br />
          <!-- skip tags -->
          <div>
            <FilterStatusChips x-small :item="item" />
          </div>

          <br />
          <span style="font-size: 75%; color: black">
            Last edited: {{ new Date(item.lastEdited).toLocaleString() }}
          </span>
          <br />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import ohana from '@/assets/ohana/index'
import FilterStatusChips from '@/components/Movies/FilterStatusChips'
import ProvidersStatus from '@/components/Movies/ProvidersStatus'
import { mapState } from 'vuex'
export default {
  components: {
    FilterStatusChips,
    ProvidersStatus,
  },
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },

  data() {
    return {
      key: 'value',
      parentData: false,
    }
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings']),
    joinStatus() {
      const mc = JSON.parse(JSON.stringify(this.item.movieContent))
      const st = JSON.parse(JSON.stringify(this.settings.skip_tags))
      let output = {}
      for (let i = 0; i < this.item.providers.length; i++) {
        const provider = this.item.providers[i]
        output[provider.provider] = ohana.movies.joinStatus3(mc, [provider], st)
      }

      return output
    },
    finalTitle() {
      if (this.item.season && this.item.episode) {
        return 'S' + this.item.season + 'E' + this.item.episode + ': ' + this.title
      } else {
        return this.title
      }
    },

    title() {
      return this.localize(this.item.title, 'primary')
    },
    poster() {
      //TODO: optimize poster size? (e.g.: w154)
      const emptyPoster = 'https://ohana.tv/images/empty-poster.png'
      let item = this.item
      if (this.parentData) item = this.parentData
      if (!item || !item.poster) return emptyPoster

      let path = ''
      if (item.poster[this.language]) path = item.poster[this.language]
      else if (item.poster['en']) path = item.poster['en']
      if (path) return 'https://image.tmdb.org/t/p/w200' + path
      else return emptyPoster
    },
  },
  methods: {
    localize(textObject, fallbackKey) {
      if (!textObject) return ''
      if (Object.keys(textObject).length == 0) {
        return ''
      }
      const lang = this.settings.language
      if (textObject[lang]) return textObject[lang]
      else if (textObject['en']) return textObject['en']
      else if (textObject[fallbackKey]) return textObject[fallbackKey]
      else return textObject[Object.keys(textObject)[0]]
    },
    cleanContributor(text) {
      let newtext = text.replace(/\s/g, '')
      newtext = newtext.replace(/@.*/g, '')
      newtext = newtext.toLowerCase()
      return newtext
    },

    providerUrl(providerID) {
      return ohana.providers.getLink2(providerID)
    },
  },
  async mounted() {
    //TODO: If API return this by default (tbc), no need to fetch parentData
    if (this.item.parent && this.item.parent.startsWith('tt')) {
      this.parentData = await ohana.api.getMovie(this.item.parent)
    }
  },
}
</script>

<style scoped>
.no_hover:hover {
  text-decoration: none;
}
</style>
