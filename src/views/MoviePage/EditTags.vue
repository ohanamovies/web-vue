<template>
  <div>
    <div v-if="!imdb">
      <b>Error: not imdb provided</b>
    </div>

    <div v-else-if="loading"><b>Loading... Please wait a minute</b></div>

    <div v-else-if="userChips && sceneTags">
      <b>This is work in progress</b>
      <TagsSelector :items="userChips" v-model="userTags" />
      {{ userTags }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
//import ohana from '@/assets/ohana/index'
import TagsSelector from '@/components/TagsSelector.vue'
import tags_excel from '@/assets/tags_excel'
export default {
  components: {
    TagsSelector,
  },
  props: {
    imdb: {
      type: String,
      default: '',
    },
    original: {
      type: Object,
      default() {
        return {}
      },
    },
  },

  data() {
    return {
      userTags: [],
      loading: false,
      alltags: { scenes: [] },
    }
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings']),

    sceneTags() {
      return this.alltags.scene
    },
    userChips() {
      let output = []
      for (const tag of this.sceneTags) {
        console.log('vamos')
        const chipTag = {
          value: tag.key,
          title: tag.name ? tag.name : tag.key,
          description: tag.tip,
        }
        console.log('chipTag', chipTag)
        if (tag.parents.length == 0) {
          chipTag.color = 'black'
          output.push(chipTag)
        } else if (this.userTags.some((item) => tag.parents.includes(item))) {
          chipTag.color = 'success'
          output.push(chipTag)
        }
      }
      return output
    },
  },
  methods: {
    getAllTags() {
      this.loading = true
      const url =
        'https://script.googleusercontent.com/macros/echo?user_content_key=WX7_CkVcDYYG8ckrWmqPw73gVMxYKW6Bpusx02u2QBVvPbffqcTLaXsTvv1Np-4aeu2ZOC6UwOVc4RJZZKSTrWfeRitZ17NpOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa5V7SzAZj2xBfFDRtNxpfsmuqfjnOYLBpWrI3G8IWJh29l4LSossvEa_fiNHZ0znxEBErwHi9mmiH5-9NQj1Fcu3hpOOhlyi7z3asNxrX_-RehUT3gRYzxpsMTuA4xoUQNlesTh-p4pFwqJbeTowOR_fVIgxkfofiQ&lib=M7OO09pfGNQD9igEAo4bouJoiE_6Oxspk'
      fetch(url)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          this.alltags = tags_excel.adaptTags(data.records, this.settings.language)
          this.loading = false
        })
      //this.alltags = tags_excel.getTagsLocal(this.settings.language)
    },
  },
  mounted() {
    this.getAllTags()
  },
}
</script>

<style lang="scss" scoped></style>
