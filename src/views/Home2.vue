<template>
  <div class="home">
    <!-- Header -->

    <!--Settings dialog -->
    <v-dialog
      v-model="show_settings"
      max-width="600"
      min-width="0"
      scrollable
      style="z-index: 999999; background-color: white"
      :fullscreen="isMobile"
    >
      <v-card max-height="700px">
        <div style="position: relative">
          <v-btn
            icon
            @click="show_settings = false"
            :style="{
              position: isMobile ? 'fixed' : 'absolute',
              top: '5px',
              backgroundColor: 'white',

              right: '10px',
              zIndex: '999999',
              boxShadow: 'none',
            }"
            ><v-icon style="cursor: pointer">mdi-close</v-icon></v-btn
          >
        </div>
        <v-card-text class="pa-1 pt-0">
          <Settings2 :page="0" style="margin-top: 0px; background-color: white" />
        </v-card-text>
        <v-card-actions style="border-top: 1px solid gray"
          ><!--style="background-color: #141414; color: white"-->
          <span
            >Ohana TV experience will adjust to your settings.
            <span @click="show_welcomeTour = true" class="modern-link" style="white-space: nowrap">
              See tour</span
            ></span
          >
          <v-spacer></v-spacer>
          <v-btn max-width="30" @click="dialog_lang = true" text>{{ settings.language }}</v-btn>
          <!-- <LanguageSelect style="max-width: 250px" /> -->
        </v-card-actions>
      </v-card>

      <v-dialog v-model="dialog_lang" max-width="300">
        <v-card>
          <v-card-title></v-card-title>
          <v-card-text>
            <LanguageSelect style="max-width: 250px" />
          </v-card-text>
        </v-card>
      </v-dialog>
      <div
        v-if="false"
        :style="{
          backgroundColor: 'white',
          padding: '5px',
          minHeight: isMobile ? '100vh' : '',
          maxHeight: isMobile ? '' : '700px',
        }"
      >
        <div style="position: relative">
          <v-btn
            icon
            @click="show_settings = false"
            :style="{
              position: isMobile ? 'fixed' : 'absolute',
              top: '4px',
              right: '4px',
              zIndex: '999999',
            }"
            ><v-icon>mdi-close</v-icon></v-btn
          >
        </div>
        <settings2 style="margin-top: 20px; background-color: white" />
      </div>
    </v-dialog>

    <!-- Welcome Tour dialog -->
    <v-dialog
      eager
      transition="dialog-bottom-transition"
      v-model="show_welcomeTour"
      max-width="600"
      min-width="0"
      style="z-index: 999999"
      overlay-color="#141414"
      overlay-opacity="10"
      :fullscreen="isMobile"
      scrollable
      persistent
    >
      <WelcomeTour
        @exit="
          show_welcomeTour = false
          settingsPage = 0
        "
        :page="settingsPage"
      />
    </v-dialog>

    <!-- Sensitivity dialog -->
    <v-dialog
      v-model="dialog_sensitivity"
      :fullscreen="isMobile"
      scrollable
      max-width="500"
      style="z-index: 999999"
    >
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          <Tags2 />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed @click="dialog_sensitivity = false">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- nav bar  -->
    <div class="sticky2" style="z-index: 99999">
      <div
        v-if="!isMobile"
        style="margin: auto auto auto 48%; font-size: 24px; white-space: nowrap"
      >
        Ohana TV
      </div>

      <div v-else style="margin: auto auto auto 5px; white-space: nowrap">Ohana TV</div>
      <div>
        <v-text-field
          outlined
          dark
          id="searchBox"
          dense
          single-line
          label="Search by title"
          v-model="title"
          autocomplete="off"
          prepend-inner-icon="mdi-magnify"
          hide-details
          clearable
          @focus="$event.target.select()"
        >
        </v-text-field>
      </div>
      <div>
        <router-link to="/about2" style="color: white; text-decoration: none">
          <v-icon style="color: white" v-if="isMobile">mdi-information-outline</v-icon>
          <span v-else>About </span>
        </router-link>
      </div>
      <div>
        <div
          @click="show_settings = !show_settings"
          style="color: white; text-decoration: none; cursor: pointer"
        >
          <v-icon style="color: white" v-if="isMobile">mdi-account-cog-outline</v-icon>
          <span v-else>Settings</span>
        </div>
      </div>
    </div>

    <!-- Banner -->
    <section
      v-show="!title"
      class="banner home-background"
      style="min-height: 20vh !important; z-index: 99998"
    >
      <div class="inner" style="border: none; padding: 0px !important">
        <h1 class="fadeInUp" style="margin-bottom: 5px">
          {{ $t('homeHeroText1') }}
        </h1>
        <p style="color: white" class="fadeIn">
          {{ $t('homeHeroText2') }}
        </p>

        <div class="fadeInDown">
          <div v-if="isChrome && !hasApp">
            <a
              href="https://chrome.google.com/webstore/detail/family-cinema/nfkbclgkdifmoidnkapblfipbdkcppcf"
              class="btn"
              target="_blank"
              >{{ $t('install') }}</a
            >
            <router-link to="about" class="btn">{{ $t('learnMore') }}</router-link>
          </div>
          <div v-if="hasApp">
            <router-link to="community" class="btn">{{ $t('support_ohana') }}</router-link>
            <router-link to="about" class="btn">{{ $t('learnMore') }}</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- black header bar, to keep sticky bar visibile -->
    <div
      class="stickybar"
      style="
        padding: 25px;
        background-color: #141414;
        top: 0;
        position: fixed;
        width: 100%;
        z-index: 99997;
      "
    ></div>

    <!-- Posters -->
    <section id="posters">
      <div class="inner">
        <!-- results based on -->
        <div v-if="!title" class="resultsBasedOn">
          <p style="margin: auto">
            {{ $t('resultsBasedOn')[0] }}
            <span class="modern-link" style="font-size: 100%" @click="show_settings = true">
              {{ $t('resultsBasedOn')[1] }}</span
            >
          </p>
        </div>

        <div v-else style="padding-top: 50px"></div>

        <div v-for="(section, index) in sections" :key="index" style="max-width: 90%; margin: auto">
          <div
            v-show="
              (title && index == 0) ||
              (!title && index != 0 && (section.data.length > 0 || section.loading))
            "
            :data-id="index"
          >
            <h4 style="color: white; margin: 0; padding-top: 20px">{{ section.title }}</h4>

            <!-- POSTERS -->
            <div
              style="position: relative"
              v-show="section.data.length > 0 || section.finishLoading"
            >
              <!-- arrow left -->
              <div
                v-show="section.data.length > 1 && !isMobile"
                class="arrow-box left"
                @click="scrollLeft($event.target.nextSibling)"
              >
                <div
                  class="arrow-left"
                  @click.stop="scrollLeft($event.target.parentNode.nextSibling)"
                ></div>
              </div>
              <!-- posters -->
              <div v-show="section.data.length > 0" class="posters_wrapper2">
                <div
                  class="poster"
                  v-for="(item, index2) in section.data"
                  :key="index2"
                  @click="openMovieDialog(item)"
                  :style="{
                    borderBottom: '4px solid ' + item.join_status.color,
                  }"
                >
                  <!-- image-->
                  <div class="image" style="width: 100%; cursor: pointer">
                    <img
                      :src="poster(item)"
                      :alt="getTitle(item)"
                      :class="[item.join_status.status == 'missing' ? 'blur_image' : '']"
                    />
                    <div
                      class="shield"
                      v-if="item.join_status.icon && item.join_status.icon != 'none'"
                    >
                      <v-icon :color="item.join_status.color" size="18">
                        {{ item.join_status.icon }}
                      </v-icon>
                    </div>
                  </div>
                  <!-- text -->
                  <div class="placeholder-title" v-if="item.join_status.status == 'missing'">
                    <span>{{ getTitle(item) }}</span>
                  </div>
                </div>
              </div>

              <!-- arrow right -->
              <div
                v-show="section.data.length > 1 && !isMobile"
                class="arrow-box right"
                @click="scrollRight($event.target.previousSibling)"
              >
                <div
                  class="arrow-right"
                  @click.stop="scrollRight($event.target.parentNode.previousSibling)"
                ></div>
              </div>
            </div>

            <!-- posters placeholder -->
            <div
              v-show="
                (section.loading == false ? false : true) &&
                (section.data ? section.data.length == 0 : true)
              "
              class="posters_wrapper2"
            >
              <div class="poster" v-for="n in 10" :key="n">
                <div class="image" style="width: 100%">
                  <img src="/images/empty-poster.png" class="waiting" alt="loading" />
                </div>
              </div>
            </div>

            <div style="color: white">
              <div v-if="index == 1 && skipTags.length == 0">
                Define your

                <span class="modern-link" style="font-size: 100%" @click="show_settings = true">
                  settings</span
                >
                to see this section.
              </div>
              <div v-else-if="section.finishLoading && section.data.length == 0">
                <div style="color: white; margin: auto">
                  No titles found matching your settings.
                </div>
              </div>
            </div>
            <!-- POSTERS (loading placeholder) -->

            <div v-show="index == 0 && !section.loading && !section.data.length">
              <div style="color: white; margin: auto">No titles found matching your search.</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <v-dialog
      v-model="showMovieDialog"
      scrollable
      width="750"
      :style="{ marginTop: isMobile ? '40px' : '0px', zIndex: 99999999999998 }"
    >
      <MoviePopup :imdb="selectedItemInfo.imdb" @close="showMovieDialog = false" />
    </v-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import tags_excel from '@/assets/tags_excel'
