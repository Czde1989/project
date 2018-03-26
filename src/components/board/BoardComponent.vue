<template>
  <div>
    <div class="board-wrapper" v-if="msgList">
      <header class="top">
        <h1>留言板（{{msgList.length}}）<span class="pull-right" @click="showInputHandler">我要留言</span></h1>
        <blog-input v-show="showInputArea"></blog-input>
      </header>
      <section class="content">
        <Item v-for="(msg, index) in msgList" :key="index" :item="msg" :index="msgList.length - index"></Item>
      </section>
    </div>
    <blog-sider></blog-sider>
  </div>
</template>

<script>
import axios from 'axios'
import Item from '../comment/ComItemComponent.vue'
import InputArea from '../comment/InputCommentArea.vue'
import SiderComponent from '@/components/sider/SiderComponent.vue'
export default {
  data () {
    return {}
  },
  computed: {
    msgList () {
      return this.$store.getters.getMsgList
    },
    showInputArea () {
      return this.$store.getters.getShowInputArea
    }
  },
  methods: {
    showInputHandler () {
      this.$store.dispatch({
        type: 'set_ReplyMsg',
        data: {
          msg: null,
          showInput: true
        }
      })
    },
    getMessages () {
      axios.get('/api/board').then(res => {
        this.$store.dispatch({
          type: 'set_ShowLoading',
          data: false
        })
        this.$store.dispatch({
          type: 'set_MsgList',
          data: res.data.data
        })
        this.$store.dispatch({
          type: 'set_ArtCount',
          data: res.data.articleCount
        })
      })
    }
  },
  mounted () {
    this.getMessages()
  },
  components: {
    Item,
    'blog-input': InputArea,
    'blog-sider': SiderComponent
  }
}
</script>

<style lang="stylus">
.board-wrapper
  width 850px
  float left
  padding 40px 45px
  box-sizing border-box
  background-color #fff
  .top
    h1
      height 42px
      line-height 42px
      span
        color #00B7FF
        font-size 16px
        line-height 42px
        font-weight normal
        cursor pointer
        &:hover
          text-decoration underline
</style>
