<template>
  <div class="subpage">
    <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
      <div class="inner">
        <h1>Error 404. Page not found</h1>

        <p>Fear not! You can use the site menu to find the content you are looking for.</p>

        <router-link to="/" class="button">{{ $t('navigate_to_home') }}</router-link>
      </div>
    </section>
  </div>
</template>

<script>
import sharedjs from '@/sharedjs'
export default {
  head: function () {
    //This is used to generate the meta tags needed for better SEO and stuff.
    let title = 'Error 404'
    let desc = 'Page not found. Sorry you got here'
    return sharedjs.headObject(title, desc)
  },
}
</script>

<style></style>
