<template>
  <div>
    <h1>hellow there</h1>
    <MoviePopupVue :imdb="imdb" :hide-close-button="true" />
  </div>
</template>

<script>
import MoviePopupVue from '@/components/MoviePopup/MoviePopup.vue'

export default {
  props: {
    imdb: {
      type: String,
      default: '',
    },
  },
  components: {
    MoviePopupVue,
  },
}
</script>

<style scoped>
body,
.v-application {
  background: transparent !important;
}
</style>
