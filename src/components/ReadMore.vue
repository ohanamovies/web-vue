<!-- Simple component to crop long text with the option to "readmore"/"readless"-->
<template>
  <div>
    <div class="overview" v-if="text.length < max || viewMore">
      {{ text }}
      <a v-if="text.length >= max" @click="viewMore = false" style="font-size: 80%"> Read less</a>
    </div>
    <div v-else>
      {{ text.slice(0, max - buffer) }}...
      <a @click="viewMore = true" style="font-size: 80%">Read more</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    max: {
      type: Number,
      default: 100,
    },
  },
  computed: {
    buffer() {
      return Math.min(this.max * 0.2, 50)
    },
  },
  data() {
    return {
      viewMore: false,
    }
  },
}
</script>

<style lang="scss" scoped></style>
