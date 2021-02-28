<template>
  <div class="home">
    <!-- Header -->
    <my-header></my-header>

    <!-- Banner -->
    <section
      class="banner"
      style="background-image: url(images/banner.jpg); min-height: 100vh"
    >
      <div class="inner" style="border-top: none">
        <header>
          <h1>Welcome to Ohana</h1>
        </header>

        <div class="flex">
          <div>
            <span class="icon fa-play-circle"></span>
            <h3>Simplicity</h3>
            <p>As easy as pressing play</p>
          </div>

          <div>
            <span class="icon fa-bug"></span>
            <h3>Your way</h3>
            <p>You decide what you watch</p>
          </div>

          <div>
            <span class="icon fa-heart"></span>
            <h3>Community</h3>
            <p>Built by people like you</p>
          </div>
        </div>

        <footer>
          <a
            href="https://chrome.google.com/webstore/detail/family-cinema/nfkbclgkdifmoidnkapblfipbdkcppcf"
            class="button special"
            target="_blank"
            >Download</a
          >
        </footer>
      </div>
    </section>

    <!-- Three -->
    <section id="three" class="wrapper align-center" style="min-height: 100vh">
      <div class="inner">
        <div class="flex flex-3">
          <article>
            <div class="image round">
              <img
                src="images/simplicity.jpg"
                height="150px"
                alt="Simplicity"
              />
            </div>
            <header>
              <h3>Simplicity<br /></h3>
            </header>
            <p>
              We are in the 21st Century... We believe it's time for unwanted
              content to be skipped as easily as pressing play.
            </p>
          </article>
          <article>
            <div class="image round">
              <img src="images/freedom.jpg" height="150px" alt="Freedom" />
            </div>
            <header>
              <h3>Your way<br /></h3>
            </header>
            <p>
              Watch what you want, and only what you want. We will never tell
              you what to skip or what to watch. We classify scenes and build
              the software to make skips possible, you decide what to watch.
            </p>
          </article>
          <article>
            <div class="image round">
              <img src="images/values.jpg" height="150px" alt="Values" />
            </div>
            <header>
              <h3>Community<br /></h3>
            </header>
            <p>
              We are a community of developers and movie fans like you,
              passionately working to make Ohana possible.
            </p>
          </article>
        </div>
        <footer>
          <router-link to="community" class="button special"
            >Meet the community</router-link
          >
        </footer>
      </div>
    </section>

    <section class="banner" style="background-image: url(images/providers.jpg)">
      <div class="inner" style="border-top: none">
        <header>
          <h1>Filter content on your favourite providers</h1>
          <p>*As of now, only available when you watch using Chrome browser</p>
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
          <router-link to="content" class="button special"
            >Discover content</router-link
          >
        </footer>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
//import MyHeader from '@/components/MyHeader.vue' //now imported globally!
export default {
  name: 'Home'
}
</script>
