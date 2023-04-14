<template>
  <div style="padding: 10px; margin-top: 40px; max-width: 900px; margin: auto">
    <h1>Ohana Console</h1>

    <span style="font-size: 9pt; font-family: 'Courier New', Courier, monospace">
      https://api.ohanamovies.org/dev?action=setMapping&id=hbomax_GYp20fwP1-7VijAEAAAAF&username=johndoe&token=9095ud98-yc97-14fb-9619-6037c21b0df8&data=%7B%22imdb%22%3A%22tt2911666%22%2C%22type%22%3A%22movie%22%7D&newAPI=true&source=extension
    </span>
    <br />

    <!-- api url-->
    <v-text-field
      v-model="url"
      outlined
      dense
      clearable
      label="url"
      style="font-size: 10pt"
    ></v-text-field>

    <!-- payload -->
    <v-textarea
      :value="JSON.stringify(payload, null, 2)"
      label="payload"
      auto-grow
      outlined
      style="font-size: 10pt; font-family: 'Courier New', Courier, monospace"
    ></v-textarea>

    <!-- provider id & url -->
    <v-text-field
      v-model="providerId"
      outlined
      dense
      label="providerId"
      style="font-size: 10pt"
    ></v-text-field>

    <div v-if="movie.url" style="display: flex">
      <img
        :src="movie.logo"
        alt="movie.provider"
        style="
          height: 36px;
          border-radius: 5px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin-right: 5px;
        "
      />
      <a :href="movie.url" target="_blank">Check in {{ movie.provider }}</a>
    </div>
  </div>
</template>

<script>
import { providers } from '@/assets/ohana/ohana_modules/providers'

export default {
  data() {
    return {
      json: null,
      url: '',
      providerId: '',
      payload: {},
    }
  },
  watch: {
    url(n) {
      //https://api.ohanamovies.org/dev?action=setMapping&id=hbomax_GYp20fwP1-7VijAEAAAAF&username=miguel&token=5095dd98-ec97-45fb-8519-6037c24a0df8&data=%7B%22imdb%22%3A%22tt2911666%22%2C%22type%22%3A%22movie%22%7D&newAPI=true&source=extension
      this.getDataFromUrl(n)
    },
  },
  computed: {
    movie() {
      if (!this.providerId) return { url: '', provider: '' }
      let provider = this.providerId.split('_')[0]
      return {
        url: providers.getLink2(this.providerId),
        provider,
        logo: providers.getLogo(provider),
      }
    },
  },
  methods: {
    getDataFromUrl(url) {
      //payload (for api test)
      if (url.split('?').length) {
        this.payload = Object.fromEntries(new URLSearchParams(url.split('?')[1]))
      } else {
        this.payload = {}
      }

      //provider
      if (this.payload.action == 'setMapping') {
        this.providerId = this.payload.id
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
