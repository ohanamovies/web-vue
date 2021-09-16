<template>
  <footer id="footer">
    <div class="inner">
      <h3 style="margin-bottom: 10px !important">Get in touch</h3>
      <p style="font-size: 90%; opacity: 0.6">We'd love to hear from you</p>

      <form action="#" method="post">
        <div class="field half first">
          <label for="name">Name</label>
          <input name="name" id="name" type="text" placeholder="Name" v-model="name" />
        </div>
        <div class="field half">
          <label for="email">Email</label>
          <input name="email" id="email" type="email" placeholder="Email" v-model="email" />
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
        <!--
            <ul class="actions">
              <li>
                <input value="Send Message" class="button" type="submit" />
              </li>
            </ul>
            -->
      </form>
      <!-- class="button"-->

      <button @click="sendMessage()" style="background-color: white">Send</button>
      <br />
      <span>{{ infoText }}</span>
      <br />
      <br />
      <br />

      <div class="copyright">
        &copy; Ohana. Design:
        <a href="https://templated.co">TEMPLATED</a>. <br />
        {{
          isChrome
            ? 'Well done! You are using Chrome'
            : 'Note: To watch Ohana movies, you need to switch to Chrome browser and install your extension'
        }}
        <!-- Images: <a href="https://unsplash.com">Unsplash</a>. -->
        <!-- Template and elements: https://templated.co/projection -->
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    isChrome: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      email: '',
      name: '',
      message: '',
      infoText: '',
    }
  },
  methods: {
    sendMessage() {
      var murl = 'https://www.arrietaeguren.es/movies/app/email.php'

      if (this.email == '' || this.name == '' || this.message == '') {
        this.infoText = 'Please, fill all the data'
        return
      }

      if (!this.email.includes('@')) {
        this.infoText = 'Invalid email. Please, fix and try again.'
        return
      }

      var fd = new FormData()
      fd.append('email', this.email)
      fd.append('name', this.name)
      fd.append('message', this.message)

      fetch(murl, {
        method: 'post',
        body: fd,
      })
        .then((response) => {
          return response.json()
        })
        .then((myJson) => {
          console.log(myJson) //message sent
          this.infoText = 'Message sent. Thank you!'
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
