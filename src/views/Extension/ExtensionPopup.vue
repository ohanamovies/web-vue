<template>
  <div>
    <v-dialog v-model="showMovieDialog" scrollable width="750">
      <MoviePopup :imdb="imdb" onExtensionIframe="true" @close="close()" @edit="edit()" />
    </v-dialog>
  </div>
</template>

<script>
import MoviePopup from '@/components/MoviePopup/MoviePopup.vue'

export default {
  props: {
    imdb: {
      type: String,
      default: '',
    },
  },
  components: {
    MoviePopup,
  },
  methods: {
    close() {
      window.top.postMessage('close-ohana-iframe', '*')
    },
    edit() {
      window.top.postMessage('edit-ohana-iframe', '*')
    },
  },
  data() {
    return {
      showMovieDialog: true,
    }
  },
}
</script>

<style scoped>
body,
.v-application {
  background: transparent !important;
}
</style>
