<template>
  <div>
    <!-- no settings -->

    <b>Watch options: </b>

    <div v-if="no_settings">
      <router-link class="button special" to="/settings">{{
        $t('manage_preferences')
      }}</router-link>
    </div>

    <!-- Movie is clean -->
    <div v-else-if="is_clean" style="margin-bottom: 5px"><b>Watch safely on</b></div>

    <!--movie is edited -->
    <div v-else-if="is_done">
      <div v-if="hasApp">
        <b>Watch the edited version on...</b>
      </div>

      <div v-else-if="isChrome">
        <b>Watch the edited version with Ohana</b>
        <br />
        <a
          href="https://chrome.google.com/webstore/detail/family-cinema/nfkbclgkdifmoidnkapblfipbdkcppcf"
          class="button special"
          target="_blank"
          >{{ $t('install') + ' Ohana' }}</a
        >
        <br /><br />
        <span
          class="modern-link"
          @click="
            bypassUnsafe = true
            bypassApp = true
          "
          >Show watch options anyway</span
        >
      </div>

      <div v-else>
        This browser is not compatible with Ohana.
        <br />
        <router-link class="button special" to="/get-started">Learn more</router-link>
        <br /><br />
        <span
          class="modern-link"
          @click="
            bypassUnsafe = true
            bypassApp = true
          "
          >Show watch options anyway</span
        >
      </div>
    </div>

    <!-- movie is pending -->
    <div v-else-if="is_missing">
      <br />
      <br />
      <!-- TODO: bypassApp is not being very effective -->
      <span
        class="modern-link"
        @click="
          bypassUnsafe = true
          bypassApp = true
        "
        >Show watch options anyway</span
      >
    </div>

    <div v-else-if="is_unknown">
      <br />
      <span class="modern-link" @click="bypassUnknown = true">Show watch options</span>
    </div>

    <!-- WATCH OPTIONS -->
    <!-- <div v-if="is_clean || (hasApp && is_done) || bypassApp ||  (is_done || bypassUnsafe)"> -->
    <div v-else>
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
      bypassApp: false,
      bypassUnsafe: false,
      bypassUnknown: false,
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
      if (provider == 'primevideo') return 'images/netflix.png'
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
