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
          <h1>Welcome to Family Cinema</h1>
        </header>

        <div class="flex">
          <div>
            <span class="icon fa-play-circle"></span>
            <h3>Simplicity</h3>
            <p>As easy as pressing play</p>
          </div>

          <div>
            <span class="icon fa-bug"></span>
            <h3>Freedom</h3>
            <p>You decide what you watch</p>
          </div>

          <div>
            <span class="icon fa-heart"></span>
            <h3>Values</h3>
            <p>Nulla vitae mauris non felis</p>
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
              We are a community of developers and movie fans like you, silently
              working in the background so that skipping unwanted content is as
              easy as pressing play.
            </p>
          </article>
          <article>
            <div class="image round">
              <img src="images/freedom.jpg" height="150px" alt="Freedom" />
            </div>
            <header>
              <h3>Freedom<br /></h3>
            </header>
            <p>
              Watch what you want, and only what you want. We will never tell
              you what you skip or what to watch. We classify scenes and build
              the software to make skips possible, you decide what to watch.
            </p>
          </article>
          <article>
            <div class="image round">
              <img src="images/values.jpg" height="150px" alt="Values" />
            </div>
            <header>
              <h3>Values<br /></h3>
            </header>
            <p>
              We believe in freedom, women rights, no-discrimination, education
              and the importance of the family. We work hard to make it
              possible.
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
          <h1>Filter content on your favourity providers</h1>
        </header>

        <div class="flex flex-3">
          <div>
            <span class="icon fa-play-circle"></span>
            <h3>Netflix</h3>
          </div>

          <div>
            <span class="icon fa-bug"></span>
            <h3>HBO</h3>
          </div>

          <div>
            <span class="icon fa-heart"></span>
            <h3>Disneyplus</h3>
          </div>

          <div>
            <span class="icon fa-heart"></span>
            <h3>Movistarplus</h3>
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
