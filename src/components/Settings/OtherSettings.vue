<template>
  <div>
    <h4></h4>
    <!--language-->
    <div style="margin-top: 20px">
      <LanguageSelect />
    </div>
    <!-- country-->
    <div style="margin-top: 20px">
      <CountrySelect />
      <p style="margin-top: 10px">
        <b>Note: </b>Content providers (Netflix, etc.) don't offer the same movies/shows in all
        countries. This setting is used to show you watch options available in your country.
      </p>
    </div>
  </div>
</template>

<script>
import CountrySelect from '@/components/Settings/CountrySelect.vue'
import LanguageSelect from '@/components/Settings/LanguageSelect.vue'
export default {
  components: {
    CountrySelect,
    LanguageSelect,
  },
}
</script>

<style lang="scss" scoped></style>
