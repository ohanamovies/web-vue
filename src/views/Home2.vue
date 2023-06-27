<template>
  <div class="home">
    <!-- Header -->

    <!-- settings dialog -->
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
          <Settings2 :dialog="true" :page="0" style="margin-top: 0px; background-color: white" />
        </v-card-text>
        <v-card-actions style="border-top: 1px solid gray"
          ><!--style="background-color: #141414; color: white"-->
          <span
            >{{ $t('ohana_tv_experience_will') }}
            <span @click="show_welcomeTour = true" class="modern-link" style="white-space: nowrap">
              {{ $t('see_tour') }}</span
            ></span
          >
          <v-spacer></v-spacer>
          <span @click="dialog_lang = true" class="modern-link">
            {{ $t('language') }}:
            {{ settings.language ? settings.language.toUpperCase() : 'Loading' }}
          </span>
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
      max-width="650"
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
        @updated="getAllData(true)"
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
          <v-btn depressed @click="dialog_sensitivity = false">{{ $t('done') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- nav bar  -->
    <div v-if="true" class="sticky1">
      <div class="sticky2">
        <!-- logo -->
        <div v-if="!isMobile" style="font-size: 20px; cursor: pointer; white-space: nowrap">
          Ohana TV
        </div>
        <div v-else style="font-size: 16px; cursor: pointer; white-space: nowrap">Ohana TV</div>

        <!--search-->
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

        <!-- menu -->
        <Navigation />

        <div v-if="false">
          <div>
            <router-link to="/about" style="color: white; text-decoration: none">
              <v-icon style="color: white" v-if="isMobile">mdi-information-outline</v-icon>
              <span v-else>{{ $t('about') }} </span>
            </router-link>
          </div>
          <div>
            <div
              @click="show_settings = !show_settings"
              style="color: white; text-decoration: none; cursor: pointer"
            >
              <v-icon style="color: white" v-if="isMobile">mdi-account-cog-outline</v-icon>
              <span v-else>{{ $t('settings') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Banner -->
    <section
      v-show="!title"
      class="banner home-background"
      style="min-height: 10vh !important; z-index: 99998; padding: 7em 0 3em 0 !important"
    >
      <div class="inner" style="border: none; padding: 0px !important">
        <h1 class="fadeInUp" style="margin-bottom: 5px">
          {{ $t('homeHeroText1') }}
        </h1>
        <p style="color: white" class="fadeIn">
          {{ $t('homeHeroText2') }}
        </p>

        <!--<div class="fadeInDown">
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
        </div>-->
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

        <!-- testing with settings tags at the top of the Home page -->
        <div
          v-if="false"
          style="display: flex; overflow-x: auto; justify-content: center; flex-wrap: wrap"
        >
          <div
            v-for="(t, index) of [
              'Sex/Nudity: Moderate',
              'Violence: Severe',
              'Profanity: Disabled',
              'Learn more',
            ]"
            :key="index"
          >
            <v-chip small class="mx-1" :outlined="index > 1" dark :color="index == 3 ? 'blue' : ''">
              {{ t }}
              <v-icon v-if="index != 3">mdi-chevron-down</v-icon>
            </v-chip>
          </div>
        </div>

        <div v-for="(section, index) in sections" :key="index" style="max-width: 90%; margin: auto">
          <div
            v-show="
              (title && index == 0) ||
              (!title && index != 0 && (visibleLength(section) > 0 || section.loading !== false))
            "
            :data-id="index"
          >
            <h4 style="color: white; margin: 0; padding-top: 20px">{{ section.title }}</h4>

            <!-- POSTERS -->
            <div
              style="position: relative"
              v-show="visibleLength(section) > 0 || section.finishLoading"
            >
              <!-- arrow left -->
              <div
                v-show="visibleLength(section) > 1 && !isMobile"
                class="arrow-box left"
                @click="scrollLeft($event.target.nextSibling)"
              >
                <div
                  class="arrow-left"
                  @click.stop="scrollLeft($event.target.parentNode.nextSibling)"
                ></div>
              </div>
              <!-- posters -->
              <div v-show="visibleLength(section) > 0" class="posters_wrapper2">
                <div
                  class="poster"
                  v-for="(item, index2) in section.data"
                  v-show="!item.hidden"
                  :key="index2"
                  @click="openMovieDialog(item)"
                  :style="{
                    borderBottom: '4px solid ' + item.status.color,
                  }"
                >
                  <!-- image-->
                  <div class="image" style="width: 100%; cursor: pointer">
                    <img
                      :src="poster(item)"
                      :alt="getTitle(item)"
                      loading="lazy"
                      :class="[item.status.status == 'missing' ? 'blur_image' : '']"
                    />
                    <div class="shield">
                      <v-icon v-if="item.status.vIcon" :color="item.status.vColor" size="18">
                        {{ item.status.vIcon }}
                      </v-icon>
                      <v-icon v-if="item.status.use_icon" :color="item.status.color" size="18">
                        {{ item.status.icon }}
                      </v-icon>
                    </div>
                  </div>
                  <!-- text -->
                  <div
                    class="placeholder-title"
                    v-if="
                      item.status.status == 'missing' ||
                      poster(item) == 'https://ohana.tv/images/empty-poster.png'
                    "
                  >
                    <span>{{ getTitle(item) }}</span>
                    <span class="subtitle">{{ getYear(item) }}</span>
                  </div>
                </div>
              </div>

              <!-- arrow right -->
              <div
                v-show="visibleLength(section) > 1 && !isMobile"
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
                (section.data ? visibleLength(section) == 0 : true)
              "
              class="posters_wrapper2"
            >
              <div class="poster" v-for="n in 10" :key="n">
                <div class="image" style="width: 100%">
                  <img src="/images/empty-poster.png" class="waiting" alt="loading" />
                </div>
              </div>
            </div>
            <!-- POSTERS (loading placeholder) -->

            <div v-show="index == 0 && !section.loading && !visibleLength(section)">
              <div style="color: white; margin: auto">
                {{ $t('no_titles_found_matching_settings') }}
              </div>
            </div>
          </div>
        </div>

        <!-- Explain icons -->
        <div
          v-if="title && (visibleLength(sections[0]) || sections[0].loading)"
          class="card"
          style="
            padding: 20px;
            margin: 90px auto 20px auto;
            width: 80%;
            font-size: 14px;
            color: white;
            background: #333;
          "
        >
          <div v-html="$t('icons_explained')"></div>
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
import tags_excel from '@/assets/ohana/tags_excel'
import sharedjs from '@/sharedjs'
import ohana from '@/assets/ohana'
import { mapState } from 'vuex'
import MoviePopup from '../components/MoviePopup/MoviePopup.vue'

import WelcomeTour from '@/components/Settings/WelcomeTour.vue'
import Settings2 from '@/components/Settings/Settings2.vue'
import LanguageSelect from '@/components/Settings/LanguageSelect.vue'
//import Sensitivity from '@/components/Settings/Sensitivity.vue'
import Tags2 from '@/components/Settings/Tags2.vue'
import Navigation from '@/components/Navigation.vue'

export default {
  components: {
    WelcomeTour,
    MoviePopup,
    Settings2,
    //Sensitivity,
    Tags2,
    LanguageSelect,
    Navigation,
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
      pageSize: 25,

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
      if (!this.title) window.location.hash = ''
      this.sections[0].loading = true // Show loading placeholders
      this.sections[0].data = [] // Clean results
      this.sections[0].tries = 0
      clearTimeout(this.titleTimeout)
      this.titleTimeout = setTimeout(() => {
        // Override loading and finishLoading (to force loading even if already loading)
        this.sections[0].finishLoading = false
        this.sections[0].loading = false
        this.getData(0)
      }, 200)
    },
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings']),
    language() {
      return this.settings.language
    },
    sections() {
      const sectionsAux = tags_excel.getTagsLocal(this.settings.language).sections
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
    skipTags() {
      return this.$store.state.settings.skip_tags || []
    },
  },
  methods: {
    updateQuery(json) {
      if (!json) return (window.location.search = '')
      if (typeof json !== 'string') json = JSON.stringify(json)
      let searchParams = new URLSearchParams(window.location.search)
      searchParams.set('q', json)
      window.location.search = searchParams.toString()
    },
    visibleLength(section) {
      return section.data.filter((x) => !x.hidden).length
    },
    status(item) {
      //TODO: we can use something like this instead of item.status to ensure things are reactive, but maybe too much computing cost...
      console.log('getting status: ', item)
      item.status = ohana.movies.getMovieHealth(item, this.skipTags)
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
    getYear(item) {
      if (!item || !item.released) return
      return '(' + item.released + ')'
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
    async getAllData(resetSections = false) {
      console.log('[getAllData] ')
      for (var i = 1; i < this.sections.length; i++) {
        this.getData(i, resetSections)
        await this.sleep(500)
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
        if (this.title == 'most popular' || this.title == 'suggested reviews') {
          query.sort_by = 'popularity'
          delete query.title
        } else {
          delete query.sort_by
          query.title = this.title
        }
      } else {
        let homeSkipTags = [...this.skipTags]
        if (!homeSkipTags.includes('Very erotic')) homeSkipTags.push('Very erotic')
        query.clean = JSON.stringify(homeSkipTags)
      }

      /*
      //remove series for now, unless specified otherwise:
      if (!query.type) query.type = 'movie' //TODO: Remove this once we clarify series!
      */

      //Preapare request a bit (stringify stuff)
      for (const key in query) {
        if (Array.isArray(query[key])) query[key] = JSON.stringify(query[key])
        if (typeof query[key] == 'object') query[key] = JSON.stringify(query[key])
      }
      // Fetch data
      var url = ohana.utils.buildURL(query)
      let res = await fetch(url)
      if (!res.ok) {
        console.log('[alex] error loading section ' + index)
        section.loading = false
        console.log('retrying index ' + index)
        setTimeout(() => {
          this.getData(index) //retry, no forcing
        }, (Math.floor(Math.random() * index) + 3) * 1000)
        return
      }
      let data = await res.json()

      // Ignore results from deprecated search queries
      if (index == 0 && query.title && query.title != this.title)
        return console.log('ignoring results', query.title, this.title)

      if (index == 0 && query.title) {
        window.location.hash = encodeURI('#' + query.title.trim().replaceAll(' ', '-'))
        //this.updateQuery({ title: query.title })
      }

      // Mark loading as finished (when result length is shorter than page size)
      if (data.length < this.pageSize) section.finishLoading = true

      // Do some data formatting and push to data array
      let ids = section.data.map((x) => x.imdb)
      for (var i = 0; i < data.length; i++) {
        data[i].status = ohana.movies.getMovieHealth(data[i], this.skipTags)

        // Hide adult content from search
        if (index == 0) {
          data[i].hidden = ohana.movies.isAdult(data[i])
        }

        // Hide "ugly" content from popular
        if (index == 2) {
          data[i].hidden =
            ['tt0314331', 'tt4593126'].includes(data[i].imdb) ||
            ohana.movies.isUgly(data[i]) ||
            data[i].status.status == 'missing'
        }

        // Hide healthy movies from suggested reviews
        if (this.title == 'suggested reviews') {
          data[i].hidden = data[i].hidden || ohana.movies.isHealthy(data[i].status)
        }

        // Hide duplicated items (cache sometimes mess things up a bit)
        if (ids.includes(data[i].imdb)) data[i].hidden = true

        // Warn we are hidding data, to support devs mental health
        if (data[i].hidden)
          console.warn('Hidding movie: ', section.title, data[i].title, data[i].plot, data[i])
      }
      section.data = [...section.data, ...data]

      console.log(section.data)
      this.$forceUpdate()
      section.loading = false
      section.tries = 0
    },
  },

  mounted() {
    // 0ms timeout required so that settings are mapped...
    setTimeout(() => {
      // User location hash as search query (usefull for links :)
      if (window.location.hash) {
        this.title = decodeURI(window.location.hash.replace('#', '').replaceAll('-', ' '))
      }

      // If user just install the extension, show welcome tour
      if (this.$route.redirectedFrom == '/extension/welcome') {
        this.show_welcomeTour = true
        return
      }

      //Ask for settings if no settings
      if (this.skipTags && this.skipTags.length == 0 && !this.settings.web_tour) {
        this.show_welcomeTour = true
        return
      } else {
        this.getAllData()
      }

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
    }, 0)
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

.subtitle {
  display: block;
  font-size: smaller;
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

.sticky1 {
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99999;
  backdrop-filter: blur(10px);
}

.sticky2 {
  color: white !important;
  display: flex;
  justify-content: space-between;
  max-width: 1200px;

  padding: 0 5px;

  background-color: transparent;
  z-index: 99998;

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
