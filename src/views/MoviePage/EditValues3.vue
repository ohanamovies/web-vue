<template>
  <div>
    <!-- intro about values-->
    <div style="margin-bottom: 10px">
      <span v-if="!movieValues || !movieValues.length">
        {{ $t('no_values_known_for') }}
      </span>
      <span v-else> Let's dive deeper into the movie values - </span>

      <span v-if="current == 'myvote'" class="modern-link" @click="current = 'community'">{{
        $t('stop_editing')
      }}</span>
      <span
        v-else-if="current == 'community'"
        class="modern-link"
        @click="current = loggedIn ? 'myvote' : 'needLogIn'"
        >{{ $t('edit') }}</span
      >
      <div v-else style="font-style: italic; font-size: smaller">
        {{ $t('you_need_to_have') }}
        <router-link to="/settings">{{ $t('log_in') }}</router-link>
      </div>
    </div>

    <div>
      <div
        style="position: fixed; top: 60px; right: 20px; z-index: 99999"
        v-if="current == 'myvote'"
      >
        <v-btn color="primary" dark @click="castVote()">
          <v-icon>mdi-send</v-icon>
          {{ $t('cast_values_vote') }}
        </v-btn>
      </div>

      <div v-if="current != 'myvote'">
        <v-card
          v-for="value in movieValues"
          :key="value.key"
          variant="outlined"
          style="margin: 15px"
        >
          <v-card-title style="display: flex; justify-content: space-between">
            <span
              >{{ value.title[lang] }}
              <span v-if="value.parent"> ({{ value.parent.title[lang] }}) </span>
            </span>

            <span :style="{ color: value.color, fontSize: 13 + 'px', fontWeight: 'normal' }">
              <span v-if="!value.isHealthy" :style="{ color: value.color }"
                >{{ $t('unhealthy') }}
              </span>
              <span v-else>{{ $t('healthy') }} </span>
              {{ Math.round(value.health * 10) }} / 10
            </span>
          </v-card-title>
          <!--<v-card-subtitle v-if="value.parent && value.parent.title"
            >

            <!- -
            <img :src="'images/values/thumbsdown.png'" style="float: left; width: 15px" />
            <img :src="'images/values/thumbsdown.png'" style="float: left; width: 15px" />
            <img :src="'images/values/thumbsup.png'" style="float: left; width: 15px" />
            <img :src="'images/values/thumbsup.png'" style="float: left; width: 15px" />- ->
          </v-card-subtitle>-->

          <v-card-text>
            <v-row>
              <v-col
                :style="[
                  !value.isHealthy
                    ? { margin: 5 + 'px', border: 3 + 'px solid ' + value.color }
                    : { opacity: 0.4 },
                ]"
              >
                <img
                  :src="'images/values/' + value.vice.icon + '.png'"
                  style="float: left; width: 25%; min-width: 70px; padding: 5px"
                />
                {{ value.vice[lang] }}
              </v-col>
              <v-col
                :style="[
                  value.isHealthy
                    ? { margin: 5 + 'px', border: 3 + 'px solid ' + value.color }
                    : { opacity: 0.4 },
                ]"
              >
                <img
                  :src="'images/values/' + value.value.icon + '.png'"
                  style="float: right; width: 25%; min-width: 70px; padding: 5px"
                />
                {{ value.value[lang] }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </div>

      <!-- with expansion panels and slider -->
      <div v-else>
        <v-expansion-panels>
          <v-expansion-panel v-for="group in items" :key="group.key">
            <v-expansion-panel-header>
              <v-card-title class="pa-0" style="font-size: 14pt">
                {{ group.title[lang] }} ({{
                  group.items.filter((x) => vote[x.key] !== undefined).length
                }})
              </v-card-title>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pa-0">
              <div style="margin-top: 5px">
                <div v-for="item in group.items" :key="item.key">
                  <div v-if="item.type == 'value'" style="margin-bottom: 30px">
                    <div>
                      <b>{{ item.title[lang] || item.key }}</b>
                      <MenuTooltip v-if="item.tooltip[lang]" icon="mdi-information-outline">
                        <v-card>
                          <v-card-text>{{ item.tooltip[lang] }}</v-card-text>
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
                        {{ item.vice[lang] || 'Unhealthy' }}
                      </div>
                      <div style="margin-left: 15px; text-align: right">
                        {{ item.value[lang] || 'Healthy' }}
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
            <h2>{{ item.title[lang] }}</h2>
          </div>

          <!-- value -->
          <div v-if="item.type == 'value'" style="margin-bottom: 30px">
            <div>
              <b>{{ item.title[lang] || item.key }}</b>
              <MenuTooltip v-if="item.tooltip[lang]" icon="mdi-information-outline">
                <v-card>
                  <v-card-text>{{ item.tooltip[lang] }}</v-card-text>
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
                {{ item.vice[lang] || 'Unhealthy' }}
              </div>
              <div style="margin-left: 15px; text-align: right">
                {{ item.value[lang] || 'Healthy' }}
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
import values_list from '@/assets/values'
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
    lang() {
      return this.settings.language
    },
    loggedIn() {
      return this.settings.username ? true : false
    },
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
    movieValues() {
      let values = values_list.flat
      let output = []
      let def = { vice: {}, title: {}, value: {}, tooltip: {} }

      //for (const key in values) {
      for (const key in this.original) {
        if (!this.original[key].health) continue
        if (!values[key]) continue
        if (values[key].items) continue // ignore parent elements
        const value = { ...def, ...values[key] }
        //        value = ohana.movies.addColors(value)
        value.health = this.original[key].health
        value.trust = this.original[key].trust
        /*value.health = (Math.random() - 0.5) * 2
        value.trust = 10*/

        if (!value.vice.icon) value.vice.icon = 'vice'
        if (!value.value.icon) value.value.icon = 'value'

        value.isHealthy = ohana.movies.isHealthy(value)
        value.color = ohana.movies.addColors(value).color

        output.push(value)
      }
      return output
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
      if (!this.imdb || !this.settings.username) return false

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
      this.items = values_list.values
      //update vote when fetched data
      this.vote = this.communityVote
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
