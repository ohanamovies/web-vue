<template>
  <div
    style="
      border: 1px solid grey;
      border-radius: 5px;
      padding: 10px;
      margin-bottom: 10px;
      font-size: 0.8rem;
    "
  >
    <div v-if="scene">
      <div v-if="scene.times">
        <b>Duration: {{ formatTime(averageDuration(scene.times)) }}</b>
        <span v-if="Object.keys(scene.times).length > 1" style="font-size: 80%">
          {{ $t('average_between_providers') }}
        </span>
        <ul style="margin-bottom: 5px">
          <li v-for="(time, provider) in scene.times" :key="provider">
            <b>{{ provider }}</b>
            {{ formatTime(time.end - time.start) }}
            <span style="font-size: 80%">
              ({{ formatTime(time.start) }} to {{ formatTime(time.end) }})</span
            >
          </li>
        </ul>
      </div>
      <div>
        <!-- filter tags -->
        <v-chip x-small class="mr-1" v-for="(t, it) in scene.tags" :key="it">{{ t }}</v-chip>
      </div>
      <div style="margin-top: 4px">
        <!-- what you need to konw -->
        <p :style="{ color: scene.plot_description ? 'default' : 'grey' }">
          <i>
            {{ scene.plot_description || 'No replacing text provided.' }}
          </i>
        </p>
      </div>

      <div style="font-size: 80%; margin-top: 5px">
        <div style="margin-top: 5px">
          <b>{{ $t('contributors') }}</b>
          <v-chip x-small class="ml-1" v-for="(contributor, c) of scene.contributors" :key="c">{{
            contributor
          }}</v-chip>
        </div>
        <div>
          <b>{{ $t('last_edited') }}</b> {{ new Date(scene.updatedAt).toISOString() }}
        </div>
      </div>

      <div v-if="scene.draft">
        <b style="color: red">{{ $t('draft') }}</b>
      </div>

      <div v-if="scene.flags && scene.flags.length" style="font-size: 70%">
        <b>{{ $t('flags') }}</b>
        <ul>
          <li v-for="(flag, index) in scene.flags" :key="index">
            {{ flag }}
          </li>
        </ul>
      </div>

      <div v-if="false" style="font-size: 60%; font-family: consolas">
        <code> {{ scene }}</code>
      </div>
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
    averageDuration(times) {
      let total = 0
      for (let provider in times) {
        if (times[provider].start && times[provider].end) {
          total += times[provider].end - times[provider].start
        }
      }
      return total / Object.keys(times).length
    },
    formatTime(t) {
      return ohana.utils.formatTime(t)
    },
  },
}
</script>

<style lang="scss" scoped></style>
