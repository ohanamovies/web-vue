<template>
  <div>
    <!-- no settings -->

    <div v-if="no_settings">
      <router-link class="button special" to="/settings" target="_blank"
        >Manage preferences</router-link
      >
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
      </div>

      <div v-else>
        This browser is not compatible with Ohana.
        <br />
        <router-link class="button special" to="/get-started">Learn more</router-link>
      </div>
    </div>

    <!-- movie is pending -->
    <div v-else-if="is_missing">
      <a class="modern-link" :href="feedback_link" target="_blank">Request review</a>
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
      <a class="modern-link" :href="feedback_link" target="_blank">Request review</a>
      <br />

      <br />
      <span class="modern-link" @click="bypassUnknown = true">Show watch options</span>
    </div>

    <!-- WATCH OPTIONS -->
    <!-- <div v-if="is_clean || (hasApp && is_done) || bypassApp ||  (is_done || bypassUnsafe)"> -->
    <div
      v-if="
        is_clean ||
        ((is_done || bypassUnsafe) && (hasApp || bypassApp)) ||
        (is_unknown && bypassUnknown)
      "
    >
      <div
        v-for="(provider, index) in selection.providers"
        :key="index"
        style="margin: auto; margin-bottom: 10px"
      >
        <a :href="provider.watch_url" target="_blank" class="button"
          >{{ getProvider(provider.watch_url) }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isChrome: { type: Boolean, default: false },
    hasApp: { type: Boolean, default: false },
    isMobile: { type: Boolean, default: false },
    selection: {
      type: Object,
      deafult() {
        return {}
      },
    },
    title: {
      type: String,
      default: '',
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
    feedback_link() {
      return (
        'https://docs.google.com/forms/d/e/1FAIpQLScnTNbXu79Sbinmlw6QhBIa5T76T0QCEMFLt4OIiSN08aHQKw/viewform?usp=pp_url&entry.2077317668=' +
        '[request]: ' +
        this.title +
        ' - imdb:' +
        this.selection.imdb
      )
    },
  },
  methods: {
    getProvider(watchUrl) {
      console.log('watchURL : ' + watchUrl)
      let u = new URL(watchUrl)
      let h = u.hostname.replace('www.', '')
      if (h.includes('netflix')) return 'Netflix'
      if (h.includes('hbo')) return 'HBO'
      if (h.includes('movistar')) return 'Movistar'
      if (h.includes('primevideo')) return 'Prime Video'
      if (h.includes('disneyplus')) return 'Disney Plus'
      return h
    },
  },
}
</script>

<style lang="scss" scoped></style>
