<template>
  <div class="home">
    <!-- Header -->
    <!-- <my-header></my-header> -->

    <!-- Banner -->
    <section class="banner home-background" style="min-height: 20vh !important">
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
              class="button special"
              target="_blank"
              style="margin: 5px"
              >{{ $t('install') }}</a
            >
          </div>
          <div v-if="hasApp">
            <router-link to="community" class="button special">{{
              $t('support_ohana')
            }}</router-link>
          </div>

          <div v-else-if="!isChrome">
            <router-link to="get-started" class="button special">{{
              $t('getStarted')
            }}</router-link>
          </div>
        </div>
      </div>
    </section>

    <section id="posters">
      <div class="inner">
        <!--<div
          v-if="type === 'show'" class="warning"
          style="
            color: white;
            background-color: rgba(74, 74, 74, 0.5);
            border-radius: 5px;
            padding: 8px;
            margin-bottom: 10px;
            font-size: 80%;
            max-width: 500px;
          "
        >
          We are still working to make this page useful for shows (managing seasons, episodes...).
          Thanks for your patiente!
          <router-link style="color: rgb(4, 85, 186); font-weight: bold" to="/community"
            >Learn how you can help</router-link
          >
        </div>-->

        <v-dialog
          v-model="showMovieDialog"
          scrollable
          width="750"
          :style="{ marginTop: isMobile ? '40px' : '0px', zIndex: 99999999999998 }"
        >
          <movie-detail-page
            :selection="selectedItemInfo"
            @close="showMovieDialog = false"
          ></movie-detail-page>
        </v-dialog>

        <!-- Floating button to show/hide filters -->
        <!--<v-btn
          color="#6cc091"
          fab
          bottom
          right
          fixed
          dark
          @click="mini = !mini"
          style="z-index: 99999; cursor: pointer"
        >
          <!- - progress circle within the go-to-top button - ->
          <v-icon v-if="mini" color="white" style="cursor: pointer">mdi-tune</v-icon>
          <v-icon v-else color="white" style="cursor: pointer">mdi-thumb-up</v-icon>
          <!- - TODO: may use mdi-tune - ->
        </v-btn>-->

        <v-text-field
          outlined
          style="max-width: 400px"
          type="search"
          id="searchBox"
          dense
          name="search"
          label="Search by title"
          v-model="title"
          autocomplete="off"
          prepend-inner-icon="mdi-magnify"
          hide-details
          clearable
          class="pa-0 mb-2"
          @focus="$event.target.select()"
          @keyup.enter="getData()"
        >
          <div slot="append" hidden>
            <v-btn color="success" icon @click="getData()"
              ><v-icon> mdi-movie-search</v-icon></v-btn
            >
          </div>
        </v-text-field>

        <!-- search top - ->
        <div id="search-top" style="display: flex">
          <v-text-field
            outlined
            style="max-width: 400px"
            type="search"
            id="searchBox"
            dense
            name="search"
            label="Search by title"
            v-model="title"
            autocomplete="off"
            prepend-inner-icon="mdi-magnify"
            hide-details
            clearable
            class="pa-0 mb-2"
            @focus="$event.target.select()"
            @keyup.enter="getData()"
          >
            <div slot="append" hidden>
              <v-btn color="success" icon @click="getData()"
                ><v-icon> mdi-movie-search</v-icon></v-btn
              >
            </div>
          </v-text-field>

          <!- - advanced button more visible with search- ->
          <v-btn
            :icon="isMobile"
            :outlined="!isMobile"
            @click="mini = !mini"
            class="vbtn mt-1 ml-3"
            :width="isMobile ? '' : '130'"
          >
            <v-icon>mdi-tune</v-icon>
            {{ isMobile ? '' : 'advanced' }}
          </v-btn>
        </div>
        <p>
          {{ $t('resultsBasedOn')[0] }}
          <router-link to="/settings" class="modern-link" style="font-size: 100%">
            {{ $t('resultsBasedOn')[1] }}</router-link
          >
          {{ $t('resultsBasedOn')[2] }}
          <span @click="mini = !mini" class="modern-link" style="font-size: 100%">
            {{ $t('resultsBasedOn')[3] }}</span
          >
        </p>-->
        <div v-if="loading">
          <v-progress-linear indeterminate color="#4bae77"></v-progress-linear>
        </div>

        <div v-if="data.length == 0 && !loading">No {{ type }}s found matching your search.</div>

        <div v-for="(section, index) in sections" :key="index" style="max-width: 90%; margin: auto">
          <h4 style="color: white; margin: 0; padding-top: 20px">{{ section.title }}</h4>

          <!-- POSTERS -->
          <div class="posters_wrapper2">
            <div
              class="poster"
              v-for="(item, index) in bestMovies(index)"
              :key="index"
              @click="openMovieDialog(item)"
            >
              <!-- image-->
              <div class="image" style="width: 100%; cursor: pointer">
                <img
                  :src="getPoster(item)"
                  :alt="getTitle(item)"
                  :class="[item.join_status.status == 'missing' ? 'blur_image' : '']"
                />
                <div class="shield" v-if="getShieldIcon(item) != 'none'">
                  <v-icon :color="getShieldColor(item)" size="18">
                    {{ getShieldIcon(item) }}
                  </v-icon>
                </div>
              </div>
              <!-- text -->
              <div class="placeholder-title" v-if="item.join_status.status == 'missing'">
                <span>{{ item.title }}</span>
              </div>
              <div class="content" v-if="false"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import sharedjs from '@/sharedjs'
