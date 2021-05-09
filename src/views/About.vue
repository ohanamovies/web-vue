<template>
  <div class="subpage">
    <!-- Header -->
    <my-header></my-header>

    <section id="main" class="wrapper" style="max-width: 700px; margin:auto">
      <div class="inner">
        <div id="menu">
          In this section you will find:
          <ol>
            <li><a href="#what-is-ohana">What is Ohana?</a></li>
            <li><a href="#why-skipping">Why skipping content?</a></li>
            <li><a href="#vission-statement">Why are we here? (Vission)</a></li>
            <li><a href="#mision-statement">What do we do? (Mission)</a></li>
            <li><a href="how-can-i-help">How can I help?</a></li>
          </ol>
          <p>
            To get started into how to use Ohana visit our
            <router-link to="get-started">get started section</router-link>. For a list of the most
            frequency asked questions visit our <router-link to="/faqs">FAQs</router-link>.
          </p>
        </div>

        <div id="what-is-ohana">
          <h2>What is Ohana?</h2>
          <div class="image round" style="float: right; padding: 10px;">
            <img src="images/means-family.jpg" height="220px" />
          </div>
          <p>
            Ohana is a community of families and movie fans like you that share a passion for good
            clean movies.
          </p>
          <p>
            Our community develops a combination of data and tools whose goal is to let people watch
            movies without having to worry about that annoying or innapropiate content they don't
            want to watch (sex scenes, violent content, etc.)
          </p>
          <p>
            Our Chrome extension embeds itself within Netflix, HBO, etc. enabling you to skip those
            scenes you do not want to watch. With Ohana you decide what to watch and what to skip!
            Don't like watching bloody scenes? Tell Ohana to skip the Very Violent content.
          </p>
          <p>
            If you want to watch great movies, but don't like watching some of the scenes those
            movies sometimes have, you will be pleased to meet Ohana.
          </p>
        </div>

        <div id="why-skipping">
          <h2>Why deciding what to watch?</h2>

          Why do you want to skip scenes? Isn't that censorship? They are many reasons people might
          want to skip scenes...

          <h4>Educational purposes</h4>

          Some scenes depict morally wrong behaviours as good (eg. the cool guy is the drug
          dealer/sex abuser/...), this pushes kids (and everyone really) to see those actions as
          good.
          <!--We can show a banner instead of skipping the scene, helping parents discuss it with their children (and adults being aware of the moral perspective of the scene).
The important thing here is whether the bad action is portrayed as good. But a banner for scenes with positive moral examples might also help/trigger discussions-->

          <h4>Using vs loving</h4>
          <p>
            We believe people should be loved, not used. We want to approach sex as a way of showing
            love/giving ourselves to the other person. Thus we try to avoid using other people
            (either physically or on a video) as a tool to obtain pleasure.
          </p>

          <!--Here it is important whether the scene is meant to arouse the viewer (there is a lot of nudity in the sistine chapel) Does this happen for any other type of scene? Watching someone steal is very
          different to stealing, watching porn is using people for pleasure-->

          <h4>Disturbing scenes</h4>
          Unpleasant, scary, disgusting, too bloody… Bad for people with addictions… eg. if you have
          problems with gambling, alcohol, pornography..., it might be good to avoid scenes with a
          high dose of it People with phobias/PTSD… if you suffer PTSD after being raped, going to
          war… watching certain scenes might trigger them

          <!--<h4>Other uses</h4>
          <p>Ideological filtering (We don't do that here) Keep the public from/reduce the visibility
          of certain ideas/groups Fine line with the educational one. How can we distinguish them?
          Perhaps placing a banner instead of cutting the scene can help. Advert filtering (We don't
          do that here) Content creators deserve to be paid for their work, if they show you ads to
          earn their livings, we are not going to remove those. Fact checking We can show a
          banner/link to 3rd-party sources (wikipedia?) when a fact is presented on a film Specially
          useful (but not reduced to) documentaries</p>-->
        </div>

        <div id="vision-statement">
          <h2>Why are we here? (Vision)</h2>
          <blockquote>
            We have a dream that one day the Internet (and watching movies in particular) will help
            people discover christian values like the intrinsic beauty of human sexuality...
          </blockquote>
          <ol>
            <li>
              We have a dream that one day everyone will be able to seamlessly filter out unwanted
              content <b>[avoiding the bad]</b>
            </li>
            <li>
              We have a dream that one day the internet will promote the access and creation of
              movies with good values <b>[promoting the good]</b>
            </li>
            <li>
              We have a dream that one day bad content will be turned into an opportunity to learn
              &#38; discuss about the good stuff <b>[transforming the bad into good]</b>
            </li>
            <li>
              We have a dream that one day this spirit will jump into the broader society
              <b>[to infinity and beyond]</b>
            </li>
          </ol>
        </div>

        <div id="mission-statement">
          <h2>What do we do? (Mission)</h2>
          <ol>
            <li>
              We allow people to skip scenes, by providing a chrome extension that enables users to
              filter out the scenes they do not want to watch.
            </li>
            <li>
              We help people find good content Web search on our website Adding extra layer to
              different platforms (eg. on Netflix, justwatch... add icon with type of content) Link
              content from different sources (kids-in-mind, commonsense media, parents guide...)
            </li>
            <li>
              We promote the creation of good content By giving visibility/publicity to good content
              By bringing the discussion about content to the public
            </li>
            <li>
              We promote discussion We use meaningful tags (abuse, consent, fidelity...) We clarify
              reasons not to watch scenes (bad example, disturbing, using vs loving...) We create
              content (videos, blogs...) to promote the discussion (eg this video) Linking resources
              on other projects (cor project, pure in heart...)
            </li>
            <li>
              We pave the way for future projects By providing an open API where people can find
              good content and access filters
            </li>
          </ol>
        </div>

        <div id="how-can-i-help">
          <h2>How can I help?</h2>
          Ohana is a non-profit community of users that provides a free service to society. Thus we rely on the support of our members
          <ol>
            <li>Feedback. We are just starting, your ideas will help us become even better</li>
            <li>Share. Do you like Ohana? Share it with your friends and family!</li>
            <li><router-link to="get-started">Create filters</router-link></li>
            <li><a href="https://www.patreon.com/ohanamovies" target="_blank">Donate</a></li>
            <li>Code! Do you know how to code?</li>
          </ol>
        </div>
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