import sharedjs from '@/sharedjs'
import ohana from '@/assets/ohana'
import { mapState } from 'vuex'
import MoviePopup from '../components/MoviePopup/MoviePopup.vue'

import WelcomeTour from '@/components/Settings/WelcomeTour.vue'
import Settings2 from '@/components/Settings/Settings2.vue'
import LanguageSelect from '@/components/Settings/LanguageSelect.vue'
//import Sensitivity from '@/components/Settings/Sensitivity.vue'
import Tags2 from '@/components/Settings/Tags2.vue'

export default {
  components: {
    WelcomeTour,
    MoviePopup,
    Settings2,
    //Sensitivity,
    Tags2,
    LanguageSelect,
  },

  head: function () {
    //This is used to generate the meta tags needed for better SEO and stuff.
    let title = 'Ohana TV'
    let desc = 'Watch movies and shows in a healthy way, thanks to our software and community.'
    return sharedjs.headObject(title, desc, '/')
  },

  data() {
    return {
      show_settings: false,
      show_welcomeTour: false,
      settingsPage: 0,
      dialog_sensitivity: false,
      dialog_lang: false, //dialog

      showMenu: false,
      mini: true,
      selectedItemInfo: {},
      showMovieDialog: false,

      showFilters: false,

      seeAllGenreChips: false,
      showSidebarFilters: true,
      pageSize: 50,

      statusFilter: [],

      providersList: [
        { text: 'Netflix', value: 'netflix' },
        { text: 'HBO', value: 'hboespana' },
        { text: 'Disney+', value: 'disneyplus' },
        { text: 'Prime Video', value: 'primevideo' },
        { text: 'Movistar', value: 'movistar' },
        /*{ text: 'Rakuten', value: 'rakuten' },
        { text: 'Youtube', value: 'youtube' },*/
      ],

      sections_old: [
        {
          title: 'Search results',
          data: [],
          query: {},
        },
        {
          title: 'Recently reviewed',
          data: [],
          query: { sort_by: 'last_edited' },
        },

        {
          title: 'Watch with kids',
          data: [],
          query: { genres: JSON.stringify(['Animation']) },
        },
        {
          title: 'Forgiveness',
          data: [],
          query: { values: JSON.stringify(['Forgiveness']) },
        },
        {
          title: 'Caring',
          data: [],
          query: { values: JSON.stringify(['Caring']) },
        },
        {
          title: 'Best rated',
          data: [],
          query: { imdbRating: 8 }, // sort is done by number of votes
        },
        /*
        {
          title: 'Healthy TV Shows (for your settings) ',
          data: [],
          query: { type: 'series', clean: JSON.stringify(this.skipTags) },
        },
        */
        {
          title: 'Documentaries',
          data: [],
          query: { genres: JSON.stringify(['Documentary']) },
        },

        {
          title: 'Classic movies',
          data: [],
          query: { releasedBefore: 1970 },
        },
      ],

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
        'Western',
      ],
    }
  },
  watch: {
    show_welcomeTour(newValue) {
      if (!newValue) {
        //tour closed

        this.getAllData(true)
      }
    },
    showMovieDialog(newValue) {
      if (!newValue) this.selectedItemInfo = {} //to avoid previus data still rendered while opening different movie
    },
    providers() {
      console.log('updated providers')
      this.getAllData(true)
    },
    show_settings(newValue) {
      if (!newValue) {
        console.log('closed settings')
        this.getAllData(true)
      }
    },
    skipTags() {
      //TODO: right changed to refresh when closing settings instead.
      //console.log('updated skipTags')
      //this.getAllData()
    },
    title() {
      this.sections[0].loading = true // Show loading placeholders
      this.sections[0].data = [] // Clean results
      this.sections[0].tries = 0
      clearTimeout(this.titleTimeout)
      this.titleTimeout = setTimeout(() => {
        // Override loading and finishLoading (to force loading even if already loading)
        this.sections[0].finishLoading = false
        this.sections[0].loading = false
        this.getData(0)
      }, 800)
    },
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings']),
    sections() {
      const sectionsAux = tags_excel.getTagsLocal('es').sections
      let sections = []
      for (let i = 0; i < sectionsAux.length; i++) {
        const s = sectionsAux[i]
        let x = {
          title: s.name,
          data: [],
          query: JSON.parse(s.mappings),
        }
        sections.push(x)
      }
      return sections //.splice(0, 5)
      //return tags_excel.adaptTags(s)
    },
    language() {
      return this.settings.language
    },
    skipTags() {
      return this.$store.state.settings.skip_tags || []
    },
  },
  methods: {
    joinStatus(item) {
      //TODO: we can use something like this instead of item.join_status to ensure things are reactive, but maybe too much computing cost...
      let i = { ...item }
      delete i.join_status
      i = ohana.movies.addInfo(i, this.skipTags)
      return i.join_status
    },
    scrollLeft(e) {
      e.scrollLeft -= e.offsetWidth - 140
    },
    scrollRight(e) {
      e.scrollLeft += e.offsetWidth - 140
    },
    poster(item) {
      //TODO: optimize poster size? (e.g.: w154)
      const emptyPoster = 'https://ohana.tv/images/empty-poster.png'
      //let item = this.item
      if (item.parentData) item = item.parentData
      if (!item || !item.poster) return emptyPoster

      let path = ''
      if (item.poster[this.language]) path = item.poster[this.language]
      else if (item.poster['en']) path = item.poster['en']
      if (path) return 'https://image.tmdb.org/t/p/w200' + path
      else return emptyPoster
    },
    getTitle(item) {
      if (!item || !item.title) return
      return item.title[this.language] || item.title['en'] || item.title['primary']
    },
    onClickOutsideNavDrawer() {
      if (this.isMobile && !this.mini) {
        this.mini = !this.mini
      }
    },
    openMovieDialog(item) {
      console.log('itemmmm: ', item)
      this.showMovieDialog = true
      this.selectedItemInfo = item
    },
    getAllData(resetSections = false) {
      console.log('[getAllData] ')
      for (var i = 1; i < this.sections.length; i++) {
        this.getData(i, resetSections)
      }
    },
    sleep(time) {
      console.log('sleeping here for ' + time + ' ms')
      return new Promise((resolve) => setTimeout(resolve, time))
    },

    async getData(index, resetSection = false) {
      console.log('getData', index)
      let section = this.sections[index]
      if (!section) return console.log('no section ', index)

      //cleaned only if user have settings
      if (index == 1 && this.skipTags.length == 0) {
        section.loading = false
        section.finishLoading = true
        return console.log('No settings to offer filtered content')
      }

      //reset means we remove all data and start over.
      if (resetSection) {
        section.data = []
        section.finishLoading = false
        section.tries = 0
      }

      if (!section.tries) section.tries = 0
      if (section.tries > 3) return console.log('tried too many times to reload section ' + index)

      await this.sleep(section.tries * 1000)
      section.tries++

      // Handle loading status (avoid loading multiple times)
      if (section.loading && !resetSection) return console.log('already loading index ' + index)
      if (section.finishLoading && !resetSection)
        return console.log(
          'already finished loading section ' + index + ' (no more pages for this section)'
        )
      section.loading = true

      // Build queries
      let query = section.query
      query.action = 'findMovies'
      //providers only when not searching for now //TODO: review
      if (index != 0) query.providers = JSON.stringify(this.settings.providers)
      query.page = Math.round(section.data.length / this.pageSize) + 1
      query.pageSize = this.pageSize
      query.newAPI = true
      // Add either title (index == 0) or tags we want to be clean
      if (index == 0) {
        query.title = this.title
      } else {
        query.clean = JSON.stringify(this.skipTags)
      }

      //remove series for now:
      query.type = 'movie' //TODO: Remove this once we clarify series!

      //Preapare request a bit (stringify stuff)
      for (const key in query) {
        if (Array.isArray(query[key])) query[key] = JSON.stringify(query[key])
        if (typeof query[key] == 'object') query[key] = JSON.stringify(query[key])
      }
      // Fetch data
      var url = ohana.utils.buildURL(query)
      fetch(url)
        .then((r) => {
          if (r.ok) {
            return r.json()
          } else {
            console.log('[alex] error loading section ' + index)
            return 'retry'
          }
        })
        .then((data) => {
          if (data == 'retry') {
            section.loading = false
            console.log('retrying index ' + index)
            this.getData(index) //retry, no forcing
            return
          }
          // Ignore results from deprecated search queries
          if (index == 0 && query.title != this.title)
            return console.log('ignoring results', query.title, this.title)

          // Mark loading as finished (when result length is shorter than page size)
          if (data.length < this.pageSize) section.finishLoading = true

          // Do some data formatting and push to data array
          for (var i = 0; i < data.length; i++) {
            ohana.movies.addInfo(data[i], this.skipTags)
          }

          const excludeFromHome = ['tt0314331'] //imdb ids of movies to explicitely hide from home (so only show when searched)
          data = data.filter((x) => {
            return index == 0 || !excludeFromHome.includes(x.imdb)
          })
          section.data = [...section.data, ...data]

          console.log(section.data)
          this.$forceUpdate()
          section.loading = false
          section.tries = 0
        })
        .catch((e) => {
          console.log('[alex] fetch error with ' + url, e)
          //TODO: retry?
        })
    },
  },
  created() {
    setTimeout(() => {
      //Ask for settings if no settings.
      console.log('[alex] home2 created')
      if (this.skipTags && this.skipTags.length == 0 && this.settings.username == '') {
        console.log('[alex] Showing welcome tour')
        this.show_welcomeTour = true
      } else {
        console.log('[alex] grr', this.skipTags, this.settings.username)
        this.getAllData()
      }
    }, 1000)
  },

  mounted() {
    //load some data
    if (this.skipTags && this.skipTags.length) this.getAllData()
    // Detect when scrolled to bottom.
    const wrappers = document.querySelectorAll('.posters_wrapper2')
    for (var i = 0; i < wrappers.length; i++) {
      wrappers[i].onscroll = (event) => {
        let target = event.target
        let remaining = target.scrollWidth - (target.scrollLeft + target.offsetWidth)
        if (remaining < 1000) {
          let id = target.parentElement.parentElement.dataset.id
          console.log('Scroll left:', remaining, '. Get data from: ', id)
          this.getData(id)
        }
      }
    }
  },
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

