<template>
  <div class="subpage">
    <my-header></my-header>
    <section class="wrapper" id="main">
      <div class="inner">
        <h4>Discover content</h4>
        <p style="margin-bottom:0px">
          <span
            style="text-decoration:underline; cursor:pointer"
            @click="type = 'movie'"
            >Movies</span
          >
          |
          <span
            style="text-decoration:underline;cursor:pointer"
            @click="type = 'show'"
            >Shows</span
          >
        </p>

        <div class="posters_wrapper">
          <div class="poster_card" v-for="(item, index) in items" :key="index">
            <div class="image">
              <img
                :src="
                  'https://image.tmdb.org/t/p/w300' +
                    item.data.metadata.poster_path
                "
                alt=""
              />
            </div>
            <b>{{ item.data.metadata.title }}</b>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      loading: false,
      type: 'movie'
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
    listType(type) {
      var auxx = []
      this.data.forEach(e => {
        if (e.data.tagged) {
          if (Object.keys(e.data.tagged).length > 0) {
            if (e.data.metadata.type == type) {
              auxx.push(e)
            }
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
  }
}
</script>

<style scoped>
div.posters_wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
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
</style>
