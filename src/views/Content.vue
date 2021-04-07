<template>
  <div class="subpage">
    <my-header></my-header>
    <section class="wrapper" id="main">
      <div class="inner">
        <h4>Discover content</h4>

        <div class="row inputs">
          <!-- Search by text -->

          <v-row class="pa-0 ma-0">
            <v-col>
              <v-text-field
                id="searchBox"
                dense
                name="search"
                label="Search titles"
                v-model="title"
                autocomplete="off"
                prepend-inner-icon="mdi-magnify"
                clearable
                :hint="filteredList.length + ' results'"
                class="pa-0"
                @focus="$event.target.select()"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <!-- Refinements -->
              <v-menu
                bottom
                offset-y
                :close-on-content-click="false"
                v-model="showFilters"
                style="z-index:999"
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
                    <v-icon>mdi-filter</v-icon>Filters
                  </v-btn>
                </template>
                <div>
                  <v-card>
                    <v-card-title primary-title>
                      Pick your filters
                    </v-card-title>
                    <v-card-text>
                      <v-row align="center">
                        <v-col cols="12" sm="6" md="4">
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
                        ><v-col cols="12" sm="6" md="4">
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

                        <v-col cols="12" sm="6" md="4">
                          <b>Profanity: </b> <span>What do you want to skip? </span>
                          <div class="sliderticks">
                            <v-chip
                              label
                              :class="{ skip: oSlider > 1 }"
                              @click="oSlider = oSlider > 1 ? 1 : 2"
                              >Severe</v-chip
                            >
                            <v-chip
                              label
                              :class="{ skip: oSlider > 2 }"
                              @click="oSlider = oSlider > 2 ? 2 : 3"
                              >Moderate</v-chip
                            >
                            <v-chip
                              label
                              :class="{ skip: oSlider > 3 }"
                              @click="oSlider = oSlider > 3 ? 3 : 4"
                              >Mild</v-chip
                            >
                            <v-chip
                              label
                              :class="{ skip: oSlider > 4 }"
                              @click="oSlider = oSlider > 4 ? 4 : 5"
                              >Slight</v-chip
                            >
                          </div>
                        </v-col>

                        <v-col cols="12" md="6">
                          <v-select
                            id="vselect"
                            v-model="genres"
                            :items="availableGenres"
                            :menu-props="{ maxHeight: '400' }"
                            label="Filter by Genre"
                            multiple
                            chips
                            persistent-hint
                            dense
                          >
                          </v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-select
                            id="vselect"
                            v-model="providers"
                            chips
                            :items="['Netflix', 'HBO', 'Movistar', 'Disney Plus', 'Rakuten']"
                            :menu-props="{ maxHeight: '400' }"
                            label="Filter by provider"
                            multiple
                            persistent-hint
                            dense
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-checkbox
                            v-model="certified"
                            label="Show only Ohana certified movies"
                          ></v-checkbox>
                        </v-col>
                        <v-col cols="12" md="6">
                          <a
                            class="button"
                            @click="
                              getData()
                              showFilters = false
                            "
                            style="width: 100%"
                            >Search</a
                          >
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions>
                      {{ filteredList.length }} items found
                      <v-spacer></v-spacer>
                      <span style="color:red" @click="showFilters = false">Close</span>
                    </v-card-actions>
                  </v-card>
                </div>
              </v-menu>
            </v-col>
          </v-row>

          <!-- End refinements -->
        </div>

        <div id="typeContent">
          <br />
          <p style="margin-bottom:0px">
            <span style="text-decoration:underline; cursor:pointer" @click="type = 'movie'"
              >Movies ({{ movies.length }})</span
            >
            |
            <span style="text-decoration:underline;cursor:pointer" @click="type = 'show'"
              >Episodes ({{ shows.length }})</span
            >
          </p>
        </div>

        <div v-if="loading">
          <v-progress-linear indeterminate color="#4bae77"></v-progress-linear>
        </div>

        <div class="posters_wrapper">
          <div class="poster_card" v-for="(item, index) in filteredList" :key="index">
            <div class="image" style="width:100%">
              <!-- poster_path -->

              <img :src="item.poster" :alt="item.title" style="min-height: 200px;" />

              <!-- note: icons based on https://cdn.dribbble.com/users/368135/screenshots/3828960/d-protected.png -->
              <div class="shield">
                <v-icon :color="getShieldColor(item)" width="60px">
                  {{ getShieldIcon(item) }}
                </v-icon>
              </div>
            </div>
            <div class="content">
              <p style="font-size:20px; line-height:normal">{{ item.title }}</p>

              <p>
                <a v-if="item.watch_url" target="_blanck" :href="item.watch_url">Watch</a>
              </p>
              <p
                v-for="(cs, index) in Object.keys(getCaringScenes(item))"
                :key="index"
                :style="{
                  color: cs == 'pending' ? 'red' : cs == 'safe' ? 'green' : 'yellow',
                  lineHeight: 'normal'
                }"
              >
                <span style="text-transform: capitalize">{{ cs }}:</span>
                {{ getCaringScenes(item)[cs].join(', ') }}
              </p>
              <span style="position: absolute; bottom: 5px">{{ item.provider }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const rawTags = require('../assets/raw_tags')
const { searchMatch } = require('../sharedjs')
export default {
  data() {
    return {
      data: [],
      loading: true,
      showFilters: false,

      certified: false,
      sexSlider: 2,
      vioSlider: 2,
      oSlider: 2,
      title: '',
      providers: [],
      genres: [],
      type: 'movie',

      //TODO: available genres might not be matching the db... double check (lower/capital, spaces...)
      availableGenres: [
        'Action',
        'Adventure',
        'Animation',
        'Comedy',
        'Crime',
        'Documentary',
        'Drama',
        'Family',
        'Fantasy',
        'History',
        'Horror',
        'Music',
        'Mystery',
        'Romance',
        'Science Fiction',
        'Thriller',
        'TV Movie',
        'War',
        'and Western'
      ]
    }
  },
  computed: {
    caringTags() {
      var sex = rawTags.severities[0].slice(5 - this.sexSlider, 4)
      var vio = rawTags.severities[1].slice(5 - this.vioSlider, 4)
      var oth = rawTags.severities[2].slice(5 - this.oSlider, 4)
      var tags = [...sex, ...vio, ...oth]
      localStorage.caringTags = JSON.stringify(tags)
      return tags
    },

    filteredList() {
      var xx = []
      this.items.forEach(item => {
        var s = item.title
        if (s) {
          if (searchMatch(this.title, s)) {
            xx.push(item)
          }
        }
      })
      return xx
    },
    items() {
      return this.listType(this.type)
    },
    movies() {
      return this.listType('movie')
    },
    shows() {
      return this.listType('show')
    }
  },
  methods: {
    translateStatus(status) {
      switch (status) {
        case 'done':
          return 'filtered'
        case 'missing':
          return 'pending'
        default:
          return 'unknown'
      }
    },
    getCaringScenes(item) {
      //returns JSON with {tagName: status}, only for the tags user cares.
      var caringScenes = {}

      if (item.scenes) {
        item.scenes.forEach(scene => {
          this.caringTags.forEach(ct => {
            if (scene.tags.includes(ct)) {
              if (!caringScenes[ct]) {
                caringScenes[ct] = 0
              }
              caringScenes[ct] = caringScenes[ct] + 1
              console.log('aaaaa', caringScenes[ct] + 1)
            }
          })
        })
      }

      var taggedAux = {}
      this.caringTags.forEach(ct => {
        let label = ct
        if (caringScenes[ct]) label += '(' + caringScenes[ct] + ')'
        if (item.tags_missing.includes(ct)) {
          if (!taggedAux.pending) taggedAux.pending = []
          taggedAux.pending.push(label)
        } else if (item.tags_done.includes(ct)) {
          if (!taggedAux.safe) taggedAux.safe = []
          taggedAux.safe.push(label)
        } else {
          if (!taggedAux.unknown) taggedAux.unknown = []
          taggedAux.unknown.push(label)
        }
      })
      return taggedAux
    },
    getShieldColor(item) {
      var status = this.getShield(item)

      if (status == 'protected') {
        if (item.tags_level > 5) return 'blue'
        return 'green'
      } else if (status == 'missing') {
        return 'red'
      } else {
        return 'gray'
      }
    },
    getShieldIcon(item) {
      let status = this.getShield(item)
      let scenesCount = 1

      if (status == 'protected' && scenesCount == 0) {
        return 'mdi-emoticon-happy'
      } else if (status == 'protected') {
        return 'mdi-content-cut'
      } else if (status == 'missing') {
        return 'mdi-flag-variant'
      } else {
        return 'mdi-progress-question'
      }
      //return '/fc/' + shield + '.png'
    },

    getShield(item) {
      // If EVERY caringTags is included in tags_done.done
      if (this.caringTags.every(x => item.tags_done.includes(x))) {
        return 'protected'
      }

      // If ANY caringTags is included in tags_missing
      if (this.caringTags.some(x => item.tags_missing.includes(x))) {
        return 'missing'
      }

      // Otherwise
      return 'unknown'
    },

    listType(type) {
      var auxx = []
      this.data.forEach(e => {
        //TODO: check if tagged content
        if (e.type == type) auxx.push(e)
      })
      console.log(type, auxx)
      return auxx
    },

    buildURL(query) {
      // Build url
      var out = []
      for (var key in query) {
        out.push(key + '=' + encodeURIComponent(query[key]))
      }
      var url = 'https://api.ohanamovies.org/dev?' + out.join('&')
      console.log(query, url)
      return url
    },

    getData() {
      var url = this.buildURL({
        action: 'findMovies',
        title: this.title,
        tagged: JSON.stringify(this.caringTags),
        providers: JSON.stringify(this.providers),
        certified: this.certified ? 6 : 0,
        genres: JSON.stringify(this.genres)
      })

      this.loading = true
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.data = data
          this.loading = false
        })
    }
  },

  mounted() {
    var xx = localStorage.caringTags
    if (xx && xx != 'undefined') {
      xx = JSON.parse(xx)
      console.log(xx)
      this.sexSlider = xx.filter(tag => tag.includes('erotic')).length
      this.vioSlider = xx.filter(tag => tag.includes('gore')).length
      this.oSlider = xx.filter(tag => tag.includes('...')).length
    }
    //now search!
    this.getData()
  }
}
</script>

