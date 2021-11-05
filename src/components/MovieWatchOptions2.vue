<template>
  <div>
    <b>Watch options: </b>

    <!-- no settings -->
    <div v-if="no_settings">
      <router-link class="button special" to="/settings">{{
        $t('manage_preferences')
      }}</router-link>
    </div>

    <!--movie is edited -->
    <div v-else-if="is_done">
      <i v-if="hasApp">Watch edited on:</i>

      <div v-else-if="isChrome">
        <b>Watch the edited version with Ohana</b>
        <br />
        <a
          href="https://chrome.google.com/webstore/detail/family-cinema/nfkbclgkdifmoidnkapblfipbdkcppcf"
          class="modern-link"
          target="_blank"
          >{{ $t('install') + ' Ohana' }}</a
        >
        <br /><br />
        <span class="modern-link" @click="bypass = true">Show watch options anyway</span>
      </div>

      <div v-else>
        This browser is not compatible with Ohana.
        <br />
        <router-link to="/get-started">Learn more</router-link>
        <br /><br />
        <span class="modern-link" @click="bypass = true">Show watch options anyway</span>
      </div>
    </div>

    <!-- movie is pending -->
    <div v-else-if="is_missing">
      <span class="modern-link" @click="bypass = true">Show watch options anyway</span>
    </div>

    <div v-else-if="is_unknown">
      <span class="modern-link" @click="bypass = true">Show watch options</span>
    </div>

    <!-- WATCH OPTIONS -->
    <div v-if="is_clean || (hasApp && is_done) || bypass">
      <a
        class="provider-link"
        v-for="(provider, index) in selection.providers"
        :key="index"
        target="_blank"
        :href="getLink(provider.provider, provider.providerID)"
      >
        <img :src="getLogo(provider.provider)" />
      </a>
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
    title: {
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
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile']),
    no_settings() {
      return this.selection.join_status.status == 'unset'
    },
    is_clean() {
      return this.selection.join_status.status == 'done' && this.selection.join_status.cuts == 0
    },
    is_done() {
      return this.selection.join_status.status == 'done'
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
