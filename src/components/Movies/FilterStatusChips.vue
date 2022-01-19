<template>
  <div>
    <v-chip
      v-for="(v, k) of orderedTags"
      :key="k"
      :color="v.health > 0.5 ? 'green' : v.health < -0.5 ? 'red' : 'orange'"
      class="ma-1"
      :outlined="!settings.skip_tags.includes(k)"
      dark
      :small="xSmall ? false : small"
      :x-small="xSmall"
    >
      {{ k }}
      {{ '(' + v.scenes.length + (v.scenes.length == 1 ? ' filter' : ' filters') + ')' }}
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
        return {}
      },
    },
    small: {
      type: Boolean,
      default: true,
    },

    'x-small': {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings']),
    orderedTags() {
      let output = {}
      for (const t of this.settings.skip_tags) {
        output[t] = this.item.filterStatus[t] || { health: 0, scenes: [], trust: 0 }
      }
      for (const t in this.item.filterStatus) {
        if (!output[t]) {
          output[t] = this.item.filterStatus[t]
        }
      }
      return output
    },
  },
}
</script>

<style lang="scss" scoped></style>
