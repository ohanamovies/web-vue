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
        <router-link to="/">Ohana</router-link>

        <v-spacer></v-spacer>

        <div v-if="!isMobile">
          <div>
            <!-- Web routes -->
            <router-link :to="route.to" v-for="(route, index) in routes" :key="index">{{
              $t(route.key)
            }}</router-link>

            <!-- Other menu items -->
            <a
              style="text-transform: uppercase; cursor: pointer"
              @click="$i18n.locale = nextLan($i18n.locale)"
              >{{ $i18n.locale }}
            </a>
          </div>
        </div>

        <div v-if="isMobile">
          <v-btn icon color="white" @click="showMenu = !showMenu"><v-icon>mdi-menu</v-icon></v-btn>
        </div>
      </v-app-bar>
    </div>

    <!-- NAVIGATION DRAWER FOR MOBILE -->
    <v-navigation-drawer
      v-model="showMenu"
      color="#6cc091"
      temporary
      right
      app
      style="z-index: 9999999"
    >
      <v-list dense nav>
        <!-- Web routes -->
        <v-list-item v-for="(route, index) in routes" :key="index" link :to="route.to">
          <v-list-item-content>
            <v-list-item-title>{{ $t(route.key) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Other menu items -->
        <v-divider></v-divider>

        <v-list-item link to="">
          <v-list-item-content>
            <v-list-item-title
              @click="$i18n.locale = nextLan($i18n.locale)"
              style="color: white"
              class="v-list-item__title"
              >{{ $t('language') }}:
              <span style="text-transform: uppercase"> {{ $i18n.locale }}</span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
    return {
      showMenu: false,

      routes: [
        { to: '/', key: 'home' },
        { to: '/get-started', key: 'getStarted' },

        { to: '/settings', key: 'settings' },

        { to: '/community', key: 'support_ohana' },

        { to: '/about', key: 'about' },

        //{to: '/community', key: 'community'}
      ],
    }
  },
  methods: {
    nextLan: function (current) {
      console.log(current)
      if (current == 'es') return 'en'
      else return 'es'
    },
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
