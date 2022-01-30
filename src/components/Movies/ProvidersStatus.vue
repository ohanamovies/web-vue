<template>
  <div>
    <div v-if="providers.length" style="display: flex">
      <div v-for="(p, index) of providers" :key="index">
        <a
          :class="['provider-link', p.providerID ? '' : 'disabled']"
          target="_blank"
          :href="getLink(p.provider, p.providerID)"
          style="position: relative"
        >
          <img :src="getLogo(p.provider)" :alt="p.provider" />
          <div style="position: absolute; bottom: 0px; right: 0px">
            <v-icon
              v-if="p.status == 'done'"
              small
              color="green"
              style="background-color: white; border-radius: 50%"
              >{{ p.trust > 3 ? 'mdi-shield-check' : 'mdi-shield-check-outline' }}</v-icon
            >
            <v-icon
              v-else-if="p.status == 'missing'"
              small
              color="red"
              style="background-color: white; border-radius: 50%"
              >{{ p.trust > 3 ? 'mdi-shield-alert' : 'mdi-shield-alert-outline' }}
            </v-icon>
            <v-icon v-else small color="orange" style="background-color: white; border-radius: 50%"
              >mdi-help-circle</v-icon
            >
          </div>
        </a>
      </div>
    </div>
    <div v-else>
      {{ $t('popup.no_providers')[0] }}
      <a
        class="modern-link"
        v-if="item.tmdb"
        target="_blank"
        :href="'https://www.themoviedb.org/' + item.tmdb + '/watch?&locale=' + settings.country"
        >{{ $t('popup.no_providers')[1] }}.
      </a>
    </div>
  </div>
</template>

<script>
import ohana from '@/assets/ohana'
import { mapState } from 'vuex'
export default {
  props: {
    item: {
      type: Object,
      default: function () {
        return { filterStatus: {}, movieFilters: {}, providers: [] }
      },
    },
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings']),
    providers() {
      const movieFilters = this.item.movieFilters
      const filterStatus = this.item.filterStatus
      const country = this.settings.country.toLowerCase()

      let providers = []

      if (this.item.availability) {
        providers = this.item.availability
          .split(' ')
          .filter((x) => x.split('_')[1] == country)
          .map((y) => y.split('_')[0])
      } else {
        providers = this.item.providers.map((p) => p.provider)
      }

      let pstatus = {} //{netflix: done, hulu: missing, primevideo: unknown} -> means netflix is ready, hulu nope
      let output = [] // [{provider: netflix, done: true, providerID: xxx}, {provider: hulu, done: false, providerID: xxx} ]

      let minTrust = Infinity
      console.log('this.settings.skip_tags', this.settings.skip_tags)
      for (const provider of providers) {
        pstatus[provider] = 'done' //until proven otherwise
        for (const tag of this.settings.skip_tags) {
          //Unkown
          if (!filterStatus[tag]) {
            pstatus[provider] = 'unknown'
            continue
          }
          if (filterStatus[tag].trust < minTrust) {
            minTrust = filterStatus[tag].trust
          }
          if (Math.abs(filterStatus[tag].health) < 0.5 && pstatus[provider] == 'done') {
            pstatus[provider] = 'unknown'
            continue
          } else if (filterStatus[tag].health < -0.5) {
            pstatus[provider] = 'missing'
            continue
          }

          //Missing
          for (const sid of filterStatus[tag].scenes) {
            //if it's missing a filter, it's not ready
            if (!movieFilters[sid].times[provider]) pstatus[provider] = 'missing'
          }
        }
      }

      for (const p in pstatus) {
        const providerID = this.item.providers.find((x) => x.provider == p).providerID
        output.push({ provider: p, status: pstatus[p], providerID: providerID, trust: minTrust })
      }
      return output
    },
  },
  methods: {
    getLogo(provider) {
      return ohana.providers.getLogo(provider)
    },
    getLink(provider, providerID) {
      return ohana.providers.getLink(provider, providerID)
    },
  },
}
</script>

<style scoped>
.provider-link > img {
  width: 35px;
  margin: 2px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.disabled {
  filter: grayscale(100%);
}
</style>
