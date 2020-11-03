<template>
  <div class="subpage">
    <my-header></my-header>
    <section class="wrapper" id="main">
      <div class="inner">
        <h4>Discover content</h4>
        <p style="margin-bottom:0px">
          Please, first check the kind of content that you want to avoid:
        </p>

        <div id="your-filters" class="row" style="margin-top:0px">
          <div
            v-for="(tag, index) in tags"
            :key="index"
            class="3u 6u(medium) 6u$(small)"
          >
            <div v-if="tag.severity.length > 0">
              <b>{{ tag.title }}</b>
              <div v-for="(sev, index) in tag.severity" :key="index">
                <input
                  type="checkbox"
                  :id="sev.value"
                  :value="sev.value"
                  :name="sev.value"
                  v-model="caringTags"
                />

                <label :for="sev.value">{{ sev.title }}</label>
              </div>
            </div>
          </div>

          <!-- <p>{{ caringTags }}</p> -->
        </div>

        <div id="typeContent">
          <p style="margin-bottom:0px">
            <span
              style="text-decoration:underline; cursor:pointer"
              @click="type = 'movie'"
              >Movies ({{ movies.length }})</span
            >
            |
            <span
              style="text-decoration:underline;cursor:pointer"
              @click="type = 'show'"
              >Episodes ({{ shows.length }})</span
            >
          </p>
        </div>

        <div class="posters_wrapper">
          <div class="poster_card" v-for="(item, index) in items" :key="index">
            <div class="image">
              <!-- poster_path -->
              <img
                v-if="item.data.metadata.poster_path"
                :src="
                  'https://image.tmdb.org/t/p/w300' +
                    item.data.metadata.poster_path
                "
                alt=""
              />
              <!-- poster a secas -->
              <img v-else :src="item.data.metadata.poster" alt="" />
            </div>
            <div class="content">
              <div class="shield">
                <img :src="getShieldImage(item)" alt="" width="50px" />
              </div>
              <b>{{ item.data.metadata.title }}</b>
              <br />
              {{ getCaringScenes(item) }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
//rawTags = require('../js/raw_tags')
export default {
  data() {
    return {
      data: [],
      loading: false,
      type: 'movie',
      tags: require('@/assets/raw_tags').content,
      caringTags: []
    }
  },
  watch: {
    caringTags(newValue) {
      localStorage.caringTags = JSON.stringify(newValue)
    }
  },
  computed: {
    items() {
      return this.listType(this.type)
    },
    movies() {
      return this.listType('movie')
    },
    shows() {
      return this.listType('show')
    }
  },
  methods: {
    getCaringScenes(item) {
      //return 'kaixo there' + item.data.metadata.title
      var caringScenes = {}
      if (item.data) {
        if (item.data.scenes) {
          item.data.scenes.forEach(scene => {
            this.caringTags.forEach(ct => {
              if (scene.tags.includes(ct)) {
                if (!caringScenes[ct]) {
                  caringScenes[ct] = 0
                }
                caringScenes[ct] = caringScenes[ct] + 1
              }
            })
          })
        }
      }

      var taggedAux = {}
      this.caringTags.forEach(ct => {
        if (item.data.tagged[ct]) {
          taggedAux[ct] = item.data.tagged[ct].status
        }
      })

      return taggedAux
    },
    getShieldImage(item) {
      var shield = this.getShield(item)
      return '/fc/' + shield + '.png'
    },
    getShield(item) {
      var finalStatus = 3 //1:missing, 2: unknown, 3:protected

      if (!item.data.tagged) {
        finalStatus = 2
      } else {
        this.caringTags.forEach(ct => {
          var auxx
          if (!item.data.tagged[ct]) {
            auxx = 2
          } else {
            var s = item.data.tagged[ct].status
            auxx = s == 'done' ? 3 : s == 'missing' ? 1 : 2
          }
          if (auxx < finalStatus) {
            finalStatus = auxx
          }
        })
      }

      //console.log(finalStatus, item)
      //getShield(item)
      var shield =
        finalStatus == 3
          ? 'protected'
          : finalStatus == 1
          ? 'missing'
          : 'unknown'
      return shield
    },
    listType(type) {
      var auxx = []
      this.data.forEach(e => {
        //TODO: check if tagged content
        {
          if (e.data.metadata.type == type) {
            auxx.push(e)
          }
        }
      })
      return auxx
    },
    getData() {
      this.loading = true
      var murl = 'https://arrietaeguren.es/movies/app/get_all'
      fetch(murl)
        .then(response => response.json())
        .then(data => {
          this.data = data
          this.loading = false
        })
    }
  },
  mounted() {
    this.getData()
    var xx = localStorage.caringTags
    if (xx && xx != 'undefined') {
      this.caringTags = JSON.parse(xx)
    }
  }
}
</script>

<style scoped>
div.posters_wrapper {
  width: 100%;
  display: flex;
  /*justify-content: space-between;*/
  flex-wrap: wrap;
}

div.posters_wrapper div.poster_card {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 30px;
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
  /*width: calc((100vw - 20.7px * 2 - 5px * 4) / 2);*/
  width: calc(
    (100% - 10px * 4) / 2
  ); /* 100% of the div, minus margins*4, and /2 (so at least 2 posters fit the width*/
  max-width: 208px;
  /*min-width: 10px;*/
}

div.posters_wrapper div.poster_card div.image img {
  width: 100%;
  /*height: 100%;*/
}

div.posters_wrapper div.poster_card div.content {
  width: 100%;
  padding: 26px 10px 12px 10px;
  position: relative;
  white-space: normal;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
}

div.posters_wrapper div.poster_card div.content div.shield {
  position: absolute;
  top: -25px;
  right: 0px;

  width: 38px;
  height: 38px;
  box-sizing: border-box;
}
</style>
