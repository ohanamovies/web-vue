<template>
  <div style="font-size: 90%">
    {{ $t('settings_page.skip_intro') }}
    <br />
    <br />

    <!-- default - ->
    <div style="margin-top: 10px" v-if="true">
      Not sure?
      <span class="modern-link" @click="setDefaultSettings()">use the most used settings</span>.
    </div>
    -->

    <!-- OPTIONS -->

    <div v-for="(category, c) in raw_tags.content" :key="c" style="cursor: pointer">
      <!-- <p style="margin-top: 30px; font-size: 1.1rem">{{ category.title }}</p>-->
      <div v-if="category.value != 'Other'">
        <h2>
          {{ localize(category.title) }}
        </h2>

        <p v-if="category.description">
          <ReadMore :text="localize(category.description)" :max="150" />
        </p>
        <div v-if="true">
          <div v-for="(sev, s) in raw_tags.content[c].severity" :key="s">
            <table style="margin-bottom: 0; cursor: pointer">
              <tr
                :class="skipTags.includes(sev.value) ? 'unhealthy-row' : 'healthy-row'"
                @click="toggleTag(sev.value)"
              >
                <td v-if="false" style="width: 50px; padding: 0px; text-align: center">
                  <v-switch
                    class="ma-0 pa-0 pl-2 mt-2"
                    :color="skipTags.includes(sev.value) ? 'red' : 'lightgreen'"
                    readonly
                    inset
                    dense
                    :input-value="skipTags.includes(sev.value)"
                    hide-details
                  ></v-switch>
                </td>

                <td style="text-align: left">
                  <span :style="{ textAlign: 'left' }">
                    <b>{{ localize(sev.title) }}</b
                    >:
                    {{ localize(sev.description) }}
                  </span>
                  <div style="margin-top: 5px" v-if="false">
                    <b style="font-size: 80%">When:</b>
                    <v-chip x-small class="mx-1">Always</v-chip>
                    <v-chip
                      x-small
                      :class="['mx-1', Math.random() * 10 > 4 ? 'chipdown' : '']"
                      v-for="(context, t) in raw_tags.content[c].context"
                      :key="t"
                      >{{ localize(context.title) }}</v-chip
                    >
                  </div>
                </td>
                <td style="width: 50px; padding: 0px; text-align: center">
                  <fc-tooltip
                    :text="
                      skipTags.includes(sev.value)
                        ? 'We will skip ' + localize(sev.title)
                        : `We won't skip ` + localize(sev.title)
                    "
                  >
                    <v-icon large style="cursor: pointer" :color="getColor(sev.value)"
                      >{{ getIcon(sev.value) }} <br />
                    </v-icon>
                    <br /><span style="font-size: 70%; font-weight: 800">
                      {{ skipTags.includes(sev.value) ? 'Skip' : 'No Skip' }}</span
                    >
                  </fc-tooltip>
                </td>
              </tr>
            </table>
            <hr class="ma-0" v-if="s + 1 < raw_tags.content[c].severity.length" />
          </div>
        </div>
        <br />
        <hr />
        <br />
      </div>
    </div>

    <div style="margin-top: 15px" v-if="skipTags.length">
      <b>Recap:</b> we will help you avoiding any content matching: {{ skipTags.join(', ') }}.

      <span class="modern-link" @click="resetTags()">Reset</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const rawTags = require('@/assets/raw_tags2')
export default {
  components: {},
  data() {
    return {
      key: 'value',
    }
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile', 'settings']),
    raw_tags() {
      return rawTags
    },
    skipTags() {
      return this.settings.skip_tags || []
    },
  },
  methods: {
    localize(textObject) {
      let lan = this.$i18n.locale
      if (lan in textObject) {
        return textObject[lan]
      } else {
        return textObject['en']
      }
    },
    resetTags() {
      let settings = this.settings
      settings.skip_tags = [] //[...this.$store.state.default_settings.skip_tags]

      this.$store.dispatch('updateSettings', settings)
    },
    /**
     * @deprecated
     */
    setDefaultSettings() {
      let settings = this.settings
      settings.skip_tags = ['Very erotic', 'Moderately erotic'] //[...this.$store.state.default_settings.skip_tags]
      this.$store.dispatch('updateSettings', settings)
    },
    getIcon(tag) {
      console.log(tag)
      //return this.skipTags.includes(tag) ? 'mdi-leaf-off' : 'mdi-leaf'
      //return this.skipTags.includes(tag) ? 'mdi-close' : 'mdi-check'
      //return 'mdi-checkbox-blank-circle'
      return this.skipTags.includes(tag) ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off-outline'
    },

    getColor(tag) {
      return this.skipTags.includes(tag) ? 'primary' : 'gray'
    },
    toggleTag(tag) {
      //TODO: select/unselect the implied tags with this one.

      /*console.log('alex', tag)
      let tags = []
      for (let cat of this.raw_tags.content) {
        for (let sev of cat.severity) {
          if (sev.value == tag) {
            tags = [...sev.implies]
          }
        }
      }*/

      let s = { ...this.settings }
      if (this.skipTags.includes(tag)) {
        //remove this tag

        let i = s.skip_tags.indexOf(tag)
        s.skip_tags.splice(i, 1)
        // this.$store.dispatch('updateSettings', s1)
      } else {
        //add this and the implied ones
        s.skip_tags.push(tag)
      }
      this.$store.dispatch('updateSettings', s)
    },

    /*toggleTag(tag) {
      let skip_tags = [...this.skip_tags]



      let n = skip_tags.indexOf(tag) == -1 ? sev_index + 1 : sev_index //n will tell us how many tags of this sev we need to add (adding/removing the clicked one)

      //remove all tags in this category (will re-add soon)
      for (let j = 0; j < this.raw_tags.severitiesR[cat_index].length; j++) {
        const tag = this.raw_tags.severitiesR[cat_index][j]
        let i = skip_tags.indexOf(tag)
        if (i != -1) skip_tags.splice(i, 1)
      }

      //add the ones that make sense based on the one clicked
      for (let j = 0; j < n; j++) {
        const tag = this.raw_tags.severitiesR[cat_index][j]
        skip_tags.push(tag)
      }

      let settings = this.$store.state.settings
      settings.skip_tags = skip_tags

      this.$store.dispatch('updateSettings', settings)
    },*/
  },
}
</script>

<style scoped>
h2 {
  padding-top: 0px;
  font-size: 1.4em;
}
.healthy-row {
  cursor: 'pointer';
  /*background-color: rgba(100, 300, 100, 0.1);*/
  /*background-color: rgba(200, 200, 200, 0.1);*/
}

.healthy-row:hover {
  cursor: 'pointer';
  /*background-color: rgba(100, 300, 100, 0.2);*/
  /* background-color: rgba(150, 150, 150, 0.3);*/
  background-color: rgba(100, 200, 300, 0.1);
}

.unhealthy-row {
  cursor: 'pointer';

  /*background-color: rgba(300, 100, 100, 0.1);*/
  /*background-color: rgba(100, 200, 300, 0.1);*/
}

.unhealthy-row * {
}

.unhealthy-row:hover {
  /*background-color: rgba(300, 100, 100, 0.15);*/
  /* background-color: rgba(100, 200, 300, 0.3);*/
  background-color: rgba(100, 200, 300, 0.1);
}
</style>
