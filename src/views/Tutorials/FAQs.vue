<template>
  <div class="subpage">
    <MarkdownIt file="faqs" class="inner faqs" scrollTo="scrollTo" />
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
  computed: {
    ...mapState(['settings']),
  },
  head: function () {
    //This is used to generate the meta tags needed for better SEO and stuff.
    let title = 'FAQs'
    let desc = 'Have questions about Ohana Movies? We are here to answer them!'
    return sharedjs.headObject(title, desc)
  },
  methods: {
    scrollTo: function (focus) {
      if (!focus) return
      let elem = document.querySelector(focus)
      console.log('scrollTo ', focus, elem)
      elem.scrollIntoView({ behavior: 'smooth' })
    },
  },
  props: {
    focus: {
      type: String,
      default: '',
    },
  },
  mounted() {
    // https://stackoverflow.com/a/55488834
    setTimeout(() => {
      this.scrollTo(this.focus)
    })
  },
  data() {
    return {
      //TODO: make this consistent across pages easily
      providersList: [
        { text: 'Netflix', value: 'netflix' },
        { text: 'HBO', value: 'hboespana' },
        { text: 'Disney+', value: 'disneyplus' },
        { text: 'Movistar', value: 'movistar' },
        { text: 'Rakuten', value: 'rakuten' },
      ],
    }
  },
}
</script>

<style>
.faqs h3,
.faqs h4 {
  font-weight: bold;
}

.faqs .v-icon {
  font-size: 20px !important;
}
</style>
