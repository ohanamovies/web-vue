<template>
  <div>
    <TagsSelector :items="focusTags" v-model="filtersFocusTags" />
    <p v-if="!items || Object.keys(items).length == 0">No filters so far.</p>
    <div v-for="(scene, sid) in visibleScenes" :key="sid">
      <SceneItem :scene="scene" />
    </div>
  </div>
</template>

<script>
import ohana from '@/assets/ohana/index'
import TagsSelector from '@/components/TagsSelector.vue'
import SceneItem from '@/views/MoviePage/SceneItem.vue'
export default {
  components: {
    TagsSelector,
    SceneItem,
  },
  props: {
    items: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  data() {
    return {
      filtersFocusTags: [], //to enable user to focus on specific filters
    }
  },
  computed: {
    visibleScenes() {
      let output = []
      for (const sid in this.items) {
        const scene = this.items[sid]
        if (
          scene &&
          (this.filtersFocusTags.length == 0 || this.includesAll(scene.tags, this.filtersFocusTags))
        ) {
          output.push(scene)
        }
      }
      return output
    },
    focusTags() {
      let allTags = []
      for (const scene of this.visibleScenes) {
        if (!scene) continue
        for (const tag of scene.tags) {
          if (allTags.map((t) => t.value).indexOf(tag) == -1) {
            allTags.push({
              value: tag,
              count: 1,
              title: tag,
            })
          } else {
            allTags[allTags.map((t) => t.value).indexOf(tag)].count++
          }
        }
      }

      for (let i = 0; i < allTags.length; i++) {
        allTags[i].title = allTags[i].value + ' (' + allTags[i].count + ' filters)'
      }
      return allTags
    },
  },
  methods: {
    includesAny(arr1, arr2) {
      return ohana.utils.includesAny(arr1, arr2)
    },
    includesAll(arrBig, arrSmall) {
      return ohana.utils.includesAll(arrBig, arrSmall)
    },
  },
}
</script>

<style lang="scss" scoped></style>
