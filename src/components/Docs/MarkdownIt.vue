<template>
  <div v-html="markdown(mdtext)"></div>
</template>

<script>
import { mapState } from 'vuex'
import faq_en from '@/assets/articles/faq_en.md'
import faq_es from '@/assets/articles/faq_es.md'

const slugify = function (s) {
  return s
    .toLowerCase()
    .replaceAll(/[^a-z ]/g, '')
    .replaceAll(' ', '-')
}

var md = require('markdown-it')({
  html: true,
}).use(require('markdown-it-anchor').default, { slugify })
/*
var md = new MarkdownIt()
md.use(require('markdown-it-anchor').default)
*/

//TODO: TOC links are not working, due to vue/netlify stuff...
/*md.use(require('markdown-it-table-of-contents'), {
  transformLink: (link) => {
    console.log('LINK', link)
    return '/about#' + link // .replace(/#/, '###')
  },
})
*/

export default {
  props: {
    file: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapState(['settings']),
  },
  watch: {
    settings(newValue, oldValue) {
      if (newValue.language != oldValue.language) {
        this.updateMarkdown()
      }
    },
  },
  data() {
    return {
      mdtext: 'Loading...',
    }
  },
  methods: {
    updateMarkdown() {
      if (this.settings.language == 'es') {
        this.mdtext = faq_es.md
      } else {
        this.mdtext = faq_en.md
      }
    },
    markdown(a) {
      let x = document.createElement('div')
      x.innerHTML = md.render(a)

      //manually create toc (we need to do this because of the vue/netlify stuff and # mess)
      let toc = document.createElement('ol')
      toc.classList.add('toc')

      let h2s = x.getElementsByTagName('h2')
      for (const h2 of h2s) {
        const link = this.file + '#' + h2.id
        x.innerHTML = x.innerHTML.replace(
          h2.outerHTML,
          `<h2 id="${h2.id}"><a class="header-anchor" href="${link}">#</a> ${h2.innerHTML}</h2>`
        )
        let li = document.createElement('li')
        li.innerHTML = `<a href="${link}">${h2.innerText}</a>`
        toc.appendChild(li)
      }

      //Link to edit on github
      let editGitHub = document.createElement('a')
      editGitHub.classList.add('modern-link')
      editGitHub.innerText =
        this.settings.language == 'es' ? 'Editar contendio en GitHub' : 'Edit content on GitHub'
      editGitHub.setAttribute('target', '_blank')
      editGitHub.href =
        'https://github.com/ohanamovies/web-vue/tree/main/public/articles/' +
        this.file +
        '_' +
        this.settings.language +
        '.md'
      return x.innerHTML.replace('[[toc]]', toc.outerHTML) + '<br>' + editGitHub.outerHTML
    },
  },
  beforeMount() {
    this.updateMarkdown()
  },
}
</script>

<style scoped>
/*https://stackoverflow.com/questions/34459841/show-child-element-on-parent-hover-in-css*/
h2 * .header-anchor {
  visibility: hidden;
  display: none;
}

.header-anchor {
  color: rgb(0, 192, 80);
  text-decoration: none;
}
h2:hover * .header-anchor {
  visibility: visible;
  display: block;
}
</style>
