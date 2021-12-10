<template>
  <div>
    <v-select
      dense
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
  computed: {
    ...mapState(['settings']),
    lang() {
      return this.settings.language
    },
    langLabel() {
      const langLabels = { es: 'Idioma', en: 'Language' }
      console.log('aaaa', langLabels, this.lang)
      if (langLabels[this.lang]) {
        return langLabels[this.lang]
      } else {
        return 'en'
      }
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

<style scoped>
.v-select__selections > input {
  visibility: hidden !important;
}
</style>
