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
import ohana from '@/assets/ohana'
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

      if (ohana.user.language().substr(0, 2) == 'es') {
        return 'ES'
      } else {
        return 'US'
      }
    },
    countriesDropdown() {
      let output = []
      for (let i = 0; i < this.countries.length; i++) {
        output.push({
          text:
            this.getNameTranslation(this.countries[i]) +
            ' ' +
            this.countries[i].cca2 +
            ' ' +
            this.countries[i].region, //used for filter
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
    changeCountry(v) {
      let settings = { ...this.settings }
      settings.country = v
      this.$store.dispatch('updateSettings', settings)
    },
    getNameTranslation(country) {
      let x = ohana.user.language().substr(0, 2)
      if (x == 'en') return country.name.common //eng is here
      if (x == 'es') return country.translations.spa.common //translations are here
    },
    fetchCountries() {
      console.log('fetching countries...')
      const url = 'https://restcountries.com/v3.1/all'
      this.loading = true
      fetch(url)
        .then((r) => {
          this.loading = false
          return r.json()
        })
        .then((countries) => {
          this.countries = [...countries]
        })
    },
  },
  mounted() {
    this.fetchCountries()
  },
}
</script>

<style lang="scss" scoped></style>
