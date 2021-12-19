<template>
  <div style="padding: 5px; margin: 5px; border-radius: 5px; border: 1px solid #e0e0e0">
    <router-link v-if="item.title" :to="'/item/' + item.imdb" class="no_link">
      <table style="margin: 0">
        <tr>
          <td style="vertical-align: top; padding: 0px 5px">
            <img height="100" :src="getPoster(item)" />
          </td>
          <td style="vertical-align: top; padding: 0px 5px">
            <h3>
              {{ item.title ? item.title.en : '' }}
              <span style="font-size: 50%">({{ item.released }})</span>
            </h3>
            <p v-if="false">{{ item.plot ? item.plot.en : '' }}</p>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <span style="font-size: 80%">
              Last edited: {{ new Date(item.lastEdited).toLocaleString() }} </span
            ><br />
            <span style="font-size: 80%">Edited by:</span>
            <v-chip
              :to="'/editors/' + clean(contributor)"
              v-for="(contributor, index2) in item.contributors.split(' ')"
              :key="index2"
              x-small
              class="ml-1"
              >{{ clean(contributor) }}</v-chip
            >
          </td>
        </tr>
      </table>
    </router-link>
    <div v-else>
      Invalid/Unknown item
      <br />

      <div v-if="item.providers && item.providers.length">
        <span style="font-size: 80%">
          Identify it in:
          <v-chip
            :href="providerUrl(provider.providerID)"
            target="_blank"
            v-for="(provider, index2) in item.providers"
            :key="index2"
            x-small
            class="ml-1"
            >{{ provider.provider }}</v-chip
          >
        </span>
      </div>
    </div>
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
.no_link:hover {
  text-decoration: none;
}
</style>
