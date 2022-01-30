<template>
  <div>
    <h4></h4>
    <!--language-->
    <div style="margin-top: 20px">
      <LanguageSelect />
    </div>
  </div>
</template>

<script>
import LanguageSelect from '@/components/Settings/LanguageSelect.vue'
export default {
  components: {
    LanguageSelect,
  },
}
</script>

<style lang="scss" scoped></style>
