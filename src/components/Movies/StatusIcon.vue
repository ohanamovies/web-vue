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
              ><b>{{ $t('without_ohana') }}</b> health: {{ movieContent.health }} | trust:
              {{ movieContent.trust }} | cuts: 0</span
            >
            <br />
            <span>
              <b>{{ $t('with_ohana') }}</b> health: {{ filterStatus.health }} | trust:
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
import ohana from '@/assets/ohana/'
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
      return ohana.movies.getFS(this.item.movieContent, this.tag)
    },
    filterStatus() {
      return ohana.movies.getFS(this.item.filterStatus, this.tag)
    },
    status() {
      let fs = this.filterStatus
      fs = ohana.movies.addColors(fs)
      fs = ohana.movies.addText(fs, this.tag)
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
