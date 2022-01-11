<template>
  <div>
    <h1>Editors</h1>
    <div style="display: flex; font-size: 80%">
      <div v-for="(r, index) in routes" :key="index">
        <router-link :to="r.route" style="margin: 5px" :style="{ fontWeight: fw(r) }">{{
          r.text
        }}</router-link
        >|
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(['settings']),
    routes() {
      let routes = [
        { text: 'Leaderboard', route: '/editors/stats/leaderboard' },
        { text: 'Last edited', route: '/editors' },
        { text: 'Pending mapping', route: '/editors/stats/pending-mapping' },
      ]
      if (this.settings.username) {
        routes.push({ text: 'my edits', route: '/editors/user/' + this.settings.username })
      }
      return routes
    },
  },
  methods: {
    fw(route) {
      if (this.$route.path == route.route) return 'bold'
      return 'normal'
    },
  },
}
</script>

<style lang="scss" scoped></style>
