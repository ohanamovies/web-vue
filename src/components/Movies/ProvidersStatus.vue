<template>
  <div>
    <div v-if="providers.length" style="display: flex">
      <div v-for="(p, index) of providers" :key="index">
        <a
          :class="['provider-link', p.providerID ? '' : 'disabled']"
          target="_blank"
          :href="getLink(p.provider, p.providerID)"
          style="position: relative"
          @click.prevent="prevent1(p)"
        >
          <img :src="getLogo(p.provider)" :alt="p.provider" />
          <div style="position: absolute; bottom: 0px; right: 0px">
            <v-icon
              v-if="p.status == 'done'"
              small
              color="green"
              style="background-color: white; border-radius: 50%"
              >{{ p.trust > 3 ? 'mdi-shield-check' : 'mdi-shield-check-outline' }}</v-icon
            >
            <v-icon
              v-else-if="p.status == 'missing'"
              small
              color="red"
              style="background-color: white; border-radius: 50%"
              >{{ p.trust > 3 ? 'mdi-shield-alert' : 'mdi-shield-alert-outline' }}
            </v-icon>
            <v-icon v-else small color="orange" style="background-color: white; border-radius: 50%"
              >mdi-help-circle</v-icon
            >
          </div>
        </a>
      </div>
    </div>
    <div v-else>
      {{ $t('popup.no_providers')[0] }}
      <a
        class="modern-link"
        v-if="item.tmdb"
        target="_blank"
        :href="'https://www.themoviedb.org/' + item.tmdb + '/watch?&locale=' + settings.country"
        >{{ $t('popup.no_providers')[1] }}.
      </a>
    </div>

    <!-- notifiy for unhealthy movies -->
    <v-overlay :value="dialog" :opacity="0.8"></v-overlay>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card style="box-shadow: none">
        <v-card-title style="word-break: break-word" class="text-h5">
          <v-icon :color="dialog_data.color">{{ dialog_data.icon }}</v-icon> &nbsp;
          {{ dialog_data.title }}
        </v-card-title>
        <v-card-text style="word-break: break-word" v-html="dialog_data.text"></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn width="50%" color="green darken-1" text @click="dialog = false"> Cancel </v-btn>
          <v-btn width="50%" color="red darken-1" text @click="openMovie(dialog_data.link)">
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ohana from '@/assets/ohana'
import { mapState } from 'vuex'
export default {
  props: {
    item: {
      type: Object,
      default: function () {
        return { filterStatus: {}, movieFilters: {}, providers: [] }
      },
    },
  },
  data() {
    return {
      dialog: false,
      dialog_data: {
        title: '',
        text: '',
        link: '',
        color: 'red',
        icon: '',
      },
    }
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings']),
    providers() {
      const movieFilters = this.item.movieFilters
      const filterStatus = this.item.filterStatus
      const country = this.settings.country.toLowerCase()

      let providers = []

      if (this.item.availability) {
        providers = this.item.availability
          .split(' ')
          .filter((x) => x.split('_')[1] == country)
          .map((y) => y.split('_')[0])
      } else {
        providers = this.item.providers.map((p) => p.provider)
      }

      let pstatus = {} //{netflix: done, hulu: missing, primevideo: unknown} -> means netflix is ready, hulu nope
      let output = [] // [{provider: netflix, done: true, providerID: xxx}, {provider: hulu, done: false, providerID: xxx} ]

      console.log('this.settings.skip_tags', this.settings.skip_tags)

      //status per provider
      for (const provider of providers) {
        pstatus[provider] = 'done' //until proven otherwise
        for (const tag of this.settings.skip_tags) {
          //Unkown
          if (!filterStatus[tag]) {
            if (pstatus[provider] != 'missing') pstatus[provider] = 'unknown'
            continue
          }

          if (Math.abs(filterStatus[tag].health) < 0.5 && pstatus[provider] == 'done') {
            if (pstatus[provider] != 'missing') pstatus[provider] = 'unknown'
            continue
          } else if (filterStatus[tag].health < -0.5) {
            pstatus[provider] = 'missing'
            continue
          }

          //Missing check
          for (const sid of filterStatus[tag].scenes) {
            //if it's missing a filter, it's not ready
            if (!movieFilters[sid].times[provider]) pstatus[provider] = 'missing'
          }
        }
      }

      //edits for user (how many scenes is the user supposed to skip with its settings)
      let minTrust = Infinity
      let minHealth = Infinity
      let editsCount = 0 //how many edits the user will have
      for (let i = 0; i < this.settings.skip_tags.length; i++) {
        const t = this.settings.skip_tags[i]
        if (this.item.filterStatus[t]) {
          editsCount += this.item.filterStatus[t].scenes.length

          //Also check min health/trust
          if (filterStatus[t].trust < minTrust) {
            minTrust = filterStatus[t].trust
          }
          if (filterStatus[t].health < minHealth) {
            minHealth = filterStatus[t].health
          }
        }
      }

      for (const p in pstatus) {
        const providerID = this.item.providers.find((x) => x.provider == p).providerID
        output.push({
          provider: p,
          status: pstatus[p],
          providerID: providerID,
          trust: minTrust,
          health: minHealth,
          edits: editsCount,
        })
      }

      return output
    },
  },
  methods: {
    prevent1(provider) {
      let link = this.getLink(provider.provider, provider.providerID)
      if (provider.status == 'done' && (this.hasApp || provider.edits == 0)) {
        return this.openMovie(link)
      }

      this.dialog_data.link = link

      if (provider.status == 'done') {
        this.dialog_data.title = 'Danger'

        this.dialog_data.text =
          "You don't have Ohana installed in this browser. If you continue now, <b>you will encounter unhealthy content.</b>"

        this.dialog_data.icon = 'mdi-alert'
        this.dialog_data.color = 'red'
      } else if (provider.status == 'missing') {
        this.dialog_data.title = 'Danger'
        this.dialog_data.text =
          'The ' +
          provider.provider +
          ' version of the movie has not been edited by our users.<br><b>You will find unhealthy content if you continue.</b>'
        this.dialog_data.icon = 'mdi-shield-alert'
        this.dialog_data.color = 'red'
      } else {
        this.dialog_data.title = 'Warning'

        if (provider.health > 0) {
          this.dialog_data.text =
            "Looks healthy, but we don't have strong consensus on content clasification between our users (yet!).<br><b>You may encounter unhealthy content if you continue.</b>"
        } else {
          this.dialog_data.text =
            "We don't have consensus on content clasification between users (yet!).<br><b>You may encounter unhealthy content if you continue.</b>"
        }
        this.dialog_data.icon = 'mdi-help-circle'
        this.dialog_data.color = 'orange'
      }

      this.dialog = true
    },
    openMovie(link) {
      this.dialog = false
      window.open(link, '_blank').focus()
    },
    getLogo(provider) {
      return ohana.providers.getLogo(provider)
    },
    getLink(provider, providerID) {
      return ohana.providers.getLink(provider, providerID)
    },
  },
}
</script>

<style scoped>
.provider-link > img {
  width: 35px;
  margin: 2px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.disabled {
  filter: grayscale(100%);
}

button {
  box-shadow: none;
}
</style>
