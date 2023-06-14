<template>
  <div>
    <v-select
      id="languageSelect"
      :dark="dark"
      hide-details
      outlined
      :items="languages"
      :value="lang"
      :label="langLabel"
      @change="changeLanguage($event)"
    ></v-select>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    hideDetails: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['settings']),
    lang() {
      return this.settings.language || 'en'
    },
    langLabel() {
      return this.$t('language')
      /*const langLabels = { es: 'Idioma', en: 'Language' }
      console.log('aaaa', langLabels, this.lang)
      if (langLabels[this.lang]) {
        return langLabels[this.lang]
      } else {
        return 'en'
      }*/
    },
  },
  data() {
    return {
      languages: [
        { text: 'Español', value: 'es' },
        { text: 'English', value: 'en' },
      ],
    }
  },
  methods: {
    changeLanguage(lang) {
      console.log('hey', lang)
      let settings = { ...this.settings }
      settings.language = lang
      this.$store.dispatch('updateSettings', settings)
    },
  },
}
</script>

<style>
input#languageSelect {
  max-height: 0px !important;
}
</style>
