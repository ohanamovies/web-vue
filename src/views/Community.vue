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
              <span v-if="!hasApp">Install our <b>Chrome extension</b> and start using it. </span>
              <span v-else>
                Use our Chrome extension to <b>flag unhealthy content</b>. Next users will be able
                to skip it thanks to you!
              </span>
            </div>
            <footer>
              <next-action :hasApp="hasApp" :isChrome="isChrome" :isMobile="isMobile"></next-action>
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
            <div>
              <b>Spread the word</b> about Ohana, so others can enjoy it and maybe join the
              community
            </div>
            <!-- I got these buttons from simplesharebuttons.com -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import sharedjs from '@/sharedjs'
import NextAction from '@/components/NextAction.vue'
export default {
  components: {
    NextAction,
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
    isChrome: {
      type: Boolean,
      default: false,
    },
    hasApp: {
      type: Boolean,
      default: false,
    },
  },
  head: function () {
    //This is used to generate the meta tags needed for better SEO and stuff.
    return sharedjs.headObject(
      'Our Community - Ohana',
      'Meet (and join!) our community of volunteers',
      this.$router.currentRoute.path
    )
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
}

.alex1 {
  border: 1px solid rgba(100, 100, 100, 0.3);
  border-radius: 5px;
  padding: 20px;
  margin: 10px;

  flex: 1 1 0px;
  max-width: 300px;
}
.alex1 > div {
  height: 120px;
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
</style>
