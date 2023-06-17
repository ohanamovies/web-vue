<template>
  <div>
    <div class="subpage">
      <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
        <div class="inner">
          <div>
            <EditorsIndex />
            <div v-if="page == 1">
              <p>Here are the latest {{ items.length }} edited movies and shows:</p>
            </div>
            <div v-if="page > 1">
              <p>{{ page * pageSize + 1 + '-' + (page * pageSize + pageSize) }}</p>
            </div>
            <!-- {{ items }} -->
            <div v-if="error">
              {{ $t('error') }} <button @click="getData()">{{ $t('try_again_l') }}</button>
            </div>

            <div v-else-if="loading">{{ $t('loading') }}</div>

            <div v-else>
              <div v-for="(item, index) in items" :key="index">
                <MovieListItem :item="item" />
              </div>
              <!-- pages -->

              <button v-if="page > 1" @click="nextPage(-1)">{{ $t('previous_page') }}</button>
              <button v-if="items.length >= pageSize" @click="nextPage(1)">
                {{ $t('next_page') }}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ohana from '@/assets/ohana/index'
import MovieListItem from './MovieListItem.vue'

import EditorsIndex from './EditorsIndex.vue'
import { mapState } from 'vuex'
export default {
  components: {
    MovieListItem,
    EditorsIndex,
  },
  props: {
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
      pageSize: 20,
    }
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings']),
  },
  methods: {
    nextPage(increment) {
      this.$router.push('/editors/' + (+this.page + +increment))
    },
    async getData(more = false) {
      this.loading = true
      this.error = false
      this.items = []

      try {
        let data = await ohana.api.query({
          action: 'findMovies',
          sort_by: 'last_edited',
          sort_dir: 'desc',
          //imdb: 'tt0758758',
          page: this.page, //Math.round(this.items.length / this.pageSize) + 1,
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

      window.scrollTo(0, 0)
    },
  },
  mounted() {
    this.getData()
  },
}
</script>

<style scoped></style>
