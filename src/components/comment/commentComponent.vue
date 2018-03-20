<template>
  <div class="comment-panel" id="comment">
    <h1 class="panel-title">评论（{{commentList.length}}）</h1>
    <div class="comments-list" v-if="commentList.length">
      <Item v-for="(comment, index) in commentList" :key="index" :item="comment" :index="commentList.length - index"></Item>
    </div>
    <blog-input></blog-input>
  </div>
</template>

<script>
import Item from './comItemComponent.vue'
import inputCommentArea from './inputCommentArea.vue'
export default {
  props: ['comments'],
  data () {
    return {}
  },
  computed: {
    commentList () {
      return this.comments
    }
  },
  components: {
    Item,
    'blog-input': inputCommentArea
  }
}
</script>

<style lang="stylus">
.comment-panel
  width 100%
  box-sizing border-box
  padding 40px 45px 100px 45px
  background-color #fff
  .panel-title
    font-size 30px
    margin 0
  .comments-list
    margin 30px 0 50px 0
</style>
