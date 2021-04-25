<template>
  <div class="subpage">
    <!-- Header -->
    <my-header></my-header>

    <section id="main" class="wrapper" style="max-width: 700px; margin:auto">
      <div class="inner">
        <div>
          <h2>Learn about Ohana</h2>

          <p>
            In this page we will explain you what Ohana is, how to install it, and
            how it work. This page is being built as you read it, so don't judge us too hard on it.
            We will improve it soon.
          </p>

          <ol>
            <li><a href="#what-is-ohana">What is Ohana</a></li>
            <li><a href="#how-to-watch">How to watch clean movies</a></li>
            <li><a href="#how-to-create-filters">How to create filters</a></li>
            <li><a href="#more">...</a></li>
          </ol>

          <p>
            For more information, check out our Frequently Asked Questions
            <router-link to="/faqs">here</router-link>.
          </p>
        </div>

        <div id="main-tutorial-content">
          <div id="what-is-ohana">
            <h2>What is Ohana?</h2>
            <p>
              Ohana means Family in Hawuaiian. And that's our name because Ohana is a community of
              families and movie fans like you that share a passion for good clean movies.
            </p>
            <p>
              Our community develops a combination of data and tools whose goal is to let people
              like you watch movies and shows without having to worry about that annoying or
              innapropiate content they don't want to watch (sex scenes, violent content, etc.)
            </p>
            <!--<p>
              Chrome extion which, once installed, 
            </p>-->
            <p>
              Our Chrome extension embeds itself within Netflix, HBO, etc. enabling you to skip
              those scenes you do not want to watch. With Ohana you decide what to watch and what to
              skip! Don't like watching bloody scenes? Tell Ohana to skip the Very Violent content.
            </p>
            <p>
              If you want to watch great movies, but don't like watching some of the scenes those
              movies sometimes have, you will be pleased to meet Ohana.
            </p>
          </div>

          <div id="how-to-watch">
            <h2>How to watch a clean movie</h2>

            <h4>Step 1. Install Ohana</h4>
            <ol>
              <li>
                Follow
                <a
                  href="https://chrome.google.com/webstore/detail/ohana/nfkbclgkdifmoidnkapblfipbdkcppcf"
                  target="_blank"
                  >this link</a
                >
                and click on 'Add to Chrome' to install our Chrome extension.
              </li>
              <li>Pin the extension so it's visible.</li>
            </ol>

            <h4>Step 2. Define your sensitivity</h4>

            <p>
              You can now define what kind of content you want Ohana to skip for you. These settings
              will be used all around to customize your Ohana experience to fit your taste just
              right.
            </p>

            <p>
              Open the main page of your favorite content providers:
              <a href="https://www.netflix.com" target="_blank">Netflix</a>,
              <a href="https://es.hboespana.com/" target="_blank">HBO</a>,
              <a href="https://www.disneyplus.com/" target="_blank">Disney Plus</a>,
              <a href="https://ver.movistarplus.es//" target="_blank">Movistar Plus</a>, and click
              on the Ohana icon to open the Ohana extension popup. Follow the instructions on the
              popup to define your settings.
            </p>

            <h4>Step 3. Find a good clean movie to watch</h4>

            <p>
              To help you find a good clean movie we use a set of icons to let you known if (based on your personal settings) a movie / show can be watched safely.
            </p>
            <div class="fakeUL">
              <p>
                <v-icon color="green">mdi-emoticon-happy</v-icon><b>Clean:</b> Content was
                originally safe, it didn't need to be cut.
              </p>
              <p>
                <v-icon color="green">mdi-content-cut</v-icon><b>Cut:</b> There was unwanted
                content, but we will skip it all for you.
              </p>
              <p>
                <v-icon color="blue">mdi-emoticon-happy</v-icon> |
                <v-icon color="blue">mdi-content-cut</v-icon><b>Ohana Clean/Cut:</b> Blue icons
                indicate it has been reviewed by Ohana trusted editors.
              </p>
              <p>
                <v-icon color="red">mdi-flag-variant</v-icon><b>Unsafe:</b> Unwanted content was
                flagged, but it's not cut yet.
              </p>
              <p>
                <v-icon color="gray">mdi-progress-question</v-icon><b>Unknown:</b> We can't help as
                we don't have information yet.
              </p>
              <br>
              <p>You will see those icons after telling us your sensitivity, in multiple places:</p>
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

              <h4>Step 4. Enjoy the movie!</h4>

              Grab some popcorn an enjoy the movie! We will skip all the unwanted content for you!

              <h4>Step 5. Pro tip</h4>

              <p>
                While watching a movie/show, the Ohana logo on the Chrome toolbar will change to let
                you know if, based on your settings, that movie/show is safe to watch.
              </p><br>
              <p>
                If you click on the icon, you will see a detailed list of scenes being skipped. Here
                you can manually define which scenes to skip and which ones to watch on a one to one
                basis
              </p>
            </div>
          </div>

          <div id="how-to-create-filters">
            <h2>How to create new filters</h2>
          </div>

          <div id="more">
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
          </div>

          <div>
            <h2>Overview of the Ohana extension</h2>
          </div>

          <div>
            <h2>How to find &amp; watch filtered movies?</h2>
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

h4 {
  margin: 20px 0 5px 0;
  font-weight: bold;
  font-size: 1.3em;
}
</style>
