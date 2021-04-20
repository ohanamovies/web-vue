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

        <!-- BIG NUMBERS - ->
        <v-menu
          bottom
          offset-y
          :close-on-content-click="false"
          v-model="showFilters2"
          style="z-index:999"
          max-width="350px"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              id="vbtn1"
              color="#6cc091"
              dark
              v-on="on"
              depressed
              style="z-index:999; border-style: none"
            >
              <v-icon>mdi-account</v-icon>Sensitivity
            </v-btn>
          </template>
          <div>
            <v-card>
              <v-card-text>
                <v-row align="left">
                  <v-col cols="12" sm="12" md="12">
                    <b>Sex/Nudity: </b> <span>What do you want to skip? </span>
                    <div class="sliderticks">
                      <v-chip
                        label
                        :class="{ skip: sexSlider > 1 }"
                        @click="sexSlider = sexSlider > 1 ? 1 : 2"
                        >Severe</v-chip
                      >
                      <v-chip
                        label
                        :class="{ skip: sexSlider > 2 }"
                        @click="sexSlider = sexSlider > 2 ? 2 : 3"
                        >Moderate</v-chip
                      >
                      <v-chip
                        label
                        :class="{ skip: sexSlider > 3 }"
                        @click="sexSlider = sexSlider > 3 ? 3 : 4"
                        >Mild</v-chip
                      >
                      <v-chip
                        label
                        :class="{ skip: sexSlider > 4 }"
                        @click="sexSlider = sexSlider > 4 ? 4 : 5"
                        >Slight</v-chip
                      >
                    </div> </v-col
                  ><v-col cols="12" sm="12" md="12">
                    <b>Violence/Gore: </b> <span>What do you want to skip? </span>
                    <div class="sliderticks">
                      <v-chip
                        label
                        :class="{ skip: vioSlider > 1 }"
                        @click="vioSlider = vioSlider > 1 ? 1 : 2"
                        >Severe</v-chip
                      >
                      <v-chip
                        label
                        :class="{ skip: vioSlider > 2 }"
                        @click="vioSlider = vioSlider > 2 ? 2 : 3"
                        >Moderate</v-chip
                      >
                      <v-chip
                        label
                        :class="{ skip: vioSlider > 3 }"
                        @click="vioSlider = vioSlider > 3 ? 3 : 4"
                        >Mild</v-chip
                      >
                      <v-chip
                        label
                        :class="{ skip: vioSlider > 4 }"
                        @click="vioSlider = vioSlider > 4 ? 4 : 5"
                        >Slight</v-chip
                      >
                    </div>
                  </v-col>

                  <v-col cols="12" sm="12" md="12">
                    <b>Profanity: </b> <span>What do you want to skip? </span>
                    <div class="sliderticks">
                      <v-chip
                        label
                        :class="{ skip: profSlider > 1 }"
                        @click="profSlider = profSlider > 1 ? 1 : 2"
                        >Severe</v-chip
                      >
                      <v-chip
                        label
                        :class="{ skip: profSlider > 2 }"
                        @click="profSlider = profSlider > 2 ? 2 : 3"
                        >Moderate</v-chip
                      >
                      <v-chip
                        label
                        :class="{ skip: profSlider > 3 }"
                        @click="profSlider = profSlider > 3 ? 3 : 4"
                        >Mild</v-chip
                      >
                      <v-chip
                        label
                        :class="{ skip: profSlider > 4 }"
                        @click="profSlider = profSlider > 4 ? 4 : 5"
                        >Slight</v-chip
                      >
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                Hello :)
                <v-spacer></v-spacer>
                <span style="color:green; cursor:pointer" @click="showFilters2 = false">Done</span>
              </v-card-actions>
            </v-card>
          </div>
        </v-menu>

        {{ skipTags }}
        -->
        <!-- DETAILED TABLES-->

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
const rawTags = require('../assets/raw_tags')
export default {
  data() {
    return {
      key: 'value',
      search: '',

      sexSlider: 2,
      vioSlider: 2,
      profSlider: 2,
      showFilters2: false,

      data1: [],
      data2: [],
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
  computed: {
    skipTags() {
      var sex = rawTags.severities[0].slice(5 - this.sexSlider, 4)
      var vio = rawTags.severities[1].slice(5 - this.vioSlider, 4)
      var prof = rawTags.severities[2].slice(5 - this.profSlider, 4)
      var tags = [...sex, ...vio, ...prof]
      return tags
    }
  },
  watch: {
    skipTags() {
      this.updateLocalStorage()
      this.getData()
    }
  },
  methods: {
    updateLocalStorage() {
      let x = {
        sliders: {
          sexSlider: this.sexSlider,
          vioSlider: this.vioSlider,
          profSlider: this.profSlider
        }
      }
      localStorage.ohanaSettings = JSON.stringify(x)
    },
    loadLocalStorage() {
      let s = localStorage.ohanaSettings
      if (s && s != 'undefined') {
        let x = JSON.parse(localStorage.ohanaSettings)

        //update caring tags
        let xx = x.sliders
        /*this.sexSlider = xx.filter(tag => tag.includes('erotic')).length
        this.vioSlider = xx.filter(tag => tag.includes('gore')).length
        this.profSlider = xx.filter(tag => tag.includes('...')).length*/
        this.sexSlider = xx.sexSlider
        this.vioSlider = xx.vioSlider
        this.profSlider = xx.profSlider
      }
    },
    getData() {
      const url = 'https://api.ohanamovies.org/stats'
      let options = {
        method: 'POST',
        body: JSON.stringify(this.skipTags)
      }
      this.loading = true
      fetch(url, options)
        .then(response => response.json())
        .then(data => {
          console.log('loaded data')

          for (let i = 0; i < data.q2.length; i++) {
            if (data.q2[i].tags_user == null) data.q2.splice(i, 1)
          }

          this.data1 = data.q1
          this.data2 = data.q2
          this.loading = false
        })
    }
  },
  created() {
    this.loadLocalStorage()
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

/** */
.skip .v-chip__content:before {
  content: url('https://api.iconify.design/mdi:eye-off.svg?height=12');
  color: white !important;
  opacity: 0.4;
  padding-top: 3px;
  padding-right: 2px;
}

.skip {
  background-color: #9e9e9e !important;
  border-color: #9e9e9e !important;
}
/** */
</style>
