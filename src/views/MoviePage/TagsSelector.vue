<template>
  <div class="containerr">
    <b v-if="title">{{ title }}</b>
    <br />
    <div>
      <div v-for="(t, index) of items" :key="index">
        <fc-tooltip
          :text="t.description ? t.description : 'No data available'"
          :html="false"
          position="top"
        >
          <v-chip
            class="mr-1 mt-1"
            small
            :dark="valueArray.includes(t.value)"
            :outlined="!valueArray.includes(t.value)"
            @click="toggleItem(t.value)"
            :color="t.color ? t.color : '#000000'"
          >
            {{ t.title }}
          </v-chip>
        </fc-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    multiple: {
      type: Boolean,
      default: true,
    },
    value: [Array, String],
    title: {
      type: String,
      default: '',
    },
    items: {
      //items are expected as: {value, title, description}
      type: Array,
      default: function () {
        return []
      },
    },
    forceValue: { type: Boolean, default: false },
  },
  computed: {
    valueArray() {
      if (Array.isArray(this.value)) {
        return [...this.value]
      } else {
        return [this.value]
      }
    },
  },
  methods: {
    toggleItem(v) {
      let newValue = null

      //let's return the value in the same Type as given (Array or String)
      if (Array.isArray(this.value)) {
        if (this.multiple) {
          newValue = this.toggleInArray(this.value, v)
        } else {
          newValue = this.value[0] == v ? [] : [v]
        }
        if (newValue.length == 0 && this.forceValue) {
          newValue = [v]
        }
      } else {
        newValue = this.value == v ? '' : v
        if (newValue == '' && this.forceValue) {
          newValue = v
        }
      }

      this.$emit('input', newValue)
      this.$emit('change', newValue)
    },
    toggleInArray(arr, v) {
      if (!arr) return [v]

      let a = [...arr]
      if (a.includes(v)) {
        a = a.filter((x) => x !== v)
      } else {
        a.push(v)
      }

      return a
    },
  },
}
</script>

<style scoped>
.containerr {
  margin: 10px 0px;
  font-size: 10pt;
}
.containerr > div {
  display: flex;
  flex-wrap: wrap;
}
</style>
