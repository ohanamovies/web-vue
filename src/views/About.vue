<template>
  <div class="subpage">
    <!-- Header -->
    <my-header></my-header>

    <section id="main" class="wrapper">
      <div class="inner">
        <h1>About us</h1>

        <p>
          We are a community of developers and movie fans like you. We work passionately to make
          Ohana possible.
        </p>
        <p>
          We are just getting started, and hope you love what we do. Feel free to
          <router-link to="/community">join the community</router-link>
          to start contributing as editor, or consider
          <a href="https://www.patreon.com/ohanamovies" target="_blank">donating</a> to help us
          growing
        </p>

        <div></div>

        <br />
        <br />
        <h2>Frequently Asked Questions</h2>

        <h3>What content do you filter?</h3>
        <p>
          We can't tell you what to watch and what to skip, we believe too hardly that's your
          personal choice.
        </p>
        <p>
          But what we can do -and work hard to do-, is to classify the content so you can actually
          take the decision of skipping certain content.
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

        <div v-for="(tag, index) in tags" :key="index">
          <div v-if="tag.title != 'Other'">
            <h4>{{ tag.title }}</h4>
            <ul>
              <li v-for="(sev, index) in tag.severity" :key="index">
                <b>{{ sev.title }}: </b> {{ sev.description }}
              </li>
            </ul>
          </div>
        </div>

        <h3>What is "sensitivity"?</h3>
        <p>
          Sensitiviy is how you define your criteria for the filters. Once you define your
          sensitivy, the Ohana experience will adapt to you, and skip the content that YOU don't
          want.
        </p>

        <h3>What do the icons mean?</h3>
        <p>
          The icons represent a visual way to tell you the filtering status of the movies, based on
          your sensitivity.
        </p>

        <div class="fakeUL">
          <p>
            <v-icon color="green">mdi-emoticon-happy</v-icon><b>Clean:</b> Content was originally
            safe, it didn't need to be cut. When the icon is blue
            <v-icon color="blue">mdi-emoticon-happy</v-icon>, it means it has been reviewed by Ohana
            trusted editors.
          </p>

          <p>
            <v-icon color="green">mdi-content-cut</v-icon><b>Cut:</b> There was unsafe content, but
            we will skip it all for you. When the icon is blue
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
          <p>
            You will see those icons after telling us your sensitivity, in multiple places:
          </p>

          <ol>
            <li>
              In the <router-link to="/content">content</router-link> section of this website.
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
          Anyone can <router-link to="/community">join the community</router-link> and contribute to
          the scenes classification.
        </p>
        <p>
          When we use the blue icons, it means that the filters have been created or reviewed by
          Ohana trusted editors, and therefore you can rely on those even more.
        </p>
      </div>
    </section>
  </div>
</template>

<script>
const rawTags = require('../assets/raw_tags')
export default {
  data() {
    return {
      key: 'value',
      tags: rawTags.content
    }
  }
}
</script>

<style>
.fakeUL > p {
  margin-bottom: 2px !important;
  margin-left: 8px;
}
</style>
