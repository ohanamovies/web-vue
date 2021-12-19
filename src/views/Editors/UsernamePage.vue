<template>
  <div>
    <div class="subpage">
      <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
        <!--   SPANISH TEXT -->
        <div class="inner">
          <h1>{{ username }}</h1>

          <div v-if="error">Error. <button @click="getData()">try again</button></div>
          <div v-if="loading">Loading...</div>
          <div v-else>
            <div v-for="(item, index) in items" :key="index">
              <MovieListItem :item="item" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ohana from '@/assets/ohana/index'
import { mapState } from 'vuex'
import MovieListItem from './MovieeListItem.vue'

export default {
  components: {
    MovieListItem,
  },
  props: {
    username: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      items: [],
      loading: false,
      error: false,
    }
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings', 'extension_version']),
  },
  methods: {
    async getData() {
      this.loading = true
      this.error = false
      this.items = []
      try {
        this.items = await ohana.api.query({
          action: 'findMovies',
          sort_by: 'last_edited',
          sort_dir: 'desc',
          contributors: JSON.stringify([this.username]),
        })
        this.loading = false
      } catch (error) {
        this.error = true
      }
    },
  },
  mounted() {
    this.getData()
  },
}
</script>

<style lang="scss" scoped></style>
