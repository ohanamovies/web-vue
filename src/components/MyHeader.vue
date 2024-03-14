<template>
  <div id="vheader" v-if="!isNewHome">
    <div>
      <v-app-bar
        :fixed="!isHome"
        :absolute="isHome"
        flat
        dense
        :color="isHome || isNewHome ? 'rgba(0, 0, 0, 0)' : '#6cc091'"
        dark
        :style="{
          zIndex: '9999998',
          padding: isMobile ? '0px' : '0px 30px',
          marginTop: isHome && !isMobile ? '40px' : '0px',
        }"
      >
        <router-link to="/" style="font-size: 20px">Ohana Movies</router-link>

        <v-spacer></v-spacer>
        <Navigation />
      </v-app-bar>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile']),
    isHome() {
      return this.$route.path == '/'
    },
    isNewHome() {
      return this.$route.path == '/'
    },
    no_magic() {
      return !window.location.href.includes('magic')
    },
  },
  data() {
    return {}
  },
}
</script>

<style>
#vheader * a {
  color: #ffffff !important;

  font-weight: 400;
  padding: 0 0.75em;

  font-size: 1em;
  text-decoration: none;
}

#vheader * button {
  box-shadow: none;
}
.v-list-item__title {
  font-weight: 400 !important;
}
</style>
