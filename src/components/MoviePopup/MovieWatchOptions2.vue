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

    <!-- WARNINGS -->
    <div style="text-align: center" v-if="!bypass">
      <!-- no settings -->
      <div v-if="no_settings">
        <a class="button special" @click="dialog_sensitivity = true"
          >{{ $t('manage_preferences') }}<v-icon v-if="false">mdi-account-cog-outline</v-icon></a
        >
      </div>

      <!--movie is edited but no app -->
      <div v-else-if="is_done && !hasApp">
        <div v-if="isChrome">
          <i style="color: red">{{ $t('popup.installingOhanaIsRequired') }}</i>
          <br />
          <a class="button special" @click="dialog_install = !dialog_install"
            >{{ $t('install') + ' Ohana' }}
          </a>
        </div>
        <div v-else>
          <span style="color: red"> {{ $t('popup.invalidBrowser') }} <br /> </span>
          <a class="button special" @click="dialog_install = true">{{ $t('learnMore') }}</a>
        </div>
      </div>

      <!-- movie is pending -->
      <div v-if="is_missing || is_unknown || (is_done && !hasApp) || is_mixed" style="margin: auto">
        <span v-if="!bypass">
          <span class="modern-link" @click="bypass = true">
            {{ $t('popup.showProvidersAnyway') }}
          </span>
          <v-icon v-if="false" small :class="['ml-0', 'pl-0']" color="#0070d7"
            >mdi-chevron-down
          </v-icon>
        </span>

        <!-- <span v-else class="modern-link" @click="bypass = false">Hide watch options</span> -->
      </div>
    </div>

    <!-- WATCH OPTIONS (providers v2) -->
    <!-- Section title -->

    <v-slide-y-transition>
      <!-- Watch Options title -->
      <div v-if="is_clean || (is_done && hasApp) || bypass">
        <div style="display: flex; align-items: center; margin-top: 10px">
          <b>{{ $t('popup.watchOptions') }}: </b>
          <CountrySelect v-if="selection.availability" :size="25" style="margin-left: 8px" />
          <div v-if="displayProviders.length" style="font-size: 80%; margin-left: 8px">
            {{ $t('popup.poweredBy') }}
            <a href="https://www.justwatch.com" target="_blank">
              <img height="9" src="images/providers/justwatch-rectangle.png" alt="JustWatch" />
            </a>
          </div>
        </div>

        <div>
          <ProvidersStatus :item="selection" />
        </div>
      </div>
    </v-slide-y-transition>
  </div>
</template>

<script>
import CheckExtension from '@/components/Settings/CheckExtension.vue'
import Settings2 from '@/components/Settings/Settings2.vue'
import ohana from '@/assets/ohana'
import ProvidersStatus from '@/components/Movies/ProvidersStatus.vue'
import CountrySelect from '../Settings/CountrySelect.vue'
import { mapState } from 'vuex'

export default {
  components: {
    CheckExtension,
    Settings2,
    ProvidersStatus,
    CountrySelect,
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
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings']),
    displayProviders() {
      //not offer options where content is not edited!!!
      if (this.is_done) {
        return this.selection.healthyProviders
      } else {
        return this.selection.providers
      }
    },
    joinStatus() {
      return ohana.movies.addInfo(this.selection, this.settings.skip_tags).join_status
    },
    no_settings() {
      return this.joinStatus.status == 'unset'
    },
    is_clean() {
      return this.joinStatus.status == 'clean'
    },
    is_done() {
      return this.joinStatus.status == 'done'
    },
    is_mixed() {
      return this.joinStatus.status == 'mixed'
    },
    is_unknown() {
      return this.joinStatus.status == 'unknown' || this.joinStatus.status == 'unkown'
    },
    is_missing() {
      return this.joinStatus.status == 'missing'
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
