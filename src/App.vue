<template>
  <div id="app">
    <v-app>
      <v-main>
        <div
          v-if="devMode"
          style="
            position: fixed;
            top: 50px;
            left: 50px;
            z-index: 999999;
            background-color: lightblue;
            padding: 10px;
            border-radius: 5px;
          "
        >
          <v-switch v-model="hasApp_dev" hide-details :label="'hasApp: ' + hasApp_dev"></v-switch>
        </div>
        <!-- Header: Needs to be put in each page, using <my-header></my-header> (why: because styling is different subpage vs home -->
        <my-header :isMobile="isMobile" :isChrome="isChrome"></my-header>
        <div>
          <!-- Router view loads the current route. Router defines which .vue file is now loaded in router/index.js -->

          <router-view :isMobile="isMobile" :isChrome="isChrome" :hasApp="hasApp" />
        </div>

        <!-- Footer: Imported here as component (Towards more modular coding) -->
        <!-- todo: for now forced to all pages by putting it in this App.vue component. If needed, remove from here and put the line of code in each subpage (if styling would depends on parent classes etc.) -->
        <my-footer :isChrome="isChrome"></my-footer>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      windowWidth: 0,
      hasApp_dev: false,
    }
  },
  computed: {
    devMode() {
      return window.location.hostname == 'localhost'
    },
    isMobile() {
      // breakpoints for columns:  https://vuetifyjs.com/en/components/grids/
      return this.windowWidth < 960
    },

    hasApp() {
      if (this.devMode) {
        return this.hasApp_dev
      } else {
        return sessionStorage.has_ohana_extension ? true : false
      }
    },
    isChrome() {
      return window.navigator.vendor == 'Google Inc.'
    },
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
    },
  },
}
</script>

<style></style>
