<template>
  <div style="display: flex; font-size: 80%">
    <div v-for="(r, index) in routes" :key="index">
      <router-link :to="r.route" style="margin: 5px" :style="{ fontWeight: fw(r) }">{{
        r.text
      }}</router-link
      >|
    </div>
    <hr />
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
        { text: 'last edited', route: '/editors' },
        { text: 'pending mapping', route: '/editors/stats/pending-mapping' },
      ]
      if (this.settings.username) {
        routes.push({ text: 'my edits', route: '/editor/' + this.settings.username })
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
