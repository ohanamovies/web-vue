<template>
  <div>
    <div style="display: flex; flex-wrap: wrap; margin-bottom: 0px; justify-content: left">
      <div v-for="(cat, c) in categories" :key="c">
        <v-chip small outlined class="ml-1 mb-1">
          <b>{{ cat }}:&nbsp; </b> {{ movieContentSummary(c).tag }}
        </v-chip>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ohana from '@/assets/ohana/'
const rawTags = require('@/assets/ohana/raw_tags')
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
  },
  methods: {
    movieContentSummary(catIndex) {
      return ohana.movies.getMySev(catIndex, this.item.movieContent, this.settings.skip_tags)
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
