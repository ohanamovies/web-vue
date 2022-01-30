<template>
  <div>
    <!-- Sensitivity dialog -->

    <v-dialog
      v-model="dialog_sensitivity"
      max-width="500"
      style="z-index: 999999"
      overlay-opacity="50"
      overlay-color="#141414"
    >
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          <Settings2 />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed @click="dialog_sensitivity = false">Done</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Install Ohana dialog -->
    <v-dialog
      v-model="dialog_install"
      max-width="500"
      style="z-index: 999999"
      overlay-opacity="50"
      overlay-color="#141414"
    >
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          <CheckExtension />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed @click="dialog_install = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Section title -->
    <div v-if="bypass || is_clean || (is_done && hasApp)" style="display: flex">
      <b>Watch options: </b>
      <div v-if="displayProviders.length" style="font-size: 80%; margin-left: 8px">
        {{ displayProviders.length ? 'Powered by' : 'You may search on ' }}
        <a href="https://www.justwatch.com" target="_blank">
          <img height="9" src="images/providers/justwatch-rectangle.png" alt="JustWatch" />
        </a>
      </div>
      <div v-if="false">
        <i v-if="is_missing || (is_done && !hasApp)" style="color: red"
          >(beware unhealthy content)</i
        >
        <i v-else-if="is_unknown" style="color: orange">(beware unknown content)</i>
        <i v-else-if="is_mixed" style="color: orange">(beware mixed content)</i>
        <i v-else-if="is_done && hasApp" style="color: green">(edited)</i>
        <i v-else-if="no_settings" style="color: gray">(no settings)</i>
        <i v-else-if="is_clean" style="color: green">(healthy)</i>
      </div>
    </div>

    <!-- WATCH OPTIONS -->
    <!-- providers v2 -->
    <div v-if="is_clean || (is_done && hasApp) || bypass">
      <ProvidersStatus :item="selection" />
    </div>

    <!-- JustWatch -->

    <div v-if="false && (is_clean || (is_done && hasApp) || bypass)">
      <!-- providers -->
      <div style="display: flex">
        <div v-for="(provider, index) in displayProviders" :key="index">
          <a
            v-if="provider.provider != 'justwatch'"
            class="provider-link"
            target="_blank"
            :href="getLink(provider.provider, provider.providerID)"
          >
            <img :src="getLogo(provider.provider)" :alt="provider.provider" />
          </a>
        </div>
      </div>

      <span v-if="!displayProviders.length">
        <span>Sorry, no known providers available. </span>
        <a
          class="modern-link"
          v-if="selection.tmdb"
          target="_blank"
          :href="'https://www.themoviedb.org/' + selection.tmdb + '/watch'"
          >Try tmdb.
        </a>
      </span>
    </div>

    <!-- no settings -->
    <div v-else-if="no_settings">
      <a class="button special" @click="dialog_sensitivity = true"
        >{{ $t('manage_preferences') }}<v-icon v-if="false">mdi-account-cog-outline</v-icon></a
      >
    </div>

    <!--movie is edited -->
    <div v-else-if="is_done && !hasApp">
      <div v-if="isChrome">
        <i>Installing Ohana is required to remove unhealthy scenes: </i>
        <br />
        <a class="button special" @click="dialog_install = !dialog_install"
          >{{ $t('install') + ' Ohana' }}
        </a>
      </div>
      <div v-else>
        This browser is not compatible with Ohana. <br />
        <a class="button special" @click="dialog_install = true">Learn more</a>
      </div>
    </div>

    <!-- movie is pending -->
    <div v-if="is_missing || is_unknown || (is_done && !hasApp) || is_mixed" style="margin: auto">
      <span v-if="!bypass">
        <span class="modern-link" @click="bypass = true">See watch options anyway</span
        ><v-icon small :class="['ml-0', 'pl-0']" color="#0070d7">mdi-chevron-down </v-icon>
      </span>

      <!-- <span v-else class="modern-link" @click="bypass = false">Hide watch options</span> -->
    </div>
  </div>
</template>

<script>
import CheckExtension from '@/components/Settings/CheckExtension.vue'
import Settings2 from '@/components/Settings/Settings2.vue'
import ohana from '@/assets/ohana'
import ProvidersStatus from '@/components/Movies/ProvidersStatus.vue'
import { mapState } from 'vuex'

export default {
  components: {
    CheckExtension,
    Settings2,
    ProvidersStatus,
  },
  props: {
    selection: {
      type: Object,
      deafult() {
        return {}
      },
    },
  },
  data() {
    return {
      bypass: false,

      dialog_install: false,
      dialog_sensitivity: false,
    }
  },
  watch: {
    selection: {
      handler: function () {
        this.bypass = false
      },
      deep: true,
    },
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile']),
    displayProviders() {
      //not offer options where content is not edited!!!
      if (this.is_done) {
        return this.selection.healthyProviders
      } else {
        return this.selection.providers
      }
    },
    no_settings() {
      return this.selection.join_status.status == 'unset'
    },
    is_clean() {
      return this.selection.join_status.status == 'clean'
    },
    is_done() {
      return this.selection.join_status.status == 'done'
    },
    is_mixed() {
      return this.selection.join_status.status == 'mixed'
    },
    is_unknown() {
      return (
        this.selection.join_status.status == 'unknown' ||
        this.selection.join_status.status == 'unkown'
      )
    },
    is_missing() {
      return this.selection.join_status.status == 'missing'
    },
  },
  methods: {
    getLogo(provider) {
      return ohana.providers.getLogo(provider)
    },
    getLink(provider, providerID) {
      return ohana.providers.getLink(provider, providerID)
    },
  },
}
</script>

<style>
.provider-link > img {
  width: 35px;
  margin: 2px;
  border-radius: 5px;
}

.provider-link-rectangle > img {
  height: 16px;
  width: 37;
  margin: 2px 10px 0px 0px;
  /*padding-top: 5px;*/ /* weird, but otherwise not well aligned with flex*/
  border-radius: 2px;
  /*border-radius: 5px;*/
}
</style>
