<template>
  <div>
    <div>
      <footer id="footer">
        <div class="inner">
          <!--
          <h3>Get in touch</h3>

          <form action="#" method="post">
            <div class="field half first">
              <label for="name">Name</label>
              <input
                name="name"
                id="name"
                type="text"
                placeholder="Name"
                v-model="name"
              />
            </div>
            <div class="field half">
              <label for="email">Email</label>
              <input
                name="email"
                id="email"
                type="email"
                placeholder="Email"
                v-model="email"
              />
            </div>
            <div class="field">
              <label for="message">Message</label>
              <textarea
                name="message"
                id="message"
                rows="6"
                placeholder="Message"
                v-model="message"
              ></textarea>
            </div>
            <ul class="actions">
              <li>
                <input value="Send Message" class="button" type="submit" />
              </li>
            </ul>
            <button class="button special" @click="sendMessage()">
              Download
            </button>
            <p>{{ sentText }}</p>
          </form>
          -->

          <div class="copyright">
            &copy; Family Cinema. Design:
            <a href="https://templated.co">TEMPLATED</a>. Images:
            <a href="https://unsplash.com">Unsplash</a>.
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      name: '',
      message: '',
      sentText: ''
    }
  },
  methods: {
    sendMessage() {
      var murl = 'http://www.arrietaeguren.es/movies/app/email.php'
      var jsonn = {
        name: this.name,
        email: this.email,
        message: this.message
      }
      fetch(murl, {
        method: 'post',
        body: JSON.stringify(jsonn)
      })
        .then(response => {
          return response.json()
        })
        .then(myJson => {
          console.log(myJson) //message sent
          this.sentText = 'Thank you!'
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
