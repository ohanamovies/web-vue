<template>
  <div id="app">
    <v-app>
      <v-main>
        <!-- Header: Needs to be put in each page, using <my-header></my-header> (why: because styling is different subpage vs home -->
        <div>
          <!-- Router view loads the current route. Router defines which .vue file is now loaded in router/index.js -->
          <router-view />
        </div>

        <!-- Footer: Imported here as component (Towards more modular coding) -->
        <!-- todo: for now forced to all pages by putting it in this App.vue component. If needed, remove from here and put the line of code in each subpage (if styling would depends on parent classes etc.) -->
        <my-footer></my-footer>
      </v-main>
    </v-app>
  </div>
</template>



<script>
export default {
  data() {
    return {}
  },
}
</script>



<style></style>
