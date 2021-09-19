<template>
  <div class="subpage">
    <!-- Header -->

    <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
      <!--   SPANISH TEXT -->
      <div class="inner" v-if="$i18n.locale == 'es'">
        <div>
          Aquí encontraras una introducción sobre como usar Ohana:
          <ol>
            <li><a href="/#how-to-watch">How to watch clean movies</a></li>
            <li><a href="/#how-to-create-filters">How to create filters</a></li>
          </ol>
          <p>
            To learn what's Ohana visit our <router-link to="/about">About section</router-link>.
            For a list of the most frequency asked questions visit our
            <router-link to="/faqs">FAQs</router-link>.
          </p>
        </div>

        <div id="main-tutorial-content">
          <div id="how-to-watch">
            <h2>How to watch a clean movie</h2>

            <h4>Step 1. Install Ohana</h4>
            <ol>
              <li>
                Make sure you are using Google Chrome on a computer.
                <span v-if="isChrome" style="color: green">✓</span
                ><span v-else style="color: red">✗</span>
              </li>
              <li>
                Follow
                <a
                  href="https://chrome.google.com/webstore/detail/ohana/nfkbclgkdifmoidnkapblfipbdkcppcf"
                  target="_blank"
                  >this link</a
                >
                and click on 'Add to Chrome' to install our Chrome extension.
                <span v-if="hasApp" style="color: green">✓</span
                ><span v-else-if="isChrome" style="color: red">✗</span>
              </li>
              <li>Pin the extension so it's visible.</li>
            </ol>

            <h4>Step 2. Define your sensitivity</h4>

            <p>
              You can now define what kind of content you want to skip. These settings will be used
              all around to customize your Ohana experience.
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
              To help you find a good clean movie we use a set of icons to let you known if (based
              on your personal settings) a movie / show can be watched safely.
            </p>
            <div>
              <p>
                <v-icon color="green">mdi-emoticon-happy</v-icon><b>Clean:</b> Content was
                originally safe, it didn't need to be edited.<br />

                <v-icon color="green">mdi-content-cut</v-icon><b>Edited:</b> There was unwanted
                content, but we will skip it all for you.<br />

                <v-icon color="blue">mdi-emoticon-happy</v-icon> |
                <v-icon color="blue">mdi-content-cut</v-icon><b>Ohana Clean/Edited:</b> Blue icons
                indicate it has been reviewed by Ohana trusted editors.<br />

                <v-icon color="red">mdi-flag-variant</v-icon><b>Unsafe:</b> Unwanted content was
                flagged, but movie hasn't been edited yet.<br />

                <v-icon color="gray">mdi-progress-question</v-icon><b>Unknown:</b> We can't help as
                we don't have information yet.
              </p>
              <p>You will see those icons after telling us your sensitivity, in multiple places:</p>
              <ol>
                <li>
                  In the <router-link to="/find-movies">content</router-link> section of this
                  website.
                </li>
                <li>In the browser section of the content providers (like Netflix).</li>
                <li>
                  In the Chrome toolbar: the Ohana icon will be replaced by the filtering status
                  icon when watching a movie
                </li>
              </ol>

              <h4>Step 4. Enjoy the movie!</h4>
              <p>
                Grab some popcorn an enjoy the movie! We will skip all the unwanted content for you!
              </p>

              <h4>Step 5. Pro tip</h4>
              <p>
                While watching a movie/show, the Ohana logo on the Chrome toolbar will change to let
                you know if, based on your settings, that movie/show is safe to watch.
              </p>
              <br />
              <p>
                If you click on the icon, you will see a detailed list of scenes being skipped. Here
                you can manually define which scenes to skip and which ones to watch on a one to one
                basis
              </p>
            </div>
          </div>

          <div id="how-to-create-filters">
            <h2>How to create new filters</h2>

            <h4>Step 1. Get ready</h4>
            <p>
              Make sure you have Ohana installed and that you have selected a good movie/series to
              filter.
            </p>
            <p>
              You can easily identify which movies require editing by looking for the
              <i>Unkown</i> <v-icon color="gray">mdi-progress-question</v-icon> or <i>Unsafe</i>
              <v-icon color="red">mdi-flag-variant</v-icon> icons, either by browsing your favourite
              provider or in the <router-link to="/find-movies">content</router-link> section of
              this website. (If you click on the <i>Unkown</i> and <i>Unsafe</i> label on the
              website, you will see those movies that require editing).
            </p>

            <h4>Step 2. Open the editor's sidebar</h4>
            <p>
              Start watching the movie/episode you want to create filters for. Open the Ohana
              extension popup and click on the 'Edit filters' button.
            </p>
            <p>
              A sidebar will open. Follow the instructions to login/register and become an Ohana
              editor! When you first register you will join as a <i>Young Padawan</i>, as you grow
              in the use of Ohana and increase your community recognition, you will progress into a
              <i>Jedi Master</i> with full editing powers!
            </p>

            <h4>Step 3. Create filters</h4>
            <p>
              Grab some popcorn and start watching the movie/series. If you spot anything you want
              to flag, press the "New filter" button or the keyboard shortcut "Alt + N". (If you
              already know where the unwanted scene is, you can fastforward to that time and follow
              the same process).
            </p>
            <p>
              To protect you from unwanted content, while adding a scene the video will get muted
              and a bit blurred. You can control this behaviour with the 'blur on mark' and 'mute on
              mark' inputs.
            </p>
            <p>
              To mark the end of an unwanted scene press "End filter" or "Alt + N". A popup asking
              you to fine tune the filter will open.
            </p>

            <h4>Step 4. Fine tune filters</h4>
            <p>Follow the instrucctions on the popup to fine tune the created filter...</p>

            <h4>Step 5. Set filter status</h4>

            <p>
              Repeat steps 3 and 4 until all the unwanted scenes have been added. And last but not
              least, it is importat to update the filter status to let everyone know this movie is
              now safe to watch!
            </p>

            <p>
              Click the "Set filter status" button and select, for each category &amp; tag, the
              right status. Click on save and you are done! Now everyone in the world can enjoy a
              clean movie/episode! In the name of everyone: thank you, you are a hero!
            </p>
          </div>

          <!--<div id="more">
            <h2>How to install Ohana</h2>
            <p>
              As a basic, you can use <router-link to="/find-movies">this section</router-link> of the
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
          </div>

          <div>
            <h2>How to find &amp; watch filtered movies?</h2>
          </div>-->
        </div>
      </div>

      <!--   DEFAULT TEXT -->
      <div class="inner" v-else>
        <div>
          Here you will find a quick introduction on how to use Ohana, this is:
          <ol>
            <li><a href="#how-to-watch">How to watch clean movies</a></li>
            <li><a href="#how-to-create-filters">How to create filters</a></li>
          </ol>
          <p>
            To learn what's Ohana visit our <router-link to="/about">About section</router-link>.
            For a list of the most frequency asked questions visit our
            <router-link to="/faqs">FAQs</router-link>.
          </p>
        </div>

        <div id="main-tutorial-content">
          <div id="how-to-watch">
            <h2>How to watch a clean movie</h2>

            <h4>Step 1. Install Ohana</h4>
            <ol>
              <li>
                Make sure you are using Google Chrome on a computer.
                <span v-if="isChrome" style="color: green">✓</span
                ><span v-else style="color: red">✗</span>
              </li>
              <li>
                Follow
                <a
                  href="https://chrome.google.com/webstore/detail/ohana/nfkbclgkdifmoidnkapblfipbdkcppcf"
                  target="_blank"
                  >this link</a
                >
                and click on 'Add to Chrome' to install our Chrome extension.
                <span v-if="hasApp" style="color: green">✓</span
                ><span v-else-if="isChrome" style="color: red">✗</span>
              </li>
              <li>Pin the extension so it's visible.</li>
            </ol>

            <h4>Step 2. Define your sensitivity</h4>

            <p>
              You can now define what kind of content you want to skip. These settings will be used
              all around to customize your Ohana experience.
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
              To help you find a good clean movie we use a set of icons to let you known if (based
              on your personal settings) a movie / show can be watched safely.
            </p>
            <div>
              <p>
                <v-icon color="green" class="mb-1">mdi-emoticon-happy</v-icon><b>Clean:</b> Content
                was originally safe, it didn't need to be edited.<br />

                <v-icon color="green" class="mb-1">mdi-content-cut</v-icon><b>Edited:</b> There was
                unwanted content, but we will skip it all for you.<br />

                <v-icon color="blue" class="mb-1">mdi-emoticon-happy</v-icon> |
                <v-icon color="blue" class="mb-1">mdi-content-cut</v-icon
                ><b>Ohana Clean/Edited:</b> Blue icons indicate it has been reviewed by Ohana
                trusted editors.<br />

                <v-icon color="red" class="mb-1">mdi-flag-variant</v-icon><b>Unsafe:</b> Unwanted
                content was flagged, but movie hasn't been edited yet.<br />

                <v-icon color="gray" class="mb-1">mdi-progress-question</v-icon><b>Unknown:</b> We
                can't help as we don't have information yet.
              </p>
              <p>You will see those icons after telling us your sensitivity, in multiple places:</p>
              <ol>
                <li>
                  In the <router-link to="/find-movies">movies</router-link> section of this
                  website.
                </li>
                <li>In the browser section of the content providers (like Netflix).</li>
                <li>
                  In the Chrome toolbar: the Ohana icon will be replaced by the filtering status
                  icon when watching a movie
                </li>
              </ol>

              <h4>Step 4. Enjoy the movie!</h4>
              <p>
                Grab some popcorn an enjoy the movie! We will skip all the unwanted content for you!
              </p>

              <h4>Step 5. Pro tip</h4>
              <p>
                While watching a movie/show, the Ohana logo on the Chrome toolbar will change to let
                you know if, based on your settings, that movie/show is safe to watch.
              </p>
              <br />
              <p>
                If you click on the icon, you will see a detailed list of scenes being skipped. Here
                you can manually define which scenes to skip and which ones to watch on a one to one
                basis
              </p>
            </div>
          </div>

          <div id="how-to-create-filters">
            <h2>How to create new filters</h2>

            <h4>Step 1. Get ready</h4>
            <p>
              Make sure you have Ohana installed and that you have selected a good movie/series to
              filter.
            </p>
            <p>
              You can easily identify which movies require editing by looking for the
              <i>Unkown</i> <v-icon color="gray">mdi-progress-question</v-icon> or <i>Unsafe</i>
              <v-icon color="red">mdi-flag-variant</v-icon> icons, either by browsing your favourite
              provider or in the <router-link to="/find-movies">movies</router-link> section of this
              website. (If you click on the <i>Unkown</i> and <i>Unsafe</i> label on the website,
              you will see those movies that require editing).
            </p>

            <h4>Step 2. Open the editor's sidebar</h4>
            <p>
              Start watching the movie/episode you want to create filters for. Open the Ohana
              extension popup and click on the 'Edit filters' button.
            </p>
            <p>
              A sidebar will open. Follow the instructions to login/register and become an Ohana
              editor! When you first register you will join as a <i>Young Padawan</i>, as you grow
              in the use of Ohana and increase your community recognition, you will progress into a
              <i>Jedi Master</i> with full editing powers!
            </p>

            <h4>Step 3. Create filters</h4>
            <p>
              Grab some popcorn and start watching the movie/series. If you spot anything you want
              to flag, press the "New filter" button or the keyboard shortcut "Alt + N". (If you
              already know where the unwanted scene is, you can fastforward to that time and follow
              the same process).
            </p>
            <p>
              To protect you from unwanted content, while adding a scene the video will get muted
              and a bit blurred. You can control this behaviour with the 'blur on mark' and 'mute on
              mark' inputs.
            </p>
            <p>
              To mark the end of an unwanted scene press "End filter" or "Alt + N". A popup asking
              you to fine tune the filter will open.
            </p>

            <h4>Step 4. Fine tune filters</h4>
            <p>Follow the instrucctions on the popup to fine tune the created filter...</p>

            <h4>Step 5. Set filter status</h4>

            <p>
              Repeat steps 3 and 4 until all the unwanted scenes have been added. And last but not
              least, it is importat to update the filter status to let everyone know this movie is
              now safe to watch!
            </p>

            <p>
              Click the "Set filter status" button and select, for each category &amp; tag, the
              right status. Click on save and you are done! Now everyone in the world can enjoy a
              clean movie/episode! In the name of everyone: thank you, you are a hero!
            </p>
          </div>

          <!--<div id="more">
            <h2>How to install Ohana</h2>
            <p>
              As a basic, you can use <router-link to="/find-movies">this section</router-link> of the
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
          </div>

          <div>
            <h2>How to find &amp; watch filtered movies?</h2>
          </div>-->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import sharedjs from '@/sharedjs'
const rawTags = require('../../assets/raw_tags')
export default {
  head: function () {
    //This is used to generate the meta tags needed for better SEO and stuff.
    return sharedjs.headObject(
      'Get started - Ohana',
      'Learn how to watch clean content',
      this.$router.currentRoute.path
    )
  },
  props: {
    isChrome: { type: Boolean, default: false },
    hasApp: { type: Boolean, default: false },
  },
  data() {
    return {
      key: 'value',
      tags: rawTags.content,
      // providersList: [
      //   { text: 'Netflix', value: 'netflix' },
      //   { text: 'HBO', value: 'hbo' },
      //   { text: 'Movistar', value: 'movistar' },
      //   { text: 'Disney Plus', value: 'disneyplus' },
      //   { text: 'Rakuten', value: 'rakuten' }
      // ]
    }
  },
}
</script>

<style>
h2 {
  padding-top: 40px;
  margin-bottom: 10px;
  font-weight: bold;
}

h4 {
  margin: 20px 0 5px 0;
  font-weight: bold;
  font-size: 1.3em;
}
</style>
