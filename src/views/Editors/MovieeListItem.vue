<template>
  <div style="padding: 5px; margin: 5px; border-radius: 5px; border: 1px solid #e0e0e0">
    <table style="margin: 0">
      <router-link :to="'/item/' + item.imdb" class="no_hover">
        <tr v-if="Object.keys(item.title).length">
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
                {{ parentData.title.primary }}</router-link
              ></span
            >

            <p v-if="false">{{ item.plot ? item.plot.en : '' }}</p>
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
          <span style="font-size: 80%">
            Platforms:
            <v-chip
              :href="providerUrl(provider.providerID)"
              target="_blank"
              v-for="(provider, index2) in item.providers"
              :key="index2"
              x-small
              class="ml-1"
              :color="joinStatus[provider.provider].color"
              dark
            >
              {{ provider.provider + ' (' + joinStatus[provider.provider].cuts + ' edits)' }}
              <v-avatar right>
                <v-icon x-small>{{
                  joinStatus[provider.provider].icon == 'none'
                    ? 'mdi-emoticon-happy'
                    : joinStatus[provider.provider].icon
                }}</v-icon>
              </v-avatar>
            </v-chip>
          </span>
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
import { mapState } from 'vuex'
export default {
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
      if (this.item.title[this.language]) return this.item.title[this.language]
      if (this.item.title['primary']) return this.item.title['primary']
      return ''
    },
    poster() {
      //returns item poster or parent's if parent imdb
      let path = ''
      let item = this.item
      if (this.parentData) item = this.parentData

      console.log('item', item)

      if (!item.poster) return false
      if (item.poster[this.language]) path = item.poster[this.language]
      else if (item.poster['en']) path = item.poster['en']

      if (path) return 'https://image.tmdb.org/t/p/w200' + path
      else return false //'https://ohana.tv/images/empty-poster.png'
    },
  },
  methods: {
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
