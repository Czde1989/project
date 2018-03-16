<template>
  <div class="board-wrapper">
    <header class="top">
      <h1>留言板（0）<span class="pull-right" @click="showInputHandler">我要留言</span></h1>
      <blog-input v-show="showInputArea"></blog-input>
    </header>
    <section class="content">
      <Item v-for="(msg, index) in msgList" :key="index" :item="msg" :index="index + 1"></Item>
    </section>
  </div>
</template>

<script>
import Item from '../comment/comItemComponent.vue'
import InputArea from '../comment/inputCommentArea.vue'
export default {
  data () {
    return {
      showInputArea: false,
      msgList: [{
        username: 'ade',
        content: '棒棒哒~~~',
        time: '2018-03-16 17:57:32'
      }]
    }
  },
  methods: {
    showInputHandler () {
      this.showInputArea = true
    }
  },
  components: {
    'blog-input': InputArea,
    Item
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
