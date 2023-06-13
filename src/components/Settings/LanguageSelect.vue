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

    <div
      v-if="settings.language == 'es' && !hideDetails"
      :style="{
        marginTop: '10px',
        fontSize: '85%',
        color: dark ? 'white' : 'default',
        lineHeight: '1.1',
      }"
    >
      Nota: Algunas partes de la web están aún en inglés, pero estamos trabajando en ello.
      <router-link v-if="!dark" to="/community" target="_blank">Ayudar</router-link>
      <!-- FIXME: using dark here is an ugly workaround -->
    </div>
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
