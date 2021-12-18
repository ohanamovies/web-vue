<template>
  <div>
    <div style="height: 80px"></div>
    <h1>Latest edited</h1>

    <!-- {{ items }} -->
    <div style="max-width: 800px; margin: auto; padding: 5px; border: solid 1px gray">
      <div v-for="(item, index) in items" :key="index" class="item">
        <div class="image">
          <img :src="getPoster(item)" />
        </div>
        <div class="content">
          <h2>{{ item.title ? item.title.en : '' }}</h2>
          <p>{{ item.plot ? item.plot.en : '' }}</p>
        </div>
        <div><b>contributors:</b>{{ item.contributors.split(' ').join(', ') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import ohana from '@/assets/ohana/index'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      items: [],
    }
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings']),
  },
  methods: {
    async getData() {
      this.items = await ohana.api.getLatestEdited()
    },
    getPoster(item) {
      if (!item || !item.poster) return
      return (
        'https://image.tmdb.org/t/p/w200' + item.poster[this.settings.language] || item.poster['en']
      ) //TODO: use size w154?
    },
  },
  mounted() {
    this.getData()
  },
}
</script>

<style lang="scss" scoped></style>