#searchBox {
  box-shadow: none;
  width: 100%;
  background: none;
  border: none;
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

/*.chipdown > span {
  color: white !important;
}*/
.chipdown {
  background-color: #6cc091 !important; /* #9e9e9e !important;*/ /*#9e9e9e !important;*/
  border-color: black !important;
  color: white !important;
}

.v-chip.v-size--default {
  min-width: 70px !important;
  font-size: 90% !important;
}

.v-chip__content {
  margin: auto;
}

#posters {
  background-color: #141414;
  min-height: 100vh;
}

#posters > .inner {
  /*max-width: 1050px;*/
  max-width: 1300px;
  margin: auto;
  padding-bottom: 80px;
}

div.posters_wrapper2 {
  display: flex;
  overflow: auto;
  white-space: nowrap;
  -ms-overflow-style: none; /* Hide scrollbar IE and Edge */
  scrollbar-width: none; /* Hide scrollbar Firefox */
  padding-top: 10px; /* we need some space to elevate the poster on hover */
  scroll-behavior: smooth;
}

/* Hide scrollbar for Chrome, Safari and Opera */
div.posters_wrapper2::-webkit-scrollbar {
  display: none;
}

div.posters_wrapper2 div.poster {
  margin: 5px;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  border-radius: 8px;
  overflow: hidden;
  max-width: 150px;
  min-width: 150px;
  max-height: 225px; /*it's important to fix height so screen doesn't shake when images come... */
  min-height: 225px;
  transition: top ease 0.4s;
}

