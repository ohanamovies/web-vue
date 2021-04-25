<template>
  <div class="subpage">
    <!-- Header -->
    <my-header></my-header>

    <section id="main" class="wrapper" style="max-width: 700px; margin:auto">
      <div class="inner">
        <header>
          <h1>Learn about Ohana</h1>

          <p>
            Welcome to Ohana! In this page we will explain you what Ohana is, how to install it, and
            how does it work.
          </p>
          <p>This page is being built now, so don't judge us yet. We will improve it soon.</p>
        </header>

        <p>
          For more information, check out our Frequently Asked Questions
          <router-link to="/faqs">here</router-link>.
        </p>

        <div id="main-tutorial-content">
          <div>
            <h2>What is Ohana?</h2>
            <p>
              Ohana is a Chrome extion which, once installed, gives you the power to skip scenes
              from movies, based on your own personal taste and preferences.
            </p>
            <p>
              Don't like watching bloody scenes? Tell Ohana to skip the Very Violent content.
            </p>
            <p>
              Being a Chrome extension, Ohana works on top of your browser, and embeds itself within
              Netflix, HBO, etc.
            </p>
            <p>
              If you want to watch movies, but don't like watching some of the scenes those movie
              have, you will be pleased to meet Ohana.
            </p>
          </div>

          <div>
            <h2>How to install Ohana</h2>
            <p>
              As a basic, you can use <router-link to="/content">this section</router-link> of the
              Ohana website to find, among others, content that was originally clean and therefore
              ready for you to watch out of the box.
            </p>
            <p>
              That requires no installation.
            </p>
            <p>
              But you may also want to watch those other movies that would be great if you could
              just skip few specific scenes.
            </p>
            <p>
              We thoguth the same, and since we knew how to code, we created our Ohana Chrome
              extension.
            </p>
            <p>
              By installing it, you can watch content and we will take care of removing the pieces
              that you don't want to watch.
            </p>
            <p>This works as long as you:</p>
            <ol>
              <li>Watch movies or shows using Chrome browser on a computer.</li>
              <li>Have the Ohana extension installed in that browser.</li>
              <li>Watch the content using one of the Ohana compatible platforms (link).</li>
              <li>
                You have an active account on that platform. Ohana will act as a remote to
                automatically skip content, but you need to take care of accessing the content
              </li>
              <li>
                The movie/show you are watching has been reviewed by Ohana or one of our editor.
              </li>
            </ol>

            <p>Now that we made that clear, let's get started:</p>

            <ol>
              <li>
                Install the Chrome extension
                <a
                  href="https://chrome.google.com/webstore/detail/ohana/nfkbclgkdifmoidnkapblfipbdkcppcf"
                  target="_blank"
                  >here</a
                >.
              </li>
              <li>Pin the extension so it's visible.</li>
            </ol>
            <p>Done! you know have the Ohana extesion installed.</p>
            <p>
              Now, you should tell Ohana what your sensitivity is. This means, what kind of content
              you want Ohana to skip for you.
            </p>
            <p>
              For that, open one of your favorite content providers: Netflix, HBO, Movistar,
              Rakuten... Make sure you don't open any specific movie/episode. Just the main page of
              the provider.
            </p>
            <p>Click on the Ohana icon to open the Ohana extension.</p>
            <p>A popup will open. You may need to refresh the page so it loads properly.</p>
            <p>
              Set your settings. These settings define your sensitive, and will be used all around
              to customize your Ohana experience to fit your taste just right.
            </p>
            <p>
              Ohana uses a set of icons to define if a movie / show can be watched safely or not.
            </p>
            <div class="fakeUL">
              <p>
                <v-icon color="green">mdi-emoticon-happy</v-icon><b>Clean:</b> Content was
                originally safe, it didn't need to be cut. When the icon is blue
                <v-icon color="blue">mdi-emoticon-happy</v-icon>, it means it has been reviewed by
                Ohana trusted editors.
              </p>

              <p>
                <v-icon color="green">mdi-content-cut</v-icon><b>Cut:</b> There was unwanted
                content, but we will skip it all for you. When the icon is blue
                <v-icon color="blue">mdi-content-cut</v-icon>, it means it has been reviewed by
                Ohana trusted editors.
              </p>
              <p>
                <v-icon color="red">mdi-flag-variant</v-icon><b>Unsafe:</b> Unwanted content was
                flagged, but it's not cut yet.
              </p>
              <p>
                <v-icon color="gray">mdi-progress-question</v-icon><b>Unknown:</b> We can't help as
                we don't have information yet.
              </p>
              <br />
              <p>
                You will see those icons after telling us your sensitivity, in multiple places:
              </p>

              <ol>
                <li>
                  In the <router-link to="/content">content</router-link> section of this website.
                </li>
                <li>In the browser section of the content providers (like Netflix).</li>
                <li>
                  In the Chrome toolbar: the Ohana icon will be replaced by the filtering status
                  icon when watching a movie
                </li>
              </ol>
            </div>
          </div>

          <div>
            <h2>Overview of the Ohana extension</h2>
          </div>

          <div>
            <h2>How to find &amp; watch filtered movies?</h2>
          </div>

          <div>
            <h2>How to create new filters (and mark movies as "done")</h2>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const rawTags = require('../../assets/raw_tags')
export default {
  data() {
    return {
      key: 'value',
      tags: rawTags.content,
      providersList: [
        { text: 'Netflix', value: 'netflix' },
        { text: 'HBO', value: 'hbo' },
        { text: 'Movistar', value: 'movistar' },
        { text: 'Disney Plus', value: 'disneyplus' },
        { text: 'Rakuten', value: 'rakuten' }
      ]
    }
  }
}
</script>

<style>
.fakeUL > p {
  margin-bottom: 2px !important;
  margin-left: 8px;
}
h2 {
  margin-top: 30px;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>
