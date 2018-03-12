<template>
  <section class="art-item">
    <h3>Web缓存</h3>
    <div class="subtitle">
      <span>
        <i class="icon icon-time" title="发表时间:2018-03-07 14:08:52"></i>2018-03-07
      </span>
      <router-link title="分类" to="/archives?type=category&id=1">
        <i class="icon icon-cate"></i>前端知识
      </router-link>
    </div>
    <p class="summary">本文详细介绍浏览器缓存策略，粗略介绍应用层缓存如 LocalStorage，SessionStorage， Cookie 的一些异同和使用场景。</p>
    <div class="art-footer clearfix">
      <div class="tags">
        <span class="icon icon-tag" title="标签"></span>
        <div class="tags-list">
          <a href="/archives?type=category&id=1">基础知识</a>
          <a href="/archives?type=category&id=1">面试总结</a>
        </div>
      </div>
      <div class="summation">
        <span>阅读(100)</span>
        <span>评论(3)</span>
        <router-link to="/detail/12" title="查看全文">全文链接 »</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ArticleComponent',
  mounted () {
    axios.get('/api/articles').then(response => {
      console.log(response)
    }, response => {
      console.log(response)
    })
  }
}
</script>

<style lang="stylus">
.art-item
  margin-bottom 30px
  padding 40px 45px
  box-sizing border-box
  background #fff
  h3
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
  .art-footer
    font-size 12px
    color: #aaa
    .tags
      float left
      line-height 20px
      .icon
        margin-right 3px
        position relative
        top 3px
      .tags-list
        display inline-block
        a
          color #aaa
          margin-right 15px
          cursor pointer
          &:hover
            color #666
            text-decoration underline
    .summation
      float right
      span
        margin-right 15px
      a
        color #555
        text-decoration underline
</style>
