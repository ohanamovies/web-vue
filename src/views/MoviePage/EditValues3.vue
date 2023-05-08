<template>
  <div>
    <!-- intro about values-->
    <div style="margin-top: 8px">Let's dive deeper on the movie content</div>

    <div v-if="loading">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>

    <div v-else>
      <div>
        <span class="modern-link" @click="current = 'community'">Community Vote</span> |
        <span class="modern-link" @click="current = 'myvote'">My vote</span>
      </div>

      <div
        style="position: fixed; top: 60px; right: 20px; z-index: 99999"
        v-if="current == 'myvote'"
      >
        <v-btn color="primary" dark @click="castVote()">
          <v-icon>mdi-send</v-icon>
          cast values vote
        </v-btn>
      </div>
      <!-- with expansion panels and slider -->
      <div>
        <v-expansion-panels>
          <v-expansion-panel v-for="group in items" :key="group.key">
            <v-expansion-panel-header>
              {{ group.title.es }} ({{
                group.items.filter((x) => vote[x.key] !== undefined).length
              }})
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pa-0">
              <div style="margin-top: 5px">
                <div v-for="item in group.items" :key="item.key">
                  <div v-if="item.type == 'value'" style="margin-bottom: 30px">
                    <div>
                      <b>{{ item.title.es || item.key }}</b>
                      <MenuTooltip v-if="item.tooltip.es" icon="mdi-information-outline">
                        <v-card>
                          <v-card-text>{{ item.tooltip.es }}</v-card-text>
                        </v-card>
                      </MenuTooltip>
                    </div>

                    <!-- slider -->
                    <div style="width: 100%">
                      <v-slider
                        v-if="vote[item.key] !== undefined"
                        :readonly="current == 'community'"
                        hide-details
                        class="mb-0 pb-0"
                        ticks="always"
                        tick-size="4"
                        :min="-1"
                        :max="1"
                        :tick-labels-bah="['Unhealthy', 'Mild', 'None', 'Positive', 'Healthy']"
                        step="0.5"
                        :track-color="getColor(item.key)"
                        :color="getColor(item.key)"
                        v-model="vote[item.key]"
                      ></v-slider>
                      <v-slider
                        v-else
                        :readonly="current == 'community'"
                        :min="-1"
                        :max="1"
                        step="0.5"
                        :tick-size="4"
                        ticks="always"
                        class="mb-0 pb-0"
                        hide-details
                        track-color="gray"
                        color="gray"
                        :value="0"
                        @change="voteIt(item.key, $event)"
                      >
                      </v-slider>
                    </div>
                    <!-- text -->
                    <div
                      style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 80%;
                      "
                    >
                      <div style="margin-right: 15px">
                        {{ item.vice.es || 'Unhealthy' }}
                      </div>
                      <div style="margin-left: 15px; text-align: right">
                        {{ item.value.es || 'Healthy' }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <!-- only sliders (no expansion panels) -->
      <div v-if="false">
        <div v-for="(item, index) in items" :key="index">
          <!--group -->
          <div v-if="item.type == 'group'">
            <h2>{{ item.title.es }}</h2>
          </div>

          <!-- value -->
          <div v-if="item.type == 'value'" style="margin-bottom: 30px">
            <div>
              <b>{{ item.title.es || item.key }}</b>
              <MenuTooltip v-if="item.tooltip.es" icon="mdi-information-outline">
                <v-card>
                  <v-card-text>{{ item.tooltip.es }}</v-card-text>
                </v-card>
              </MenuTooltip>
            </div>

            <!-- slider -->
            <div style="width: 100%">
              <v-slider
                v-if="vote[item.key] !== undefined"
                :readonly="current == 'community'"
                hide-details
                class="mb-0 pb-0"
                ticks="always"
                tick-size="4"
                :min="-1"
                :max="1"
                :tick-labels-bah="['Unhealthy', 'Mild', 'None', 'Positive', 'Healthy']"
                step="0.5"
                :track-color="getColor(item.key)"
                :color="getColor(item.key)"
                v-model="vote[item.key]"
              ></v-slider>
              <v-slider
                v-else
                :readonly="current == 'community'"
                :min="-1"
                :max="1"
                step="0.5"
                :tick-size="4"
                ticks="always"
                class="mb-0 pb-0"
                hide-details
                track-color="gray"
                color="gray"
                :value="0"
                @change="voteIt(item.key, $event)"
              >
              </v-slider>
            </div>
            <!-- text -->
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 80%;
              "
            >
              <div style="margin-right: 15px">
                {{ item.vice.es || 'Unhealthy' }}
              </div>
              <div style="margin-left: 15px; text-align: right">
                {{ item.value.es || 'Healthy' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuTooltip from '@/components/MenuTooltip.vue'
import { mapState } from 'vuex'

import ohana from '@/assets/ohana/'

export default {
  components: {
    MenuTooltip,
  },
  props: {
    imdb: {
      type: String,
      default: '',
    },
    original: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    ...mapState(['settings']),
    values() {
      let keys = []
      let output = []
      let values = this.items.filter((x) => x.type == 'value')

      for (let i = 0; i < values.length; i++) {
        const v = values[i]
        if (!keys.includes(v.key)) {
          keys.push(v.key)
          output.push(v)
        } else {
          console.log(v)
        }
      }
      return output
    },
    communityVote() {
      let vote = {}
      for (const key in this.original) {
        if (Object.hasOwnProperty.call(this.original, key)) {
          const v = this.original[key]
          vote[key] = v.health
        }
      }
      return JSON.parse(JSON.stringify(vote))
    },
  },
  watch: {
    vote() {
      if (this.current == 'myvote') this.myVote = JSON.parse(JSON.stringify(this.vote))
    },
    current(newValue) {
      if (newValue == 'myvote') {
        this.vote = this.myVote
      } else {
        this.vote = this.communityVote
      }
    },
  },
  data() {
    return {
      loading: false,
      raw_data: [],
      items: [],
      vote: {},
      myVote: {},
      myOriginalVote: {},
      current: 'community', //community | myvote
    }
  },
  methods: {
    async getMyVote() {
      if (!this.imdb) return false

      let x = await ohana.api.query({
        action: 'getUserVote',
        about: 'setValues',
        user: this.settings.username,
        id: this.imdb,
      })
      let myVote = JSON.parse(JSON.stringify(x))

      let myVote2 = {}
      for (const key in myVote) {
        if (Object.hasOwnProperty.call(myVote, key)) {
          const v = myVote[key]
          myVote2[key] = v.health
        }
      }
      this.myVote = myVote2
      this.myOriginalVote = JSON.parse(JSON.stringify(myVote2))
    },
    voteIt(k, v) {
      console.log('change vote', k, v)
      this.vote[k] = v
      this.vote = JSON.parse(JSON.stringify(this.vote))
    },
    keysToHealth(object) {
      let output = {}
      for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
          const v = object[key]

          output[key] = { health: v }
        }
      }
      return output
    },
    castVote() {
      let voteData = this.keysToHealth(this.myVote)

      let query = {
        action: 'setValues',
        id: this.imdb,
        data: JSON.stringify(voteData),
      }

      ohana.api.query(query, true, true)
    },
    getColor(k) {
      let v = this.vote[k]
      if (v === undefined) return 'orange'

      if (v === 0) return 'primary'
      if (v > 0) return 'green'
      if (v < 0) return 'red'
      return 'orange'
    },
    //Fetch the data from the spreadsheet, and map to a more usable json
    async fetchData() {
      this.loading = true
      let x = await fetch(
        'https://script.google.com/macros/s/AKfycbzGvKKUIaqsMuCj7-A2YRhR-f7GZjl4kSxSN1YyLkS01_CfiyE/exec?id=1ozyTmKWEz-srfpRT_EMsohM2BYOjm2LFFP07hJ59O2I&sheet=values'
      )
      if (!x.ok) return
      let data = await x.json()
      this.raw_data = data

      //const lang = this.settings.language || 'es'

      //map data (groups language keys from `title_es="x"` into `title: {es: "x"}`)
      let items = []
      let validKeys = ['key', 'type', 'title', 'vice', 'value', 'tooltip'] //ignore others

      for (let i = 0; i < data.records.length; i++) {
        const item = data.records[i]
        const item2 = {}
        if (!item.type) continue

        for (const key in item) {
          if (Object.hasOwnProperty.call(item, key)) {
            const v = item[key]
            const k = key.split('_')[0]
            if (validKeys.includes(k)) {
              if (key.split('_').length > 1) {
                if (!item2[k]) item2[k] = {}
                item2[k][key.split('_')[1]] = v
              } else {
                item2[k] = v
              }
            }
          }
        }
        if (item2.type == 'group') {
          item2.items = []
          items.push(item2)
        } else {
          items[items.length - 1].items.push(item2)
        }
      }

      this.items = items

      //update vote when fetched data
      this.vote = this.communityVote
      this.loading = false
    },
  },
  mounted() {
    this.fetchData()
    this.getMyVote()
  },
}
</script>

<style scoped>
#values-table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#values-table td,
#values-table th {
  border: 1px solid #ddd;
  padding: 8px;
}

#values-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

#values-table tr:hover {
  background-color: #ddd;
}

#values-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}

button {
  box-shadow: none;
  color: initial !important;
}

.inactive {
  opacity: 0.1;
  color: gray !important;
}
.inactive:hover {
  opacity: 0.8;
}
</style>
