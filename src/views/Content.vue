<template>
  <div class="subpage">
    <my-header></my-header>
    <section class="wrapper" id="main">
      <div class="inner">
        <!-- 
        <header>
          <h2>Discover content</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </p>
        </header>
        -->
        <h4>Discover content</h4>

        <!-- SEARCH FIELDS -->
        <div width="100%">
          <v-row>
            <!-- Search by text -->
            <v-col cols="12" sm="12" md="6" lg="4" class="pb-0">
              <v-text-field
                type="search"
                id="searchBox"
                dense
                name="search"
                label="Type to find titles"
                v-model="title"
                autocomplete="off"
                prepend-inner-icon="mdi-magnify"
                clearable
                :hint="filteredList.length + ' results'"
                class="pa-0"
                @focus="$event.target.select()"
                @keyup.enter="getData()"
              >
                <div slot="append" hidden>
                  <v-btn color="success" icon @click="getData()"
                    ><v-icon> mdi-movie-search</v-icon></v-btn
                  >
                </div>
              </v-text-field>
              <!-- PROGRESS BAR FOR LOADING -->
              <div v-if="loading">
                <v-progress-linear indeterminate color="#4bae77"></v-progress-linear>
              </div>
            </v-col>

            <!-- SENSITIVITY -->
            <v-col cols="6" sm="6" md="3" lg="2">
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
                    block
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
                          <!--  cols="12" sm="6" md="4" -->
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
                      <v-btn
                        color="#6cc091"
                        id="vbtn1"
                        depressed
                        dark
                        @click="showFilters2 = false"
                        block
                        >Done</v-btn
                      >
                      <!--<v-spacer></v-spacer>
                      <span style="color:green; cursor:pointer" @click="showFilters2 = false"
                        >Done</span
                      >-->
                    </v-card-actions>
                  </v-card>
                </div>
              </v-menu></v-col
            >

            <!-- SEARCH REFINEMENTS -->
            <v-col cols="6" sm="6" md="3" lg="2">
              <v-menu
                bottom
                offset-y
                :close-on-content-click="false"
                v-model="showFilters3"
                style="z-index:999"
                max-width="350px"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    id="vbtn1"
                    block
                    color="#6cc091"
                    dark
                    v-on="on"
                    depressed
                    style="z-index:999; border-style: none"
                  >
                    <v-icon>mdi-filter</v-icon>Refine
                  </v-btn>
                </template>
                <div>
                  <v-card>
                    <v-card-text>
                      <v-row align="center" class="mt-2">
                        <v-col cols="12" md="12">
                          <v-autocomplete
                            deletable-chips
                            hide-details=""
                            id="vselect"
                            v-model="genres"
                            :items="availableGenres"
                            :menu-props="{ maxHeight: '250' }"
                            label="Filter by Genre"
                            multiple
                            chips
                            persistent-hint
                            dense
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="12">
                          <v-select
                            deletable-chips
                            hide-details=""
                            id="vselect"
                            v-model="providers"
                            chips
                            :items="providersList"
                            :menu-props="{ maxHeight: '250' }"
                            label="Filter by provider"
                            multiple
                            persistent-hint
                            dense
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="6" class="pt-1">
                          <v-checkbox v-model="cleanOnly" hide-details="">
                            <div slot="label">
                              Show only clean movies
                              <v-icon color="green">mdi-content-cut</v-icon> |
                              <v-icon color="green">mdi-emoticon-happy</v-icon>
                            </div>
                          </v-checkbox>
                        </v-col>

                        <v-col cols="12" md="6" class="pb-0">
                          <v-checkbox v-model="certifiedOnly" hide-details="">
                            <div slot="label">
                              Show only Ohana certified movies
                              <v-icon color="blue">mdi-content-cut</v-icon>
                              | <v-icon color="blue">mdi-emoticon-happy</v-icon>
                            </div>
                          </v-checkbox>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        color="#6cc091"
                        id="vbtn1"
                        depressed
                        dark
                        @click="showFilters3 = false"
                        block
                        >Done</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </div>
              </v-menu>
            </v-col>
          </v-row>
        </div>
        <!-- SEARCH BUTTON - ->
        <div>
          <v-row>
            <v-col cols="12" sm="12" md="6" lg="4">
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
        </div>
        -->

        <!-- MOVIES / SHOWS tabs -->
        <div>
          <v-row align="left" style="margin-left:auto; margin-right: auto; margin-top: 15px">
            <v-col class="pa-0">
              <b style="font-size: 90%">Type:</b>
              <v-chip
                dense
                small
                class="ma-1"
                @click="type = 'movie'"
                :class="{ chipdown: type == 'movie' }"
              >
                <span v-if="!loading"> Movies: {{ movies.length }}</span>
                <span v-else>
                  Movies:
                  <v-progress-circular
                    :size="10"
                    :width="1"
                    indeterminate
                    color="primary"
                  ></v-progress-circular> </span
              ></v-chip>
              <v-chip
                dense
                small
                class="ma-1"
                @click="type = 'show'"
                :class="{ chipdown: type == 'show' }"
                ><span v-if="!loading">Shows: {{ shows.length }}</span>
                <span v-else
                  >Shows:
                  <v-progress-circular
                    :size="10"
                    :width="1"
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </span>
              </v-chip>
            </v-col>
          </v-row>
        </div>
        <!--
        <div id="typeContent">
          <br />
          <p style="margin-bottom:0px">
            <span style="text-decoration:underline; cursor:pointer" @click="type = 'movie'"
              >Movies ({{ movies.length }})</span
            >
            |
            <span style="text-decoration:underline;cursor:pointer" @click="type = 'show'"
              >Series ({{ shows.length }})</span
            >
          </p>
        </div>
        -->

        <div>
          <v-row
            align="left"
            style="overflow-x: auto;  white-space: nowrap; margin-left:auto; margin-right: auto; margin-top: 15px"
          >
            <v-col class="pa-0">
              <b style="font-size: 90%">Filtering:</b>
              <div v-if="skipTags.length > 0" style="display:inline;">
                <v-chip
                  class="ma-1"
                  small
                  dense
                  v-for="(item, k) in statsRecap"
                  :key="k"
                  @click="
                    statusFilter.includes(k)
                      ? (statusFilter = statusFilter.filter(x => x != k))
                      : statusFilter.push(k)
                  "
                  :class="{ chipdown: statusFilter.includes(k) }"
                >
                  <v-icon left small :color="item.color">{{ item.icon }}</v-icon>
                  <b v-if="!loading">{{ item.count }}</b>
                  <v-progress-circular
                    v-else
                    :size="10"
                    :width="1"
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-chip>
              </div>
              <v-chip class="ma-1" small dense outlined @click="showFilters2 = true"
                >{{ skipTags.length > 0 ? 'Change' : 'Add' }} your sensitivity</v-chip
              >
            </v-col>
          </v-row>
        </div>

        <!-- POSTERS -->

        <div class="posters_wrapper" id="infinite-list">
          <div class="poster_card" v-for="(item, index) in filteredList" :key="index">
            <div class="image" style="width:100%">
              <!-- poster_path -->
              <img :src="item.poster" :alt="item.title" />

              <div class="shield" v-if="getShieldIcon(item) != 'none'">
                <v-icon :color="getShieldColor(item)" width="60px">
                  {{ getShieldIcon(item) }}
                </v-icon>
              </div>
            </div>
            <div class="content">
              <p style="font-size:16px; line-height:normal">{{ item.title }}</p>

              <p>
                <a v-if="item.watch_url" target="_blanck" :href="item.watch_url"
                  >Watch on {{ getProvider(item.watch_url) }}</a
                >
              </p>
              <p
                v-for="(cs, index) in Object.keys(getSkipScenes(item))"
                :key="index"
                :style="{
                  color: cs == 'pending' ? 'red' : cs == 'safe' ? 'green' : 'yellow',
                  lineHeight: 'normal',
                  fontSize: '13px'
                }"
              >
                <span style="text-transform: capitalize">{{ cs }}:</span>
                {{ getSkipScenes(item)[cs].join(', ') }}
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
//const { searchMatch } = require('../sharedjs')
export default {
  data() {
    return {
      data: [],
      loading: true,
      fetchedAt: '', //aux variable to make sure we refresh data with latest getData() request, not last arriving (async)
      page: 1,
      finishLoading: false,
      showFilters: false,
      showFilters2: false,
      showFilters3: false,

      statusFilter: [],

      providersList: [
        { text: 'Netflix', value: 'netflix' },
        { text: 'HBO', value: 'hbo' },
        { text: 'Movistar', value: 'movistar' },
        { text: 'Disney Plus', value: 'disneyplus' },
        { text: 'Rakuten', value: 'rakuten' }
      ],

      certifiedOnly: false,
      cleanOnly: false,
      sexSlider: 2,
      vioSlider: 2,
      profSlider: 2,
      title: '',
      titleTimeout: null,

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
        'Western'
      ]
    }
  },
  watch: {
    skipTags() {
      this.updateLocalStorage()
    },
    providers() {
      this.getData()
    },
    genres() {
      this.getData()
    },
    cleanOnly() {
      this.getData()
    },
    certifiedOnly() {
      this.getData()
    },
    title() {
      clearTimeout(this.titleTimeout)
      this.titleTimeout = setTimeout(() => {
        this.getData()
      }, 900)
    }
  },
  computed: {
    statsRecap() {
      //Summary of the status by "status" (or icon). This populates the chips with the icons.
      let output = {
        clean_certified: { count: 0, icon: 'mdi-emoticon-happy', color: 'blue' },
        cut_certified: { count: 0, icon: 'mdi-content-cut', color: 'blue' },
        clean_not_certified: { count: 0, icon: 'mdi-emoticon-happy', color: 'green' },
        cut_not_certified: { count: 0, icon: 'mdi-content-cut', color: 'green' },
        missing: { count: 0, icon: 'mdi-flag-variant', color: 'red' },
        unknown: { count: 0, icon: 'mdi-progress-question', color: 'gray' }
      }
      for (let item of this.items) {
        let tags_count = 0
        let all_done = true //default
        let missing = false //default
        for (let tag of this.skipTags) {
          tags_count += item.tags_count ? (item.tags_count[tag] ? item.tags_count[tag] : 0) : 0
          if (!item.tags_done.includes(tag)) all_done = false
          if (item.tags_missing.includes(tag)) missing = true
        }
        if (all_done) {
          if (tags_count > 0 && item.tags_level > 5) output['cut_certified'].count++
          if (tags_count > 0 && item.tags_level <= 5) output['cut_not_certified'].count++
          if (tags_count == 0 && item.tags_level > 5) output['clean_certified'].count++
          if (tags_count == 0 && item.tags_level <= 5) output['clean_not_certified'].count++
        } else if (missing) {
          output['missing'].count++
        } else {
          output['unknown'].count++
        }
      }
      return output
    },

    skipTags() {
      var sex = rawTags.severities[0].slice(5 - this.sexSlider, 4)
      var vio = rawTags.severities[1].slice(5 - this.vioSlider, 4)
      var prof = rawTags.severities[2].slice(5 - this.profSlider, 4)
      var tags = [...sex, ...vio, ...prof]
      return tags
    },

    filteredList() {
      var xx = []
      this.items.forEach(item => {
        //TODO: Make this more efficient. It's too slow.

        let icon = this.getShieldIcon(item)
        let color = this.getShieldColor(item)

        let add = false
        if (this.statusFilter.length == 0) add = true //show everything
        for (let status of this.statusFilter) {
          if (this.statsRecap[status].color == color && this.statsRecap[status].icon == icon) {
            add = true
          }
        }
        if (add) xx.push(item)
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
    getProvider(watchUrl) {
      let u = new URL(watchUrl)
      let h = u.hostname.replace('www.', '')
      if (h.includes('netflix')) return 'Netflix'
      if (h.includes('hbo')) return 'HBO'
      if (h.includes('movistar')) return 'Movistar'
      if (h.includes('primevideo')) return 'Prime Video'
      if (h.includes('disneyplus')) return 'Disney Plus'
      return h
    },
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
        this.sexSlider = xx.sexSlider
        this.vioSlider = xx.vioSlider
        this.profSlider = xx.profSlider
      }
    },
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
    getSkipScenes(item) {
      //returns JSON with {tagName: status}, only for the tags user cares.

      var taggedAux = {}

      var skipTagsR = [...this.skipTags].reverse() //reverse to show severe first
      skipTagsR.forEach(st => {
        let label = st

        //missing
        if (item.tags_missing.includes(st)) {
          if (!taggedAux.pending) taggedAux.pending = []
          taggedAux.pending.push(label)
          //done
        } else if (item.tags_done.includes(st)) {
          if (!taggedAux.safe) taggedAux.safe = []
          label += ' (' + (item.tags_count[st] > 0 ? item.tags_count[st] : 0) + ')'
          taggedAux.safe.push(label)
          //unknown
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

      //count scenes for user skipTags
      if (this.skipTags.length == 0) return 'none'
      let scenesCount = 0
      try {
        for (let i = 0; i < this.skipTags.length; i++) {
          const st = this.skipTags[i]
          if (Object.keys(item.tags_count).includes(st)) scenesCount += item.tags_count[st]
        }
      } catch (error) {
        scenesCount = 1 // when "tags_count: null"
      }

      //pick the right icon
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
      // If EVERY skipTags is included in tags_done.done
      if (this.skipTags.every(x => item.tags_done.includes(x))) {
        return 'protected'
      }

      // If ANY skipTags is included in tags_missing
      if (this.skipTags.some(x => item.tags_missing.includes(x))) {
        return 'missing'
      }

      // Otherwise
      return 'unknown'
    },

    listType(type) {
      var auxx = []
      this.data.forEach(e => {
        //TODO: check if tagged content
        if (type == 'movie') {
          if (e.type == 'movie') auxx.push(e)
        }
        if (type == 'show') {
          if (e.type != 'movie') auxx.push(e)
        }
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

    getMoreData() {
      if (this.finishLoading || this.loading) return
      this.loading = true
      this.page += 1
      console.log('getMoreData ',this.page)
      this.getData(true)
    },

    getData(more) {
      this.loading = true

      if (!more) {
        console.log('first page')
        this.page = 1
        this.finishLoading = false
      }
      let fetchedAt = new Date()
      this.fetchedAt = fetchedAt

      var url = this.buildURL({
        action: 'findMovies',
        title: this.title ? this.title : '',
        tagged: this.cleanOnly ? JSON.stringify(this.skipTags) : '[]',
        providers: JSON.stringify(this.providers),
        certified: this.certifiedOnly ? 6 : 0,
        genres: JSON.stringify(this.genres),
        type: this.type,
        page: this.page
      })

      fetch(url)
        .then(r => r.json())
        .then(data => {
          console.log('[getData] ', this.page, fetchedAt)
          if (fetchedAt != this.fetchedAt) {
            console.log('[getData] old request. ignoring')
            return
          }
          if (this.page != 1) {
            console.log('pushing data ', data)
            if (data.length < 50) this.finishLoading = true
            this.data = [...this.data,...data]
            this.$forceUpdate();
            console.log('total data length',this.data.length)
          } else {
            console.log('setting data')
            this.data = data
          }
          this.loading = false
        })
    }
  },

  mounted() {
    this.loadLocalStorage()

    //load some data
    this.getData()

    // Detect when scrolled to bottom.
    const footer = document.querySelector('#footer')
    const body = document.getElementsByTagName('body')[0]
    body.onscroll = () => {
      let left = body.clientHeight - window.innerHeight - footer.clientHeight - window.scrollY
      if (left < 100) {
        this.getMoreData()
      }
    }
  }
}
</script>

<!-- <style scoped>-->
<style>
/* Note: i had to remove the "scoped" keyword after style to override the input styles*/

body {
  /* We need to limit the height and show a scrollbar
  height: 300px;*/
  overflow: auto;
}

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

/** autocomplete */
.v-menu__content {
  z-index: 999 !important;
}

.v-select__selections {
  display: flex !important;
}

.v-select__selections > input {
  all: initial !important;
}

.v-label {
  font-weight: normal !important;
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

/*.chipdown > span {
  color: white !important;
}*/
.chipdown {
  background-color: #9e9e9e !important; /*#9e9e9e !important;*/
  border-color: #9e9e9e !important;
  color: white !important;
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
  min-height: 250px;

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
  min-height: 200px;
}

div.posters_wrapper .image {
  width: 100%;
  min-height: 100%;
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
