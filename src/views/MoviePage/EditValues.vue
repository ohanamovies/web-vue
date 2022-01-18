<template>
  <div>
    <br />
    <b>Edit values (this won't be saved!)</b>

    <div>
      Postivo: <v-icon color="green">mdi-thumb-up</v-icon>
      <br />
      Negativo: <v-icon color="red">mdi-thumb-down</v-icon>
      <br />
      Mezcla: <v-icon color="orange">mdi-thumbs-up-down</v-icon>
    </div>

    <v-list style="max-width: 500px; margin: auto">
      <v-list-group v-for="(value_group, i) in raw_values" :key="i" v-model="value_group.active">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title
              v-text="
                value_group.title.es +
                ' (' +
                value_group.values.filter((x) => x.status || x.status == 0).length +
                ')'
              "
              style="font-size: 110%; font-weight: 600 !important"
            ></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="(value, j) in raw_values[i].values"
          :key="j"
          style="cursor: pointer"
          @click="toggleValue(i, j)"
        >
          <v-list-item-content style="padding-left: 20px">
            <v-list-item-title v-text="value.title.es"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon v-if="value.status == 1" color="green">mdi-thumb-up</v-icon>
            <v-icon v-else-if="value.status == -1" color="red">mdi-thumb-down</v-icon>
            <v-icon v-else-if="value.status == 0" color="orange">mdi-thumbs-up-down</v-icon>
            <v-icon v-else color="black">mdi-circle-outline</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
import raw_values from '@/assets/raw_values'
export default {
  data() {
    return {
      raw_values: raw_values.values,
      selected_values: [],
    }
  },
  methods: {
    toggleValue(i, j) {
      let options = [1, -1, 0, null]
      let index = options.indexOf(this.raw_values[i].values[j].status)

      //console.log('iiii', i)
      index++

      if (index >= options.length) index = 0
      this.raw_values[i].values[j].status = options[index]
      this.raw_values = [...this.raw_values]

      console.log('value: ', options[index])
    },
  },
}
</script>

<style lang="scss" scoped></style>
