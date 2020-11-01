<template>
  <div id="app">
    <!-- Header -->

    <div>
      <router-view />
    </div>

    <!-- Footer -->
    <section>
      <footer id="footer">
        <div class="inner">
          <h3>Get in touch</h3>

          <form action="#" method="post">
            <div class="field half first">
              <label for="name">Name</label>
              <input name="name" id="name" type="text" placeholder="Name" />
            </div>
            <div class="field half">
              <label for="email">Email</label>
              <input name="email" id="email" type="email" placeholder="Email" />
            </div>
            <div class="field">
              <label for="message">Message</label>
              <textarea
                name="message"
                id="message"
                rows="6"
                placeholder="Message"
              ></textarea>
            </div>
            <ul class="actions">
              <li>
                <input value="Send Message" class="button" type="submit" />
              </li>
            </ul>
          </form>

          <div class="copyright">
            &copy; Family Cinema. Design:
            <a href="https://templated.co">TEMPLATED</a>. Images:
            <a href="https://unsplash.com">Unsplash</a>.
          </div>
        </div>
      </footer>
    </section>
  </div>
</template>

<style>
/*
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
*/
</style>
