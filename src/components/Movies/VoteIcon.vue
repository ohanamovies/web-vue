<template>
  <div>
    <!--

    <v-btn small icon :class="{ inactive: filterStatus(sev).health < 0.5 }" color="green"
      ><v-icon class="pointer">{{
        (item.filterStatus[sev] ? item.filterStatus[sev].scenes.length : 0) == 0
          ? 'mdi-emoticon-happy'
          : 'mdi-content-cut'
      }}</v-icon>
    </v-btn>
  -->
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" @click="dropdown = true">
          <v-icon class="pointer" :color="selectedIcon.color">{{ selectedIcon.icon }}</v-icon>
        </v-btn>
      </template>
      <v-card max-width="200px">
        <v-card-text v-if="loggedIn">
          <div
            style="
              font-size: 110%;
              margin-bottom: 10px;
              padding-bottom: 10px;
              border-bottom: 1px solid rgba(200, 200, 200, 0.3);
              text-align: left;
              font-weight: 500;
            "
          >
            Your vote for {{ tag }}
            <span style="font-size: 85%; color: rgb(170, 170, 170)">(before edits)</span>
          </div>
          <v-list dense class="pa-0">
            <v-list-item
              v-for="(icon, index) in icons"
              :key="index"
              @click="selectIcon(icon)"
              class="px-0"
            >
              <v-list-item-icon class="mr-2">
                <v-icon class="pointer" :color="icon.color">{{ icon.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  {{ icon.text }}
                </v-list-item-title>
                <v-list-item-subtitle v-if="icon.subtitle">
                  {{ icon.subtitle }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <div
            style="
              margin-top: 10px;
              padding-top: 10px;
              border-top: 1px solid rgba(200, 200, 200, 0.3);
              text-align: center;
              font-weight: 500;
            "
          >
            Remember to save!
          </div>
        </v-card-text>
        <v-card-text v-else>
          You need to have an account and log in if you want to share your vote about this content
          <br />
          <router-link to="/settings">Log in</router-link>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    tag: {
      type: String,
      default: '',
    },
    value: {
      type: Object,
      default() {
        return { health: 0 }
      },
    },
  },
  computed: {
    ...mapState(['settings']),
    loggedIn() {
      return this.settings.username ? true : false
    },
  },
  watch: {
    value(newValue) {
      console.log('WATCH NEW VALUE', newValue)
      let a
      if (newValue && newValue.health != undefined) {
        a = this.icons.find((x) => x.value == newValue.health)
      } else {
        a = this.icons.find((x) => x.value == 1)
      }
      this.selectedIcon = a
    },
  },
  data() {
    return {
      dropdown: false,
      icons: [
        {
          icon: 'mdi-emoticon-happy',
          color: 'green',
          text: 'Healthy',
          subtitle: 'No need to edit',
          value: 1,
        },
        //edited icon should appear only if scenes... so we would need to collect that.
        /*{
          icon: 'mdi-content-cut',
          color: 'green',
          text: 'Edited',
          subtitle: 'Healthy after edits',
          value: 1,
        },*/
        {
          icon: 'mdi-flag-variant',
          color: 'red',
          text: 'Unhealthy',
          subtitle: 'Movie has this',
          value: -1,
        },
        {
          icon: 'mdi-progress-question',
          color: 'grey',
          text: "I don't know",
          subtitle: "Can't tell",
          value: 0,
        },
      ],
      selectedIcon: { icon: 'mdi-progress-question', color: 'grey', value: 0 },
    }
  },
  methods: {
    selectIcon(icon) {
      this.selectedIcon = icon
      this.dropdown = false
      this.$emit('input', { health: icon.value })
    },
  },
  mounted() {
    this.selectedIcon = this.icons.find((x) => x.value == this.value.health)
  },
}
</script>

<style scoped>
button {
  box-shadow: none;
  color: initial !important;
}

.pointer {
  cursor: pointer;
}
</style>
