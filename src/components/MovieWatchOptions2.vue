<template>
  <div>
    <!-- Section title -->
    <div v-if="bypass">
      <b>Watch options </b>
      <i v-if="is_missing">(beware unhealthy content)</i>
      <i v-else-if="is_unknown">(beware unknown content)</i>
      <i v-else-if="is_mixed">(beware mixed content)</i>
      <i v-else-if="is_done || hasApp">(edited)</i>
      <i v-else-if="no_settings">(no settings)</i>
    </div>
    <div v-else-if="is_clean || (is_done && hasApp) || bypass">
      <b>Watch options</b>
    </div>

    <!-- WATCH OPTIONS -->
    <div v-if="is_clean || (is_done && hasApp) || bypass">
      <!-- providers -->
      <div style="display: flex">
        <div v-for="(provider, index) in selection.providers" :key="index">
          <a
            v-if="provider.provider != 'justwatch'"
            class="provider-link"
            target="_blank"
            :href="getLink(provider.provider, provider.providerID)"
          >
            <img :src="getLogo(provider.provider)" :alt="provider.provider" />
          </a>
        </div>
      </div>
      <!-- JustWatch -->

      <span v-if="!selection.providers.length">
        <span>Sorry, no known providers available. </span>
        <a
          class="modern-link"
          v-if="selection.tmdb"
          target="_blank"
          :href="'https://www.themoviedb.org/' + selection.tmdb + '/watch'"
          >Try tmdb.
        </a>
      </span>

      <div style="font-size: 80%">
        {{ selection.providers.length ? 'Powered by' : 'You may search on ' }}
        <a href="https://www.justwatch.com" target="_blank">
          <img height="9" src="images/providers/justwatch-rectangle.png" alt="JustWatch" />
        </a>
      </div>
    </div>

    <!-- no settings -->
    <div v-else-if="no_settings">
      <router-link class="button special" to="/settings"
        >{{ $t('manage_preferences') }}<v-icon>mdi-account-cog-outline</v-icon></router-link
      >
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
      <span v-if="!bypass">
        <span class="modern-link" @click="bypass = true">See watch options anyway</span>
      </span>
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
      if (provider == 'netflix') return 'images/providers/netflix.png'
      if (provider == 'justwatch') return 'images/providers/justwatch.jpg'
      if (provider == 'primevideo') return 'images/providers/primevideo.png'
      if (provider == 'disneyplus') return 'images/providers/disneyplus.png'
      if (provider == 'movistarplus') return 'images/providers/movistarplus.png'
      if (provider == 'hboespana') return 'images/providers/hbomax.png'
      if (provider == 'hbomax') return 'images/providers/hbomax.png'
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

.provider-link-rectangle > img {
  height: 16px;
  margin: 2px 10px 0px 0px;
  /*padding-top: 5px;*/ /* weird, but otherwise not well aligned with flex*/
  border-radius: 2px;
  /*border-radius: 5px;*/
}
</style>
