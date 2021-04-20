<template>
  <div class="subpage">
    <section id="main" class="wrapper">
      <div class="inner">
        <my-header></my-header>
        <header>
          <h1>Ohana Stats</h1>
          <p>
            Below you will find real time data about how our filtering creation is going.
          </p>
          <p>Please notice this page is under construction and will change a lot soon.</p>
        </header>

        <h2>Overview</h2>
        <p class="subtitle">Number of movies by user that reviewed the content</p>

        <div style="max-width: 700px">
          <v-text-field
            id="searchBox"
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            clearable
          ></v-text-field>
          <br />
          <v-data-table
            :headers="headers1"
            :items="data"
            :items-per-page="10"
            class="elevation-1"
            :search="search"
            dense
            hide-default-footer
            :loading="loading"
          ></v-data-table>
        </div>
        <br />
        <br />
        <h2>By content filtered</h2>
        <p class="subtitle">
          Number of movies with that specific content reviewed (marked as done)
        </p>
        <div style="max-width: 900px">
          <v-text-field
            id="searchBox"
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            clearable
          ></v-text-field>
          <br />
          <v-data-table
            :headers="headers2"
            :items="data"
            :items-per-page="10"
            class="elevation-1"
            :search="search"
            dense
            hide-default-footer
            :loading="loading"
          ></v-data-table>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: 'value',
      search: '',
      data: [],
      loading: false,
      headers1: [
        { text: 'User', value: 'tags_user' },
        { text: 'Reviewed Movies', value: 'tagged_movies' },

        { text: 'Movies with scenes', value: 'Movies with scenes' },
        { text: 'Total Filters', value: 'Total Scenes' },
        { text: 'Movies with poster', value: 'Movies with poster' }
      ],
      headers2: [
        { text: 'User', value: 'tags_user' },
        { text: 'Very erotic', value: 'Very erotic' },
        { text: 'Moderately erotic', value: 'Moderately erotic' },
        { text: 'Mildly erotic', value: 'Mildly erotic' },
        { text: 'Slightly erotic', value: 'Slightly erotic' },
        { text: 'Very gory', value: 'Very gory' },
        { text: 'Moderately gory', value: 'Moderately gory' },
        { text: 'Mildly gory', value: 'Mildly gory' },
        { text: 'Slightly gory', value: 'Slightly gory' },
        { text: 'Very profane', value: 'Very profane' },
        { text: 'Moderately profane', value: 'Moderately profane' },
        { text: 'Mildly profane', value: 'Mildly profane' },
        { text: 'Slightly profane', value: 'Slightly profane' }
      ]
    }
  },
  methods: {
    getData() {
      const url = 'https://api.ohanamovies.org/stats'
      this.loading = true
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log('loaded data')

          for (let i = 0; i < data.length; i++) {
            if (data[i].tags_user == null) data.splice(i, 1)
          }

          this.data = data
          this.loading = false
        })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style>
#searchBox {
  box-shadow: none;
  width: 100%;
  background: none;
  border: none;
}
.subtitle {
  font-size: 90%;
  color: gray;
}
h2 {
  margin-bottom: 5px;
}
</style>
