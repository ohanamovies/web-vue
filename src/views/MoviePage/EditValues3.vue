<template>
  <div>
    <v-alert class="mt-2" type="error">This doesn't work. We are working on it</v-alert>

    <!-- intro about values-->
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Non sit harum recusandae beatae enim
      quasi officiis assumenda, voluptatem dicta cupiditate similique praesentium suscipit, aperiam
      reprehenderit magni? Ducimus nemo quae quibusdam.
    </div>
    vote: {{ vote }}
    <div>
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

    <div v-if="false">
      <div v-for="item in items" :key="item.key">
        <div v-if="item.type == 'group'">
          <h2>{{ item.title.es }}</h2>
          <p>
            {{ item.tooltip.es }}
          </p>
        </div>

        <div v-if="item.type == 'value'">
          <b>{{ item.title.es }}</b>
          <br />
          <p>
            {{ item.tooltip.es }}
          </p>

          <table>
            <tr>
              <td>{{ item.vice.es || 'Unhealthy' }}</td>
              <td style="width: 200px">
                <v-slider hide-details></v-slider>
              </td>
              <td>{{ item.value.es || 'Healthy' }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div style="margin-top: 20px; border: 1px solid red">
      <br />
      Current data:
      <code>
        {{ original }}
      </code>
    </div>
  </div>
</template>

<script>
import MenuTooltip from '@/components/MenuTooltip.vue'
import { mapState } from 'vuex'

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
  },
  data() {
    return {
      key: 'value',
      raw_data: [],
      items: [],
      vote: {},
    }
  },
  methods: {
    voteIt(k, v) {
      console.log('change vote', k, v)
      this.vote[k] = v
      this.vote = JSON.parse(JSON.stringify(this.vote))
    },
    getColor(k) {
      let v = this.vote[k]
      if (v === undefined) return 'orange'

      if (v === 0) return 'gray'
      if (v > 0) return 'green'
      if (v < 0) return 'red'
      return 'primary'
    },
    //Fetch the data from the spreadsheet, and map to a more usable json
    async fetchData() {
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
        items.push(item2)
      }

      this.items = items
    },
  },
  mounted() {
    this.fetchData()
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
</style>
