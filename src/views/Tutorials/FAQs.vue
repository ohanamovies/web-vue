<template>
  <div class="subpage">
    <!-- Header -->

    <section id="main" class="wrapper">
      <div class="inner">
        <div>
          <h1>Frequently Asked Questions</h1>

          <h3>What is Ohana?</h3>
          <p>Refer to <router-link to="/get-started">this page</router-link>.</p>

          <h3>How can I get Ohana?</h3>
          <p>Ohana only works when you watch content on one of the following providers:</p>
          <ul>
            <li v-for="(item, index) in providersList" :key="index">{{ item.text }}</li>
          </ul>

          <p>To get Ohana, just install the Chrome extension here:</p>
          <a
            href="https://chrome.google.com/webstore/detail/family-cinema/nfkbclgkdifmoidnkapblfipbdkcppcf"
            class="button special"
            target="_blank"
            style="margin: 5px; margin-top: 0px; margin-bottom: 12px"
            >Get Ohana</a
          >

          <p>
            Then, make sure to pin the installed extension, so it's visible. The icon of the
            extension will change to adapt to the page you are in.
          </p>
          <h3>Can I use it without Chrome?</h3>
          <p>No to get content skipped automatically.</p>
          <p>
            But you can still leverage on our website to find content that can be wathed without
            skips. Just take a look at our
            <router-link to="/find-movies">Content page</router-link>.
          </p>

          <h3>What content can I skip with Ohana?</h3>
          <p>
            First of all, remember that we can't tell you what to watch and what to skip. We believe
            that's your personal choice.
          </p>
          <p>
            But what we can do -and we work hard to do-, is to classify the content so you can
            actually take the decision of skipping certain content:
          </p>
          <p>
            Both in the web and when you
            <a
              href="https://chrome.google.com/webstore/detail/family-cinema/nfkbclgkdifmoidnkapblfipbdkcppcf"
              target="_blank"
              >download the extension</a
            >, you can let us know your sensitivity, to customize the Ohana experience.
          </p>
          <p>So far, we work with the following type of content</p>

          <!--
          <div v-for="(tag, index) in tags" :key="index">
            <div v-if="tag.title != 'Other'">
              <h5>{{ tag.title }}</h5>
              <ul>
                <li v-for="(sev, index) in tag.severity" :key="index">
                  <b>{{ sev.title }}: </b> {{ sev.description }}
                </li>
              </ul>
            </div>
          </div>
          -->

          <h3>What is "sensitivity"?</h3>
          <p>
            Sensitiviy is how you define your criteria for the filters. Once you define your
            sensitivy, the Ohana experience will adapt to you everywhere.
          </p>
          <p>This way, Ohana can skip the content that you personally choose.</p>

          <h3>What do the icons mean?</h3>
          <p>
            The icons are a visual way to summarize the filtering status of the movies. The status
            and the icons depends on your sensitivity.
          </p>

          <div class="fakeUL">
            <p>
              <v-icon color="green">mdi-emoticon-happy</v-icon><b>Clean:</b> Content was originally
              safe, it didn't need to be cut. When the icon is blue
              <v-icon color="blue">mdi-emoticon-happy</v-icon>, it means it has been reviewed by
              Ohana trusted editors.
            </p>

            <p>
              <v-icon color="green">mdi-content-cut</v-icon><b>Edited:</b> There was unwanted
              content, but we will skip it all for you. When the icon is blue
              <v-icon color="blue">mdi-content-cut</v-icon>, it means it has been reviewed by Ohana
              trusted editors.
            </p>
            <p>
              <v-icon color="red">mdi-flag-variant</v-icon><b>Unsafe:</b> Unwanted content was
              flagged, but it's not cut yet.
            </p>
            <p>
              <v-icon color="gray">mdi-progress-question</v-icon><b>Unknown:</b> We can't help as we
              don't have information yet.
            </p>
            <br />
            <p>You will see those icons after telling us your sensitivity, in multiple places:</p>

            <ol>
              <li>
                In the <router-link to="/find-movies">content</router-link> section of this website.
              </li>
              <li>In the browser section of the content providers (like Netflix).</li>
              <li>
                In the Chrome toolbar: the Ohana icon will be replaced by the filtering status icon
                when watching a movie
              </li>
            </ol>
          </div>

          <h3>
            What if the icons appear in blue? <v-icon color="blue"> mdi-emoticon-happy</v-icon> |
            <v-icon color="blue">mdi-content-cut</v-icon>
          </h3>
          <p>
            Anyone can <router-link to="/community">join the community</router-link> and contribute
            to the scenes classification.
          </p>
          <p>
            When we use the blue icons, it means that the filters have been created or reviewed by
            Ohana trusted editors, and therefore you can rely on those even more.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import sharedjs from './../../sharedjs'
export default {
  name: 'FAQs',

  head: function () {
    //This is used to generate the meta tags needed for better SEO and stuff.
    let title = 'FAQs - Ohana TV'
    let desc = 'Have questions about Ohana Movies? We are here to answer them!'
    return sharedjs.headObject(title, desc)
  },

  data() {
    return {
      //TODO: make this consistent across pages easily
      providersList: [
        { text: 'Netflix', value: 'netflix' },
        { text: 'HBO', value: 'hboespana' },
        { text: 'Disney+', value: 'disneyplus' },
        { text: 'Movistar', value: 'movistar' },
        { text: 'Rakuten', value: 'rakuten' },
        { text: 'Youtube', value: 'youtube' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
