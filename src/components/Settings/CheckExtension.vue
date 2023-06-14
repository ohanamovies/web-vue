<template>
  <div>
    <h4>{{ $t('install_ohana_tv') }}</h4>
    <p>
      {{ $t('our') }}
      <a
        href="https://chrome.google.com/webstore/detail/ohana/nfkbclgkdifmoidnkapblfipbdkcppcf"
        class="modern-link"
        target="_blank"
        style="font-size: 100%"
      >
        {{ $t('our_2') }}</a
      >
      {{ $t('our_3') }}
    </p>

    <v-alert v-if="hasApp" type="success" outlined
      >{{ $t('well_done_you_have') }}
      <a
        href="https://chrome.google.com/webstore/detail/ohana/nfkbclgkdifmoidnkapblfipbdkcppcf"
        target="_blank"
        class="modern-link"
        style="font-size: 100%"
        >{{ $t('well_done_you_have_2') }}</a
      >
      installed in this browser (version {{ extension_version }}).
    </v-alert>

    <div v-else-if="isChrome && !isMobile">
      <v-alert type="warning" outlined>{{ $t('ohana_extension_is_not') }} </v-alert>
      {{ $t('to_install_ohana_tv') }}
      <a
        href="https://chrome.google.com/webstore/detail/ohana/nfkbclgkdifmoidnkapblfipbdkcppcf"
        target="_blank"
      >
        {{ $t('to_install_ohana_tv_2') }}</a
      >
      {{ $t('to_install_ohana_tv_3') }}
    </div>

    <div v-else>
      <v-alert type="error" outlined>{{ $t('it_seems_this_browser') }} </v-alert>

      <p>
        {{ $t('please_make_sure_you') }}
        <a
          href="https://www.google.com/chrome/"
          target="_blank"
          class="modern-link"
          style="font-size: 100%"
          >Google Chrome</a
        >
        {{ $t('please_make_sure_you_2') }}
      </p>
    </div>
    <div v-if="!hasApp">
      <p>
        <br />
        {{ $t('without_the_chrome_extension') }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings', 'extension_version']),
  },
}
</script>

<style lang="scss" scoped></style>
