<template>
  <div>
    <!-- Option 0: no settings -->
    <div v-if="no_settings">
      <router-link class="button special" to="/settings">Manage preferences</router-link>
    </div>

    <!-- Option 1: Movie is clean -->
    <div v-else-if="is_clean" style="margin-bottom: 5px"><b>Watch safely on</b></div>

    <!-- Option 2": not clean, but user has app -->
    <div v-else-if="hasApp">
      <b>Watch the edited version on...</b>
    </div>
    <!-- Option 3: not clean, no app, but chrome -->
    <div v-else-if="isChrome">
      <!-- in chrome -->
      <b>Watch safely with Ohana</b>
      <a
        href="https://chrome.google.com/webstore/detail/family-cinema/nfkbclgkdifmoidnkapblfipbdkcppcf"
        class="button special"
        target="_blank"
        >{{ $t('install') + ' Ohana' }}</a
      >
    </div>
    <!-- Option 4: no clean, no app, no chrome -->
    <div v-else>
      To watch this safely, you need to install Ohana. But Ohana only works with Google Chrome.

      <router-link class="button special" to="/get-started">Learn more</router-link>
    </div>

    <!-- WATCH OPTIONS -->
    <div v-if="hasApp || bypassApp || is_clean || bypassUnsafe">
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
  },
  data() {
    return {
      bypassApp: false,
      bypassUnsafe: false,
      show_watch_options: false,
    }
  },
  computed: {
    is_clean() {
      return this.selection.join_status.status == 'done' && this.selection.join_status.cuts == 0
    },
    no_settings() {
      return this.selection.join_status.status == 'unset'
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
