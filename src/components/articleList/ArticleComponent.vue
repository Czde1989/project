<template>
  <section class="art-item">
    <h3>{{item.title}}</h3>
    <div class="subtitle">
      <span>
        <i class="icon icon-time" :title="'发表时间: '+ formatDate"></i>{{formatDate}}
      </span>
      <router-link title="分类" :to="'/archives?type=category&category='+ categoryName">
        <i class="icon icon-cate"></i>{{categoryName}}
      </router-link>
    </div>
    <p class="summary">{{item.desc}}</p>
    <div class="art-footer clearfix">
      <div class="tags" v-if="item.tags.length">
        <span class="icon icon-tag" title="标签"></span>
        <div class="tags-list">
          <a v-for="tag in item.tags" :key="tag" :href="'/archives?type=tag&name='+ tag">{{tag}}</a>
        </div>
      </div>
      <div class="summation">
        <span>阅读({{item.views}})</span>
        <span>评论({{item.comments.length}})</span>
        <router-link :to="'/detail/'+ item._id" title="查看全文">全文链接 »</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ArticleComponent',
  props: ['item'],
  data () {
    return {
      categoryName: ''
    }
  },
  computed: {
    formatDate () {
      let time, yy, MM, dd, hh, mm, ss
      time = new Date(this.item.post_time)
      yy = time.getFullYear()
      MM = time.getMonth() + 1
      dd = time.getDate()
      hh = time.getHours()
      mm = time.getMinutes()
      ss = time.getSeconds()
      return yy + '-' + (MM > 9 ? MM : '0' + MM) + '-' + (dd > 9 ? dd : '0' + dd) + ' ' + (hh > 9 ? hh : '0' + hh) + ':' + (mm > 9 ? mm : '0' + mm) + ':' + (ss > 9 ? ss : '0' + ss)
    }
  },
  mounted () {
    const cateId = this.item.category
    axios.get('/api/category/' + cateId).then(res => {
      this.categoryName = res.data.name
    })
  }
}
</script>

<style lang="stylus" scoped>
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
