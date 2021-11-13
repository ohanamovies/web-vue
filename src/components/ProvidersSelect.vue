<template>
  <div>
    <!-- Providers -->
    <div style="margin-top: 20px">
      <b>Select the providers you use</b>
      <p>
        Ohana TV redirects you to the providers that offer the content. We don't offer content
        ourselves.
      </p>
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
              <v-checkbox :input-value="settings.providers.includes(provider.value)"></v-checkbox>
            </v-list-item-action>
          </v-list-item>
          <v-divider class="ma-0" v-if="index + 1 < providersList.length"></v-divider>
        </div>
      </v-list>
      <div style="text-align: right; margin-right: 10px">
        <span class="modern-link" @click="selectOrUnselectAll()">Clear</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
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
      let settings = this.settings
      if (settings.providers.includes(provider)) {
        let i = settings.providers.indexOf(provider)
        if (i != -1) settings.providers.splice(i, 1)
      } else {
        settings.providers.push(provider)
      }
      this.$store.dispatch('updateSettings', settings)
    },
    selectOrUnselectAll() {
      for (let index = 0; index < this.providersList.length; index++) {
        const p = this.providersList[index].value
        if (this.settings.providers.includes(p)) this.toggle(p)
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
