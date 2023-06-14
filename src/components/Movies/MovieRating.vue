<template>
  <div>
    <!-- without ohana -->
    <div style="margin-top: 15px">
      <div style="margin-bottom: 10px">
        <b>{{ $t('without_ohana') }}</b>
      </div>
      <FilterStatusBriefTags :filterStatus="item.movieContent" :align="'left'" />
    </div>

    <!-- with ohana -->
    <div
      v-if="settings && settings.skip_tags && settings.skip_tags.length"
      style="margin-top: 15px"
    >
      <div style="margin-bottom: 10px">
        <b>{{ $t('with_ohana') }}</b>
        <br />
        <span style="color: grey; font-size: 90%; font-weight: 400">{{
          $t('applying_your_settings')
        }}</span>
      </div>
      <FilterStatusBriefTags :filterStatus="item.filterStatus" :align="'left'" />
    </div>

    <!-- expansion panels -->
    <div style="margin-top: 30px; margin-bottom: 30px">
      <div style="margin-bottom: 10px">
        <b>{{ $t('filters_status') }}</b>
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
                  <v-icon v-if="getMySev(c).use_icon" size="17" :color="getMySev(c).color">{{
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
                <th>{{ $t('skip') }}</th>
                <th>{{ $t('what') }}</th>
                <th>{{ $t('status') }}</th>
                <th>{{ $t('my_vote') }}</th>
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
                  <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                      <div v-on="on" style="cursor: pointer">
                        {{ sev }}

                        <v-icon v-if="false" style="cursor: pointer" small color="primary"
                          >mdi-chevron-down</v-icon
                        >
                      </div>
                    </template>

                    <v-card>
                      <v-card-text>
                        {{ description(c, s) }}
                      </v-card-text>
                    </v-card>
                  </v-menu>
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

    <!-- save my vote -->
    <div style="margin-top: 0px; margin-bottom: 30px; text-align: center">
      <v-btn
        color="primary"
        style="color: white !important"
        @click="saveVote"
        :disabled="!loggedIn || !voteChanged"
        :loading="loading"
        >{{ $t('save_my_vote') }}</v-btn
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

const rawTags = require('@/assets/raw_tags')
export default {
  components: {
    StatusIconVue,
    VoteIcon,
    FilterStatusBriefTags,
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
    description(c, s) {
      return rawTags.descriptionsR[c][s]
    },
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

    getMySev(catIndex) {
      return ohana.movies.getMySev(catIndex, this.item.filterStatus, this.settings.skip_tags)
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
