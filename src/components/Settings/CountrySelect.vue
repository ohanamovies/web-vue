<template>
  <!-- todo: use https://ipinfo.io/json to guess the country of the user (tbc: not sure if the other api also works returning your country in the first position...)-->
  <div>
    <v-menu
      offset-y
      :close-on-content-click="false"
      v-model="showDropdown"
      min-width="250"
      max-width="250"
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on" style="cursor: pointer; display: flex; align-items: center">
          <img
            :src="
              'https://flagcdn.com/w320/' +
              (settings.country ? settings.country.toLowerCase() : 'us') +
              '.png'
            "
            height="213"
            width="320"
            :style="{
              width: size + 'px',
              maxWidth: size + 'px',
              height: (size * 213) / 320 + 'px',
              maxHeight: (size * 213) / 320 + 'px',
            }"
          />

          <v-icon style="cursor: pointer" small>
            {{ showDropdown ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
          </v-icon>
        </div>
      </template>
      <v-card :loading="loading">
        <v-card-text>
          <v-text-field
            v-model="searchText"
            label="Search"
            hide-details
            outlined
            clearable
            dense
          ></v-text-field>

          <div style="max-height: 250px; overflow-y: auto">
            <v-list dense>
              <v-list-item
                class="pa-0"
                v-for="(option, index) in filteredOptions"
                :key="index"
                @click="selectOption(option)"
              >
                <v-list-item-avatar height="25" width="25">
                  <img :src="option.flags.png" :alt="option.flags.alt" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    >{{ option.name.common }} ({{ option.cca2 }})</v-list-item-title
                  >
                  <v-list-item-subtitle>{{ option.region }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="filteredOptions.length === 0">
                <v-list-item-title>{{ $t('no_options_found') }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'

//import ohana from '@/assets/ohana'
export default {
  props: {
    size: {
      type: Number,
      default: 40,
    },
  },
  data() {
    return {
      showDropdown: false,
      searchText: '',
      loading: false,
      loaded: false,
      options: [],
    }
  },
  watch: {
    showDropdown(newValue) {
      console.log('showDropdown', newValue)
      if (newValue && !this.loaded) {
        this.fetchCountries()
      }
    },
  },
  computed: {
    ...mapState(['settings']),
    filteredOptions() {
      let x = []
      for (let i = 0; i < this.options.length; i++) {
        const e = this.options[i]
        const text = [
          e.name.common,
          e.name.official,
          e.region,
          e.cca2,
          e.altSpellings.join(' '),
        ].join(' ')
        if (!this.searchText || text.toLowerCase().includes(this.searchText.toLowerCase())) {
          x.push(e)
        }
      }
      return x
    },
  },
  methods: {
    selectOption(option) {
      // Do something with the selected option
      console.log(`Selected option: ${option}`)
      let settings = { ...this.settings }
      settings.country = option.cca2
      this.$store.dispatch('updateSettings', settings)
      this.showDropdown = false
    },
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
    async fetchCountries() {
      console.log('fetch countries')
      const url =
        'https://restcountries.com/v3.1/all?fields=name,flags,cca2,region,altSpellings,translations'
      const useLocal = true
      this.loading = true
      this.loaded = true

      if (useLocal) {
        this.options = require('@/assets/countries2.json')
        //this.options = this.options.sort((a, b) => b.population - a.population)
        this.loading = false
      } else {
        console.log('fetching countries...')
        let x = await fetch(url)

        if (x.ok) {
          let data = await x.json()
          this.options = data
        }
        this.loading = false
      }
    },
  },
  mounted() {
    //this.fetchCountries()
  },
}
</script>

<style>
.chip-with-dropdown {
  cursor: pointer;
}
</style>
