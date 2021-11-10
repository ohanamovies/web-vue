<template>
  <div>
    <!-- Section title -->
    <div>
      <b v-if="is_clean">Watch options (healthy): </b>
      <b v-else-if="is_missing">Watch options (unhealthy): </b>
      <b v-else-if="is_unknown">Watch options (unknown): </b>
      <b v-else-if="is_mixed">Watch options (mixed): </b>
      <b v-else-if="is_done || hasApp">Watch options (edited): </b>
      <b v-else-if="no_settings">Watch options (no settings): </b>
    </div>

    <!-- WATCH OPTIONS -->
    <div v-if="is_clean || (is_done && hasApp) || bypass">
      <a
        class="provider-link"
        v-for="(provider, index) in selection.providers"
        :key="index"
        target="_blank"
        :href="getLink(provider.provider, provider.providerID)"
      >
        <img :src="getLogo(provider.provider)" />
      </a>

      <span v-if="!selection.providers.length">
        <span>Sorry, no known providers available</span>
        <a
          class="modern-link"
          v-if="selection.tmdb"
          target="_blank"
          :href="'https://www.themoviedb.org/' + selection.tmdb + '/watch'"
          >try tmdb.
        </a>
      </span>
    </div>

    <!-- no settings -->
    <div v-else-if="no_settings">
      <router-link class="button special" to="/settings">{{
        $t('manage_preferences')
      }}</router-link>
    </div>

    <!--movie is edited -->
    <div v-else-if="is_done && !hasApp">
      <div v-if="isChrome">
        <i>Installing Ohana is required to remove unhealthy scenes: </i>
        <a
          href="https://chrome.google.com/webstore/detail/family-cinema/nfkbclgkdifmoidnkapblfipbdkcppcf"
          class="modern-link"
          target="_blank"
          >{{ $t('install') + ' Ohana' }}</a
        >
      </div>
      <div v-else>
        This browser is not compatible with Ohana.
        <router-link to="/get-started">Learn more</router-link>
      </div>
    </div>

    <!-- movie is pending -->
    <div v-if="is_missing || is_unknown || (is_done && !hasApp) || is_mixed">
      <span v-if="!bypass" class="modern-link" @click="bypass = true"
        >Show watch options anyway</span
      >
      <!--<span v-else class="modern-link" @click="bypass = false">Hide watch options</span>-->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    selection: {
      type: Object,
      deafult() {
        return {}
      },
    },
  },
  data() {
    return {
      bypass: false,
    }
  },
  watch: {
    selection: {
      handler: function () {
        this.bypass = false
      },
      deep: true,
    },
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile']),
    no_settings() {
      return this.selection.join_status.status == 'unset'
    },
    is_clean() {
      return this.selection.join_status.status == 'clean'
    },
    is_done() {
      return this.selection.join_status.status == 'done'
    },
    is_mixed() {
      return this.selection.join_status.status == 'mixed'
    },
    is_unknown() {
      return (
        this.selection.join_status.status == 'unknown' ||
        this.selection.join_status.status == 'unkown'
      )
    },
    is_missing() {
      return this.selection.join_status.status == 'missing'
    },
  },
  methods: {
    getLogo(provider) {
      if (provider == 'netflix') return 'images/netflix.png'
      if (provider == 'justwatch') return 'images/justwatch.jpg'
      if (provider == 'primevideo') return 'images/primevideo.png'
      if (provider == 'disneyplus') return 'images/disneyplus.png'
      if (provider == 'movistarplus') return 'images/movistarplus.png'
      if (provider == 'hboespana') return 'images/hbomax.png'
      if (provider == 'hbomax') return 'images/hbomax.png'
    },
    getLink(provider, providerID) {
      providerID = providerID.split('_')[1]
      if (provider == 'netflix') return 'https://www.netflix.com/watch/' + providerID
      if (provider == 'hboespana')
        return 'https://es.hboespana.com/movies/-/' + providerID + '/play'
      if (provider == 'disneyplus') return 'https://www.disneyplus.com/en-gb/video/' + providerID
      if (provider == 'primevideo') return 'https://primevideo.com/watch?gti=' + providerID
      if (provider == 'movistarplus') return 'https://ver.movistarplus.es/ficha?id=' + providerID
    },
  },
}
</script>

<style>
.provider-link > img {
  width: 35px;
  margin: 2px;
  border-radius: 5px;
}
</style>