<!-- <style scoped>-->
<style>
/* Note: i had to remove the "scoped" keyword after style to override the input styles*/

.mdi {
  all: initial;
}
#searchBox {
  box-shadow: none;
  width: 100%;
  background: none;
  border: none;
}

#vbtn1 {
  border: none;
  box-shadow: none;
  color: white !important;

  border-radius: 0px;
}

#vexpansionpannel > * > button {
  border: none;
  box-shadow: none;
  border-radius: 0px;
}

#vselect {
  /*background: none;
  border: none;*/
  all: initial;
  visibility: hidden;
}

#vselect:focus {
  /*background: none;
  border: none;
  box-shadow: none;*/
  all: initial;
}

/*--------------------------*/
/*
input[type='text'],
input[type='password'],
input[type='email'],
input[type='tel'],
select,
textarea {
  background: white;
  color: inherit;
}
*/
.inputs > div {
  padding-bottom: 20px;
  /*margin: 0 10px;*/
}

.sliderticks {
  display: flex;
  justify-content: space-around;
  padding: 0px;
}

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

.v-chip.v-size--default {
  min-width: 70px !important;
  font-size: 75% !important;
}

.v-chip__content {
  margin: auto;
}

div.posters_wrapper {
  width: 100%;
  display: flex;
  /*justify-content: space-between;*/
  flex-wrap: wrap;
}

