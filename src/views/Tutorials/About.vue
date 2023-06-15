<template>
  <div class="subpage">
    <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
      <MarkdownIt file="about" class="inner" />
    </section>
  </div>
</template>

<script>
import sharedjs from '@/sharedjs'

//----------------

import { mapState } from 'vuex'
import MarkdownIt from '@/components/Docs/MarkdownIt.vue'

export default {
  components: {
    MarkdownIt,
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['settings']),
  },
  head: function () {
    //This is used to generate the meta tags needed for better SEO and stuff.
    let title = 'About us'
    let desc = 'Learn more about Ohana: why? what? how?'
    return sharedjs.headObject(title, desc)
  },
}
</script>

<style>
h2 {
  padding-top: 40px;
  margin-bottom: 10px;
  font-weight: bold;
}

h4 {
  margin: 20px 0 5px 0;
  font-weight: bold;
  font-size: 1.3em;
}
</style>
