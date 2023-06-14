<template>
  <div>
    <div class="subpage">
      <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
        <div class="inner">
          <EditorsIndex />
          <b>Votes pending provider id: {{ items.length }}</b>
          <p>{{ $t('this_should_be_fixed') }}</p>
          <div v-if="loading">{{ $t('loading') }}</div>
          <div v-else>
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
                  :items="items"
                  :items-per-page="10"
                  class="elevation-1"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  mobile-breakpoint="0"
                >
                  <template v-slot:[`item.targetID`]="{ item }">
                    <a style="font-size: 9pt" :href="watchUrl(item.targetID)" target="_blank">{{
                      item.targetID
                    }}</a>
                  </template>
                  <template v-slot:[`item.users`]="{ item }">
                    <v-chip
                      small
                      class="mr-1"
                      v-for="(user, j) in removeDup(JSON.parse(item.users))"
                      :key="j"
                      :to="'/editors/user/' + clean(user)"
                      >{{ clean(user) }}
                    </v-chip>
                  </template>
                  <template v-slot:[`item.actions`]="{ item }">
                    {{ JSON.parse(item.actions).join(', ') }}
                  </template>
                  <template v-slot:[`item.lastEdit`]="{ item }">
                    <span style="font-size: 8pt; white-space: nowrap">{{
                      item.lastEdit.substr(0, 10)
                    }}</span>
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
      items: [],
      loading: false,

      search: '',
      sortBy: ['tagged'],
      sortDesc: [true],
      headers: [
        { value: 'targetID', text: 'targetID' },
        { value: 'users', text: 'users' },
        { value: 'actions', text: 'actions' },
        { value: 'lastEdit', text: 'lastEdit' },
      ],
    }
  },
  methods: {
    clean(text) {
      if (typeof text === 'string') {
        let newtext = text.replace(/\s/g, '')
        newtext = newtext.replace(/@.*/g, '')
        newtext = newtext.toLowerCase()
        return newtext
      } else {
        return text
      }
    },
    removeDup(arr) {
      return [...new Set(arr)]
    },
    watchUrl(pid) {
      return ohana.providers.getLink2(pid)
    },
    async getData() {
      this.loading = true

      const items = await ohana.api.query({
        action: 'getStats',
        about: 'pendingMapping',
      })
      this.items = items.filter((item) => !item.targetID.startsWith('tt'))
      this.loading = false
    },
  },
  mounted() {
    this.getData()
  },
}
</script>

<style scoped>
tr:nth-child(even) {
  background-color: #f2f2f2;
}
th {
  background-color: #4caf50;
  color: white;
}
</style>
