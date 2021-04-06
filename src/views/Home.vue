<template>
  <div class="home">
    <!-- Header -->
    <my-header></my-header>

    <!-- Banner -->
    <section class="banner" style="background-image: url(images/banner.jpg); min-height: 100vh">
      <div class="inner" style="border-top: none">
        <header>
          <h1>Welcome to Ohana</h1>
        </header>

        <!--<div class="flex">
          <div>
            <span class="icon fa-play-circle"></span>
            <h3>Simplicity</h3>
            <p>As easy as pressing play</p>
          </div>

          <div>
            <span class="icon fa-bug"></span>
            <h3>Your way</h3>
            <p>You decide what you watch</p>
          </div>

          <div>
            <span class="icon fa-heart"></span>
            <h3>Community</h3>
            <p>Built by people like you</p>
          </div>
        </div>-->

        <footer>
          <a
            href="https://chrome.google.com/webstore/detail/family-cinema/nfkbclgkdifmoidnkapblfipbdkcppcf"
            target="_blank"
            >
            <img src="images/download.png" width="200px" >
              
            </a
          >
        </footer>
      </div>
    </section>

    <!-- Three -->
    <section id="three" class="wrapper align-center" style="min-height: 100vh">
      <div class="inner">
        <div class="flex flex-3">
          <article>
            <div class="image">
              <img src="images/simplicity.png" width="180px" alt="Simplicity" />
            </div>
            <h4>As easy as pressing play</h4>
            <p>
              We are in the 21st Century... We believe it's time for unwanted content to be skipped
              as easily as pressing play.
            </p>
          </article>
          <article>
            <div class="image">
              <img src="images/your-way.png" width="200px" alt="Your way" />
            </div>
            <h4>You decide what you watch</h4>
            <p>
              Watch what you want, and only what you want. We will never tell you what to skip or
              what to watch. We classify scenes and build the software to make skips possible, you
              decide what to watch.
            </p>
          </article>
          <article>
            <div class="image">
              <img src="images/community.png" width="180px" alt="Community" />
            </div>
            <h4>Built by people like you</h4>
            <p>
              We are a community of developers and movie fans like you, passionately working to make
              Ohana possible.
            </p>
          </article>
        </div>
        <footer>
          <router-link to="community">
            <img src="images/meet-the-community.png" width="250px" alt="Meet the community"></router-link>
        </footer>
      </div>
    </section>

    <section>
      <div class="inner">
        
        <div>
          <h2 class="NormalCharacterStyle17">Filter content on your favourite providers</h2>
          <p class="NormalCharacterStyle17">*As of now, only available when you watch using Chrome browser</p>
        </div>
        <div class="flex flex-3" style="justify-content: space-around;">

        
          <div>
            <!--<span class="icon fa-play-circle"></span>-->
            <div class="image down">
              <img src="images/netflix.png" width="120px" alt="Netflix" />
            </div>
          </div>

          <div>
            <!--<span class="icon fa-play-circle"></span>-->
            <div class="image">
              <img src="images/hbo.png" width="180px" alt="HBO" />
            </div>
          </div>

          <div>
            <!--<span class="icon fa-play-circle"></span>-->
            <div class="image down">
              <img src="images/disney.png" width="180px" alt="Disney" />
            </div>
          </div>

          <div>
            <!--<span class="icon fa-play-circle"></span>-->
            <div class="image">
              <img src="images/movistar.png" width="180px" alt="Movistar" />
            </div>
          </div>
        </div>

        <footer>
          <div style="margin: auto; width: 250px">
            <router-link to="content">
              <div class="image">
                <img src="images/discover-content.png" width="100%" alt="Simplicity" />
              </div>
            </router-link>
          </div>
        </footer>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
//import MyHeader from '@/components/MyHeader.vue' //now imported globally!
export default {
  name: 'Home'
}
</script>


<style>

