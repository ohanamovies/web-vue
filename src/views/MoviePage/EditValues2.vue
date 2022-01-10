<template>
  <div>
    <div v-if="!imdb">
      <b>Error: not imdb provided</b>
    </div>

    <div v-else-if="loading"><b>Loading... Please wait a minute</b></div>

    <div v-else>
      <TagsSelector title="Your vote:" :items="chips" v-model="selectedValues" :multiple="true" />
      <br />
      <button class="button special" @click="sendVote()" :disabled="!settings.username">
        Send my vote
      </button>
      <span v-if="!settings.username">
        <b>You need to login to post data</b>
      </span>
      <br />
      <br />
      Preview: <code>{{ keysToHealth(selectedValues) }}</code>
    </div>
  </div>
</template>

<script>
import ohana from '@/assets/ohana/index'
import tags_excel from '@/assets/tags_excel'
import TagsSelector from './TagsSelector.vue'
import { mapState } from 'vuex'
export default {
  components: {
    TagsSelector,
  },
  props: {
    imdb: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selectedValues: [],
      alltags: { scenes: [], values: [] },
      loading: false,
    }
  },
  watch: {
    selectedValues(newValue) {
      //make sure we remove the children if parent is removed
      if (this.alltags.length) {
        newValue.forEach((key) => {
          let parents = this.alltags.values.find((x) => x.key == key).parents
          if (parents.length > 0) {
            if (!newValue.some((item) => parents.includes(item))) {
              this.selectedValues.splice(this.selectedValues.indexOf(key), 1)
            }
          }
        })
      }
    },
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings']),

    values() {
      return this.alltags.values
    },

    chips() {
      let output = []
      for (const tag of this.values) {
        const chipTag = {
          value: tag.key,
          title: tag.name ? tag.name : tag.key,
          description: tag.tip,
        }
        if (tag.parents.length == 0) {
          chipTag.color = 'black'
          output.push(chipTag)
        } else if (this.selectedValues.some((item) => tag.parents.includes(item))) {
          chipTag.color = 'primary'
          output.push(chipTag)
        }
      }
      return output
    },
  },
  methods: {
    async getUserVote() {
      if (!this.settings.username) return
      const query = {
        action: 'getUserVote',
        about: 'setValues',
        user: this.settings.username,
        id: this.imdb,
      }
      const myvote = await ohana.api.query(query)
      for (const key in myvote) {
        this.selectedValues.push(key)
      }
    },
    keysToHealth(arr) {
      let output = {}
      arr.forEach((key) => {
        output[key] = { health: 1 }
      })
      return output
    },
    sendVote() {
      let voteData = this.keysToHealth(this.selectedValues)

      let query = {
        action: 'setValues',
        id: this.imdb,
        data: JSON.stringify(voteData),
      }
      ohana.api.query(query, true, true)
    },
    getAllTags() {
      this.loading = true
      const url =
        'https://script.googleusercontent.com/macros/echo?user_content_key=WX7_CkVcDYYG8ckrWmqPw73gVMxYKW6Bpusx02u2QBVvPbffqcTLaXsTvv1Np-4aeu2ZOC6UwOVc4RJZZKSTrWfeRitZ17NpOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa5V7SzAZj2xBfFDRtNxpfsmuqfjnOYLBpWrI3G8IWJh29l4LSossvEa_fiNHZ0znxEBErwHi9mmiH5-9NQj1Fcu3hpOOhlyi7z3asNxrX_-RehUT3gRYzxpsMTuA4xoUQNlesTh-p4pFwqJbeTowOR_fVIgxkfofiQ&lib=M7OO09pfGNQD9igEAo4bouJoiE_6Oxspk'
      fetch(url)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          console.log('dataaaaa', data)
          this.alltags = tags_excel.adaptTags(data.records, this.settings.language)
          this.loading = false
        })
      //this.alltags = tags_excel.getTagsLocal(this.settings.language)
    },
  },
  mounted() {
    this.getAllTags()
    this.getUserVote()
  },
}
</script>

<style scoped></style>
