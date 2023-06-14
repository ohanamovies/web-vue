<template>
  <div class="subpage">
    <section id="main" class="wrapper">
      <div class="inner">
        <header>
          <h1>{{ $t('ohana_stats') }}</h1>
          <p>
            {{ $t('below_you_will_find') }}
          </p>
        </header>

        <!-- BIG NUMBERS -->

        <!-- DETAILED TABLES-->
        <h2>{{ $t('overview') }}</h2>
        <p class="subtitle">{{ $t('number_of_movies_worked') }}</p>

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
            :items="data2"
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
        <h2>{{ $t('by_content_filtered') }}</h2>
        <p class="subtitle">
          {{ $t('what_kind_of_content') }}
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
            :items="data2"
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

      fetchedAt: '', //aux variable to make sure we refresh data with latest getData() request, not last arriving (async)

      data1: [],
      data2: [],
      loading: false,
      headers1: [
        { text: 'User', value: 'tags_user' },
        { text: 'Reviewed Movies', value: 'tagged_movies' },

        { text: 'Movies with scenes', value: 'Movies with scenes' },
        { text: 'Total Filters', value: 'Total Scenes' },
        { text: 'Movies with poster', value: 'Movies with poster' },
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
        { text: 'Slightly profane', value: 'Slightly profane' },
      ],
    }
  },

  methods: {
    getData() {
      //------
      const url = 'https://api.ohanamovies.org/stats'
      let options = {
        method: 'POST',
        body: JSON.stringify([]),
      }
      this.loading = true
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          console.log('loaded data')

          for (let i = 0; i < data.q2.length; i++) {
            if (data.q2[i].tags_user == null) data.q2.splice(i, 1)
          }
          this.data2 = data.q2
          this.loading = false
        })
    },
  },
  created() {
    this.getData()
  },
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
