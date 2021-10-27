<template>
  <div class="home">
    <!-- Header -->
    <!-- <my-header></my-header> -->

    <!-- Banner -->
    <section class="banner home-background" style="height: 60vh !important; display: flex">
      <div>
        <h1 class="fadeInUp" style="font-size: 2.2rem; margin-bottom: 10px">
          {{ $t('homeHeroText1') }}
        </h1>
        <p style="color: white; font-size: 1.2rem" class="fadeIn">
          {{ $t('homeHeroText2') }}
        </p>

        <div class="fadeInDown">
          <div v-if="isChrome && !hasApp">
            <a
              href="https://chrome.google.com/webstore/detail/family-cinema/nfkbclgkdifmoidnkapblfipbdkcppcf"
              class="button special"
              target="_blank"
              style="margin: 5px"
              >{{ $t('install') }}</a
            >
          </div>
          <div v-if="hasApp">
            <router-link to="community" class="button special">{{
              $t('support_ohana')
            }}</router-link>
          </div>

          <div v-else-if="!isChrome">
            <router-link to="get-started" class="button special">{{
              $t('getStarted')
            }}</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import sharedjs from '@/sharedjs'
import { mapState } from 'vuex'

export default {
  name: 'Home2',

  head: function () {
    //This is used to generate the meta tags needed for better SEO and stuff.
    let title = 'Ohana Movies'
    let desc = 'Ohana enables you to watch your favorite movies in a healthy way'
    return sharedjs.headObject(title, desc)
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile']),
  },
}
</script>

<style scoped>
.text1 {
  color: white;
}

#three * h3 {
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 10px;
}

/* BANNER - optimize image size a little bit */
.home-background {
  min-height: 60vh;
}

.home-background {
  background-image: url('/images/banner-1500.jpg');
}

@media only screen and (max-width: 800px) {
  .home-background {
    background-image: url('/images/banner-800.jpg');
  }
}

@media only screen and (max-width: 600px) {
  .home-background {
    background-image: url('/images/banner-600.jpg');
  }
}

@media only screen and (max-width: 400px) {
  .home-background {
    background-image: url('/images/banner-400.jpg');
  }
}

#homeSearchBox {
  box-shadow: none;
  width: 100%;
  background: none;
  border: none;
}
</style>
