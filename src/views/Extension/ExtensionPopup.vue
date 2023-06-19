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
    inIframe() {
      try {
        return window.self !== window.top
      } catch (e) {
        return true
      }
    },
  },
  mounted() {
    //if (this.inIframe()) { // Should we inject only on iframe?

    const style = document.createElement('style')
    document.head.append(style)
    style.textContent = `
      #app, .v-application { background: transparent !important; }
      #app:before { display: none !important }
      `
  },
  data() {
    return {
      showMovieDialog: true,
    }
  },
}
</script>
