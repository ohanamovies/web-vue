<template>
  <div class="home">
    <!-- Header -->
    <!-- <my-header></my-header> -->

    <!-- Banner -->
    <section class="banner home-background" style="height: 100vh">
      <div class="inner" style="border-top: none">
        <header>
          <!--
          <h1 class="fadeInUp" style="font-size: 3rem; margin-bottom: 5px">{{ $t('welcome') }}</h1>
          <h2
            style="
              color: white;
              font-weight: 400;
              font-size: 1.2rem;
              margin-top: 0px;
              padding-top: 10px;
              margin-bottom: 40px;
            "
          >
            <span>We are what we watch... </span>

            <span>Watch healthy with our software</span>
          </h2>
          -->

          <h1 class="fadeInUp" style="font-size: 2.2rem; margin-bottom: 10px">
            {{ $t('homeHeroText1') }}
          </h1>
          <p style="color: white; font-size: 1.2rem" class="fadeIn">
            {{ $t('homeHeroText2') }}
          </p>
        </header>

        <!-- @deprecated: TOP FEATURES NOW IN NEXT SECTION -->

        <div class="flex" v-if="false">
          <div>
            <span class="icon fa-heart"></span>
            <h3>{{ $t('prop1') }}</h3>
            <p>{{ $t('prop1Desc') }}</p>
          </div>

          <div>
            <span class="icon fa-play-circle"></span>
            <h3>{{ $t('prop2') }}</h3>
            <p>{{ $t('prop2Desc') }}</p>
          </div>

          <div>
            <span class="icon fa-bug"></span>
            <h3>{{ $t('prop3') }}</h3>
            <p>{{ $t('prop3Desc') }}</p>
          </div>
        </div>
        <footer>
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

            <div v-else-if="!isChrome">
              <router-link to="get-started" class="button special">{{
                $t('getStarted')
              }}</router-link>
            </div>

            <div>
              <!--
              <div style="display: flex; justify-content: center">
                <v-text-field
                  outlined
                  style="max-width: 400px; background-color: #6cc091"
                  type="search"
                  id="homeSearchBox"
                  color="ligthblue"
                  dense
                  name="search"
                  label="Search by title"
                  autocomplete="off"
                  prepend-inner-icon="mdi-magnify"
                  hide-details
                  clearable
                  class="pa-0 mb-2"
                  @focus="$event.target.select()"
                >
                  <div slot="append" hidden>
                    <v-btn color="success" icon @click="getData()"
                      ><v-icon> mdi-movie-search</v-icon></v-btn
                    >
                  </div>
                </v-text-field>
              </div>
              -->
              <router-link to="/find-movies" class="button special" style="margin: 5px">{{
                $t('discoverContent')
              }}</router-link>
            </div>

            <!--<a
            href="https://www.patreon.com/ohanatv"
            class="button special"
            target="_blank"
            style="margin: 5px;"
            >Donate
          </a>-->
          </div>
        </footer>
      </div>

      <!-- Clarify to users they can  scroll down -->
      <div style="position: absolute; bottom: 130px; width: 100%">
        <scroll-down-animation></scroll-down-animation>
      </div>
    </section>

    <!-- Three -->
    <section id="three" class="wrapper align-center" style="min-height: 100vh">
      <div class="inner">
        <div class="flex flex-3">
          <article>
            <div class="image round">
              <img src="images/mental-health.jpeg" height="150px" :alt="$t('value1')" />
            </div>
            <header>
              <h3>{{ $t('value1') }}</h3>
            </header>
            <p>{{ $t('value1Desc') }}</p>
            <br />
          </article>
          <article>
            <div class="image round">
              <img src="images/choice-square.png" height="150px" :alt="$t('value2')" />
            </div>
            <header>
              <h3>{{ $t('value2') }}</h3>
            </header>
            <p>{{ $t('value2Desc') }}</p>
            <br />
          </article>
          <article>
            <div class="image round">
              <img src="images/fam-square.jpg" height="150px" :alt="$t('value3')" />
            </div>
            <header>
              <h3>{{ $t('value3') }}</h3>
            </header>
            <p>{{ $t('value3Desc') }}</p>
            <br />
          </article>
          <article>
            <div class="image round">
              <img src="images/womens-rights-square.png" height="150px" :alt="$t('value4')" />
            </div>
            <header>
              <h3>{{ $t('value4') }}</h3>
            </header>
            <p>{{ $t('value4Desc') }}</p>
            <br />
          </article>
          <article>
            <div class="image round">
              <img src="images/providers-square.jpg" height="150px" :alt="$t('value5')" />
            </div>
            <header>
              <h3>{{ $t('value5') }}</h3>
            </header>
            <p>{{ $t('value5Desc') }}</p>
            <br />
          </article>
          <article>
            <div class="image round">
              <img src="images/keyboard-square.jpg" height="150px" :alt="$t('value6')" />
            </div>
            <header>
              <h3>{{ $t('value6') }}</h3>
            </header>
            <p>{{ $t('value6Desc') }}</p>
            <br />
          </article>
        </div>
        <footer>
          <router-link to="get-started" class="button special">{{ $t('getStarted') }}</router-link>
        </footer>
      </div>
    </section>

    <section
      id="sponsors"
      class="wrapper align-center"
      style="background-color: #172026; color: white"
    >
      <div class="inner">
        <h1 style="font-size: 24pt; color: white; font-weight: 500">Support Ohana</h1>

        <article style="max-width: 500px; margin: auto">
          <p>
            The ongoing development of Ohana is made possible by its communnity of volunteers,
            donors, and sponsors. Want to help?
          </p>
          <a
            class="button special"
            href="https://www.paypal.com/donate/?hosted_button_id=NKWWBA9FYGPTU"
            target="_blank"
            style="color: #469ae8"
            >Donate</a
          >
          <br />
          <router-link to="/community" class="modern-link">Discover other ways to help</router-link>
        </article>

        <h3 style="font-size: 16pt; color: white; font-weight: 500; margin-top: 30px">Sponsors</h3>

        <div class="flex flex-3">
          <a href="https://methos.media/" target="_blank" style="margin: auto">
            <div class="image">
              <img
                width="200px"
                src="images/sponsors/methods_media-white2.png"
                alt="Methods Media"
              />
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- <section class="banner" style="background-image: url(images/providers.jpg)">
      <div class="inner" style="border-top: none">
        <header>
          <h1>{{ $t('filterContent') }}</h1>
          <p>{{ $t('onlyOnChrome') }}</p>
        </header>

        <div class="flex flex-3">
          <div>
            <!- -<span class="icon fa-play-circle"></span>- ->
            <h3>Netflix</h3>
          </div>

          <div>
            <!- - <span class="icon fa-play-circle"></span>- ->
            <h3>HBO</h3>
          </div>

          <div>
            <!- -<span class="icon fa-play-circle"></span>- ->
            <h3>Disney+</h3>
          </div>

          <div>
            <!- -<span class="icon fa-play-circle"></span>- ->
            <h3>Movistar+</h3>
          </div>
        </div>

        <footer>
          <router-link to="content" class="button special">{{ $t('discoverContent') }}</router-link>
        </footer>
      </div>
    </section>-->
  </div>
</template>

<script>
// @ is an alias to /src
//import MyHeader from '@/components/MyHeader.vue' //now imported globally!
import sharedjs from '@/sharedjs'
import ScrollDownAnimation from '@/components/ScrollDownAnimation.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    ScrollDownAnimation,
  },

  head: function () {
    //This is used to generate the meta tags needed for better SEO and stuff.
    let title = 'Ohana TV'
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
  background-image: url('/images/banner-1500.jpg');
  min-height: 90vh;
}

@media only screen and (max-width: 800px) {
  .home-background {
    background-image: url('/images/banner-800.jpg');
    min-height: 90vh;
  }
}

@media only screen and (max-width: 600px) {
  .home-background {
    background-image: url('/images/banner-600.jpg');
    min-height: 90vh;
  }
}

@media only screen and (max-width: 400px) {
  .home-background {
    background-image: url('/images/banner-400.jpg');
    min-height: 90vh;
  }
}

#homeSearchBox {
  box-shadow: none;
  width: 100%;
  background: none;
  border: none;
}
</style>
