<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click="dropdown = true">
          <v-icon class="pointer" :color="status.color">{{ status.icon }}</v-icon>
        </v-btn>
      </template>

      <v-card min-width="250" max-width="300">
        <v-card-title>
          <div style="display: flex">
            <div>
              <v-icon :color="status.color" class="mr-2 mb-1">{{ status.icon }}</v-icon>
            </div>
            <div>
              {{ status.title }}
            </div>
          </div>
        </v-card-title>
        <v-card-subtitle>
          {{ status.subtitle }}
        </v-card-subtitle>
        <v-card-text>
          <div>
            <span
              ><b>Without Ohana</b> health: {{ movieContent.health }} | trust:
              {{ movieContent.trust }} | cuts: 0</span
            >
            <br />
            <span>
              <b>With Ohana</b> health: {{ filterStatus.health }} | trust:
              {{ filterStatus.trust }} | cuts: {{ filterStatus.scenes.length }}
            </span>
          </div>
        </v-card-text>
      </v-card>

      <v-list v-if="false">
        <v-list-item v-for="(icon, index) in icons" :key="index" @click="selectIcon(icon)">
          <v-list-item-title>
            <v-icon class="mb-1" :color="icon.color">{{ icon.icon }}</v-icon>
            {{ icon.text }}</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {}
      },
    },

    tag: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    movieContent() {
      let mc = { health: 0, trust: 0 } //default
      if (this.item.movieContent && this.item.movieContent[this.tag]) {
        mc = this.item.movieContent[this.tag]
      }

      return mc
    },
    filterStatus() {
      let fs = { health: 0, trust: 0, scenes: [], icon: 'mdi-progress-question' } //default empty
      if (this.item.filterStatus && this.item.filterStatus[this.tag]) {
        fs = this.item.filterStatus[this.tag]
      }
      return fs
    },
    status() {
      let fs = this.filterStatus

      if (fs.health >= 0.5) {
        fs.icon = fs.scenes.length == 0 ? 'mdi-emoticon-happy' : 'mdi-content-cut'
        fs.color = 'green'
        fs.title = fs.scenes.length == 0 ? 'Healthy' : 'Healthy with Ohana'
        fs.subtitle =
          fs.scenes.length == 0
            ? 'There are no "' + this.tag + '" scenes in this movie. '
            : 'All ' +
              fs.scenes.length +
              ' "' +
              this.tag +
              '" scenes have been identified. You can watch the healthy version of this movie with Ohana.'
      } else if (fs.health <= -0.5) {
        fs.icon = 'mdi-flag-variant'
        fs.color = 'red'
        fs.title = 'Unhealthy'
        fs.subtitle =
          'There is "' + this.tag + '" content in this movie for which we don\'t have filters yet'
      } else {
        fs.icon = 'mdi-progress-question'
        fs.color = 'grey'
        fs.title = 'Unknown'
        fs.subtitle = 'We are not sure'
      }

      return fs
    },
  },
}
</script>

<style scoped>
button {
  box-shadow: none;
  color: initial !important;
}

.pointer {
  cursor: pointer;
}
</style>
