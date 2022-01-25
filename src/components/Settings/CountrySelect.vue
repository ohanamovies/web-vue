<template>
  <div>
    <v-autocomplete
      :value="selectedCountry"
      @change="changeCountry($event)"
      :loading="loading"
      :items="countriesDropdown"
      outlined
      dense
      chips
      hide-details
      small-chips
      label="Country"
    >
      <template v-slot:selection="data">
        <v-chip small v-bind="data.attrs" :input-value="data.selected" @click="data.select">
          <v-avatar left>
            <v-img :src="data.item.flag"></v-img>
          </v-avatar>
          {{ data.item.name }}
        </v-chip>
      </template>
      <template slot="item" slot-scope="{ item }">
        <v-list-item-avatar height="25" width="25">
          <img :src="item.flag" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html="item.name"></v-list-item-title>
          <v-list-item-subtitle v-html="item.region"></v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
//import ohana from '@/assets/ohana'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      country: '',
      countries: [],
      loading: false,
    }
  },
  computed: {
    ...mapState(['settings']),
    selectedCountry() {
      if (this.settings.country) return this.settings.country

      //fallback (shouldn't be used, as vuex offers directly this same default value)
      if (this.settings.language == 'es') {
        this.changeCountry('ES')
        return 'ES'
      } else {
        this.changeCountry('US')
        return 'US'
      }
    },
    countriesDropdown() {
      let output = []
      for (let i = 0; i < this.countries.length; i++) {
        let search_text = Object.keys(this.countries[i].translations)
          .map((x) => this.countries[i].translations[x].common)
          .join(' ')
        output.push({
          text:
            this.getNameTranslation(this.countries[i]) +
            ' ' +
            this.countries[i].cca2 +
            ' ' +
            this.countries[i].region +
            ' ' +
            search_text, //used for filter

          value: this.countries[i].cca2,
          name: this.getNameTranslation(this.countries[i]) + ' (' + this.countries[i].cca2 + ')',
          cca2: this.countries[i].cca2,
          flag: this.countries[i].flags.png || '',
          region: this.countries[i].region || '',
        })
      }
      output.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      return output
    },
  },

  methods: {
    async fetchCountryFromIP() {
      try {
        //TODO: review we want to do it this way... (maybe get an API key and add this to our own api.)
        const url = 'https://ipinfo.io/json'
        let response = await fetch(url)
        let data = await response.json()
        if (data.country) this.changeCountry(data.country)
      } catch (error) {
        console.log('error fetching country from ip')
      }
    },
    changeCountry(v) {
      let settings = { ...this.settings }
      settings.country = v
      this.$store.dispatch('updateSettings', settings)
    },
    getNameTranslation(country) {
      let x = this.settings.language
      if (x == 'en') return country.name.common //eng is here
      if (x == 'es') return country.translations.spa.common //translations are here
    },
    fetchCountries() {
      const url = 'https://restcountries.com/v3.1/all'
      const useLocal = true
      this.loading = true

      if (useLocal) {
        this.countries = require('@/assets/countries.json')
        this.loading = false
      } else {
        console.log('fetching countries...')
        fetch(url)
          .then((r) => {
            this.loading = false
            return r.json()
          })
          .then((countries) => {
            this.countries = [...countries]
          })
      }
    },
  },
  mounted() {
    this.fetchCountries()
    if (!this.settings.welcomed) {
      this.fetchCountryFromIP()
    }
  },
}
</script>

<style lang="scss" scoped></style>
