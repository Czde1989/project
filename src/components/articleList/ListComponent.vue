<template>
  <div>
    <div class="list-wrapper">
      <list-item v-if="artList.length"
                 v-for="article in artList"
                 :key="article._id"
                 :item="article">
      </list-item>
      <p v-show="artList.length === 0">什么都没有</p>
      <div class="f-page" v-if="pageTotal > 1">
      <span>
        <router-link class="pull-left"
                     :to="'?page=' + (currentPageIndex*1 - 1)"
                     v-if="currentPageIndex > 1"><i class="icon icon-arrow-left"></i>上一页</router-link>
        <span class="pull-left" v-else>没有上一页了</span>
      </span>
        <span>
        <router-link class="pull-right"
                     :to="'?page=' + (currentPageIndex*1 + 1)"
                     v-if="currentPageIndex < pageTotal">下一页<i class="icon icon-arrow-right"></i></router-link>
        <span class="pull-right" v-else>没有下一页了</span>
      </span>
      </div>
    </div>
    <blog-sider></blog-sider>
  </div>
</template>

<script>
import axios from 'axios'
import ArticleComponent from './ArticleComponent.vue'
import SiderComponent from '@/components/sider/SiderComponent.vue'
export default {
  name: 'ListComponent',
  data () {
    return {
      pageTotal: 0,
      currentPageIndex: 1
    }
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
      const index = this.$route.query.page
      let apiURL
      if (index) {
        apiURL = `/api/articles/?page=${index}`
      } else {
        apiURL = `/api/articles/`
      }
      this.getData(apiURL, (res) => {
        console.log(res)
        if (res.data.errno === 0) {
          this.$store.dispatch({
            type: 'set_ArtList',
            data: res.data.data
          })
          this.$store.dispatch({
            type: 'set_ArtCount',
            data: res.data.articleCount
          })
          this.pageTotal = res.data.pageTotal
          this.currentPageIndex = res.data.currentPageIndex
        }
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
  watch: {
    '$route' (from, to) {
      this.getArticles()
    }
  },
  components: {
    'list-item': ArticleComponent,
    'blog-sider': SiderComponent
  }
}
</script>

<style lang="stylus" scoped>
.list-wrapper
  width 850px
  float left
  padding-bottom 50px
  .f-page
    margin-top 15px
    overflow hidden
    padding-top 15px
    border-top 1px solid #ddd
    a, span
      font-size 14px
      color #333
    a:hover
      text-decoration underline
    .icon
      display inline-block
      width 12px
      height 12px
    .icon-arrow-left
      background url(../../assets/icon/arrow-left.svg) no-repeat
      background-size 12px 12px
    .icon-arrow-right
      background url(../../assets/icon/arrow-right.svg) no-repeat
      background-size 12px 12px
</style>
