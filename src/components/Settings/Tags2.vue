<template>
  <div style="font-size: 90%">
    <p>Click on the below options to define what Ohana TV should do with each kind of content</p>

    <div>
      <table style="margin-bottom: 0; padding: 0px">
        <tr style="cursor: pointer">
          <td style="width: 10px; padding: 0px">
            <v-icon color="red">mdi-checkbox-blank-circle</v-icon>
          </td>
          <td style="text-align: left">
            I consider this content unhealthy to me: please remove it
          </td>
        </tr>
        <tr style="cursor: pointer">
          <td style="width: 10px; padding: 0px">
            <v-icon color="green">mdi-checkbox-blank-circle</v-icon>
          </td>
          <td style="text-align: left">This is healthy content to me: do nothing!</td>
        </tr>
        <tr style="cursor: pointer">
          <td style="width: 10px; padding: 0px">
            <v-icon color="orange">mdi-checkbox-blank-circle</v-icon>
          </td>
          <td style="text-align: left">Warn me, so I can decide later</td>
        </tr>
      </table>
    </div>

    <div v-for="(category, c) in raw_tags.content" :key="c">
      <!-- <p style="margin-top: 30px; font-size: 1.1rem">{{ category.title }}</p>-->
      <h2>{{ category.title }}</h2>

      <div v-for="(sev, s) in raw_tags.content[c].severity" :key="s">
        <table style="margin-bottom: 0; cursor: pointer">
          <tr
            :style="{
              cursor: 'pointer',
              backgroundColor: skipTags.includes(sev.value) ? 'rgba(300,100,100,0.1)' : '',
            }"
            @click="toggleTag(sev.value)"
          >
            <td style="width: 50px; padding: 0px; text-align: center">
              <fc-tooltip
                :text="
                  skipTags.includes(sev.value)
                    ? 'We will skip ' + sev.title
                    : `We won't skip ` + sev.title
                "
              >
                <v-icon style="cursor: pointer" :color="getColor(sev.value)"
                  >{{ getIcon(sev.value) }} <br />
                </v-icon>
                <br /><span style="font-size: 70%; font-weight: 800">
                  {{ skipTags.includes(sev.value) ? 'Skip' : 'No Skip' }}</span
                >
              </fc-tooltip>
            </td>
            <td style="text-align: left">
              <span
                :style="{
                  textAlign: 'left',
                  textDecoration: skipTags.includes(sev.value) ? 'line-through' : 'none',
                }"
              >
                <b>{{ sev.title }}</b
                >:
                {{ sev.description }}
              </span>
              <div style="margin-top: 5px" v-if="false">
                <b style="font-size: 80%">When:</b>
                <v-chip x-small class="mx-1">Always</v-chip>
                <v-chip
                  x-small
                  :class="['mx-1', Math.random() * 10 > 4 ? 'chipdown' : '']"
                  v-for="(context, t) in raw_tags.content[c].context"
                  :key="t"
                  >{{ context.title }}</v-chip
                >
              </div>
            </td>
          </tr>
        </table>
        <hr class="ma-0" v-if="s + 1 < raw_tags.content[c].severity.length" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const rawTags = require('@/assets/raw_tags2')
export default {
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
      return this.settings.skip_tags
    },
  },
  methods: {
    getIcon(tag) {
      console.log(tag)
      //return this.skipTags.includes(tag) ? 'mdi-leaf-off' : 'mdi-leaf'
      return 'mdi-checkbox-blank-circle'
    },

    getColor(tag) {
      return this.skipTags.includes(tag) ? 'red' : 'green'
    },
    toggleTag(tag) {
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

<style lang="scss" scoped></style>
