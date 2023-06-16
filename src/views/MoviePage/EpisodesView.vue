<template>
  <div class="card" style="padding: 15px">
    <div v-if="loading" style="height: 80px; text-align: center">
      <v-progress-circular :size="40" indeterminate></v-progress-circular>
    </div>

    <div v-else>
      <div v-if="!episodes.length">{{ $t('hmmm_no_data') }}</div>
      <div v-else>
        <router-link
          class="no-link"
          :to="'./' + episode.tconst"
          v-for="episode of episodes"
          :key="episode.tconst"
        >
          <div
            class="episodeListItem"
            :style="{ fontWeight: episode.tconst == item.imdb ? 'bold' : 'normal' }"
          >
            <div>
              {{
                'S' +
                episode.seasonNumber +
                'E' +
                episode.episodeNumber +
                ': ' +
                episode.primaryTitle +
                ' (' +
                episode.runtimeMinutes +
                ' min)'
              }}
            </div>
            <div>
              <v-icon :color="joinStatus(episode.filterStatus).color">{{
                joinStatus(episode.filterStatus).icon2
              }}</v-icon>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ohana from '@/assets/ohana/index'
import { mapState } from 'vuex'
export default {
  props: {
    item: {
      type: Object,
      default() {
        return { parent: null, idmb: '' }
      },
    },
  },
  watch: {
    parent() {
      this.fetchEpisodes()
    },
  },
  computed: {
    ...mapState(['settings']),
  },
  data() {
    return {
      loading: false,
      episodes: [],
    }
  },
  methods: {
    async fetchEpisodes() {
      this.loading = true
      if (this.item.parent) {
        // this.parent_item = await ohana.api.getMovie(this.item.parent)
        this.episodes = await ohana.api.getEpisodes(this.item.parent)
      } else if (this.item.type == 'series') {
        this.episodes = await ohana.api.getEpisodes(this.item.imdb) //TODO: may not need to do await...
      }
      this.loading = false
    },
    joinStatus(filterStatus) {
      return ohana.movies.joinStatus2(filterStatus, this.settings.skip_tags)
    },
  },
  mounted() {
    this.fetchEpisodes()
  },
}
</script>

<style scoped>
.episodeListItem {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
</style>
