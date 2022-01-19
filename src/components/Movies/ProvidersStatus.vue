<template>
  <div>
    <b>hey</b>
    <v-chip v-for="(p, index) of providers" :key="index">
      {{ p }}
    </v-chip>
  </div>
</template>

<script>
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
      const mf = this.item.movieFilters
      const fs = this.item.filterStatus
      const providers = this.item.providers.map((p) => p.provider)

      let auxx = {}
      let output = []

      console.log('this.settings.skip_tags', this.settings.skip_tags)
      for (const tag of this.settings.skip_tags) {
        for (const provider of providers) {
          if (!auxx[provider]) auxx[provider] = true
          if (!fs[tag]) {
            auxx[provider] = false
            continue
          }
          for (const sid of fs[tag].scenes) {
            if (!mf[sid].times[provider]) auxx[provider] = false
          }
        }
      }

      for (const p in auxx) {
        output.push({ provider: p, done: auxx[p] })
      }
      return output
    },
  },
}
</script>

<style lang="scss" scoped></style>
