<template>
  <div class="subpage">
    <section id="main" class="wrapper" style="margin: auto">
      <div class="inner">
        <header class="align-center">
          <h2>Community</h2>
          <p>Our heart and engine</p>
        </header>
        <!--
        <div class="image round left">
          <img src="images/pic01.jpg" alt="Pic 01" />
        </div>
        -->
        <div style="max-width: 600px; margin: auto">
          <p>
            A strong community is what makes the difference in a project like this. We need your
            help building the first open database of films' scenes.
          </p>
          <p>
            With your help, anyone in the world will be able to skip the undesired content in any
            film.
          </p>
        </div>

        <h2 style="text-align: center; font-size: 1.2rem">Join the Community</h2>
        <div class="alex1-container">
          <!-- install / edit movies -->

          <div class="alex1">
            <div>
              <span>Install our <b>Chrome extension</b> and start using it.</span>
            </div>
            <footer style="text-align: center">
              <a
                href="https://chrome.google.com/webstore/detail/family-cinema/nfkbclgkdifmoidnkapblfipbdkcppcf"
                class="button special"
                target="_blank"
                style="margin: 5px"
                >{{ $t('install') }}</a
              >

              <span v-if="hasApp" class="support-tip"
                ><b>Well done!</b> It seems you already installed our extension</span
              >
              <span class="support-tip" v-else-if="isChrome"
                ><b>Note:</b> It seems your browser is compatible :)</span
              >
              <span class="support-tip" v-else><b>Note:</b> Ohana only works on Chrome</span>
            </footer>
          </div>

          <!-- use the app -->
          <div class="alex1">
            <div>
              <span>
                Go ahead and <b>flag unhealthy content</b>. Next users will be able to skip it
                thanks to you!
              </span>
            </div>
            <footer>
              <router-link to="get-started" class="button special">{{
                $t('learnMore')
              }}</router-link>
            </footer>
          </div>

          <!-- donate -->
          <div class="alex1">
            <div><b>Donate</b> to support the development of Ohana.</div>
            <a class="button" href="https://www.patreon.com/ohanamovies" target="_blank">donate</a>
          </div>

          <!-- TODO: confirm if use this one: feedback -->
          <div class="alex1" v-if="false">
            <div>Share your <b>feedback</b> and thoughts</div>
            <a class="button" href="https://forms.gle/cPr7XQhdS7x1y9hx7" target="_blank"
              >feedback</a
            >
          </div>

          <!-- TODO: Help coding? -->
          <div class="alex1">
            <div>Do you know how to <b>code</b>? We welcome developers!</div>
            <a class="button disabled" href="" disabled>github</a>
          </div>

          <!-- share -->
          <div class="alex1">
            <div><b>Spread the word</b> about Ohana, so others can enjoy and support it</div>
            <!-- I got these buttons from simplesharebuttons.com -->
          </div>
        </div>
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
            href="https://www.patreon.com/ohanamovies"
            target="_blank"
            style="color: #469ae8"
            >Visit our Patreon now!</a
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
  </div>
</template>

<script>
import sharedjs from '@/sharedjs'
import { mapState } from 'vuex'

export default {
  head: function () {
    //This is used to generate the meta tags needed for better SEO and stuff.
    let title = 'Our Community - Ohana'
    let desc = 'Meet (and join!) our community of volunteers'
    return sharedjs.headObject(title, desc)
  },

  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile']),
  },
  data() {
    return {
      ka: 'value',
    }
  },
}
</script>

<style>
.alex1-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.alex1 {
  border: 1px solid rgba(100, 100, 100, 0.3);
  border-radius: 5px;
  padding: 20px;
  margin: 10px;

  flex: 1 1 0px;
  max-width: 350px;
}
.alex1 > div {
  height: 130px;
  overflow-y: auto;
}

@media screen and (max-width: 950px) {
  .alex1-container {
    display: block;
  }
  .alex1-container > div {
    margin: auto;
    margin-bottom: 20px;
  }

  .alex1 > div {
    height: auto;
  }
  .alex1 > .button {
    margin-top: 20px;
  }
}

#share-buttons * img {
  height: 48px;
  margin: 5px;
}
.support-tip {
  font-size: 0.8rem;
  display: block;
  line-height: normal;
}
</style>
