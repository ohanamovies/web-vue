<template>
  <div>
    <div class="subpage">
      <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
        <h1>Votes pending provider id: {{ items.length }}</h1>
        <p>This should be fixed by opening the url and doing a manual mapping</p>
        <div v-if="loading">Loading...</div>
        <div v-else>
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
              <td>
                <a :href="watchUrl(item.targetID)" target="_blank">{{ item.targetID }}</a>
              </td>
              <td>{{ removeDup(JSON.parse(item.users)).join(', ') }}</td>
              <td>{{ JSON.parse(item.actions).join(', ') }}</td>
              <td>{{ item.lastEdit.toLocaleString() }}</td>
            </tr>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ohana from '@/assets/ohana/index'
export default {
  data() {
    return {
      items: [],
      loading: false,
    }
  },
  methods: {
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
