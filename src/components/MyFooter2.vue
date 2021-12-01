<template>
  <div>
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
export default {}
</script>

<style lang="scss" scoped></style>
