<template>
  <div id="footerr">
    <section
      id="sponsors"
      class="wrapper align-center"
      style="background-color: #141414; color: white; padding: 2em 0; min-height: fit-content"
    >
      <div class="inner">
        <h1 style="font-size: 24pt; color: white; font-weight: 500">{{ $t('want_more') }}</h1>

        <article style="max-width: 600px; margin: auto">
          <p>
            {{ $t('the_ongoing_development_of') }}
          </p>

          <a
            class="button"
            href="https://www.paypal.com/donate/?hosted_button_id=NKWWBA9FYGPTU"
            target="_blank"
            style="margin: 5px"
            >{{ $t('donate') }}</a
          >
          <router-link class="button special" style="margin: 5px" to="/contact-us">{{
            $t('give_us_feedback')
          }}</router-link>
          <router-link to="/community" class="button" style="margin: 5px">{{
            $t('community.join')
          }}</router-link>
        </article>

        <div v-if="false" style="margin-top: 90px">
          <h3 style="font-size: 16pt; color: white; font-weight: 500; margin-top: 30px">
            {{ $t('sponsors') }}
          </h3>

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
      </div>

      <!-- legal mentions -->

      <div
        style="margin-top: 70px; color: white; padding: 10px; font-size: 80%; text-align: center"
      >
        <div class="copyright">
          &copy; Ohana Movies {{ new Date().getFullYear() }}
          <!-- Design:
        <a href="https://templated.co">TEMPLATED</a>. -->
          <br />

          <!-- Images: <a href="https://unsplash.com">Unsplash</a>. -->
          <!-- Template and elements: https://templated.co/projection -->
        </div>

        <br />
        <p>
          {{ $t('ohana_tv_uses_data') }}
          <a href="https://www.themoviedb.org/" rel="noopener noreferrer" target="_blank">TMDB</a>
          {{ $t('and') }}
          <a href="https://imdb.com" target="_blank" rel="noopener noreferrer">IMDb</a>
          {{ $t('ohana_tv_uses_data_2') }}
        </p>
        <p>
          <router-link to="terms-of-use">{{ $t('terms_of_use') }}</router-link> |
          <router-link to="/privacy-policy">{{ $t('privacy_policy') }}</router-link> |
          <router-link to="/contact-us">{{ $t('contact_us') }}</router-link>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
