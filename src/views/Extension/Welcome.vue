<!-- open by extension when user installs it -->
<template>
  <div>
    <div class="subpage">
      <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
        <div class="inner">
          <h1 style="font-size: 18pt; font-weigth: 700">Thanks for installing Ohana!</h1>
          <p>Here some next steps you may find useful:</p>
          <ul>
            <li>Review your settings <router-link to="/settings">here</router-link>.</li>
            <li>
              Check the <router-link to="/get-started">get started guide</router-link> to learn how
              to use Ohana to both watch and edit movies.
            </li>
            <li>Learn how you can <router-link to="/community">support ohana</router-link>.</li>

            <br />
            <router-link class="button special" to="/">go to home page</router-link>
            <!-- TODO: implement this <li>Not sure what Ohana is? Wach the tour.</li>-->
          </ul>
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
