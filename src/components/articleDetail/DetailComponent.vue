<template>
  <div>
    <div class="art-wrapper" v-if="artDetail.currentArticle">
      <article>
        <header>
          <h1>{{artDetail.currentArticle.title}}</h1>
          <div class="subtitle">
            <span>
              <i class="icon icon-time" :title="'发表时间: '+ formatDate(artDetail.currentArticle.post_time)"></i>{{formatDate(artDetail.currentArticle.post_time)}}
            </span>
            <router-link title="分类" :to="'/archives?type=category&category='+ artDetail.currentArticle.category.name">
              <i class="icon icon-cate"></i>{{artDetail.currentArticle.category.name}}
            </router-link>
            <a @click.prevent="commentAnchor" class="to-comment">#跳到评论#</a>
          </div>
        </header>
        <section class="art-content" v-html="artDetail.currentArticle.content"></section>
        <footer class="art-footer">
          <div class="tags" v-if="artDetail.currentArticle.tags.length">
            <div class="tags-list">
              <a v-for="tag in artDetail.currentArticle.tags" :key="tag" :href="'/archives?type=tag&name='+ tag">{{tag}}</a>
            </div>
          </div>
          <div class="art-links">
            <router-link v-if="artDetail.prevArticle"
                         class="prevBtn pull-left"
                         :to="'/detail/'+ artDetail.prevArticle._id">上一篇：{{artDetail.prevArticle.title}}</router-link>
            <router-link v-if="artDetail.nextArticle"
                         class="nextBtn pull-right"
                         :to="'/detail/'+ artDetail.nextArticle._id">下一篇：{{artDetail.nextArticle.title}}</router-link>
          </div>
        </footer>
      </article>
      <like-share :likeNumber="artDetail.currentArticle.like"></like-share>
      <blog-comment :comments="artDetail.currentArticle.comments"></blog-comment>
    </div>
    <blog-sider></blog-sider>
  </div>
</template>

<script>
import likeAndShare from '../tool/LikeAndShareComponent.vue'
import commentComponent from '../comment/CommentComponent.vue'
import SiderComponent from '@/components/sider/SiderComponent.vue'
import marked from 'marked'
import axios from 'axios'
import { formatDate } from '@/assets/js/util'
export default {
  name: 'artDetail',
  data () {
    return {
    }
  },
  computed: {
    artDetail () {
      const detail = this.$store.getters.getDetailData
      if (detail.currentArticle) {
        detail.currentArticle.content = marked(detail.currentArticle.content)
        detail.currentArticle.comments = detail.currentArticle.comments.reverse()
      }
      return detail
    }
  },
  methods: {
    getArticleDetail () {
      let artId = this.$route.params.id
      axios.get('/api/detail/' + artId).then(res => {
        this.$store.dispatch({
          type: 'set_ShowLoading',
          data: false
        })
        if (res.data) {
          this.$store.dispatch({
            type: 'set_DetailData',
            data: res.data
          })
          this.$store.dispatch({
            type: 'set_ArtCount',
            data: res.data.articleCount
          })
        }
      })
    },
    commentAnchor () {
      let anchorElement = document.getElementById('comment')
      if (anchorElement) {
        anchorElement.scrollIntoView()
      }
    },
    formatDate (postTime) {
      return formatDate(postTime)
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
  },
  components: {
    'like-share': likeAndShare,
    'blog-comment': commentComponent,
    'blog-sider': SiderComponent
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
    &:hover .to-comment
      display inline
  h1
    margin-bottom 15px
    font-weight normal
  .subtitle
    font-size 12px
    line-height 20px
    .to-comment
      display none
    span
      color #aaa
    .icon
      margin-right 3px
      position relative
      top 2px
    a
      color #7594b3
      margin-right 15px
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
  .cm-content
    pre
      background none
      padding 0
      width auto
</style>
