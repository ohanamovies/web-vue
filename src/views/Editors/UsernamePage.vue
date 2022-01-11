<template>
  <div>
    <div class="subpage">
      <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
        <!--   SPANISH TEXT -->
        <div class="inner">
          <EditorsIndex />
          <h1>{{ username }}</h1>
          <div v-if="page == 1">
            <p>Here are {{ username }}'s last {{ items.length }} edited movies/shows:</p>
          </div>
          <div v-if="page > 1">
            <p>{{ page * pageSize + 1 + '-' + (page * pageSize + pageSize) }}</p>
          </div>

          <div v-if="error">Error. <button @click="getData()">try again</button></div>
          <div v-if="loading">Loading...</div>
          <div v-else>
            <div v-for="(item, index) in items" :key="index">
              <MovieListItem :item="item" />
            </div>
          </div>
          <!-- pages -->
          <button v-if="page > 1" @click="nextPage(-1)">previous page</button>
          <button v-if="items.length >= pageSize" @click="nextPage(1)">next page</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ohana from '@/assets/ohana/index'
import { mapState } from 'vuex'
import MovieListItem from './MovieeListItem.vue'
import EditorsIndex from './EditorsIndex.vue'

export default {
  components: {
    MovieListItem,
    EditorsIndex,
  },
  props: {
    username: {
      type: String,
      default: '',
    },

    page: {
      type: String,
      default: '1',
    },
  },
  watch: {
    page() {
      this.getData()
    },
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
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings', 'extension_version']),
  },
  methods: {
    nextPage(increment) {
      this.$router.push('/editors/user/' + this.username + '/' + (+this.page + +increment))
    },
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
          page: this.page, //Math.round(this.items.length / this.pageSize) + 1,
          pageSize: this.pageSize,
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
