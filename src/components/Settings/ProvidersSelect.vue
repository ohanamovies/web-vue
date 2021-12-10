<template>
  <div style="max-width: 400px; margin: auto; overflow: auto">
    <!-- Providers -->

    <div>
      <h4>What providers do you use?</h4>

      <p>
        Ohana TV redirects you to the providers that offer the content. We don't offer content
        ourselves.
      </p>
      <p>We will prioritize content available in your providers.</p>
      <v-list>
        <div v-for="(provider, index) in providersList" :key="index">
          <v-list-item @click="toggle(provider.value)">
            <v-list-item-icon>
              <img
                height="25"
                :src="'images/providers/' + provider.value + '.png'"
                :alt="provider.text"
              />
            </v-list-item-icon>
            <v-list-item-content>
              {{ provider.text }}
            </v-list-item-content>
            <v-list-item-action>
              <v-checkbox
                :input-value="
                  settings.providers ? settings.providers.includes(provider.value) : false
                "
              ></v-checkbox>
            </v-list-item-action>
          </v-list-item>
          <v-divider class="ma-0" v-if="index + 1 < providersList.length"></v-divider>
        </div>
      </v-list>
      <div style="text-align: right; margin-right: 10px">
        <span class="modern-link" @click="selectOrUnselectAll()">{{
          settings.providers.length == 0 ? 'Select all' : 'Clear selection'
        }}</span>
      </div>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      country: {},
      providersList: [
        { text: 'Netflix', value: 'netflix' },
        { text: 'HBO Max', value: 'hbomax' },
        { text: 'Disney+', value: 'disneyplus' },
        { text: 'Prime Video', value: 'primevideo' },
        { text: 'Movistar+', value: 'movistarplus' },
        /*{ text: 'Rakuten', value: 'rakuten' },
        { text: 'Youtube', value: 'youtube' },*/
      ],
    }
  },

  computed: {
    ...mapState(['settings']),
  },
  methods: {
    toggle(provider) {
      console.log('[alex] toggle ' + provider)
      let settings = { ...this.settings }
      if (settings.providers.includes(provider)) {
        let i = settings.providers.indexOf(provider)
        if (i != -1) settings.providers.splice(i, 1)
      } else {
        settings.providers.push(provider)
      }
      this.$store.dispatch('updateSettings', settings)
    },
    selectOrUnselectAll() {
      let s = { ...this.settings } //make sure we use a copy of the object
      s.providers = [] //reset

      if (this.settings.providers.length == 0) {
        //add all
        for (let index = 0; index < this.providersList.length; index++) {
          const p = this.providersList[index].value
          s.providers.push(p)
        }
      } else {
        //clear all
        s.providers = []
      }
      this.$store.dispatch('updateSettings', s)
    },
  },
}
</script>

<style lang="scss" scoped></style>
