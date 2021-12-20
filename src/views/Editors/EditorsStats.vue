<template>
  <div>
    <table border="1">
      <tr>
        <th>user</th>
        <th>contributed to</th>
        <th>tagged</th>
        <th>scenes added</th>
        <th>scenes removed</th>
      </tr>
      <tr v-for="(user, index) in data" :key="index">
        <td>
          <router-link :to="'/editor/' + clean(user.data.username)">
            {{ clean(user.data.username) }}
          </router-link>
        </td>
        <td>{{ user.data.uniqueMovies }}</td>
        <td>{{ user.data.tagged }}</td>
        <td>{{ user.data.addedScenes }}</td>
        <td>{{ user.data.removedScenes }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import ohana from '@/assets/ohana/index'
export default {
  data() {
    return {
      data: null,
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
    async getData() {
      let data = await ohana.api.query({
        action: 'getStats',
        about: 'editors',
      })
      for (let i = 0; i < data.length; i++) {
        data[i].data = JSON.parse(data[i].data)
        if (data[i].data.username == 'imdb' || data[i].data.username == 'excel') {
          data.splice(i, 1)
        }
      }

      data.sort((a, b) => {
        return b.data.tagged - a.data.tagged
      })

      this.data = data
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
