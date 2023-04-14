<template>
  <div>
    <div>
      <v-text-field v-model="id" label="id" hide-details placeholder="tt1480055"></v-text-field>

      <v-checkbox hide-details v-model="removedup" label="removedup"></v-checkbox>
      <v-btn depressed @click="getVotes()">Get votes</v-btn>

      <!--chips -->
      <div style="margin-top: 4px">
        <div v-for="(v, k) in chips" :key="k">
          <v-chip
            v-for="chip in v"
            :key="chip.value"
            class="mr-1"
            small
            :outlined="filters[k] != chip.value"
            @click="filters[k] = filters[k] == chip.value ? '' : chip.value"
            >{{ chip.value }} ({{ chip.count }})</v-chip
          >
        </div>
      </div>

      <div>
        <div v-for="vote in filteredList" :key="vote.id" class="vote">
          <div style="font-weight: 500">
            {{ new Date(vote.timestamp).toISOString() }}
            |
            {{ vote.user }}
            |
            {{ vote.targetID }}
          </div>

          <div style="font-size: 90%">
            {{ vote.query }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ohana from '@/assets/ohana/index'
export default {
  data() {
    return {
      id: '',
      votes: [],
      removedup: false,
      filters: {
        user: '',
        action: '',
      },
    }
  },
  computed: {
    chips() {
      let x = {}

      for (let i = 0; i < this.votes.length; i++) {
        const vote = this.votes[i]

        for (const key in this.filters) {
          if (!x[key]) x[key] = []
          if (!x[key].find((a) => a.value == vote[key])) x[key].push({ value: vote[key], count: 0 })

          if (this.filteredList.find((a) => a.id == vote.id)) {
            x[key].find((a) => a.value == vote[key]).count++
          }
        }
      }

      return x
    },
    filteredList() {
      let x = []
      for (let i = 0; i < this.votes.length; i++) {
        const vote = this.votes[i]

        let add = true
        for (const k in this.filters) {
          const v = this.filters[k]
          if (v && vote[k] != v) {
            add = false
          }
        }

        if (add) {
          x.push(vote)
        }
      }
      return x
    },
    voters() {
      let x = []
      for (let i = 0; i < this.votes.length; i++) {
        const vote = this.votes[i]
        if (!x.includes(vote.user)) x.push(vote.user)
      }
      return x
    },
  },
  methods: {
    async getVotes() {
      let x = await ohana.api.query({
        action: 'getMovieVotes',
        id: this.id,
        removedup: this.removedup,
      })

      if (x.votes) {
        this.votes = x.votes
        this.votes.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        this.votes = [...this.votes]
      } else {
        this.votes = []
      }
    },
  },
}
</script>

<style scoped>
.vote {
  padding: 5px;
  margin-bottom: 8px;
  font-size: 10pt;
}
</style>
