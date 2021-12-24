<template>
  <div>
    <div style="overflow-x: auto">
      <table border="1" style="margin-bottom: 0px; padding-bottom: 0px">
        <tr>
          <th>#</th>
          <th>user</th>
          <th>movies user contributed</th>
          <th>movies tagged</th>
          <th>scenes added</th>
          <th>scenes removed</th>
        </tr>
        <tr v-for="(user, index) in data2" :key="index">
          <td>{{ index }}</td>
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
    <span class="modern-link" @click="seeAll = !seeAll">{{
      seeAll ? 'see less' : 'see more'
    }}</span>
    <br />
    <br />
  </div>
</template>

<script>
import ohana from '@/assets/ohana/index'
export default {
  data() {
    return {
      data: [],
      seeAll: false,
    }
  },
  computed: {
    data2() {
      if (this.seeAll) return this.data
      return [...this.data].slice(0, 5)
    },
  },
  methods: {
    clean(text) {
      console.log('clean', text)
      if (typeof text === 'string') {
        let newtext = text.replace(/\s/g, '')
        newtext = newtext.replace(/@.*/g, '')
        newtext = newtext.toLowerCase()
        console.log('cleaned', newtext)
        return newtext
      } else {
        console.log('cleaned', text)
        return text
      }
    },
    async getData() {
      let data = await ohana.api.query({
        action: 'getStats',
        about: 'editors',
      })
      for (let i = 0; i < data.length; i++) {
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
