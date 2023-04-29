<template>
  <div>
    <div style="display: flex; flex-wrap: wrap; margin-bottom: 0px; justify-content: center">
      <div v-for="(cat, c) in categories" :key="c">
        <v-chip small outlined class="mr-1 mb-1">
          <b>{{ cat }}</b
          >:

          {{ severity(getMySev(c).tag) }}
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
const rawTags = require('@/assets/raw_tags')
export default {
  components: {
    //VoteIcon,
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
      if (x[3] == 'Other') x.splice(3, 1)
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
    getMySev(catIndex) {
      //TODO: we probably need to consider trust here somehow
      //Note: this returns the "visible" severity based on original movie content, filters available, and user settings.
      //Note 2: We return an icon, but the happy face and the cut icons are not intuitive, as the returned severity is not cut/clean. The icon is useful when the severity is not healthy, to flag that! (so only using it when icon is not green)

      let sevs = rawTags.severitiesR[catIndex]

      let finalTag = ''
      let icon = ''
      let color = 'grey'
      let cuts = 0

      for (let i = 0; i < sevs.length; i++) {
        const sev = sevs[i]

        let fs = this.item.filterStatus[sev]
        if (!fs) fs = { health: 0, trust: 0, scenes: [] }

        let cares = this.settings.skip_tags.includes(sev)
        finalTag = sev

        //if original is clean, let's go to next tag (no matter if the user cares or not about this tag)
        if (fs.health > 0.5 && fs.scenes.length == 0) {
          if (cares) {
            icon = 'mdi-emoticon-happy'
            color = 'green'
          }
          if (i == sevs.length - 1) finalTag = 'None'
          continue
        }

        //if original is not clean, but user don't care, let's stop rigth there (no matter if edited or not, as user has not activated this filter)
        if (!cares) {
          break
        }

        //user cares, and is not clean, break as this is the current level of the movie
        if (fs.health <= -0.5) {
          icon = 'mdi-flag-variant'
          color = 'red'
          break
        }

        if (fs.health > -0.5 && fs.health < 0.5) {
          icon = 'mdi-flag-variant'
          color = 'orange'
          break
        }

        //else: original is not clean, but now it is clean, let's add the scenes to the count and keep checking

        cuts += fs.scenes.length
        icon = 'mdi-content-cut'
        color = 'green'
        if (i == sevs.length - 1) finalTag = 'None'
      }

      return { tag: finalTag, cuts, icon, color, use_icon: icon && color != 'green' ? true : false }
    },
  },
}
</script>

<style lang="scss" scoped></style>
