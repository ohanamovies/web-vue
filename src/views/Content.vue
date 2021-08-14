<template>
  <div class="subpage">
    <my-header></my-header>

    <section class="wrapper" id="main">
      <div class="inner">
        <h4>{{ $t('discoverContent') }}</h4>

        <v-dialog
          v-model="showMovieDialog"
          scrollable
          width="750"
          :style="{ marginTop: isMobile ? '40px' : '0px', zIndex: 99999999999998 }"
        >
          <movie-detail-page
            :isMobile="isMobile"
            :selection="selectedItemInfo"
            @close="showMovieDialog = false"
          ></movie-detail-page>
        </v-dialog>

        <!-- Floating button now to scroll to top (useful on mobile to get to the filters), in future to show/hide filters on mobile-->
        <v-btn
          color="#6cc091"
          fab
          bottom
          right
          fixed
          dark
          @click="scrollToTop"
          style="z-index: 99999"
        >
          <!-- progress circle within the go-to-top button -->
          <v-progress-circular
            v-if="loading"
            :size="20"
            :width="2"
            indeterminate
            color="white"
          ></v-progress-circular>
          <v-icon v-else color="white">mdi-arrow-up</v-icon>
        </v-btn>

        <!-- PROGRESS BAR FOR LOADING, at the bottom of the page -->
        <div v-if="loading">
          <v-progress-linear
            indeterminate
            color="#4bae77"
            style="position: fixed; bottom: 0px; z-index: 9999999999"
          ></v-progress-linear>
        </div>

        <v-row>
          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="5"
            lg="4"
            xl="3"
            v-if="showSidebarFilters"
            id="filterss"
          >
            <!-- SEARCH FIELD -->

            <v-text-field
              outlined
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

            <!-- Sensitivity -->
            <div class="filterr">
              <h4 style="padding: 0px; margin: 0px">{{ $t('whatDoYouSkip') }}</h4>
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

            <!-- If mobile, let's use a trick to help toggle advancedSearch/results -->
            <div v-if="isMobile" style="margin-bottom: 5px">
              <span
                @click="showFilters = !showFilters"
                :style="{
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  color: 'DodgerBlue',
                }"
                >{{ $tc('showAdvanced', showFilters) }}</span
              >
            </div>

            <div id="ActualFilters" v-if="!isMobile || showFilters">
              <!-- Content safety chips -->
              <div class="filterr">
                <!--
              <div style="overflow-x: auto;  white-space: nowrap; ">
                <div v-if="skipTags.length > 0" style="display:inline;">
                  -->
                <b>{{ $t('safety') }}</b>
                <v-chip class="ma-1" small dense v-for="(item, k) in statsRecap" :key="k">
                  <!-- TODO: COMMENTED AS A TEMPORAL SOLUTION TO AVOID LOCAL FILTERING
                    @click="
                      statusFilter.includes(k)
                        ? (statusFilter = statusFilter.filter(x => x != k))
                        : statusFilter.push(k)
                    "
                    :class="{ chipdown: statusFilter.includes(k) }"
                  >-->
                  <v-icon left small :color="item.color">{{ item.icon }}</v-icon>
                  <b v-if="true">{{ item.label }}</b>
                  <!--<b v-if="!loading">{{ item.label }}</b>-->
                  <v-progress-circular
                    v-else
                    :size="10"
                    :width="1"
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-chip>
              </div>

              <!-- MOVIES / SHOWS tabs -->
              <div class="filterr">
                <b>Type:</b>
                <v-chip
                  dense
                  small
                  class="ma-1"
                  @click="setType('movie')"
                  :class="{ chipdown: type == 'movie' }"
                >
                  <span> {{ $t('movies') }}</span>
                </v-chip>
                <v-chip
                  dense
                  small
                  class="ma-1"
                  @click="setType('show')"
                  :class="{ chipdown: type == 'show' }"
                  ><span>{{ $t('shows') }}</span>
                </v-chip>
              </div>

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

              <!-- GENRES -->
              <div class="filterr">
                <!-- genres expansion panel -->
                <v-expansion-panels v-if="false">
                  <v-expansion-panel style="border: none">
                    <v-expansion-panel-header style="overflow: hidden; color: black !important">
                      <h5>{{ $t('genre') }}: {{ genres.join(', ') }}</h5>
                    </v-expansion-panel-header>

                    <v-expansion-panel-content>
                      <v-chip
                        class="ma-1"
                        small
                        dense
                        v-for="(item, k) in availableGenres"
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
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>

                <!-- genres chips-->
                <b>{{ $tc('genre', 2) }}:</b>

                <v-chip
                  class="ma-1"
                  small
                  dense
                  v-for="(item, k) in availableGenres.slice(0, seeAllGenreChips ? 999 : 5)"
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

              <!-- Clean/Certified Only -->
              <div class="filterr">
                <v-checkbox v-model="cleanOnly" hide-details class="mt-0" :disabled="certifiedOnly">
                  <div
                    slot="label"
                    style="font-size: 85%; transform: translateY(9px) translateX(-5px)"
                  >
                    {{ $t('showOnlyClean') }} <v-icon color="green">mdi-content-cut</v-icon> |
                    <v-icon color="green">mdi-emoticon-happy</v-icon>
                  </div>
                </v-checkbox>

                <v-checkbox v-model="certifiedOnly" hide-details class="mt-0">
                  <div
                    slot="label"
                    style="font-size: 85%; transform: translateY(9px) translateX(-5px)"
                  >
                    {{ $t('showOnlyCertified') }}
                    <v-icon color="blue">mdi-content-cut</v-icon>
                    | <v-icon color="blue">mdi-emoticon-happy</v-icon>
                  </div>
                </v-checkbox>
              </div>
            </div>
          </v-col>

          <v-col class="pt-0">
            <!-- POSTERS -->
            <div v-if="loading">
              <v-progress-linear indeterminate color="#4bae77"></v-progress-linear>
            </div>

            <div v-if="filteredList.length == 0 && !loading">
              No {{ type }}s found matching your search.
            </div>
            <div class="posters_wrapper">
              <div
                class="poster_card"
                v-for="(item, index) in filteredList"
                :key="index"
                @click="openMovieDialog(item)"
              >
                <div class="image" style="width: 100%">
                  <!-- poster_path -->
                  <img :src="item.poster" :alt="item.title" />

                  <div class="shield" v-if="getShieldIcon(item) != 'none'">
                    <v-icon :color="getShieldColor(item)" width="60px">
                      {{ getShieldIcon(item) }}
                    </v-icon>
                  </div>
                </div>
                <div class="content">
                  <p style="font-size: 16px; line-height: normal">{{ item.title }}</p>

                  <p>
                    <a v-if="item.watch_url" target="_blanck" :href="item.watch_url">{{
                      getProvider(item.watch_url)
                    }}</a>
                    &nbsp;&nbsp;
                    <a
                      v-if="item.imdb"
                      target="_blanck"
                      :href="'https://www.imdb.com/title/' + item.imdb"
                      >IMDB</a
                    >
                  </p>
                  <p
                    v-for="(cs, index) in Object.keys(getSkipScenes(item))"
                    :key="index"
                    :style="{
                      color: cs == 'pending' ? 'red' : cs == 'safe' ? 'green' : 'yellow',
                      lineHeight: 'normal',
                      fontSize: '13px',
                    }"
                  >
                    <span style="text-transform: capitalize">{{ cs }}:</span>
                    {{ getSkipScenes(item)[cs].join(', ') }}
                  </p>
                  <span style="position: absolute; bottom: 5px">{{ item.provider }}</span>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </section>
  </div>
