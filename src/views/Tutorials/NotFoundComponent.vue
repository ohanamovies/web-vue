<template>
  <div class="subpage">
    <my-header></my-header>
    <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
      <h1>Error 404. Page not found</h1>

      <p>Fear not! You can use the site menu to find the content you are looking for.</p>
    </section>
  </div>
</template>

<script>
import sharedjs from '@/sharedjs'
export default {
  head: function () {
    //This is used to generate the meta tags needed for better SEO and stuff.
    return sharedjs.headObject(
      'Error 404',
      'Page not found. Sorry you got here',
      this.$router.currentRoute.path
    )
  },
}
</script>

<style>
</style>