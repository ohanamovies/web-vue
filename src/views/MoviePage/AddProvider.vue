<template>
  <div>
    <b>A provider is missing? you can add it!</b>
    <br />

    <v-text-field
      type="url"
      label="Movie URL"
      outlined
      hint="Paste here the url of the provider"
      v-model="providerURL"
    >
    </v-text-field>
    <p v-if="isValidLink">Provider: {{ providerName }} <br />id: {{ providerID }}</p>
    <p v-else style="color: red">Invalid Link</p>
    <div>
      <input type="checkbox" id="demo-human" name="demo-human" v-model="confirmCountry" />
      <label for="demo-human"
        >I confirm this provider is available on my country: {{ settings.country }}</label
      >
    </div>
    <button
      :disabled="!confirmCountry || !isValidLink"
      @click="addProvider()"
      class="button special"
    >
      Submit
    </button>
    <v-alert type="warning">This doest work yet sorry</v-alert>
  </div>
</template>

<script>
import ohana from '@/assets/ohana'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      providerURL: '',
      providerName: '',
      providerID: '',
      isValidLink: false,
      confirmCountry: false,
    }
  },
  computed: {
    ...mapState(['settings']),
  },
  watch: {
    providerURL() {
      console.log('jhfjhfkhgf')
      this.calculateVars()
    },
  },
  methods: {
    async calculateVars() {
      try {
        this.providerName = ohana.providers.getName(this.providerURL)
        this.providerID = await ohana.providers.getID(this.providerURL)
        if (this.providerID) {
          this.isValidLink = true
        } else {
          this.isValidLink = false
        }
      } catch (error) {
        this.providerName = 'Invalid link'
        this.providerID = ''
        this.isValidLink = false
      }
    },
    addProvider() {},
  },
}
</script>

<style lang="scss" scoped></style>