</template>

<script>
const rawTags = require('../assets/raw_tags')
import sharedjs from '@/sharedjs'
import MovieDetailPage from '../components/MovieDetailPage'
//const { searchMatch } = require('../sharedjs')
export default {
  components: {
    MovieDetailPage,
  },
  head: function () {
    //This is used to generate the meta tags needed for better SEO and stuff.
    return sharedjs.headObject(
      'Find something clean to watch - Ohana',
      'Browse throught hundreds of safe movies and tv shows, edited with love by our community',
      this.$router.currentRoute.path
    )
  },
  data() {
    return {
      selectedItemInfo: {},
      showMovieDialog: false,

      windowWidth: 0,
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
        { text: 'Movistar', value: 'movistar' },
        { text: 'Rakuten', value: 'rakuten' },
        { text: 'Youtube', value: 'youtube' },
      ],

      certifiedOnly: false,
      cleanOnly: true,
      sexSlider: 2,
      vioSlider: 1,
      profSlider: 1,
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
    skipTags() {
      this.updateLocalStorage()
      this.getData()
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
    certifiedOnly(newValue) {
      this.getData()
      if (newValue) this.cleanOnly = true
    },
    title() {
      clearTimeout(this.titleTimeout)
      this.titleTimeout = setTimeout(() => {
        this.getData()
      }, 900)
    },
  },
  computed: {
    isMobile() {
      // breakpoints for columns:  https://vuetifyjs.com/en/components/grids/
      return this.windowWidth < 960
    },
    statsRecap() {
      //Summary of the status by "status" (or icon). This populates the chips with the icons.
      let output = {
        clean_certified: {
          count: 0,
          icon: 'mdi-emoticon-happy',
          color: 'blue',
          label: 'Certified clean',
        },
        cut_certified: {
          count: 0,
          icon: 'mdi-content-cut',
          color: 'blue',
          label: 'Certified with cuts',
        },
        clean_not_certified: {
          count: 0,
          icon: 'mdi-emoticon-happy',
          color: 'green',
          label: 'Clean',
        },
        cut_not_certified: {
          count: 0,
          icon: 'mdi-content-cut',
          color: 'green',
          label: 'Cleaned by our users',
        },
        missing: { count: 0, icon: 'mdi-flag-variant', color: 'red', label: 'Pending cut' },
        unknown: { count: 0, icon: 'mdi-progress-question', color: 'gray', label: 'Unknown' },
      }
      for (let item of this.items) {
        let join = this.joinStatus(item)
        if (join.status == 'done') {
          if (join.cuts > 0 && join.level > 5) output['cut_certified'].count++
          if (join.cuts > 0 && join.level <= 5) output['cut_not_certified'].count++
          if (join.cuts == 0 && join.level > 5) output['clean_certified'].count++
          if (join.cuts == 0 && join.level <= 5) output['clean_not_certified'].count++
        } else if (join.status == 'missing') {
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

    tagsDescription() {
      let x = {} //tag:desc
      rawTags.content.forEach((cat) => {
        cat.severity.forEach((sev) => {
          x[sev.value] = sev.description
        })
      })
      return x
    },

    filteredList() {
      return this.items
      /*
      TODO: COMMENTED AS A TEMPORAL SOLUTION TO AVOID LOCAL FILTERING
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
      return xx*/
    },
    items() {
      return this.data
    },
  },
  methods: {
    openMovieDialog(item) {
      this.showMovieDialog = true
      this.selectedItemInfo = {
        joinStatus: this.joinStatus(item.status, this.skipTags),
        icon: this.getShieldIcon(item),
        color: this.getShieldColor(item),
        provider: this.getProvider(item.watch_url),
        watch_url: item.watch_url,
      }
    },
    onResize() {
      this.windowWidth = window.innerWidth
    },
    scrollToTop() {
      //workaround to show/hide the filters on mobile...
      //this.showSidebarFilters = !this.showSidebarFilters
      scroll(0, 0)
    },
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
    setType(type) {
      this.type = type
      this.getData()
      this.data = []
    },
    updateLocalStorage() {
      let x = {
        sliders: {
          sexSlider: this.sexSlider,
          vioSlider: this.vioSlider,
          profSlider: this.profSlider,
        },
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
      skipTagsR.forEach((label) => {
        let tagStatus = item.status[label]

        //missing
        if (tagStatus && tagStatus.status == 'missing') {
          if (!taggedAux.pending) taggedAux.pending = []
          taggedAux.pending.push(label)
          //done
        } else if (tagStatus && tagStatus.status == 'done') {
          if (!taggedAux.safe) taggedAux.safe = []
          label += ' (' + (tagStatus ? tagStatus.cuts : 0) + ')'
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
      let join = this.joinStatus(item.status, this.skipTags)

      if (join.status == 'done') {
        if (join.level > 5) return 'blue'
        return 'green'
      } else if (join.status == 'missing') {
        return 'red'
      } else {
        return 'gray'
      }
    },
    getShieldIcon(item) {
      if (!this.skipTags.length) return 'none'

      let join = this.joinStatus(item.status, this.skipTags)

      //pick the right icon
      if (join.status == 'done' && join.cuts == 0) {
        return 'mdi-emoticon-happy'
      } else if (join.status == 'done') {
        return 'mdi-content-cut'
      } else if (join.status == 'missing') {
        return 'mdi-flag-variant'
      } else {
        return 'mdi-progress-question'
      }
    },

    joinStatus(tagged, skipTags) {
      if (!tagged) return { status: 'unknown', cuts: 0, level: 0 }
      if (!skipTags || !skipTags.length) return { status: 'unset', cuts: 0, level: 0 }
      let status = 'done'
      let cuts = 0
      let level = Infinity
      for (var tag of skipTags) {
        // Set default
        let s = tagged[tag] || {}
        // Set num cuts/scenes & min user level
        if (s.cuts) cuts += s.cuts
        level = Math.min(level, s.level || 0)
        // Set watchability status
        if (s.status == 'missing') {
          status = 'missing'
        } else if (s.status != 'done') {
          status = 'unknown'
        }
      }
      return { status: status, cuts: cuts, level: level }
    },

    /*getShield(item) {
      // If EVERY skipTags is included in tags_done.done
      if (this.skipTags.every(x => item.tags_done.includes(x))) {
        return 'done'
      }

      // If ANY skipTags is included in tags_missing
      if (this.skipTags.some(x => item.tags_missing.includes(x))) {
        return 'missing'
      }

      // Otherwise
      return 'unknown'
    },*/

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
      console.log('getMoreData ', this.page)
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
        clean: !this.title && this.cleanOnly ? JSON.stringify(this.skipTags) : '[]',
        providers: JSON.stringify(this.providers),
        certified: this.certifiedOnly ? JSON.stringify(this.skipTags) : '[]',
        genres: JSON.stringify(this.genres),
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
          }
          this.loading = false
        })
    },
  },

  mounted() {
    window.addEventListener('resize', this.onResize)
    this.onResize()

    this.loadLocalStorage()

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
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
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

.v-expansion-panel-header {
  border: none !important;
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

.sliderticks .v-chip {
  margin: 4px;
}

.skip .v-chip__content:before {
  content: url('https://api.iconify.design/mdi:eye-off.svg?height=12');
  color: white !important;
  opacity: 0.4;
  /*padding-top: 3px;*/
  padding-right: 2px;
}

.skip {
  background-color: #9e9e9e !important;
  border-color: #9e9e9e !important;
  padding: 10px !important;
  /*color: white !important;*/
}

/*.chipdown > span {
  color: white !important;
}*/
.chipdown {
  background-color: #9e9e9e !important; /*#9e9e9e !important;*/
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
</style>
