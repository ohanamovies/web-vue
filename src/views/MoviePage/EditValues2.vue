<template>
  <div>
    <div v-if="!imdb">
      <b>Error: not imdb provided</b>
    </div>

    <div v-else-if="loading"><b>Loading... Please wait a minute</b></div>

    <div v-else>
      <p>
        <span v-if="editMode">What is your proposal?</span>

        <span v-else-if="communityValues.length"
          >Our community has identifyied the values highlighted here.</span
        >
        <span v-else
          >We don't have information about values in this film. Be the first contributing
          here!</span
        >
        <span class="modern-link" style="margin-left: 8px" @click="editMode = !editMode">{{
          editMode ? 'Cancel' : 'Edit values'
        }}</span>
      </p>
      <TagsSelector
        v-if="editMode"
        :readOnly="!editMode"
        :items="userChips"
        v-model="userValues"
        :multiple="true"
      />
      <TagsSelector
        v-else-if="communityValues.length"
        :readOnly="true"
        :items="communityChips"
        v-model="communityValues"
        :multiple="true"
      />
      <div v-if="editMode">
        <button
          class="button special"
          style="margin-bottom: 5px"
          @click="sendVote()"
          :disabled="!settings.username"
        >
          Send my vote
        </button>
        <span v-if="!settings.username">
          <b>You need to login to post data</b>
        </span>
      </div>

      Preview: <code>{{ keysToHealth(userValues) }}</code> <br />
      Original: <code>{{ original }}</code>
    </div>
  </div>
</template>

<script>
import ohana from '@/assets/ohana/index'
import tags_excel from '@/assets/tags_excel'
import TagsSelector from '@/components/TagsSelector.vue'
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
    original: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      editMode: false,
      userValues: [],
      communityValues: [],
      alltags: { scenes: [], values: [] },
      loading: false,
    }
  },
  watch: {
    userValues(newValue) {
      //make sure we remove the children if parent is removed
      if (this.alltags.length) {
        newValue.forEach((key) => {
          let parents = this.alltags.values.find((x) => x.key == key).parents
          if (parents.length > 0) {
            if (!newValue.some((item) => parents.includes(item))) {
              this.userValues.splice(this.userValues.indexOf(key), 1)
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

    userChips() {
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
        } else if (this.userValues.some((item) => tag.parents.includes(item))) {
          chipTag.color = 'success'
          output.push(chipTag)
        }
      }
      return output
    },
    communityChips() {
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
        } else if (this.communityValues.some((item) => tag.parents.includes(item))) {
          chipTag.color = 'success'
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

      if (Object.keys(myvote).length > 0) {
        for (const key in myvote) {
          this.userValues.push(key)
        }
      } else {
        this.userValues = this.communityValues //so we can edit starting from where community left
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
      let voteData = this.keysToHealth(this.userValues)

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
          this.alltags = tags_excel.adaptTags(data.records, this.settings.language)
          this.loading = false
        })
      //this.alltags = tags_excel.getTagsLocal(this.settings.language)
    },
  },
  mounted() {
    this.getAllTags()
    this.getUserVote()

    for (const key in this.original) {
      this.communityValues.push(key)
    }
  },
}
</script>

<style scoped></style>
