<template>
  <div>
    <v-dialog v-model="showMovieDialog" scrollable width="750">
      <MoviePopup :imdb="imdb" :onExtensionIframe="true" @close="close()" @edit="edit()" />
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
  watch: {
    showMovieDialog: function (newValue, old) {
      console.log(old) // just to enable compile -> "unused parameter..."
      if (!newValue) this.close()
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
  created() {
    //if (this.inIframe()) { // Should we inject only on iframe?

    const style = document.createElement('style')
    document.head.append(style)
    style.textContent = `
      #app, .v-application, body { background: transparent !important; }
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