@media only screen and (max-width: 400px) {
  /* smaller poster on mobile */
  div.posters_wrapper2 div.poster {
    max-width: 120px;
    min-width: 120px;
    max-height: 180px;
    min-height: 180px;
  }
}

div.posters_wrapper2 div.poster:hover {
  top: -5px; /* elevate the poster a bit on hover (this works best with transition property) */
}

div.posters_wrapper2 .image {
  width: 100%;
  min-height: 100%;
}

div.posters_wrapper2 .image > img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.blur_image {
  filter: blur(8px);
  -webkit-filter: blur(8px);
}

div.posters_wrapper2 div.poster div.content {
  width: 100%;
  padding: 26px 10px 12px 10px;
  position: relative;
  white-space: normal;
  /*display: flex;*/
  align-content: flex-start;
  flex-wrap: wrap;
  cursor: pointer;
}

.shield {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 35px;
  height: 35px;
  box-sizing: border-box;
  z-index: 99; /* make sure it stays on top of content*/
}

.shield i {
  background-color: white;
  border-radius: 25px;
  padding: 5px;
  margin: 3px;
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

.poster > .content {
  position: absolute !important;
  background: black;
  opacity: 0;
  height: 100%;
  font-size: 90%;
  color: white !important;
  z-index: 98;
}

.placeholder-title {
  position: absolute !important;
  font-size: 1.3rem !important;
  text-align: center;
  cursor: pointer;

  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  /*word-break: break-all;*/
  white-space: pre-wrap;
  padding: 50%;

  padding-left: 5px;
  padding-right: 5px;
  height: 100%;
  font-size: 90%;
  color: white !important;
  z-index: 98;
}

.filterr {
  margin-bottom: 10px;
  padding: 10px;
  border: solid lightgray 1px;
  border-radius: 5px;
  font-size: 12px;
}

div.sticky {
  position: -webkit-sticky !important;
  position: sticky !important;
  top: 0 !important;
  background-color: yellow;
  padding: 50px;
  font-size: 20px;
}

hr {
  margin: 1em 0;
}

.text1 {
  color: white;
}

#three * h3 {
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 10px;
}

