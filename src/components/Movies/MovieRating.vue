<template>
  <div>
    <!-- without ohana -->
    <div style="margin-top: 30px">
      <div style="margin-bottom: 10px">
        <b>Without Ohana</b>
      </div>
      <MovieContentBriefTags :item="item" />
    </div>

    <!-- with ohana -->
    <div
      v-if="settings && settings.skip_tags && settings.skip_tags.length"
      style="margin-top: 30px"
    >
      <div style="margin-bottom: 10px">
        <b>With Ohana</b>
        <br />
        <span style="color: grey; font-size: 90%; font-weight: 400">Applying your settings</span>
      </div>

      <FilterStatusBriefTags :item="item" />
    </div>

    <!-- expansion panels -->
    <div style="margin-top: 30px; margin-bottom: 30px">
      <div style="margin-bottom: 10px">
        <b>Filters Status</b>
      </div>

      <v-expansion-panels>
        <v-expansion-panel v-for="(cat, c) in categories" :key="c">
          <v-expansion-panel-header style="height: auto">
            <div style="display: flex">
              <div style="display: block">
                <v-card-title class="pa-0 pb-3">
                  {{ cat }}
                </v-card-title>

                <v-card-subtitle class="pa-0">
                  {{ getMySev(c).tag }}

                  <!-- icon: we only show the icon if red flag, or grey question mark (otherwise it seems we are saying this severity is good)-->
                  <v-icon v-if="getMySev(c).use_icon" :color="getMySev(c).color">{{
                    getMySev(c).icon
                  }}</v-icon>
                </v-card-subtitle>
              </div>
            </div>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <!-- table with info -->
            <table style="margin-top: 5px">
              <tr>
                <th>Skip</th>
                <th>What</th>
                <th>Status</th>
                <th>My Vote</th>
              </tr>
              <tr v-for="(sev, s) in severities[c]" :key="s">
                <td style="padding: 0px">
                  <v-btn icon>
                    <v-icon v-if="settings.skip_tags.includes(sev)" class="pointer" color="green"
                      >mdi-eye-off</v-icon
                    >
                    <v-icon v-else class="pointer" color="grey">mdi-eye</v-icon>
                  </v-btn>
                </td>
                <td>
                  {{ sev }}
                </td>
                <td>
                  <StatusIconVue :item="item" :tag="sev" />
                </td>
                <td>
                  <VoteIcon v-model="myVote.tagged[sev]" :tag="sev" />
                </td>
              </tr>
            </table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <!-- save my vote-->
    <div style="margin-top: 0px; margin-bottom: 30px; text-align: center">
      <v-btn
        color="primary"
        style="color: white !important"
        @click="saveVote"
        :disabled="!loggedIn || !voteChanged"
        :loading="loading"
        >save my vote</v-btn
      >
    </div>

    <!-- some debug metadata -->
    <div v-if="false" style="margin-top: 30px">
      {{ settings }}

      <pre>{{ JSON.stringify(item.filterStatus, null, 2) }}</pre>

      <div v-for="(tag, key) in item.filterStatus" :key="key">{{ key }}: {{ tag }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import ohana from '@/assets/ohana/'

import StatusIconVue from './StatusIcon.vue'
import VoteIcon from './VoteIcon.vue'
import FilterStatusBriefTags from './FilterStatusBriefTags.vue'
import MovieContentBriefTags from './MovieContentBriefTags.vue'

const rawTags = require('@/assets/raw_tags')
export default {
  components: {
    StatusIconVue,
    VoteIcon,
    FilterStatusBriefTags,
    MovieContentBriefTags,
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      key: 'value',
      loading: false,
      tags: [{ tag: 'Very erotic' }],
      myVote: { scenes: [], tagged: {} },
      myOriginalVote: { scenes: [], tagged: {} },
    }
  },
  computed: {
    ...mapState(['settings']),
    loggedIn() {
      return this.settings.username ? true : false
    },

    categories() {
      let x = rawTags.categories
      if (x[3] == 'Other') x.splice(3, 1)
      return x
    },
    severities() {
      return rawTags.severitiesR
    },
    voteChanged() {
      return JSON.stringify(this.myVote) != JSON.stringify(this.myOriginalVote)
    },
  },
  methods: {
    async getMyVote() {
      if (!this.item.imdb) return false

      let x = await ohana.api.query({
        action: 'getUserVote',
        about: 'setTagged',
        user: this.settings.username,
        id: this.item.imdb,
      })
      this.myVote = JSON.parse(JSON.stringify(x))
      this.myOriginalVote = JSON.parse(JSON.stringify(x))
    },
    async saveVote() {
      if (!this.item.imdb) return false

      const vote = JSON.parse(JSON.stringify(this.myVote))
      this.loading = true
      let x = await ohana.api.query({
        action: 'setTagged',
        id: this.item.imdb,
        data: JSON.stringify(vote),
      })
      console.log('saveVote', x)
      this.loading = false
    },
    severity(tag) {
      if (!tag) return ''
      let dict = {
        Very: 'Severe',
        Moderately: 'Moderate',
        Mildly: 'Mild',
        Slightly: 'Slight',
        Slighty: 'Slight',
      }
      for (const k in dict) {
        if (String(tag).startsWith(k)) {
          return dict[k]
        }
      }
      return this.tag
    },
    filterStatus(sev) {
      return this.item.filterStatus[sev]
        ? this.item.filterStatus[sev]
        : { health: 0, trust: 0, scenes: [] }
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
          icon = 'mdi-progress-question'
          color = 'grey'
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
  mounted() {
    this.getMyVote()
  },
}
</script>

<style scoped>
.card {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 5px;
  max-width: 300px;
}
button {
  box-shadow: none;
  color: initial !important;
}
.pointer {
  cursor: pointer;
}

.inactive {
  opacity: 0.1;
  color: gray !important;
}
.inactive:hover {
  opacity: 0.8;
}

/*disabled button*/
.theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: rgba(100, 100, 100, 0.7) !important;
}
</style>
