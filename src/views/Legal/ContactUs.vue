<template>
  <div>
    <div class="subpage">
      <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
        <div class="inner">
          <h3 style="margin-bottom: 10px !important">{{ $t('contact_us') }}</h3>

          <p style="font-size: 90%; opacity: 0.6">{{ $t('wed_love_to_hear') }}</p>

          <div id="reset">
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="name"
                  label="name"
                  hide-details
                  type="vuetify"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  ref="email"
                  label="email"
                  type="vuetify"
                  v-model="email"
                  outlined
                  hide-details
                  :rules="[form_rules.email]"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  v-model="message"
                  label="Your message"
                  type="vuetify"
                  counter="500"
                  multiline
                  ref="message"
                  outlined
                  :rules="[form_rules.len]"
                ></v-textarea>
              </v-col>
            </v-row>
          </div>
          <br />
          <v-checkbox
            v-model="agree"
            label="I agree Ohana will record my email address, with the sole purpose of contacting me about this message."
            hide-details
          >
          </v-checkbox>
          <br />
          <div>
            {{ infoText }}
          </div>

          <button :disabled="!canBeSent" class="button special" @click="sendMessage()">
            {{ $t('send') }}
          </button>
          <br />
          <span>{{ infoText }}</span>
        </div>
      </section>
    </div>
  </div>
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
      agree: false,

      form_rules: {
        len: (value) => value.length < 500 || 'Please, keep it shorter',
        required: (value) => !!value || 'Required.' || 'Please fill this field',
        username: (value) =>
          /^[\d\w]+$/.test(value) || 'Invalid username. Only letters, numbers and underscore',
        email: (value) => {
          var reg =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
          return reg.test(value) || value == null || value == '' ? true : 'Invalid e-mail.'
        },
      },
    }
  },
  computed: {
    canBeSent() {
      return (
        this.agree &&
        this.name != '' &&
        this.message != '' &&
        this.email != '' &&
        !this.$refs['email'].hasError &&
        !this.$refs['message'].hasError
      )
    },
    no_magic() {
      return !(window.location.href.includes('magic') || window.location.href.includes('item/'))
    },
  },
  methods: {
    sendMessage() {
      if (this.$refs['email'].hasError) {
        this.infoText = 'Please, provide a valid email'
        return console.log('invalid emali')
      }

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