import ohana from '@/assets/ohana'
import { mapState } from 'vuex'
import MovieDetailPage from '../components/MovieDetailPage2'

export default {
  components: {
    MovieDetailPage,
  },

  head: function () {
    //This is used to generate the meta tags needed for better SEO and stuff.
    let title = 'Find something clean to watch - Ohana'
    let desc =
      'Browse throught hundreds of safe movies and tv shows, edited with love by our community'
    return sharedjs.headObject(title, desc)
  },

  data() {
    return {
      showMenu: false,
      mini: true,
      selectedItemInfo: {},
      showMovieDialog: false,

      showFilters: false,

      seeAllGenreChips: false,
      showSidebarFilters: true,

      data: [],
      loading: true,
      fetchedAt: '', //aux variable to make sure we refresh data with latest getData() request, not last arriving (async)
      page: 1,
      finishLoading: false,

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

      sections: [
        {
          title: 'Cleaned for you by Ohana',
          filter: (a) => {
            return a
          },
        },
        {
          title: 'Family',
          filter: (a) => {
            if (!a.genres) return false
            return a.genres.includes('Family')
          },
        },
        {
          title: '...',
          filter: (a) => {
            return a
          },
        },
        {
          title: 'Best rated',
          filter: (a) => {
            return a.imdbRating > 7 && a.imdbVotes > 1000
          },
        },
        {
          title: 'Classic movies',
          filter: (a) => {
            return a.released < 1990
          },
        },
      ],

      title: 'star wars',
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
    providers() {
      this.getData()
    },
    genres() {
      this.getData()
    },
    type() {
      this.getData()
    },
    skipTags() {
      this.getData()
    },
    title() {
      clearTimeout(this.titleTimeout)
      this.titleTimeout = setTimeout(() => {
        this.getData()
      }, 900)
    },
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile']),
    language() {
      return this.$i18n.locale.toLowerCase().split('-')[0]
    },

    skipTags() {
      return this.$store.state.settings.skip_tags || []
    },
  },
  methods: {
    getPoster(item) {
      if (!item || !item.poster) return
      return 'https://image.tmdb.org/t/p/w200' + item.poster[this.language] || item.poster['en'] //TODO: use size w154?
    },
    getTitle(item) {
      if (!item || !item.title) return
      return item.title[this.language] || item.title['en'] || item.title['primary']
    },
    getShieldColor(item) {
      return ohana.movies.getShieldColor(item.join_status.status, item.join_status.level)
    },
    getShieldIcon(item) {
      if (!this.skipTags.length) return 'none'
      return ohana.movies.getShieldIcon(item.join_status.status, item.join_status.cuts)
    },

    bestMovies(section) {
      console.log(this.data)
      return this.data.filter(this.sections[section].filter)
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

    scrollToTop() {
      //workaround to show/hide the filters on mobile...
      //this.showSidebarFilters = !this.showSidebarFilters
      scroll(0, 0)
    },
    getProvider(watchUrl) {
      return ohana.providers.getName(watchUrl)
    },

    joinStatus(tagged, skipTags) {
      return ohana.movies.joinStatus(tagged, skipTags)
    },

    getMoreData() {
      if (this.finishLoading || this.loading) return
      this.loading = true
      this.page += 1
      console.log('getMoreData ', this.page)
      this.getData(true)
    },

    getData(more) {
      if (!more) {
        //if not more, let's scroll to top instead of keeping old scroll.
        //this.scrollToTop()
        this.data = []
      }

      this.loading = true

      if (!more) {
        console.log('first page')
        this.page = 1
        this.finishLoading = false
      }
      let fetchedAt = new Date()
      this.fetchedAt = fetchedAt

      var url = ohana.utils.buildURL({
        action: 'findMovies',
        title: this.title ? this.title : '',
        clean: !this.title ? JSON.stringify(this.skipTags) : '[]',
        providers: JSON.stringify(this.providers),
        genres: JSON.stringify(this.genres),
        sort_by: 'certified_date',
        sort_dir: 'desc',
        type: this.type,
        page: this.page,
        newAPI: true,
      })

      fetch(url)
        .then((r) => r.json())
        .then((data) => {
          console.log('[getData] ', this.page, fetchedAt)
          if (fetchedAt != this.fetchedAt) {
            console.log('[getData] old request. ignoring')
            return
          }

          if (this.page != 1) {
            console.log('pushing data ', data)
            if (data.length < 50) this.finishLoading = true
            this.data = [...this.data, ...data]
            this.$forceUpdate()
            console.log('total data length', this.data.length)
          } else {
            console.log('setting data')
            this.data = data
            this.$forceUpdate()
          }

          for (var i = 0; i < data.length; i++) {
            data[i].join_status = this.joinStatus(data[i].status, this.skipTags)
          }

          this.loading = false
        })
    },
  },

  mounted() {
    //load some data
    this.getData()

    // Detect when scrolled to bottom.
    /*const footer = document.querySelector('#footer')
    const body = document.getElementsByTagName('body')[0]
    body.onscroll = () => {
      let left = body.clientHeight - window.innerHeight - footer.clientHeight - window.scrollY
      if (left < 200) {
        this.getMoreData()
      }
    }*/
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
}

#posters > .inner {
  max-width: 1050px;
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
  max-width: 140px;
  min-width: 140px;
  transition: top ease 0.4s;
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

.poster > .placeholder-title {
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

.modern-link {
  cursor: pointer;
  color: #0070d7;
  font-weight: bold;
  font-size: 10pt;
  text-decoration: none;
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

#homeSearchBox {
  box-shadow: none;
  width: 100%;
  background: none;
  border: none;
}
</style>
