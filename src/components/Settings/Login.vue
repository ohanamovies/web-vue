<template>
  <div>
    <b></b>
    <div v-if="loggedIn">
      <span style="font-size: 2rem">Hello {{ settings.username }}!</span>
      <br />
      <span class="modern-link" @click="logout()">logout</span>
    </div>

    <div v-else>
      <h4>Login or sign up</h4>
      <p>
        With an Ohana TV account, you will be able to contribute to the community. Also, your
        preferences will follow you along if you switch devices.
      </p>

      <!-- Change form -->
      <div style="margin-left: 12px">
        <span v-if="page == 'signup'" style="font-size: 10pt"
          >Already a user? <span class="modern-link" @click="page = 'login'">Log in</span></span
        >
        <span v-else-if="page == 'login'" style="font-size: 10pt"
          >Don't have an account?
          <span class="modern-link" @click="page = 'signup'">Sign up</span></span
        >
      </div>

      <!-- Form -->
      <div style="padding: 0px 10px">
        <v-form>
          <v-text-field
            v-if="page == 'login'"
            v-model="username_or_email"
            append-icon="mdi-account"
            outlined
            placeholder="email or username"
            clearable
            id="usernameOrEmailBox"
            class="vuetify"
          >
          </v-text-field>

          <v-text-field
            v-if="page == 'signup'"
            type="email"
            v-model="email"
            append-icon="mdi-email"
            outlined
            placeholder="email"
            clearable
            id="usernameBox"
            class="vuetify"
            :rules="[form_rules.email]"
          ></v-text-field>
          <v-text-field
            v-if="page == 'signup'"
            v-model="username"
            append-icon="mdi-account"
            outlined
            placeholder="username"
            clearable
            id="usernameBox"
            class="vuetify"
            :hint="page == 'signup' ? 'Note: your username might be visible to other users' : ''"
            :rules="[form_rules.username]"
          ></v-text-field>
          <v-text-field
            v-if="page == 'login' || page == 'signup'"
            v-model="password"
            :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show_password ? 'text' : 'password'"
            @click:append="show_password = !show_password"
            outlined
            placeholder="password"
            clearable
            id="passwordBox"
            class="mb-3"
            hide-details
          ></v-text-field>

          <div v-if="page == 'signup'">
            <v-checkbox hide-details>
              <template v-slot:label>
                <div style="font-size: 90%; padding-top: 15px">
                  I agree with the
                  <a @click.stop href="/terms-of-use" target="_blank">Terms of use</a>
                  and the
                  <a @click.stop href="/privacy-policy" target="_blank">Privacy Policy</a>
                </div>
              </template>
            </v-checkbox>
          </div>

          <v-btn block depressed id="vbtn1" color="primary" @click="submitForm()">{{
            page == 'signup' ? 'Sign up' : 'login'
          }}</v-btn>

          <span v-if="message.text" :style="{ color: message.color, marginTop: '10px' }"
            ><br />{{ message.text }}</span
          >
        </v-form>
      </div>
      <br />
      <br />
      <br />

      <p v-if="false" style="margin-left: 12px">
        Not feeling like identifying now?
        <span class="modern-link" @click="bemyguest()">Continue as guest</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ohana from '@/assets/ohana'
export default {
  data() {
    return {
      show_password: false,
      page: 'signup',

      username: '',
      password: '',
      email: '',
      username_or_email: '',

      message: {
        text: '',
        color: 'black',
      },

      valid_form: false,
      form_rules: {
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
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings', 'extension_version']),
    loggedIn() {
      return this.settings.username && this.settings.authToken
    },
  },
  methods: {
    logout() {
      let settings = this.$store.state.settings
      settings.username = ''
      settings.authToken = ''
      //this.$store.commit(mutations.SET_SETTINGS, settings)
      this.$store.dispatch('updateSettings', settings)
      this.tab = 1
    },
    bemyguest() {
      let settings = this.$store.state.settings
      settings.username = 'guest'
      settings.authToken = ''
      this.$store.dispatch('updateSettings', settings)
      this.page = false
    },
    resetMessage() {
      this.message.text = ''
      this.message.color = 'black'
    },
    submitForm() {
      if (this.page == 'login') {
        this.login()
      } else if (this.page == 'signup') {
        this.signup()
      }
    },
    login() {
      this.resetMessage()
      this.message.text = 'Loading...'
      let query = {
        action: 'login',
        username: this.username_or_email,
        password: this.password,
      }
      var url = ohana.utils.buildURL(query)
      fetch(url)
        .then((r) => {
          if (r.ok) {
            return r.json()
          } else {
            this.username_or_email = null
            this.username = null
            this.email = null
            this.password = null
            this.message.text = 'Invalid username or password'
            this.message.color = 'red'
          }
        })
        .then((data) => {
          if (data) {
            console.log('dataaaa', data)
            let settings = this.$store.state.settings
            settings.username = this.username_or_email
            settings.authToken = data.token
            settings.level = data.level
            this.$store.dispatch('updateSettings', settings)

            this.message.text = data.msg
            this.message.color = 'green'
            this.page = false
          }
          console.log('login result: ', data)
        })
    },
    signup() {
      this.resetMessage()
      this.message.text = 'Loading...'
      let query = {
        action: 'newuser',
        username: this.username,
        password: this.password,
        email: this.email,
      }
      var url = ohana.utils.buildURL(query)
      fetch(url)
        .then((r) => {
          console.log('RRRRR', r)
          if (r.ok) {
            return r.json()
          } else {
            r.text().then((text) => {
              this.username_or_email = null
              this.username = null
              this.email = null
              this.password = null
              this.message.text = text
              this.message.color = 'red'
            })
          }
        })
        .then((data) => {
          if (data) {
            let settings = this.$store.state.settings
            settings.username = this.username
            settings.authToken = data.token
            settings.level = data.level
            this.$store.dispatch('updateSettings', settings)
            this.message.text = data.msg
            this.message.color = 'green'
            this.page = false
          }
          console.log('login result: ', data)
        })
    },
  },
}
</script>

<style>
#usernameBox,
#passwordBox,
#usernameOrEmailBox {
  box-shadow: none;
  width: 100%;
  background: none;
  border: none;
}
</style>
