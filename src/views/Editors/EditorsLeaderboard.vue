<template>
  <div>
    <div class="subpage">
      <section id="main" class="wrapper" style="max-width: 900px; margin: auto">
        <!--   SPANISH TEXT -->
        <div class="inner">
          <EditorsIndex />

          <v-btn v-if="fetchError" @click="getData()">Try again</v-btn>

          <div v-else>
            <p>
              {{ $t('leaderboard.intro') }}
            </p>
            <v-card>
              <v-card-title>
                <v-text-field
                  outlined
                  dense
                  style="max-width: 400px"
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  label="Search"
                  single-line
                  clearable
                  hide-details
                ></v-text-field>
              </v-card-title>
              <div style="overflow-x: auto">
                <!-- TODO: in a wonderful future, we may need to implement server-side pagination -->
                <!-- to keep mobile table as in desktop, add prop: mobile-breakpoint="0" -->
                <v-data-table
                  dense
                  :loading="loading"
                  :search="search"
                  :headers="headers"
                  :items="data.map((x) => x.data)"
                  :items-per-page="10"
                  class="elevation-1"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  mobile-breakpoint="0"
                >
                  <template v-slot:[`item.username`]="{ item }">
                    <router-link :to="'/editors/user/' + clean(item.username)">{{
                      clean(item.username)
                    }}</router-link>
                  </template>
                  <template v-slot:[`item.lastEdited`]="{ item }">
                    <span style="font-size: 8pt">{{ item.lastEdited }}</span>
                  </template>
                </v-data-table>
              </div>
            </v-card>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import EditorsIndex from './EditorsIndex.vue'
import ohana from '@/assets/ohana/index'
export default {
  components: {
    EditorsIndex,
  },
  data() {
    return {
      fetchError: false,
      search: '',
      sortBy: ['tagged'],
      sortDesc: [true],
      headers: [
        { value: 'username', text: 'user' },
        { value: 'uniqueMovies', text: 'movies contributed' },
        { value: 'tagged', text: 'movies tagged' },
        { value: 'addedScenes', text: 'scenes added' },
        { value: 'removedScenes', text: 'scenes removed' },
        { value: 'mapped', text: 'movies mapped' },
        { value: 'valued', text: 'movies valued' },
        { value: 'votes', text: 'total votes' },
        { value: 'lastEdited', text: 'last edited' },
      ],
      data: [],
      loading: false,
    }
  },

  methods: {
    clean(text) {
      console.log('clean', text)
      if (typeof text === 'string') {
        let newtext = text.replace(/\s/g, '')
        newtext = newtext.replace(/@.*/g, '')
        newtext = newtext.toLowerCase()
        //console.log('cleaned', newtext)
        return newtext
      } else {
        //console.log('cleaned', text)
        return text
      }
    },
    async getData() {
      this.loading = true
      let data = []
      try {
        data = await ohana.api.query({
          action: 'getStats',
          about: 'editors',
        })
      } catch (error) {
        this.fetchError = true
        return
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].data.username == 'imdb' || data[i].data.username == 'excel') {
          data.splice(i, 1)
        }
      }

      data.sort((a, b) => {
        return b.data.tagged - a.data.tagged
      })

      this.data = data
      this.loading = false
    },
  },
  mounted() {
    this.getData()
  },
}
</script>

<style scoped></style>