@media screen and (min-width: 980px) {

  .down{ margin-top: 90px; }

}

.NormalCharacterStyle14
{
  font-family : Noteworthy;
  font-weight : bold;
  font-size : 58px;
  color : #FFFFFF;
  color : rgb(255, 255, 255);
}
.NormalCharacterStyle12
{
  font-family : Helvetica;
  font-size : 36px;
  line-height : 36.94px;
  color : #000000;
  color : rgb(0, 0, 0);
}
.NormalCharacterStyle13
{
  font-family : Noteworthy;
  font-weight : bold;
  font-size : 37px;
  color : #000000;
  color : rgb(0, 0, 0);
}
.NormalCharacterStyle15
{
  font-family : Noteworthy;
  font-weight : bold;
  font-size : 48px;
  color : #FFFFFF;
  color : rgb(255, 255, 255);
}
.NormalCharacterStyle8
{
  font-family : Noteworthy;
  font-weight : bold;
  font-size : 39px;
  color : #FFFFFF;
  color : rgb(255, 255, 255);
}
.NormalCharacterStyle7
{
  font-family : Myriad Pro;
  font-size : 28px;
  color : #999999;
  color : rgb(153, 153, 153);
}
.NormalCharacterStyle10
{
  font-family : Noteworthy;
  font-weight : bold;
  font-size : 37px;
  color : #000000;
  color : rgb(0, 0, 0);
}
.NormalCharacterStyle11
{
  font-family : Noteworthy;
  font-weight : bold;
  font-size : 58px;
  color : #FFFFFF;
  color : rgb(255, 255, 255);
}
.NormalCharacterStyle9
{
  font-family : Myriad Pro;
  font-size : 36px;
  line-height : 36.94px;
  color : #000000;
  color : rgb(0, 0, 0);
}
.NormalCharacterStyle
{
  font-family : Noteworthy;
  font-weight : bold;
  font-size : 65px;
  color : #FFFFFF;
  color : rgb(255, 255, 255);
}
.NormalCharacterStyle1
{
  font-family : Noteworthy;
  font-weight : bold;
  font-size : 31px;
  color : #000000;
  color : rgb(0, 0, 0);
}
.NormalCharacterStyle2
{
  font-family : Helvetica;
  font-size : 36px;
  line-height : 36.94px;
  color : #000000;
  color : rgb(0, 0, 0);
}
.NormalCharacterStyle3
{
  font-family : Noteworthy;
  font-weight : bold;
  font-size : 37px;
  color : #000000;
  color : rgb(0, 0, 0);
}
.NormalCharacterStyle4
{
  font-family : Noteworthy;
  font-weight : bold;
  font-size : 58px;
  color : #FFFFFF;
  color : rgb(255, 255, 255);
}
.NormalCharacterStyle5
{
  font-family : Helvetica;
  font-weight : bold;
  font-size : 44px;
  color : #FFFFFF;
  color : rgb(255, 255, 255);
}
.NormalCharacterStyle6
{
  font-family : Noteworthy;
  font-weight : bold;
  font-size : 44px;
  color : #FFFFFF;
  color : rgb(255, 255, 255);
}
.NormalCharacterStyle17
{
  font-family : Myriad Pro;
  /*font-size : 61px;*/
  color : #006837 !important;
  color : rgb(0, 104, 55) !important;
}
.NormalCharacterStyle16
{
  font-family : Helvetica;
  font-size : 54px;
  color : #006837;
  color : rgb(0, 104, 55);
}
.NormalCharacterStyle18
{
  font-family : Noteworthy;
  font-weight : bold;
  font-size : 46px;
  color : #FFFFFF;
  color : rgb(255, 255, 255);
}
.NormalCharacterStyle19
{
  font-family : Noteworthy;
  font-weight : bold;
  font-size : 154px;
  line-height : 134px;
  color : #FFFFFF;
  color : rgb(255, 255, 255);
}


</style>