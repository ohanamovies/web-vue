<template>
  <div class="home">
    <!-- Header -->
    <!-- <my-header></my-header> -->

    <div class="sticky2">
      <div style="margin: auto auto auto 0px">Ohana</div>
      <div>
        <v-text-field
          outlined
          dark
          type="search"
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
          @keyup.enter="getData()"
        >
        </v-text-field>
      </div>
      <div>
        <v-icon style="color: white" v-if="isMobile">mdi-information</v-icon>
        <span v-else>About</span>
      </div>
      <div>
        <v-icon style="color: white" v-if="isMobile">mdi-cog</v-icon>
        <span v-else>Settings</span>
      </div>
    </div>

    <!-- Banner -->
    <section v-if="!title" class="banner home-background" style="min-height: 20vh !important">
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
              style="margin: 5px"
              >{{ $t('install') }}</a
            >
          </div>
          <div v-if="hasApp">
            <router-link to="community" class="btn">{{ $t('support_ohana') }}</router-link>
          </div>

          <div v-else-if="!isChrome">
            <router-link to="get-started" class="btn">{{ $t('getStarted') }}</router-link>
          </div>
        </div>
      </div>
    </section>

    <section id="posters">
      <div class="inner">
        <div v-if="!title" class="resultsBasedOn">
          <p style="margin: auto">
            {{ $t('resultsBasedOn')[0] }}
            <router-link to="/settings" class="modern-link" style="font-size: 100%">
              {{ $t('resultsBasedOn')[1] }}</router-link
            >
            {{ $t('resultsBasedOn')[2] }}
            <span @click="mini = !mini" class="modern-link" style="font-size: 100%">
              {{ $t('resultsBasedOn')[3] }}</span
            >
          </p>
        </div>
        <div v-else style="padding-top: 50px">
          <div style="max-width: 90%; margin: auto" v-if="data.length == 0 && !loading">
            No titles found matching your search.
          </div>
        </div>

        <div
          v-for="(section, index) in getSections()"
          :key="index"
          style="max-width: 90%; margin: auto"
        >
          <h4 style="color: white; margin: 0; padding-top: 20px">{{ section.title }}</h4>

          <!-- POSTERS -->
          <div class="posters_wrapper2">
            <div
              class="poster"
              v-for="(item, index2) in bestMovies(index)"
              :key="index2"
              @click="openMovieDialog(item)"
              :style="{ borderBottom: '4px solid ' + item.join_status.color }"
            >
              <!-- image-->
              <div class="image" style="width: 100%; cursor: pointer">
                <img
                  :src="getPoster(item)"
                  :alt="getTitle(item)"
                  :class="[item.join_status.status == 'missing' ? 'blur_image' : '']"
                />
                <div class="shield" v-if="item.join_status.icon != 'none'">
                  <v-icon :color="item.join_status.color" size="18">
                    {{ item.join_status.icon }}
                  </v-icon>
                </div>
              </div>
              <!-- text -->
              <div class="placeholder-title" v-if="item.join_status.status == 'missing'">
                <span>{{ getTitle(item) }}</span>
              </div>
              <div class="content" v-if="false"></div>
            </div>
            <!-- Dummy poster to avoid collapse- ->
            <div class="poster">
              <div class="image" style="width: 100%">
                <img src="/images/empty-poster.png" alt="dummy" />
              </div>
            </div>-->
          </div>
          <!-- POSTERS (loading placeholder) -->
          <div v-if="loading" class="posters_wrapper2">
            <div class="poster" v-for="n in 10" :key="n">
              <div class="image" style="width: 100%">
                <img src="/images/empty-poster.png" class="waiting" alt="loading" />
              </div>
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
      <movie-detail-page
        :selection="selectedItemInfo"
        @close="showMovieDialog = false"
      ></movie-detail-page>
    </v-dialog>
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
      this.data = []
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
    getSections() {
      if (this.title) return [{ title: 'Search results' }]
      else return this.sections
    },
    getPoster(item) {
      if (!item || !item.poster) return
      return 'https://image.tmdb.org/t/p/w200' + item.poster[this.language] || item.poster['en'] //TODO: use size w154?
    },
    getTitle(item) {
      if (!item || !item.title) return
      return item.title[this.language] || item.title['en'] || item.title['primary']
    },
    bestMovies(section) {
      if (!this.data) return this.data
      if (!this.sections[section].filter) return this.data
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
    getProvider(watchUrl) {
      return ohana.providers.getName(watchUrl)
    },

    joinStatus(tagged, skipTags) {
      return ohana.movies.joinStatus2(tagged, skipTags)
    },

    getMoreData() {
      if (this.finishLoading || this.loading) return
      this.loading = true
      this.page += 1
      console.log('getMoreData ', this.page)
      this.getData(true)
    },

    getData(more) {
      this.loading = true

      if (!more) {
        console.log('first page')
        this.data = []
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
        sort_by: 'imdbRating',
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
            data[i].join_status = this.joinStatus(data[i].movieContent, this.skipTags)
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

@media only screen and (max-width: 600px) {
  div.posters_wrapper2 div.poster {
    max-width: 110px;
    min-width: 110px;
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
  background-color: #141414;
  z-index: 99999999;
}

.sticky2 > div {
  color: white;
  display: flex;
  padding: 5px 10px;
  margin: auto 0px;
}

.btn {
  background: white;
  padding: 5px 10px;
  border-radius: 4px;
  text-decoration: none;
  color: black !important;
}

.resultsBasedOn {
  width: 100%;
  display: flex;
  padding: 10px;
  color: white;
}
</style>
