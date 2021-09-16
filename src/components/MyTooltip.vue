<template>
  <!-- very much copied from https://www.w3schools.com/css/css_tooltip.asp-->
  <!-- Note: if text is empty, tooltip won't appear -->
  <div class="tooltip">
    <slot> </slot>
    <span class="tooltiptext" v-if="text">{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      key: 'value',
    }
  },
}
</script>

<style>
.tooltip {
  position: relative;
  display: inline-block;
  /*border-bottom: 1px dotted black;*/
}

.tooltip .tooltiptext {
  font-size: 0.9em;
  visibility: hidden;
  width: 180px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 8px 8px;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -90px;
}

.tooltip .tooltiptext::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  transition-delay: 0.8s;
}
</style>
