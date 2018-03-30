<template>
  <div class="comment">
    <div class="cm-top clearfix">
      <p class="info pull-left">
        <a :href="item.website" class="link" target="_blank" v-if="item.website">{{item.username}}</a>
        <span class="name" v-else>{{item.username}}</span>
        <span class="time">{{formatDate}}</span>
      </p>
      <p class="pull-right">
        <span class="quote" @click="replyHandler">回复</span>
        <span class="floor">{{index}}楼</span>
      </p>
    </div>
    <div class="cm-content" v-html="formatHtml"></div>
  </div>
</template>

<script>
import marked from 'marked'
import { formatDate } from '@/assets/js/util'
export default {
  props: ['item', 'index'],
  computed: {
    formatDate () {
      return formatDate(this.item.time)
    },
    formatHtml () {
      return marked(this.item.content || '')
    }
  },
  methods: {
    replyHandler () {
      this.$store.dispatch({
        type: 'set_ReplyMsg',
        data: {
          showInput: true,
          msg: this.item
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.comment
  width 100%
  overflow hidden
  padding 20px 0 22px 0
  border-bottom 1px dashed #eee
  &:hover .cm-top .quote
    display inline
  .cm-top
    font-size 13px
    color #999
    overflow hidden
    .link
      color #3a3a3a
      text-decoration underline
    .name
      font-size 16px
      color #3a3a3a
      margin-right 5px
    .quote
      margin-right 20px
      text-decoration underline
      cursor pointer
      display none
      &:hover
        color #333
  .cm-content
    margin-top 5px
    line-height 21px
    blockquote
      background-color #f8f8f8
      padding 10px 14px
      font-size 12px
      border-left 3px solid #eee
      margin-bottom 10px
      pre
        margin 0 0 5px 0
        font-weight blod
        color #555
</style>
