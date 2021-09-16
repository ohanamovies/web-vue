<template>
  <div>
    <span @click="toggle()">mini: {{ mini }}</span>

    <v-navigation-drawer
      v-click-outside="onClickOutsideNavDrawer"
      v-if="(!mini && isMobile) || !isMobile"
      permanent
      :temporary="isMobile"
      app
      :mini-variant="mini"
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
        <v-btn icon @click.stop="close()" class="vbtn">
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
          v-model="search_filters.title"
          autocomplete="off"
          prepend-inner-icon="mdi-magnify"
          hide-details
          clearable
          class="pa-0 mb-2"
          @focus="$event.target.select()"
          @keyup.enter="
            getData()
            if (isMobile) {
              close()
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
                search_filters.providers.includes(item.value)
                  ? (search_filters.providers = search_filters.providers.filter(
                      (x) => x != item.value
                    ))
                  : search_filters.providers.push(item.value)
              "
              :class="{ chipdown: search_filters.providers.includes(item.value) }"
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
                search_filters.genres.includes(item)
                  ? (search_filters.genres = search_filters.genres.filter((x) => x != item))
                  : search_filters.genres.push(item)
              "
              :class="{ chipdown: search_filters.genres.includes(item) }"
            >
              {{ item }}
              <!--<b v-if="!loading">{{ item.label }}</b>-->
            </v-chip>

            <!-- see more chip -->
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
            <!-- TODO: hiding this checkbox as the idea is that it's always checked -->
            <v-checkbox
              v-model="search_filters.cleanOnly"
              hide-details
              class="mt-0"
              :disabled="certifiedOnly"
              v-if="true"
            >
              <div slot="label" style="font-size: 85%; transform: translateY(9px) translateX(-5px)">
                {{ $t('showOnlyClean') }} <v-icon color="green">mdi-content-cut</v-icon> |
                <v-icon color="green">mdi-emoticon-happy</v-icon>
              </div>
            </v-checkbox>

            <v-checkbox v-model="search_filters.certifiedOnly" hide-details class="mt-0">
              <div slot="label" style="font-size: 85%; transform: translateY(9px) translateX(-5px)">
                {{ $t('showOnlyCertified') }}
                <v-icon color="blue">mdi-content-cut</v-icon>
                | <v-icon color="blue">mdi-emoticon-happy</v-icon>
              </div>
            </v-checkbox>
          </div>

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
        </div>

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
      </div>

      <!-- END FILTERS -->
      <v-container class="pb-0" v-if="mini">
        <v-btn color="gray" icon @click="open()"><v-icon>mdi-chevron-right</v-icon></v-btn>
      </v-container>

      <v-container v-if="!mini">
        <div>
          <span class="modern-link" @click="removeOhanaSettingsLocalStorage()"
            >Restaurar valores por defecto</span
          >
        </div>
      </v-container>
      <br />
      <br />
      <br />
      <br />
      <br />
    </v-navigation-drawer>
  </div>
</template>

<script>
const rawTags = require('../assets/raw_tags')
export default {
  props: {
    value: {
      type: Object,
      default() {
        return {}
      },
    },
    mini: {
      type: Boolean,
      default: false,
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value(newValue) {
      this.$emit('input', newValue)
    },
  },
  data() {
    return {
      search_filters: {
        statusFilter: [],
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
      },
      seeAllGenreChips: false,
      providersList: [
        { text: 'Netflix', value: 'netflix' },
        { text: 'HBO', value: 'hboespana' },
        { text: 'Disney+', value: 'disneyplus' },
        { text: 'Movistar', value: 'movistar' },
        { text: 'Rakuten', value: 'rakuten' },
        { text: 'Youtube', value: 'youtube' },
      ],
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
  methods: {
    onClickOutsideNavDrawer() {
      if (this.isMobile && !this.mini) {
        this.close()
      }
    },
    toggle() {
      this.$emit('toggle')
    },
    close() {
      this.$emit('close')
    },
    open() {
      this.$emit('open')
    },
  },
}
</script>

<style lang="scss" scoped></style>
