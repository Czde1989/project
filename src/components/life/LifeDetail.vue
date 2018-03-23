<template>
  <div class="box">
    <list-item :item="detail" :showLink="false"></list-item>
    <div class="life-post">
      <p>评论</p>
      <p><textarea name="life-comment" v-model="content"></textarea></p>
      <p><button class="submit" @click="submit">发表</button></p>
    </div>
    <div class="life-comment" v-if="detail.comments">
      <div class="list-item" v-for="(item, index) in detail.comments" :key="index">
        <p class="top">
          <span class="ip">{{item.ip}}</span>网友发表评论：
          <span class="pull-right">
            <span class="time">{{item.time}}</span>
            <span>{{index + 1}}楼</span>
          </span>
        </p>
        <p class="content">{{item.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from './item/listItem.vue'
import axios from 'axios'
export default {
  data () {
    return {
      content: '',
      detail: {
        comments: []
      }
    }
  },
  methods: {
    submit () {
      if (this.content === '') {
        alert('您还没输入什么呢')
        return
      }
      axios.post('/api/life-post', {
        id: this.$route.params.id,
        content: this.content
      }).then(res => {
        this.detail = res.data
        this.detail.comments = this.detail.comments.reverse()
        this.content = ''
      })
    },
    getDetail () {
      axios.get('/api/life-detail/' + this.$route.params.id).then(res => {
        this.detail = res.data
        this.detail.comments = this.detail.comments.reverse()
      })
    }
  },
  mounted () {
    this.getDetail()
  },
  components: {
    ListItem
  }
}
</script>

<style lang="stylus" scoped>
.box
  width 100%
  max-width 800px
  margin 0 auto
  box-sizing border-box
  padding 40px 80px 40px 60px
  background-color #fff
  .life-post
    padding-top 20px
    p
      margin-top 0
      margin-bottom 5px
      &:last-child
        text-align right
    textarea
      width 100%
      height 80px
      box-sizing border-box
      padding 10px
      border 1px solid #ddd
      outline none
    .submit
      outline none
      margin-top 8px
      color #fff
      background rgba(19,142,243,0.8)
      border none
      width 100px
      padding 8px 0
      cursor pointer
      &:hover
        background rgba(19,142,243,1)
  .life-comment
    margin-top 30px
    border-top 1px dotted #ddd
    .list-item
      font-size 14px
      color #666
      margin-bottom 20px
      .ip
        text-decoration underline
      .time
        color #999
        font-size 12px
        margin-right 10px
      .content
        background-color #f5f5f5
        padding 8px
</style>
