<template>
  <div class="list-wrapper">
    <list-item v-if="artList.length"
               v-for="article in artList"
               :key="article._id"
               :item="article">
    </list-item>
    <p v-show="artList.length === 0">什么都没有</p>
  </div>
</template>

<script>
import axios from 'axios'
import ArticleComponent from './ArticleComponent.vue'
export default {
  name: 'ListComponent',
  data () {
    return {}
  },
  computed: {
    artList () {
      return this.$store.getters.getArtList
    }
  },
  methods: {
    getData (url, cb) {
      axios.get(url).then(res => {
        cb(res)
      })
    },
    getArticles () {
      const apiURL = `/api/articles`
      this.getData(apiURL, (res) => {
        this.$store.dispatch({
          type: 'set_ArtList',
          data: res.data
        })
      })
    },
    getMessages () {
      const apiURL = `/api/board`
      this.getData(apiURL, (res) => {
        this.$store.dispatch({
          type: 'set_MsgList',
          data: res.data
        })
      })
    }
  },
  created () {
    this.getArticles()
    this.getMessages()
  },
  components: {
    'list-item': ArticleComponent
  }
}
</script>

<style lang="stylus" scoped>
.list-wrapper
  width 850px
  float left
</style>
