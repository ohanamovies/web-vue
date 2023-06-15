<template>
  <div class="subpage">
    <!-- Header -->

    <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
      <MarkdownIt file="get-started" class="inner" />
    </section>
  </div>
</template>

<script>
import sharedjs from '@/sharedjs'
import { mapState } from 'vuex'

import MarkdownIt from '@/components/Docs/MarkdownIt.vue'
const rawTags = require('../../assets/raw_tags')

export default {
  components: { MarkdownIt },
  head: function () {
    //This is used to generate the meta tags needed for better SEO and stuff.
    let title = 'Get started'
    let desc = 'Learn how to watch healthy content'
    return sharedjs.headObject(title, desc)
  },

  data() {
    return {
      key: 'value',
      tags: rawTags.content,
      settings_dialog: false,
      // providersList: [
      //   { text: 'Netflix', value: 'netflix' },
      //   { text: 'HBO', value: 'hbo' },
      //   { text: 'Movistar', value: 'movistar' },
      //   { text: 'Disney Plus', value: 'disneyplus' },
      //   { text: 'Rakuten', value: 'rakuten' }
      // ]
    }
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile']),
  },
}
</script>

<style scoped>
h2 {
  padding-top: 50px;

  margin-bottom: 10px;
  font-weight: bold;
}

h4 {
  margin: 20px 0 5px 0;
  font-weight: bold;
  font-size: 1.3em;
}
</style>
