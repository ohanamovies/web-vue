<template>
  <div class="home">
    <!-- Header -->
    <my-header></my-header>

    <!-- Banner -->
    <section class="banner" style="background-image: url(images/banner.jpg); min-height: 90vh">
      <div class="inner" style="border-top: none">
        <header>
          <h1>{{ $t('welcome') }}</h1>
        </header>

        <div class="flex">
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
          <a
            href="https://chrome.google.com/webstore/detail/family-cinema/nfkbclgkdifmoidnkapblfipbdkcppcf"
            class="button special"
            target="_blank"
            style="margin: 5px"
            >{{ $t('install') }}</a
          >

          <!--<a
            href="https://www.patreon.com/ohanamovies"
            class="button special"
            target="_blank"
            style="margin: 5px;"
            >Donate
          </a>-->
        </footer>
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
            <a href="https://www.patreon.com/ohanamovies" target="_blank" style="color: #469ae8"
              >Visit our Patreon now!</a
            >
          </p>
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
export default {
  name: 'Home',
  head: function () {
    //This is used to generate the meta tags needed for better SEO and stuff.
    return sharedjs.headObject(
      'Welcome to Ohana Movies',
      "Ohana is your automated tv remote to skip unwanted content: Sex scenes, too violent content, disgusting scenes... You name it, we get rid of it making sure you don't miss the plot.",
      this.$router.currentRoute.path
    )
  },
}
</script>
