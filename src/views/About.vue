<template>
  <div class="subpage">
    <!-- Header -->
    <my-header></my-header>

    <section id="main" class="wrapper">
      <div class="inner">
        <h1>About us</h1>

        <p>
          We are a community of developers and movie fans like you. We work passionately to make
          Ohana possible.
        </p>
        <p>
          We are just getting started, and hope you love what we do. Feel free to
          <router-link to="/community">join the community</router-link>
          to start contributing as content editor, or consider
          <a href="https://www.patreon.com/ohanamovies" target="_blank">donating</a> to help us
          growing.
        </p>

        <p>
          If you are looking to tutorials on how to use Ohana, check the
          <router-link to="/get-started">Get Started page</router-link>.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
const rawTags = require('../assets/raw_tags')
export default {
  data() {
    return {
      key: 'value',
      tags: rawTags.content
    }
  }
}
</script>

<style>
.fakeUL > p {
  margin-bottom: 2px !important;
  margin-left: 8px;
}
</style>
