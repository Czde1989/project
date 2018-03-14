<template>
  <div class="art-wrapper">
    <article v-if="current">
      <header>
        <h1>{{current.title}}</h1>
        <div class="subtitle">
        <span>
          <i class="icon icon-time" :title="'发表时间: '+ current.post_time"></i>{{current.post_time}}
        </span>
        <router-link title="分类" :to="'/archives?type=category&category='+ current.category.name">
          <i class="icon icon-cate"></i>{{current.category.name}}
        </router-link>
        </div>
      </header>
      <section class="art-content" v-html="current.content"></section>
      <footer class="art-footer">
        <div class="tags" v-if="current.tags.length">
          <div class="tags-list">
            <a v-for="tag in current.tags" :key="tag" :href="'/archives?type=tag&name='+ tag">{{tag}}</a>
          </div>
        </div>
        <div class="art-links">
          <router-link v-if="prev"
                       class="prevBtn pull-left" :to="'/detail/'+ prev._id">上一篇：{{prev.title}}</router-link>
          <router-link v-if="next"
                       class="nextBtn pull-right" :to="'/detail/'+ next._id">下一篇：{{next.title}}</router-link>
        </div>
      </footer>
    </article>
  </div>
</template>

<script>
import marked from 'marked'
import axios from 'axios'
export default {
  name: 'artDetail',
  data () {
    return {
      current: null,
      prev: null,
      next: null
    }
  },
  methods: {
    getArticleDetail () {
      const artId = window.location.hash.split('detail/')[1]
      axios.get('/api/detail/' + artId).then(res => {
        this.current = res.data.currentArticle
        this.prev = res.data.prevArticle || null
        this.next = res.data.nextArticle || null
        this.current.content = marked(this.current.content)
      })
    },
    getCategoryName (cateId) {
      axios.get('/api/category/' + cateId).then(res => {
        if (res.status === 200) {
          this.categoryName = res.data.name
        }
      })
    }
  },
  mounted () {
    this.getArticleDetail()
  },
  watch: {
    '$route' (to, from) {
      // 刷新参数放到这里里面去触发就可以刷新相同界面了
      this.getArticleDetail()
    }
  }
}
</script>

<style lang="stylus">
.art-wrapper
  width 850px
  float left
  article
    box-sizing border-box
    padding 40px 45px
    background-color #fff
  h1
    margin-bottom 15px
    font-weight normal
  .subtitle
    font-size 12px
    line-height 20px
    span
      color #aaa
    .icon
      margin-right 3px
      position relative
      top 2px
    a
      color #7594b3
      &:hover
        color #45617d
  .summary
    margin 20px 0
    line-height 26px
  .art-content
    margin 30px auto
    overflow hidden
  .art-footer
    font-size 12px
    color: #aaa
    overflow hidden
    .tags
      line-height 20px
      .tags-list
        display inline-block
        a
          color #555
          margin-right 15px
          padding 3px 5px
          cursor pointer
          background-color #f5f5f5
          &:hover
            background-color #efefef
    .art-links
      width 100%
      overflow hidden
      padding 30px 0 0 0
      margin-top 30px
      border-top 1px solid #f5f5f5
      a
        color #555
        font-size 14px
        &:hover
          text-decoration underline
  pre
    background-color #f5f5f5
    padding 10px 20px
    width 850px
    box-sizing border-box
    overflow scroll
</style>
