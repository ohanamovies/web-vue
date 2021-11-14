<template>
  <div class="banner home-background" style="height: 100% !important; width: 100% !important">
    <v-row class="fill-height" align="center" style="padding: 20px; position: relative">
      <div class="inner" style="border: none; padding: 0px !important; margin: auto">
        <h1 class="fadeInUp" style="margin-bottom: 5px">
          {{ $t('welcome') }}
        </h1>
        <p style="color: white" class="fadeIn">
          {{ $t('homeHeroText2') }}
        </p>

        <p style="color: white; margin-top: 50px; cursor: pointer; font-size: 130%" class="fadeIn">
          Start
        </p>
      </div>
    </v-row>
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
