<template>
  <div>
    <div v-if="hasApp">
      <router-link to="/find-movies" class="button special" style="margin: 5px">{{
        $t('discoverContent')
      }}</router-link>
    </div>

    <div v-else-if="isChrome">
      <a
        href="https://chrome.google.com/webstore/detail/family-cinema/nfkbclgkdifmoidnkapblfipbdkcppcf"
        class="button special"
        target="_blank"
        style="margin: 5px"
        >{{ $t('install') }}</a
      >
    </div>

    <div v-else>
      <router-link to="get-started" class="button special">{{ $t('getStarted') }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
    isChrome: {
      type: Boolean,
      default: false,
    },
    hasApp: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped></style>