/* BANNER - optimize image size a little bit */

.home-background {
  background-image: url('/images/banner-1500.jpg');
}

@media only screen and (max-width: 800px) {
  .home-background {
    background-image: url('/images/banner-800.jpg');
  }
}

@media only screen and (max-width: 600px) {
  .home-background {
    background-image: url('/images/banner-600.jpg');
  }
}

@media only screen and (max-width: 400px) {
  .home-background {
    background-image: url('/images/banner-400.jpg');
  }
}

.waiting {
  background-color: gray;
  animation-name: fading;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease;
}

@keyframes fading {
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.4;
  }
}

#homeSearchBox {
  box-shadow: none;
  width: 100%;
  background: none;
  border: none;
}

.sticky2 {
  color: white !important;
  display: flex;
  position: fixed;
  top: 0;
  padding: 0 5px;
  width: 100%;
  background-color: transparent;
  z-index: 99999;
  backdrop-filter: blur(10px);
  /*background-color: rgba(0, 0, 0, 0.05);*/
}

@media only screen and (max-width: 700px) {
  .sticky2 {
    backdrop-filter: blur(10px);
  }
}

.sticky2 > div {
  color: white;
  display: flex;
  padding: 4px;
  margin: auto 5px;
}

.sticky2 > div > span {
  padding: 0 5px;
}

