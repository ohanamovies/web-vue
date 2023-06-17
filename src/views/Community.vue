<template>
  <div class="subpage">
    <section id="main" class="wrapper" style="margin: auto">
      <div class="inner">
        <div class="card" style="width: fit-content; padding: 20px; margin: -25px auto 50px auto">
          <header class="align-center" style="margin-bottom: 25px">
            <h2>{{ $t('community.title') }}</h2>
            <p>{{ $t('community.subtitle') }}</p>
          </header>
          <div style="max-width: 600px; margin: auto">
            <p>
              {{ $t('community.intro1') }}
            </p>
            <p>
              {{ $t('community.intro2') }}
            </p>
          </div>
        </div>

        <h2 style="text-align: center; font-size: 1.2rem">{{ $t('community.join') }}</h2>
        <div class="alex1-container">
          <!-- install / edit movies -->

          <div class="alex1 card" v-if="!hasApp">
            <div>
              <span v-html="$t('community.contribute.install_html')"></span>
            </div>
            <footer style="text-align: center">
              <a
                href="https://chrome.google.com/webstore/detail/family-cinema/nfkbclgkdifmoidnkapblfipbdkcppcf"
                class="button special"
                target="_blank"
                style="margin: 5px"
                >{{ $t('install') }}</a
              >
              <span class="support-tip" v-if="isChrome"
                >It seems your browser is compatible :)</span
              >
              <span class="support-tip" v-else>So far, Ohana only works on Chrome</span>
            </footer>
          </div>

          <!-- use the app -->
          <div class="alex1 card">
            <div>
              <span v-html="$t('community.contribute.edit_html')"> </span>
            </div>
            <footer style="text-align: center">
              <router-link to="editors" class="button special">{{ $t('learnMore') }}</router-link>
            </footer>
          </div>

          <!-- donate -->
          <div class="alex1 card">
            <div v-html="$t('community.contribute.donate_html')"></div>
            <footer style="text-align: center">
              <a
                class="button"
                href="https://www.paypal.com/donate/?hosted_button_id=NKWWBA9FYGPTU"
                target="_blank"
                >Via PayPal</a
              >
            </footer>
            <!--<a class="button" href="https://www.patreon.com/ohanatv" target="_blank">Via Patreon</a>-->
          </div>

          <!-- TODO: confirm if use this one: feedback -->
          <div class="alex1 card">
            <div v-html="$t('community.contribute.share_feedback_html')"></div>
            <footer style="text-align: center">
              <router-link class="button special" style="margin: 15px" to="/contact-us">{{
                $t('give_us_feedback')
              }}</router-link>
              <!--              <a class="button" href="https://forms.gle/cPr7XQhdS7x1y9hx7" target="_blank"
                >feedback</a
              >-->
            </footer>
          </div>

          <!-- TODO: Help coding?
          <div class="alex1 card">
            <div v-html="$t('community.contribute.code_html')"></div>
            <footer style="text-align: center">
              <a class="button disabled" href="" disabled>github</a>
            </footer>
          </div>-->

          <!-- share -->
          <div class="alex1 card">
            <div v-html="$t('community.contribute.spread_html')"></div>
            <!-- I got these buttons from simplesharebuttons.com -->
          </div>
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
    let title = 'Our Community'
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
  max-height: 150px;
  min-width: 75px;
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
