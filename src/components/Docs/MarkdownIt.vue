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

      //<v-card id="main" class="wrapper" style="max-width: 800px; margin: 30px auto; padding: 15px">

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

      let html = x.innerHTML.replace('[[toc]]', toc.outerHTML)
      //</v-card><v-card>

      html = '<card>' + html.replaceAll('<h2', '</card><card> <h2') + '</card>'
      return (
        html +
        '<br><span style="margin: -30px auto 40px auto; display: table;">' +
        editGitHub.outerHTML +
        '</span>'
      )
    },
  },
  beforeMount() {
    this.updateMarkdown()
  },
}
</script>

<style>
h1,
h2,
h3 {
  scroll-margin-top: 60px !important;
}

.card {
  background-color: white;
  display: block;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}

.card-padded {
  padding: 1.5em;
}

card {
  background-color: white;
  margin: 50px auto;
  max-width: 800px;
  padding: 5px 20px 20px 20px;
  display: block;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}

#app {
  background-color: #e3e9e9;
}

#app::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.04;
  background-attachment: fixed !important;
  background: url('/icons/apple-touch-icon-152x152.png');
}

h1 {
  font-size: 2.5em;
  margin-top: 30px !important;
}
h2 {
  font-size: 2em;
}
h3 {
  font-size: 1.5em;
}
h4 {
  font-size: 1.2em;
}

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
