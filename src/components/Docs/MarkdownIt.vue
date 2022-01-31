<template>
  <div v-html="markdown(mdtext)"></div>
</template>

<script>
import { mapState } from 'vuex'
var MarkdownIt = require('markdown-it')
var md = new MarkdownIt()
md.use(require('markdown-it-anchor').default)
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
      fetch('https://ohana.tv/articles/' + this.file + '_' + this.settings.language + '.md')
        .then((response) => response.text())
        .then((text) => {
          this.mdtext = text
        })
        .catch(() => {
          this.mdtext =
            this.settings.language == 'es'
              ? '## Error cargando contenido\n\nPrueba más tarde.'
              : '## Error fetching content\n\nTry again later.'
        })
    },
    markdown(a) {
      let x = document.createElement('div')
      x.innerHTML = md.render(a)

      //manually create toc (we need to do this because of the vue/netlify stuff and # mess)
      let toc = document.createElement('ol')
      toc.classList.add('toc')

      let h2s = x.getElementsByTagName('h2')
      for (const h2 of h2s) {
        let li = document.createElement('li')
        li.innerHTML = `<a href="${this.file}#${h2.id}">${h2.innerText}</a>`
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

<style lang="scss" scoped></style>