div.posters_wrapper div.poster_card {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 30px;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  border: 1px solid #e3e3e3;
  border-radius: var(--imageBorderRadius);
  overflow: hidden;

  /*width: calc(((100vw - 80px - 260px - 128px) / 4));*/
  /*width: calc(((100vw - 260px - 80px - 64px) / 2));*/
  width: calc(
    (100% - 10px * 4) / 2
  ); /* 100% of the div, minus margins*4, and /2 (so at min, 2 posters fit the width)*/
  max-width: 208px;
  /*min-width: 10px;*/
}

div.posters_wrapper div.poster_card div.image img {
  width: 100%;
  /*height: 100%;*/
}

div.posters_wrapper div.poster_card div.content {
  width: 100%;
  padding: 26px 10px 12px 10px;
  position: relative;
  white-space: normal;
  /*display: flex;*/
  align-content: flex-start;
  flex-wrap: wrap;
}

.shield {
  position: absolute;
  bottom: 0px;
  right: 0px;

  width: 38px;
  height: 38px;
  box-sizing: border-box;
  z-index: 99; /* make sure it stays on top of content*/
}

.shield i {
  background-color: white;
  border-radius: 15px;
  padding: 5px;
}

.certified {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 38px;
  height: 38px;
  box-sizing: border-box;
  z-index: 99; /* make sure it stays on top of content*/
}

.poster_card > .content {
  position: absolute !important;
  background: black;
  opacity: 0;
  height: 100%;
  font-size: 90%;
  color: white !important;
  z-index: 98;
}

.poster_card > .content:hover {
  opacity: 0.95;
  transition: opacity 0.3s;
}
</style>
