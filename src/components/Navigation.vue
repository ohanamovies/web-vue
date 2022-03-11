<template>
  <div id="menu">
    <div v-if="!isMobile">
      <!-- Web routes -->
      <router-link :to="route.to" v-for="(route, index) in routes" :key="index">{{
        $t(route.key)
      }}</router-link>

      <!-- Other menu items -->
      <a style="text-transform: uppercase; cursor: pointer" @click="changeLang()"
        >{{ $i18n.locale }}
      </a>
    </div>

    <div v-if="isMobile">
      <v-btn icon color="white" @click="showMenu = !showMenu">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </div>

    <!-- NAVIGATION DRAWER FOR MOBILE -->
    <v-navigation-drawer v-if="isMobile" v-model="showMenu" color="#141414" temporary right app>
      <v-list dense nav>
        <!-- Web routes -->
        <v-list-item v-for="(route, index) in routes" :key="index" link :to="route.to">
          <v-list-item-content style="color: white">
            <v-list-item-title>{{ $t(route.key) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Other menu items -->
        <v-divider></v-divider>

        <v-list-item link to="">
          <v-list-item-content>
            <v-list-item-title @click="changeLang()" style="color: white" class="v-list-item__title"
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
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings']),
  },
  methods: {
    nextLan() {
      if (this.settings.language == 'es') return 'en'
      else return 'es'
    },

    onClickOutside() {
      this.showMenu = false
    },

    changeLang() {
      let settings = { ...this.settings }
      settings.language = this.nextLan()
      this.$store.dispatch('updateSettings', settings)
    },
  },

  data() {
    return {
      showMenu: false,
      routes: [
        { to: '/', key: 'home' },
        { to: '/get-started', key: 'getStarted' },

        { to: '/settings', key: 'settings' },
        { to: '/editors', key: 'editors' },

        { to: '/community', key: 'support_ohana' },

        { to: '/about', key: 'about' },

        //{to: '/community', key: 'community'}
      ],
    }
  },
}
</script>

<style scoped>
.v-overlay--active {
  z-index: 9999999 !important;
}
a {
  color: #ffffff !important;

  font-weight: 400;
  padding: 0 0.75em;

  font-size: 1em;
  text-decoration: none;
}

a:visited {
  color: white;
}

button {
  box-shadow: none !important;
}
#menu {
  /* text-align: right;*/
  margin-right: 10px;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

@media screen and (min-width: 960px) {
  li {
    display: inline;
  }
}

@media screen and (max-width: 9600px) {
}
</style>
