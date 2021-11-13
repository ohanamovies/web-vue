<template>
  <div class="banner home-background">
    <div class="inner" style="border: none; padding: 0px !important">
      <h1 class="fadeInUp" style="margin-bottom: 5px">Welcome to Ohana TV</h1>
      <p style="color: white" class="fadeIn">
        {{ $t('homeHeroText2') }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      key: 'value',
    }
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings', 'extension_version']),
  },
}
</script>

<style lang="scss" scoped></style>
