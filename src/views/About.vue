<template>
  <div class="subpage">
    <!-- Header -->
    <my-header></my-header>

    <section id="main" class="wrapper" style="max-width: 700px; margin:auto">
      <div class="inner">
        <div id="what-is-ohana">
          <h2>What is Ohana?</h2>
          <p>
            Ohana means Family in Hawuaiian. And that's our name because Ohana is a community of
            families and movie fans like you that share a passion for good clean movies.
          </p>
          <p>
            Our community develops a combination of data and tools whose goal is to let people like
            you watch movies and shows without having to worry about that annoying or innapropiate
            content they don't want to watch (sex scenes, violent content, etc.)
          </p>
          <p>
            Our Chrome extension embeds itself within Netflix, HBO, etc. enabling you to skip those
            scenes you do not want to watch. With Ohana you decide what to watch and what to skip!
            Don't like watching bloody scenes? Tell Ohana to skip the Very Violent content.
          </p>
          <p>
            If you want to watch great movies, but don't like watching some of the scenes those
            movies sometimes have, you will be pleased to meet Ohana.
          </p>
        </div>
        <div>
          <h2>More...</h2>
          <p>
            We are just getting started, and hope you love what we do. Feel free to
            <router-link to="/community">join the community</router-link>
            to start contributing as content editor, or consider
            <a href="https://www.patreon.com/ohanamovies" target="_blank">donating</a> to help us
            improve Ohana.
          </p>

          <p>
            If you are looking to tutorials on how to use Ohana, check the
            <router-link to="/get-started">Get Started page</router-link>.
          </p>
        </div>
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
