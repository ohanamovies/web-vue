<template>
  <div>
    <div style="display: flex; flex-wrap: wrap; margin-bottom: 0px; justify-content: center">
      <div v-for="(cat, c) in categories" :key="c">
        <v-chip small outlined class="ml-1 mb-1">
          <b>{{ cat }}:&nbsp; </b> {{ severity(movieContentSummary(c).tag) }}
        </v-chip>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const rawTags = require('@/assets/raw_tags')
export default {
  components: {},
  data() {
    return {
      showMyVote: false,
    }
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    ...mapState(['settings']),
    categories() {
      let x = rawTags.categories
      if (x.length > 2 && x[3] == 'Other') x.splice(3, 1)
      return x
    },
    severities() {
      return rawTags.severitiesR
    },
  },
  methods: {
    severity(tag) {
      if (!tag) return ''
      let dict = {
        Very: 'Severe',
        Moderately: 'Moderate',
        Mildly: 'Mild',
        Slightly: 'Slight',
        Slighty: 'Slight',
        None: 'None',
      }
      for (const k in dict) {
        if (String(tag).startsWith(k)) {
          return dict[k]
        }
      }
      return this.tag
    },
    movieContentSummary(catIndex) {
      let output = { tag: '', health: 0, trust: 0 }
      //return ohana.movies.getSummary(this.item)

      let sevs = this.severities[catIndex]
      for (let i = 0; i < sevs.length; i++) {
        const sev = sevs[i]
        let mc = this.item.movieContent

        if (!mc || !mc[sev]) {
          mc = { health: 0, trust: 0 }
        } else {
          mc = mc[sev]
        }
        mc.tag = sev
        if (mc.health > 0.5 && mc.trust > 1) continue
        output = mc
        break
      }

      if (!output.tag) output.tag = 'None'

      return output
    },
  },
}
</script>

<style scoped>
button {
  box-shadow: none;
  color: initial !important;
}
.pointer {
  cursor: pointer;
}
</style>
