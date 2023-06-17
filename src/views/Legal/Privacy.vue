<template>
  <div>
    <div class="subpage">
      <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
        <div class="inner card card-padded">
          <p style="font-size: 70%">
            By using Ohana TV website and apps, you agree to our
            <router-link to="/privacy-policy">privacy policy</router-link>, and to our
            <router-link to="/terms-of-use">the terms of use</router-link>.
          </p>

          <h1>Privacy</h1>
          <p>Here we describe the kind of data we collect, and how we use it.</p>

          <h2>Cookies</h2>
          <p>We use cookies to be able to deliver our features, and to analyze traffic.</p>

          <h2>Your data</h2>
          <p>
            If you sign up to use our Ohana, you share with us your email address, as well as a user
            name of your choice.
          </p>
          <h3>Your email</h3>
          <p>We will never share your email address with third parties.</p>
          <p>We use your email to let you login, and to reset your password if you request so.</p>
          <p>
            In the future, we may send you emails for operational and marketing resons: like to
            thank you for your contributions, or to share relevant news. Once we get there, you will
            be able to opt out from these.
          </p>
          <h3>Your username</h3>
          <p><b>Important: Your username will be publicly visible.</b></p>
          <p>
            The contributions you do to our community will be linked to your username. Anyone will
            be able to see all your contributions.
          </p>
          <p>
            If you don't like that, we recommend that you either avoid contributing, or just use a
            username that hides your real identity.
          </p>
          <!-- TODO: Define better contact-us mechanisms -->
          <p>
            If you wish to change your username, please
            <router-link to="/contact-us">contact us</router-link>.
          </p>

          <h2>Your contributions</h2>
          <p>
            Your contributions to this site and to any of our software, must agree with our
            <router-link to="/terms-of-use">terms of use</router-link>.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      key: 'value',
    }
  },
}
</script>

<style lang="scss" scoped></style>
