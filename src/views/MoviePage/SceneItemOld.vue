<template>
  <div>
    <h5>Filter {{ scene.id }}</h5>
    <p>
      Duration: {{ formatTime(scene.end - scene.start) }}
      <span style="font-size: 80%">
        ({{ formatTime(scene.start) }} to {{ formatTime(scene.end) }})</span
      >
    </p>
    <div>
      <p :style="{ color: scene.plot_description ? 'default' : 'grey' }">
        <b>What you need to know:</b>
        <i>
          {{ scene.plot_description || 'No replacing text provided.' }}
        </i>
      </p>
    </div>

    <div>
      <b>Filter Tags</b>
      <v-chip x-small class="ml-1" v-for="(t, it) in scene.tags" :key="it">{{ t }}</v-chip>
    </div>

    <div style="margin-top: 5px" v-if="scene.modified">
      Edited by @{{ scene.modified[0] }} (level {{ scene.modified[1] }}) on
      {{ new Date(scene.modified[2]).toISOString() }}
    </div>
    <div v-else>edited: {{ scene.modified }}</div>
    <div style="margin-top: 5px">Accessed: {{ scene.accessed }} times</div>
    <div style="font-size: 60%; font-family: consolas">
      <code> {{ scene }}</code>
    </div>
  </div>
</template>

<script>
import ohana from '@/assets/ohana/index'
export default {
  props: {
    scene: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  data() {
    return {
      key: 'value',
    }
  },
  methods: {
    formatTime(t) {
      return ohana.utils.formatTime(t)
    },
  },
}
</script>

<style lang="scss" scoped></style>
