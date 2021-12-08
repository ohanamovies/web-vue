<template>
  <div>
    <b>dedit valuesds</b>

    <v-list style="max-width: 500px; margin: auto">
      <v-list-group v-for="(value_group, i) in raw_values" :key="i" v-model="value_group.active">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title
              v-text="
                value_group.title.es +
                ' (' +
                value_group.values.filter((x) => x.status && x.status != 'irrelevant').length +
                ')'
              "
              style="font-size: 110%"
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
            <v-icon v-if="value.status == 'positive'" color="green">mdi-thumb-up</v-icon>
            <v-icon v-else-if="value.status == 'negative'" color="red">mdi-thumb-down</v-icon>
            <v-icon v-else-if="value.status == 'mixed'" color="orange">mdi-thumbs-up-down</v-icon>
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
    }
  },
  methods: {
    toggleValue(i, j) {
      let options = ['positive', 'negative', 'mixed', 'irrelevant']
      let index = options.indexOf(this.raw_values[i].values[j].status)

      console.log('iiii', i)
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