.sticky2 > .v-icon.v-icon {
  font-size: 20px;
}

.btn {
  background: white;
  padding: 5px 10px;
  border-radius: 4px;
  margin: 10px;
  text-decoration: none;
  color: black !important;
}

.resultsBasedOn {
  width: 100%;
  display: flex;
  padding: 10px;
  color: white;
}

.banner:after {
  content: '';
  display: block;
  width: 100%;
  height: 50px;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  transform: translateY(-100%);
  background: linear-gradient(transparent, #141414);
  pointer-events: none;
}

.arrow-box {
  background-color: rgba(0, 0, 0, 0);
  position: absolute;

  top: 15px;
  cursor: pointer;
  height: calc(100% - 20px);
  padding: 0px;
  margin: auto;
  /*border: 1px solid white;*/
  width: 30px;
  z-index: 9999;
}
.arrow-box:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
.arrow-box .arrow.left {
  left: 0;
}

.arrow-box.right {
  right: 0;
}

.arrow-right,
.arrow-left {
  display: block;
  position: relative;
  top: calc(50% - 15px);

  /*margin: 30px auto;*/
  margin: auto;
  width: 15px;
  height: 15px;
  border-top: 4px solid rgba(255, 255, 255, 0.5);
  border-left: 4px solid rgba(255, 255, 255, 0.5);
}
.arrow-box:hover div {
  border-top: 4px solid rgba(255, 255, 255, 1);
  border-left: 4px solid rgba(255, 255, 255, 1);
}

.arrow-right {
  transform: rotate(135deg);
  right: calc(50% - 15px);
}
.arrow-left {
  transform: rotate(-45deg);
  left: calc(50% - 15px);
}
</style>
