<template>
  <div>
    <header id="header">
      <div class="inner">
        <router-link to="/" class="logo">Ohana</router-link>
        <nav id="nav">
          <router-link to="/">Home</router-link>
          <router-link to="/get-started">Get Started</router-link>
          <router-link to="/content">Find movies</router-link>
          <!--<router-link to="/community">Community</router-link>-->
          <!--<router-link to="/stats">Stats</router-link>-->
          <router-link to="/about">About</router-link>

          <span
            style="text-transform: uppercase; cursor: pointer"
            @click="$i18n.locale = nextLan($i18n.locale)"
            >{{ $i18n.locale }}
          </span>
        </nav>
        <a href="#navPanel" class="navPanelToggle">
          <span class="fa fa-bars"> </span>
        </a>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',

  methods: {
    nextLan: function (current) {
      console.log(current)
      if (current == 'es') return 'en'
      else return 'es'
    },
  },
}
</script>

<style lang="scss" scoped></style>
