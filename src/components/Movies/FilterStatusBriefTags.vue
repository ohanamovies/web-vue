<template>
  <div>
    <div
      :style="{ display: 'flex', flexWrap: ' wrap', marginBottom: '0px', justifyContent: align }"
    >
      <div v-for="(cat, c) in categories" :key="c">
        <v-chip small outlined class="mr-1 mb-1">
          <b>{{ cat }}</b
          >:

          {{ getMySev(c).tag }}
          <v-icon class="mr-1" right v-if="getMySev(c).use_icon" :color="getMySev(c).color">{{
            getMySev(c).icon
          }}</v-icon>
        </v-chip>
      </div>
    </div>
  </div>
</template>

<script>
//import VoteIcon from './VoteIcon.vue'
import { mapState } from 'vuex'
import ohana from '@/assets/ohana/'
const rawTags = require('@/assets/raw_tags')
export default {
  components: {
    //VoteIcon,
  },
  props: {
    filterStatus: {
      type: Object,
      default() {
        return {}
      },
    },
    align: {
      type: String,
      default: 'center',
    },
  },
  computed: {
    ...mapState(['settings']),
    categories() {
      let x = rawTags.categories
      if (x[3] == 'Other') x.splice(3, 1)
      return x
    },
    severities() {
      return rawTags.severitiesR
    },
  },
  methods: {
    getMySev(catIndex) {
      return ohana.movies.getMySev(catIndex, this.filterStatus, this.settings.skip_tags)
    },
  },
}
</script>

<style lang="scss" scoped></style>
