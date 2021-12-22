<template>
  <div style="padding: 5px; margin: 5px; border-radius: 5px; border: 1px solid #e0e0e0">
    <table style="margin: 0">
      <router-link :to="'/item/' + item.imdb" class="no_hover">
        <tr v-if="item.title">
          <td style="vertical-align: top; padding: 0px 5px" width="80">
            <img width="80" :src="getPoster(item)" />
          </td>
          <td style="vertical-align: top; padding: 0px 5px">
            <h3>
              {{ item.title ? item.title.en : '' }}
              <span style="font-size: 50%">({{ item.released }})</span>
            </h3>
            <p v-if="false">{{ item.plot ? item.plot.en : '' }}</p>
          </td>
        </tr>
        <tr v-else style="color: black">
          Invalid/Unknown item
        </tr>
      </router-link>
      <tr>
        <td colspan="2">
          <span style="font-size: 80%"
            >Edited by:
            <v-chip
              :to="'/editor/' + clean(contributor)"
              v-for="(contributor, index2) in item.contributors.split(' ')"
              :key="index2"
              x-small
              class="ml-1"
              >{{ clean(contributor) }}</v-chip
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
  },
  methods: {
    clean(text) {
      let newtext = text.replace(/\s/g, '')
      newtext = newtext.replace(/@.*/g, '')
      newtext = newtext.toLowerCase()
      return newtext
    },
    getPoster(item) {
      if (!item || !item.poster) return
      return (
        'https://image.tmdb.org/t/p/w200' + item.poster[this.settings.language] || item.poster['en']
      ) //TODO: use size w154?
    },
    providerUrl(providerID) {
      return ohana.providers.getLink2(providerID)
    },
  },
}
</script>

<style scoped>
.no_hover:hover {
  text-decoration: none;
}
</style>
