<template>
  <div class="archive-wrapper">
    <div class="content">
      <div class="posts-collapse pull-left">
        <div class="top">
          {{ title }}
        </div>
        <p style="padding-left: 20px;" v-if="isShow">没有符合此条件的博文</p>
        <div class="collection" v-if="allArticles" v-for="item in allArticles" :key="item.time">
          <h2>{{item.time}}/{{item.children.length}}篇文章</h2>
          <div class="list">
            <div class="art-title" v-for="art in item.children" :key="art._id">
              <router-link :to="'/detail/' + art._id">
                <span class="post-time">{{formatTime(art.post_time)}}</span>{{ art.title }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="archive-side pull-right">
        <h4>分类</h4>
        <ul class="category-list" v-if="categories">
          <li v-for="category in categories" :key="category.category._id">
            <router-link :to="'?type=category&id='+ category.category._id">
              {{category.category.name}} <span>（{{category.cateArt.length}}）</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      isShow: false
    }
  },
  computed: {
    categories () {
      return this.$store.getters.getCategories()
    },
    allArticles () {
      return this.$store.getters.getAllArticles()
    },
    title () {
      const result = this.$store.getters.getCategoryName(this.$route.query.id)
      return result.length ? result[0].name : '全部文章'
    }
  },
  methods: {
    getApiUrl () {
      const query = this.$route.query
      let url = '/api/archives'
      if (query.id) {
        url = url + '?type=' + query.type + '&id=' + query.id
      } else if (query.q) {
        url = url + '?type=' + query.type + '&q=' + query.q
      }
      return url
    },
    getData () {
      const url = this.getApiUrl()
      axios.get(url).then(res => {
        if (res.data.articles.length === 0) {
          this.isShow = true
        } else {
          this.isShow = false
        }
        this.$store.dispatch({
          type: 'set_ShowLoading',
          data: false
        })
        this.$store.dispatch({
          type: 'set_Categories',
          data: res.data.categories
        })
        this.$store.dispatch({
          type: 'set_AllArt',
          data: res.data.articles
        })
        let arts = []
        if (!this.$route.query.type) {
          arts = res.data.articles
          window.sessionStorage.setItem('ALLARTICLES', JSON.stringify({data: arts}))
        } else {
          arts = JSON.parse(window.sessionStorage.getItem('ALLARTICLES')).data
        }
        this.$store.dispatch({
          type: 'set_All',
          data: arts
        })
      })
    },
    formatTime (time) {
      let date = new Date(time)
      let month = date.getMonth() + 1
      let day = date.getDate()
      return (month > 9 ? month : '0' + month) + '-' + (day > 9 ? day : '0' + day)
    },
    routeChange () {
      const url = this.getApiUrl()
      axios.get(url).then(res => {
        if (res.data.articles.length === 0) {
          this.isShow = true
        } else {
          this.isShow = false
        }
        this.$store.dispatch({
          type: 'set_ShowLoading',
          data: false
        })
        this.$store.dispatch({
          type: 'set_AllArt',
          data: res.data.articles
        })
      })
    }
  },
  mounted () {
    this.getData()
  },
  watch: {
    '$route' (from, to) {
      this.routeChange()
    }
  }
}
</script>

<style lang="stylus">
.archive-wrapper
  position fixed
  top 86px
  left 0
  right 0
  bottom 0
  padding-bottom 50px
  overflow-y scroll
  background #fff
  .content
    width 100%
    max-width 1200px
    margin 20px auto
  .posts-collapse
    width calc(100% - 350px)
    position relative
    box-sizing border-box
    padding-right 50px
    border-right 1px dashed #ddd
    .top
      height 30px
      line-height 30px
      padding-bottom 15px
      margin-bottom 20px
      border-bottom 1px dashed #ddd
    .collection
      padding-left 25px
      h2
        position relative
        font-weight normal
        &:before
          content ''
          width 12px
          height 12px
          background #999
          border-radius 50%
          position absolute
          top 50%
          left -25px
          margin-top -6px
          margin-left -6px
    &:after
      content ''
      width 4px
      position absolute
      top 65px
      left 0
      bottom 15px
      z-index -1
      background #f5f5f5
      margin-left -2px
    .art-title
      margin 20px 0
      padding 15px 0
      border-bottom 1px dotted #ddd
      position relative
      &:hover
        a, .post-time
          color #333
        &:before
          background #666
      a
        font-size 18px
        color #555
        display block
      &:before
        content ''
        width 8px
        height 8px
        background #999
        border-radius 50%
        position absolute
        top 50%
        left -25px
        margin-top -4px
        margin-left -4px
    .post-time
      font-size 14px
      color #666
      margin-right 15px
  .archive-side
    width 350px
    height 500px
    box-sizing border-box
    padding 0 25px
  .category-list
    margin 0
    padding 20px
    li
      margin-bottom 25px
      a
        color #666
        display block
      span
        float right
</style>
