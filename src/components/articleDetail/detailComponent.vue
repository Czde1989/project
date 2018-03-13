<template>
  <article class="art-wrapper">
    <header>
      <h1>{{article.title}}</h1>
      <div class="subtitle">
      <span>
        <i class="icon icon-time" :title="'发表时间: '+ article.post_time"></i>{{article.post_time}}
      </span>
      <router-link title="分类" :to="'/archives?type=category&category='+ categoryName">
        <i class="icon icon-cate"></i>{{categoryName}}
      </router-link>
      </div>
    </header>
    <section class="art-content" v-html="article.content"></section>
    <footer class="art-footer">
      <div class="tags" v-if="article.tags.length">
        <div class="tags-list">
          <a v-for="tag in article.tags" :key="tag" :href="'/archives?type=tag&name='+ tag">{{tag}}</a>
        </div>
      </div>
    </footer>
  </article>
</template>

<script>
import marked from 'marked'
import '../../../static/js/prism.js'
import axios from 'axios'
export default {
  name: 'artDetail',
  data () {
    return {
      article: {
        title: '',
        tags: [],
        post_time: ''
      },
      categoryName: ''
    }
  },
  mounted () {
    const artId = window.location.hash.split('detail/')[1]
    axios.get('/api/detail/' + artId).then(res => {
      this.article = res.data
      this.article.content = marked(this.article.content)
      axios.get('/api/category/' + this.article.category).then(res => {
        if (res.status === 200) {
          this.categoryName = res.data.name
        }
      })
    })
  }
}
</script>

<style lang="stylus" scoped>
@import "../../../static/css/markdown-css.css"
@import "../../../static/css/prism.css"
.art-wrapper
  width 850px
  float left
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
  .art-footer
    font-size 12px
    color: #aaa
    .tags
      float left
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
</style>
