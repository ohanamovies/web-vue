<template>
  <div class="subpage">
    <my-header></my-header>
    <section class="wrapper" id="main">
      <div class="inner">
        <h4>Discover content</h4>

        <div class="row inputs">
          <!-- Search by text -->
          <div
            class="12u 12u(medium) 12u$(small)"
            style="padding-bottom: 0px; padding-left: 10px; padding-right: 10px;"
          >
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
              append-outer-icon="mdi-filter-menu"
              @focus="
                $event.target.select()
                showFilters = true
              "
              @click:append-outer="showFilters = !showFilters"
            ></v-text-field>
          </div>

          <!-- Expansion list with tags and filters -->
          <v-container class="px-0" v-if="showFilters">
            <v-expansion-panels accordion id="vexpansionpannel" class="px-0 mx-0">
              <!-- Expansion panel 1: Tags (protection levels)-->
              <v-expansion-panel>
                <v-expansion-panel-header
                  ><b style="color: #4bae77">Protection levels</b></v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <v-row>
                    <v-col cols="12" md="4">
                      <div classe="4u 6u(medium) 12u$(small)" style="text-align: center">
                        <b>For Sex/Nudity</b>
                        <div class="protection">
                          <span>No protection</span>
                          <span>Full protection</span>
                        </div>
                        <input type="range" min="1" max="5" v-model="sexSlider" class="slider" />
                        <div class="sliderticks">
                          <p :class="{ strike: sexSlider > 1 }">Severe</p>
                          <p :class="{ strike: sexSlider > 2 }">Moderate</p>
                          <p :class="{ strike: sexSlider > 3 }">Mild</p>
                          <p :class="{ strike: sexSlider > 4 }">Slight</p>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4">
                      <div classe="4u 6u(medium) 12u$(small)" style="text-align: center">
                        <b>For Violence/Gore</b>
                        <div class="protection">
                          <span>No protection</span>
                          <span>Full protection</span>
                        </div>
                        <input type="range" min="1" max="5" v-model="vioSlider" class="slider" />
                        <div class="sliderticks">
                          <p :class="{ strike: vioSlider > 1 }">Severe</p>
                          <p :class="{ strike: vioSlider > 2 }">Moderate</p>
                          <p :class="{ strike: vioSlider > 3 }">Mild</p>
                          <p :class="{ strike: vioSlider > 4 }">Slight</p>
                        </div>
                      </div>
                    </v-col>

                    <v-col cols="12" md="4">
                      <div classe="4u 6u(medium) 12u$(small)" style="text-align: center">
                        <b>For Profanity</b>
                        <div class="protection">
                          <span>No protection</span>
                          <span>Full protection</span>
                        </div>
                        <input type="range" min="1" max="5" v-model="oSlider" class="slider" />
                        <div class="sliderticks">
                          <p :class="{ strike: oSlider > 1 }">Severe</p>
                          <p :class="{ strike: oSlider > 2 }">Moderate</p>
                          <p :class="{ strike: oSlider > 3 }">Mild</p>
                          <p :class="{ strike: oSlider > 4 }">Slight</p>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <!-- Expanion panel 2: Other filters-->
              <v-expansion-panel>
                <v-expansion-panel-header
                  ><b style="color: #4bae77">Filtery by...</b></v-expansion-panel-header
                >
                <v-expansion-panel-content style="z-index:9999;">
                  <v-row>
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
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <a class="button" @click="getData()" style="width: 100%">Search!</a>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-container>
        </div>

        <!--
        <div class="row inputs" style="z-index:9999;">
    
          <v-container class="px-0">
            <v-row>
              <v-expansion-panels accordion id="vexpansionpannel">
                <v-col cols="12" md="6">
                  <v-expansion-panel>
                    <v-expansion-panel-header
                      >Protection level for Sex/Nudity</v-expansion-panel-header
                    >
                    <v-expansion-panel-content>
                      
                      <div class="protection">
                        <span>No protection</span>
                        <span>Full protection</span>
                      </div>
                      <v-slider
                        v-model="sexSlider"
                        :tick-labels="['Severe', 'Moderate', 'Mild', 'Slight']"
                        :max="3"
                        step="1"
                        ticks="always"
                        tick-size="8"
                      ></v-slider>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-col>
                <v-col cols="12" md="6">
                  <v-expansion-panel>
                    <v-expansion-panel-header
                      >Protection level for Profanity</v-expansion-panel-header
                    >
                    <v-expansion-panel-content>
                      <div class="protection">
                        <span>No protection</span>
                        <span>Full protection</span>
                      </div>
                      <v-slider
                        v-model="oSlider"
                        :tick-labels="['Severe', 'Moderate', 'Mild', 'Slight']"
                        :max="3"
                        step="1"
                        ticks="always"
                        tick-size="8"
                      ></v-slider>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-col>
                <v-col cols="12" md="6">
                  <v-expansion-panel>
                    <v-expansion-panel-header
                      >Protection level for Violence/Gore</v-expansion-panel-header
                    >
                    <v-expansion-panel-content>
                      <div class="protection">
                        <span>No protection</span>
                        <span>Full protection</span>
                      </div>
                      <v-slider
                        v-model="vioSlider"
                        :tick-labels="['Severe', 'Moderate', 'Mild', 'Slight']"
                        :max="3"
                        step="1"
                        ticks="always"
                        tick-size="8"
                      ></v-slider>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-col>
              </v-expansion-panels>
            </v-row>

            <v-row>
              <v-expansion-panels accordion id="vexpansionpannel2">
                <v-expansion-panel>
                  <v-expansion-panel-header>Genre/Provider</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-col cols="12" md="6">
                      <v-select
                        id="vselect"
                        v-model="genres"
                        :items="availableGenres"
                        :menu-props="{ maxHeight: '400' }"
                        label="Filter by Genre"
                        multiple
                        hint="Pick your favorite genres"
                        persistent-hint
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select
                        id="vselect"
                        v-model="providers"
                        :items="['Netflix', 'HBO', 'Movistar']"
                        :menu-props="{ maxHeight: '400' }"
                        label="Filter by provider"
                        multiple
                        hint="Pick your favorite providers"
                        persistent-hint
                      ></v-select>
                    </v-col>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </v-container>

        
        </div>
        -->

        <!--<div id="your-filters" class="row" style="margin-top:0px">
          <div v-for="(tag, index) in tags" :key="index" class="3u 6u(medium) 6u$(small)">
            <div v-if="tag.severity.length > 0">
              <b>{{ tag.title }}</b>
              <div v-for="(sev, index) in tag.severity" :key="index">
                <input
                  type="checkbox"
                  :id="sev.value"
                  :value="sev.value"
                  :name="sev.value"
                  v-model="caringTags"
                />

                <label :for="sev.value">{{ sev.title }}</label>
              </div>
            </div>
          </div>

          <!- - <p>{{ caringTags }}</p> - ->
        </div>-->

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
              <img
                v-if="item.metadata.poster_path"
                :src="'https://image.tmdb.org/t/p/w200' + item.metadata.poster_path"
                :alt="'Poster - ' + item.metadata.title"
              />
              <!-- poster a secas -->
              <img v-else :src="item.metadata.poster" :alt="'Poster - ' + item.metadata.title" />
              <!-- note: icons based on https://cdn.dribbble.com/users/368135/screenshots/3828960/d-protected.png -->
              <div class="shield" v-if="caringTags.length > 0">
                <img :src="getShieldImage(item)" alt="" width="50px" />
              </div>
            </div>
            <div class="content ">
              <span style="font-size:20px; line-height:normal">{{ item.metadata.title }}</span>

              <br />
              <br />

              <ul>
                <li
                  v-for="(cs, index) in Object.keys(getCaringScenes(item))"
                  :key="index"
                  :style="{
                    color:
                      getCaringScenes(item)[cs].status == 'missing'
                        ? 'red'
                        : getCaringScenes(item)[cs].status == 'done'
                        ? 'green'
                        : 'yellow',
                    lineHeight: 'normal'
                  }"
                >
                  <span style="position:relative; left:-10px">
                    {{ cs }}:
                    {{ translateStatus(getCaringScenes(item)[cs].status) }}
                    <span style="font-size: 75%" v-if="getCaringScenes(item)[cs].count">
                      ({{ getCaringScenes(item)[cs].count }} scenes)
                    </span>
                  </span>
                </li>
              </ul>

              <span style="position: absolute; bottom: 5px">{{ item.metadata.provider }}</span>
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
        var s = item.metadata.title
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
        if (item.tagged[ct]) {
          taggedAux[ct] = {
            status: item.tagged[ct].status,
            count: caringScenes[ct]
          }
        }
      })

      return taggedAux
    },
    getShieldImage(item) {
      var shield = this.getShield(item)
      return '/fc/' + shield + '.png'
    },
    getShield(item) {
      var finalStatus = 3 //1:missing, 2: unknown, 3:protected

      if (!item.tagged) {
        finalStatus = 2
      } else {
        this.caringTags.forEach(ct => {
          var auxx
          if (!item.tagged[ct]) {
            auxx = 2
          } else {
            var s = item.tagged[ct].status
            auxx = s == 'done' ? 3 : s == 'missing' ? 1 : 2
          }
          if (auxx < finalStatus) {
            finalStatus = auxx
          }
        })
      }

      //console.log(finalStatus, item)
      //getShield(item)
      var shield = finalStatus == 3 ? 'protected' : finalStatus == 1 ? 'missing' : 'unknown'
      return shield
    },
    listType(type) {
      var auxx = []
      this.data.forEach(e => {
        //TODO: check if tagged content
        {
          if (e.metadata.type == type) {
            auxx.push(e)
          }
        }
      })
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
    //now do search!
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

.slider {
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 0.8;
}

.slider::-webkit-slider-thumb {
  /*-webkit-appearance: none;
  appearance: none;*/
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}

.sliderticks {
  display: flex;
  justify-content: space-around;
  padding: 0 10px;
}

.sliderticks p {
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  width: 1px;
  background: #d3d3d3;
  height: 6px;
  font-size: 75%;
  line-height: 28px;
  margin: -5px 0 20px 0;
}

.sliderticks p:not(.strike):before {
  /*content: url('https://api.iconify.design/mdi:eye.svg?height=14');
  opacity: 0.4;
  padding-top: 3px;
  padding-right: 2px;*/
}

.strike {
  /*text-decoration: line-through;
  opacity: 0.75;*/
}

.strike:before {
  content: url('https://api.iconify.design/mdi:eye-off.svg?height=14');
  opacity: 0.4;
  padding-top: 3px;
  padding-right: 2px;
}

.protection {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 75%;
  margin-bottom: -5px;
  padding-left: 5px;
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
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
}

div.posters_wrapper div.poster_card div.image div.shield {
  position: absolute;
  bottom: 0px;
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
