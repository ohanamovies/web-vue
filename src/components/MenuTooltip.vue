<template>
  <div class="inline-component">
    <v-menu
      offset-y
      :close-on-content-click="false"
      v-model="showDropdown"
      min-width="250"
      max-width="250"
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on" style="cursor: pointer; display: flex; align-items: center">
          <v-icon class="mb-0 ml-1" style="cursor: pointer" small>
            {{ icon }}
          </v-icon>
        </div>
      </template>
      <slot></slot>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'mdi-chevron-down',
    },
  },
}
</script>

<style scoped>
.inline-component {
  display: inline-block;
  vertical-align: middle; /* or top, bottom, middle, etc. */
}
</style>
