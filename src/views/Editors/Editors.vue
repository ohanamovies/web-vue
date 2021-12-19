<template>
  <div>
    <div class="subpage">
      <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
        <!--   SPANISH TEXT -->
        <div class="inner">
          <div style="height: 80px"></div>
          <h1>Latest edited</h1>
          <p>Here are the latest {{ items.length }} edited movies and shows:</p>

          <!-- {{ items }} -->
          <div v-if="error">Error. <button @click="getData()">try again</button></div>
          <div v-else-if="loading">Loading...</div>
          <div v-else style="max-width: 600px; margin: auto; padding: 5px">
            <div v-for="(item, index) in items" :key="index">
              <MovieListItem :item="item" />
            </div>
            <button @click="getData(true)">Load more</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ohana from '@/assets/ohana/index'
import MovieListItem from './MovieeListItem.vue'
import { mapState } from 'vuex'
export default {
  components: {
    MovieListItem,
  },
  data() {
    return {
      items: [],
      loading: false,
      error: false,
      pageSize: 50,
    }
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings']),
  },
  methods: {
    async getData(more = false) {
      this.loading = true
      this.error = false

      try {
        let data = await ohana.api.query({
          action: 'findMovies',
          sort_by: 'last_edited',
          sort_dir: 'desc',
          page: Math.round(this.items.length / this.pageSize) + 1,
          pageSize: this.pageSize,
        })
        if (more) {
          this.items = [...this.items, ...data]
        } else {
          this.items = [...data]
        }
        this.loading = false
      } catch (error) {
        this.error = true
      }
    },
  },
  mounted() {
    this.getData()

    // Detect when scrolled to bottom.
    const footer = document.querySelector('#footer')
    const body = document.getElementsByTagName('body')[0]
    body.onscroll = () => {
      let left = body.clientHeight - window.innerHeight - footer.clientHeight - window.scrollY
      if (left < 200) {
        this.getData(true)
      }
    }
  },
}
</script>

<style scoped></style>
