<template>
  <div class="home">
    <!-- Header -->
    <my-header></my-header>

    <!-- Banner -->
    <section class="banner" style="background-image: url(images/banner.jpg); min-height: 100vh">
      <div class="inner" style="border-top: none">
        <header>
          <h1>{{ $t('welcome') }}</h1>
        </header>

        <div class="flex">
          <div>
            <span class="icon fa-play-circle"></span>
            <h3>{{ $t('simplicity') }}</h3>
            <p>{{ $t('simplicityShortDesc') }}</p>
          </div>

          <div>
            <span class="icon fa-bug"></span>
            <h3>{{ $t('yourWay') }}</h3>
            <p>{{ $t('yourWayShortDesc') }}</p>
          </div>

          <div>
            <span class="icon fa-heart"></span>
            <h3>{{ $t('community') }}</h3>
            <p>{{ $t('communityShortDesc') }}</p>
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
              <img src="images/simplicity.jpg" height="150px" alt="Simplicity" />
            </div>
            <header>
              <h3>{{ $t('simplicity') }}<br /></h3>
            </header>
            <p>{{ $t('simplicityDesc') }}</p>
          </article>
          <article>
            <div class="image round">
              <img src="images/freedom.jpg" height="150px" alt="Freedom" />
            </div>
            <header>
              <h3>{{ $t('yourWay') }}<br /></h3>
            </header>
            <p>{{ $t('yourWayDesc') }}</p>
          </article>
          <article>
            <div class="image round">
              <img src="images/values.jpg" height="150px" alt="Values" />
            </div>
            <header>
              <h3>{{ $t('community') }}<br /></h3>
            </header>
            <p>{{ $t('communityDesc') }}</p>
          </article>
        </div>
        <footer>
          <router-link to="get-started" class="button special">{{ $t('getStarted') }}</router-link>
        </footer>
      </div>
    </section>

    <section class="banner" style="background-image: url(images/providers.jpg)">
      <div class="inner" style="border-top: none">
        <header>
          <h1>{{ $t('filterContent') }}</h1>
          <p>{{ $t('onlyOnChrome') }}</p>
        </header>

        <div class="flex flex-3">
          <div>
            <!--<span class="icon fa-play-circle"></span>-->
            <h3>Netflix</h3>
          </div>

          <div>
            <!--<span class="icon fa-play-circle"></span>-->
            <h3>HBO</h3>
          </div>

          <div>
            <!--<span class="icon fa-play-circle"></span>-->
            <h3>Disney+</h3>
          </div>

          <div>
            <!--<span class="icon fa-play-circle"></span>-->
            <h3>Movistar+</h3>
          </div>
        </div>

        <footer>
          <router-link to="content" class="button special">{{ $t('discoverContent') }}</router-link>
        </footer>
      </div>
    </section>
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
