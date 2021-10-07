<template>
  <div class="subpage">
    <v-navigation-drawer
      v-click-outside="onClickOutsideNavDrawer"
      v-if="(!mini && isMobile) || !isMobile"
      permanent
      :temporary="isMobile"
      app
      :mini-variant="mini"
      v-model="showMenu"
      :width="375"
      :style="{ zIndex: '9998', marginTop: isMobile ? '44px' : '44px', maxWidth: '90vw' }"
    >
      <v-list-item class="px-2" two-line v-if="mini == false">
        <!--
        <v-list-item-avatar>
          <v-img src="/images/search.png"></v-img>
        </v-list-item-avatar>
        -->
        <v-list-item-content class="pl-2">
          <v-list-item-title>{{ $t('advanced_search') }}</v-list-item-title>
          <v-list-item-subtitle>{{ $t('search_subtitle') }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-btn icon @click.stop="mini = !mini" class="vbtn">
          <v-icon v-if="!isMobile">mdi-chevron-left</v-icon>
          <v-icon v-if="isMobile">mdi-close</v-icon>
        </v-btn>
      </v-list-item>

      <!-- FILTERS -->
      <div v-if="mini == false" style="padding: 10px">
        <!-- SEARCH FIELD -->

        <!-- TODO: added the "form" wrapper to see if that triggers the submit button in ios keyboard-->
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
          @keyup.enter="
            getData()
            if (isMobile) {
              mini = true
            }
          "
        >
          <div slot="append" hidden>
            <v-btn color="success" icon @click="getData()"
              ><v-icon> mdi-movie-search</v-icon></v-btn
            >
          </div>
        </v-text-field>

        <div id="ActualFilters">
          <!-- Providers -->
          <div class="filterr">
            <b>{{ $t('providers') }}:</b>
            <v-chip
              class="ma-1"
              small
              dense
              v-for="(item, k) in providersList"
              :key="k"
              @click="
                providers.includes(item.value)
                  ? (providers = providers.filter((x) => x != item.value))
                  : providers.push(item.value)
              "
              :class="{ chipdown: providers.includes(item.value) }"
            >
              {{ item.text }}
              <!--<b v-if="!loading">{{ item.label }}</b>-->
            </v-chip>
          </div>

          <!-- MOVIES / SHOWS tabs -->
          <div class="filterr">
            <b>Type:</b>
            <v-chip
              dense
              small
              class="ma-1"
              @click="type = 'movie'"
              :class="{ chipdown: type == 'movie' }"
            >
              <span> {{ $t('movies') }}</span>
            </v-chip>
            <v-chip
              dense
              small
              class="ma-1"
              @click="type = 'show'"
              :class="{ chipdown: type == 'show' }"
              ><span>{{ $t('shows') }}</span>
            </v-chip>
          </div>

          <!-- GENRES -->
          <div class="filterr">
            <!-- genres chips-->
            <b>{{ $tc('genre', 2) }}:</b>

            <v-chip
              class="ma-1"
              small
              dense
              v-for="(item, k) in availableGenres.slice(0, seeAllGenreChips ? 999 : 6)"
              :key="k"
              @click="
                genres.includes(item)
                  ? (genres = genres.filter((x) => x != item))
                  : genres.push(item)
              "
              :class="{ chipdown: genres.includes(item) }"
            >
              {{ item }}
              <!--<b v-if="!loading">{{ item.label }}</b>-->
            </v-chip>

            <v-chip
              color="blue"
              class="ma-1"
              dense
              small
              outlined
              @click="seeAllGenreChips = !seeAllGenreChips"
              >{{ seeAllGenreChips ? 'Show less' : 'Show all' }}</v-chip
            >
          </div>

          <!-- Clean/Certified Only - ->
          <div class="filterr">
            <!- - TODO: hiding this checkbox as the idea is that it's always checked - ->
            <v-checkbox
              v-model="cleanOnly"
              hide-details
              class="mt-0"
              :disabled="certifiedOnly"
              v-if="false"
            >
              <div slot="label" style="font-size: 85%; transform: translateY(9px) translateX(-5px)">
                {{ $t('showOnlyClean') }} <v-icon color="green">mdi-content-cut</v-icon> |
                <v-icon color="green">mdi-emoticon-happy</v-icon>
              </div>
            </v-checkbox>

            <v-checkbox v-model="certifiedOnly" hide-details class="mt-0">
              <div slot="label" style="font-size: 85%; transform: translateY(9px) translateX(-5px)">
                {{ $t('showOnlyCertified') }}
                <v-icon color="blue">mdi-content-cut</v-icon>
                | <v-icon color="blue">mdi-emoticon-happy</v-icon>
              </div>
            </v-checkbox>
          </div>-->

          <!-- Content safety chips -->
          <div class="filterr" v-if="false">
            <!--
              <div style="overflow-x: auto;  white-space: nowrap; ">
                <div v-if="skipTags.length > 0" style="display:inline;">
                  -->
            <b>{{ $t('safety') }}:</b>
            <v-chip class="ma-1" small dense v-for="(safety, k) in safety_icons" :key="k">
              <!-- TODO: COMMENTED AS A TEMPORAL SOLUTION TO AVOID LOCAL FILTERING
                    @click="
                      statusFilter.includes(k)
                        ? (statusFilter = statusFilter.filter(x => x != k))
                        : statusFilter.push(k)
                    "
                    :class="{ chipdown: statusFilter.includes(k) }"
                  >-->
              <v-icon left small :color="safety.color">{{ safety.icon }}</v-icon>
              <b v-if="true">{{ safety.label }}</b>

              <v-progress-circular
                v-else
                :size="10"
                :width="1"
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-chip>
          </div>
        </div>

        <!-- Sensitivity -->
        <div class="filterr">
          <b>{{ $t('whatDoYouSkip') }}: </b>

          <v-chip
            class="ma-1"
            small
            dense
            v-for="(item, k) in skipTags"
            :key="k"
            :class="{ chipdown: skipTags.includes(item) }"
          >
            {{ item }}
          </v-chip>

          <v-chip color="blue" class="ma-1" dense small outlined to="/settings">Change...</v-chip>

          <br />

          <div v-if="false">
            <b>Sex/Nudity:</b>
            <div class="sliderticks">
              <my-tooltip :text="tagsDescription['Very erotic']">
                <v-chip
                  dense
                  small
                  :class="{ skip: sexSlider > 1 }"
                  @click="sexSlider = sexSlider > 1 ? 1 : 2"
                >
                  {{ $t('severe') }}
                </v-chip>
              </my-tooltip>

              <my-tooltip :text="tagsDescription['Moderately erotic']">
                <v-chip
                  dense
                  small
                  :class="{ skip: sexSlider > 2 }"
                  @click="sexSlider = sexSlider > 2 ? 2 : 3"
                  >{{ $t('moderate') }}</v-chip
                >
              </my-tooltip>
              <my-tooltip :text="tagsDescription['Mildly erotic']">
                <v-chip
                  dense
                  small
                  :class="{ skip: sexSlider > 3 }"
                  @click="sexSlider = sexSlider > 3 ? 3 : 4"
                  >{{ $t('mild') }}</v-chip
                >
              </my-tooltip>
              <my-tooltip :text="tagsDescription['Slightly erotic']">
                <v-chip
                  dense
                  small
                  :class="{ skip: sexSlider > 4 }"
                  @click="sexSlider = sexSlider > 4 ? 4 : 5"
                  >{{ $t('slight') }}</v-chip
                ></my-tooltip
              >
            </div>
            <!--  cols="12" sm="6" md="4" -->
            <b>Violence/Gore: </b>
            <div class="sliderticks">
              <my-tooltip :text="tagsDescription['Very gory']">
                <v-chip
                  dense
                  small
                  :class="{ skip: vioSlider > 1 }"
                  @click="vioSlider = vioSlider > 1 ? 1 : 2"
                  >{{ $t('severe') }}</v-chip
                >
              </my-tooltip>
              <my-tooltip :text="tagsDescription['Moderately gory']">
                <v-chip
                  dense
                  small
                  :class="{ skip: vioSlider > 2 }"
                  @click="vioSlider = vioSlider > 2 ? 2 : 3"
                  >{{ $t('moderate') }}</v-chip
                >
              </my-tooltip>
              <my-tooltip :text="tagsDescription['Mildly gory']">
                <v-chip
                  dense
                  small
                  :class="{ skip: vioSlider > 3 }"
                  @click="vioSlider = vioSlider > 3 ? 3 : 4"
                  >{{ $t('mild') }}</v-chip
                >
              </my-tooltip>
              <my-tooltip :text="tagsDescription['Slightly gory']">
                <v-chip
                  dense
                  small
                  :class="{ skip: vioSlider > 4 }"
                  @click="vioSlider = vioSlider > 4 ? 4 : 5"
                  >{{ $t('slight') }}</v-chip
                >
              </my-tooltip>
            </div>

            <b>Profanity: </b>
            <div class="sliderticks">
              <my-tooltip :text="tagsDescription['Very profane']">
                <v-chip
                  dense
                  small
                  :class="{ skip: profSlider > 1 }"
                  @click="profSlider = profSlider > 1 ? 1 : 2"
                  >{{ $t('severe') }}</v-chip
                >
              </my-tooltip>
              <my-tooltip :text="tagsDescription['Moderately profane']">
                <v-chip
                  dense
                  small
                  :class="{ skip: profSlider > 2 }"
                  @click="profSlider = profSlider > 2 ? 2 : 3"
                  >{{ $t('moderate') }}</v-chip
                >
              </my-tooltip>
              <my-tooltip :text="tagsDescription['Mildly profane']">
                <v-chip
                  dense
                  small
                  :class="{ skip: profSlider > 3 }"
                  @click="profSlider = profSlider > 3 ? 3 : 4"
                  >{{ $t('mild') }}</v-chip
                >
              </my-tooltip>
              <my-tooltip :text="tagsDescription['Slightly profane']">
                <v-chip
                  dense
                  small
                  :class="{ skip: profSlider > 4 }"
                  @click="profSlider = profSlider > 4 ? 4 : 5"
                  >{{ $t('slight') }}</v-chip
                >
              </my-tooltip>
            </div>
          </div>
        </div>
      </div>

      <!-- END FILTERS -->
      <v-container class="pb-0" v-if="mini">
        <v-btn color="gray" icon @click="mini = false"><v-icon>mdi-chevron-right</v-icon></v-btn>
      </v-container>

      <br />
      <br />
      <br />
      <br />
      <br />
    </v-navigation-drawer>

    <section class="" id="main">
      <div class="inner">
        <h4 style="margin-bottom: 20px">{{ $t('discoverContent_long') }}</h4>

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
        <v-btn
          color="#6cc091"
          fab
          bottom
          right
          fixed
          dark
          @click="mini = !mini"
          style="z-index: 99999; cursor: pointer"
        >
          <!-- progress circle within the go-to-top button -->
          <v-progress-circular
            v-if="loading"
            :size="20"
            :width="2"
            indeterminate
            color="white"
          ></v-progress-circular>
          <v-icon v-else-if="mini" color="white" style="cursor: pointer">mdi-tune</v-icon>
          <v-icon v-else-if="!mini" color="white" style="cursor: pointer">mdi-thumb-up</v-icon>
          <!-- TODO: may use mdi-tune -->
        </v-btn>

        <!-- PROGRESS BAR FOR LOADING, at the bottom of the page -->
        <div v-if="loading">
          <v-progress-linear
            indeterminate
            color="#4bae77"
            style="position: fixed; bottom: 0px; z-index: 9999999999"
          ></v-progress-linear>
        </div>

        <!-- search top -->
        <div id="search-top">
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
        </div>

        <!-- POSTERS -->
        <div v-if="loading">
          <v-progress-linear indeterminate color="#4bae77"></v-progress-linear>
        </div>

        <div v-if="data.length == 0 && !loading">No {{ type }}s found matching your search.</div>
        <div class="posters_wrapper">
          <div
            class="poster_card"
            v-for="(item, index) in data"
            :key="index"
            @click="openMovieDialog(item, index)"
          >
            <!-- image-->
            <div class="image" style="width: 100%; cursor: pointer">
              <!-- poster_path -->
              <img
                :src="language == 'es' && item.poster_es ? item.poster_es : item.poster"
                :alt="item.title"
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
    </section>
  </div>
</template>

<script>
//const rawTags = require('../assets/raw_tags')
import sharedjs from '@/sharedjs'

import ohana from '@/assets/ohana'

import MovieDetailPage from '../components/MovieDetailPage'
import { mapState } from 'vuex'
//const { searchMatch } = require('../sharedjs')
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

      certifiedOnly: false,
      cleanOnly: true,

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
    cleanOnly() {
      this.getData()
    },
    certifiedOnly(newValue) {
      this.getData()
      if (newValue) this.cleanOnly = true //also make sure clean only is selected
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
    safety_icons() {
      return [
        {
          label: 'Certified clean',
          icon: 'mdi-emoticon-happy',
          color: 'blue',
        },
        {
          label: 'Certified with cuts',
          icon: 'mdi-content-cut',
          color: 'blue',
        },
        {
          label: 'Clean',

          icon: 'mdi-emoticon-happy',
          color: 'green',
        },
        {
          label: 'Cleaned by our users',

          icon: 'mdi-content-cut',
          color: 'green',
        },
        {
          label: 'Pending cut',
          icon: 'mdi-flag-variant',
          color: 'red',
        },
        {
          label: 'Unknown',
          icon: 'mdi-progress-question',
          color: 'gray',
        },
      ]
    },

    skipTags() {
      return this.$store.state.settings.skip_tags || []
    },

    /*items() {
      return this.data
    },*/
  },
  methods: {
    mergeItemsByImdbId_sameStatus(dataArray) {
      //This merges items with same imdb id (keeping as main the one with highest level), unless there are cuts, in which case we don't merge unless same number of cuts and same level
      //This also modifies a bit the item structure, adding join_status, and providers: [{pid, watch_url, join_status, status}]

      let keys = [] //to track which items we can merge
      let final = [] //new array with items (merge and added join_status)

      dataArray.forEach((item) => {
        //temp fix on HBO:
        let idaux = item.id.split('_')
        if (idaux[0] == 'hboespana') {
          item.watch_url = 'https://es.hboespana.com/movies/-/' + idaux[1]
          console.log('item.watch_url', item.watch_url)
        }

        let provider = {
          pid: item.id,
          watch_url: item.watch_url,
          join_status: this.joinStatus(item.status, this.skipTags),
          status: item.status,
        }

        //if clean, we don't need to have same level to merge (we just keep highest)
        let imdb = item.imdb

        let key = ''
        if (provider.join_status.cuts == 0) {
          key = imdb //+ provider.join_status.status + provider.join_status.cuts
        } else {
          key =
            imdb +
            provider.join_status.status +
            provider.join_status.cuts +
            provider.join_status.level
        }
        //console.log('imdb: ' + imdb + ' | key: ' + key, item)

        if (!imdb) {
          //TODO: Find another way (so far done to hide the not-good-looking stuff)
          //skip this item
        } else if (!keys.includes(key)) {
          //first time this movie apperas
          item.join_status = provider.join_status
          item.count = 1
          item.providers = [provider]
          final.push(item)
          keys.push(key)
        } else {
          //this imdb id already exists, with similar enough ohana status
          let i = final.findIndex((x) => x.imdb == imdb)

          if (provider.join_status.level > final[i].join_status.level) {
            item.join_status = provider.join_status
            item.count = final[i].count
            item.providers = [provider, ...final[i].providers]

            final[i] = item
          } else {
            final[i].providers.push(provider)
          }

          final[i].count = final[i].count + 1
        }
      })
      return final
    },

    onClickOutsideNavDrawer() {
      if (this.isMobile && !this.mini) {
        this.mini = !this.mini
      }
    },
    openMovieDialog(item, index) {
      console.log('itemmmm: ', item)
      this.showMovieDialog = true
      this.selectedItemInfo = {
        join_status: this.joinStatus(item.status, this.skipTags), //todo: fix this
        id: item.id,
        icon: this.getShieldIcon(item),
        color: this.getShieldColor(item),
        providers: item.providers,
        imdb: item.imdb,
        index: index,
        watch_url: item.watch_url,
      }
    },

    scrollToTop() {
      //workaround to show/hide the filters on mobile...
      //this.showSidebarFilters = !this.showSidebarFilters
      scroll(0, 0)
    },
    getProvider(watchUrl) {
      return ohana.providers.getName(watchUrl)
    },

    getShieldColor(item) {
      return ohana.movies.getShieldColor(item.join_status.status, item.join_status.level)
    },
    getShieldIcon(item) {
      if (!this.skipTags.length) return 'none'
      return ohana.movies.getShieldIcon(item.join_status.status, item.join_status.cuts)
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
        this.scrollToTop()
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
        clean: !this.title && this.cleanOnly ? JSON.stringify(this.skipTags) : '[]',
        providers: JSON.stringify(this.providers),
        certified: this.certifiedOnly ? JSON.stringify(this.skipTags) : '[]',
        genres: JSON.stringify(this.genres),
        sort_by: 'certified_date',
        sort_dir: 'desc',
        type: this.type,
        page: this.page,
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

          //merge items with same IMDb Id
          this.data = this.mergeItemsByImdbId_sameStatus(this.data)

          this.loading = false
        })
    },
  },

  mounted() {
    //load some data
    this.getData()

    // Detect when scrolled to bottom.
    const footer = document.querySelector('#footer')
    const body = document.getElementsByTagName('body')[0]
    body.onscroll = () => {
      let left = body.clientHeight - window.innerHeight - footer.clientHeight - window.scrollY
      if (left < 200) {
        this.getMoreData()
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

div.posters_wrapper {
  width: 100%;
  display: flex;
  min-height: 250px;

  /*justify-content: space-between;*/
  flex-wrap: wrap;
}

div.posters_wrapper div.poster_card {
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 10px;

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
    (100% - 5px * 4) / 2
  ); /* 100% of the div, minus margins*4, and /2 (so at min, 2 posters fit the width)*/
  max-width: 200px;
  min-width: 100px;
  /*min-height: 200px;*/
}

div.posters_wrapper .image {
  width: 100%;
  min-height: 100%;
}

div.posters_wrapper .image > img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.blur_image {
  filter: blur(8px);
  -webkit-filter: blur(8px);
}

div.posters_wrapper div.poster_card div.content {
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

.poster_card > .content {
  position: absolute !important;
  background: black;
  opacity: 0;
  height: 100%;
  font-size: 90%;
  color: white !important;
  z-index: 98;
}

.poster_card > .placeholder-title {
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

.poster_card > .content:hover {
  opacity: 0.95;
  transition: opacity 0.3s;
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
</style>
