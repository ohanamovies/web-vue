<template>
  <div>
    <div class="subpage">
      <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
        <div class="inner">
          <EditorsIndex />
          <h1>Votes pending provider id: {{ items.length }}</h1>
          <p>This should be fixed by opening the url and doing a manual mapping</p>
          <div v-if="loading">Loading...</div>
          <div v-else>
            <div style="overflow-x: auto">
              <table>
                <tr>
                  <th>#</th>
                  <th>targetID</th>
                  <th>users</th>
                  <th>actions</th>
                  <th>lastEdit</th>
                </tr>
                <tr v-for="(item, index) in items" :key="index">
                  <td>
                    {{ index }}
                  </td>
                  <td style="font-size: 70%; max-width: 15px; word-wrap: break-word">
                    <a :href="watchUrl(item.targetID)" target="_blank">{{ item.targetID }}</a>
                  </td>
                  <td>
                    <v-chip
                      small
                      class="mr-1"
                      v-for="(user, j) in removeDup(JSON.parse(item.users))"
                      :key="j"
                      :to="'/editor/' + clean(user)"
                      >{{ clean(user) }}
                    </v-chip>
                  </td>
                  <td>
                    {{ JSON.parse(item.actions).join(', ') }}
                  </td>
                  <td>{{ item.lastEdit.toLocaleString() }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import EditorsIndex from './EditorsIndex.vue'
import ohana from '@/assets/ohana/index'
export default {
  components: {
    EditorsIndex,
  },
  data() {
    return {
      items: [],
      loading: false,
    }
  },
  methods: {
    clean(text) {
      if (typeof text === 'string') {
        let newtext = text.replace(/\s/g, '')
        newtext = newtext.replace(/@.*/g, '')
        newtext = newtext.toLowerCase()
        return newtext
      } else {
        return text
      }
    },
    removeDup(arr) {
      return [...new Set(arr)]
    },
    watchUrl(pid) {
      return ohana.providers.getLink2(pid)
    },
    async getData() {
      this.loading = true
      this.items = await ohana.api.query({
        action: 'getStats',
        about: 'pendingMapping',
      })
      this.loading = false
    },
  },
  mounted() {
    this.getData()
  },
}
</script>

<style scoped>
tr:nth-child(even) {
  background-color: #f2f2f2;
}
th {
  background-color: #4caf50;
  color: white;
}
</style>
