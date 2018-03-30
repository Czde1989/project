<template>
  <div class="comment-box">
    <p class="label">评论<span class="important">*</span>（部分HTML标签可用）</p>
    <textarea class="form-text"
              :class="{on: msg.content}"
              v-model="msg.content"></textarea>
    <p class="label">您的昵称<span class="important">*</span>：</p>
    <input type="text" placeholder="必填" v-model="msg.username">
    <p class="label">Email<span class="important">*</span>：</p>
    <input type="email" placeholder="必填，不公开" v-model="msg.email">
    <p class="label">个人网址：</p>
    <input type="text" placeholder="选填，如有填写可通过您的昵称链接到您的网站" v-model="msg.website">
    <p class="error-tip" v-show="error.show">
      <span class="icon-error"></span>
      <span class="text">{{error.text}}</span>
    </p>
    <p class="sub-btn"><button class="submit" @click.prevent="submit">发表</button></p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      error: {
        show: false,
        text: ''
      },
      commentData: {
        content: '',
        username: '',
        email: '',
        website: ''
      }
    }
  },
  computed: {
    msg () {
      let result = this.commentData
      let quote = this.$store.getters.getReplyMsg
      if (quote) {
        result.content = `<blockquote><pre>引用 ${quote.username} 的发言：</pre>${quote.content}</blockquote>`
      }
      return result
    }
  },
  methods: {
    submit () {
      let data = this.commentData
      for (let item in data) {
        let result = this.validateData(item)
        if (result.show) {
          this.error = result
          break
        }
        this.error = result
      }
      if (this.error.show === false) {
        this.saveData(data)
      }
    },
    validateData (data) {
      const result = {show: false, text: ''}
      switch (data) {
        case 'content':
          if (this.commentData[data] === '') {
            result.show = true
            result.text = '评论内容不能为空'
          }
          break
        case 'username':
          if (this.commentData[data] === '') {
            result.show = true
            result.text = '昵称不能为空'
          }
          break
        case 'email':
          const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
          if (this.commentData[data] === '') {
            result.show = true
            result.text = '电子邮箱不能为空'
          } else if (!reg.test(this.commentData[data])) {
            result.show = true
            result.text = '电子邮箱格式错误'
          }
          break
        default:
          break
      }
      return result
    },
    saveData (data) {
      const path = this.$route.path
      if (path === '/board') {
        axios.post('/api/add_msg', data).then(res => {
          this.$store.dispatch({
            type: 'push_MsgList',
            data: res.data
          })
          this.recover()
        })
      } else {
        const artId = path.split('detail/')[1]
        data['id'] = artId
        axios.post('/api/add_comment', data).then(res => {
          this.$store.dispatch({
            type: 'post_Comment',
            data: res.data
          })
          this.commentData.content = ''
        })
      }
    },
    recover () {
      this.commentData.content = ''
      // this.commentData.username = ''
      // this.commentData.email = ''
      // this.commentData.website = ''
      this.$store.dispatch({
        type: 'set_ReplyMsg',
        data: {
          msg: null,
          showInput: false
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.comment-box
  .label
    font-size 15px
    margin 20px 0 5px 0
  .form-text
    width 500px
    height 50px
    font-size 15px
    border 1px solid #eee
    outline none
    padding 15px
    &.on
      min-height 200px
  .important
    color #ff0000
  input
    border 1px solid #eee
    width 350px
    line-height 35px
    padding-left 10px
    font-size 14px
    color #333
  .submit
    font-size 14px;
    padding 5px 60px;
    color #fff;
    background-color #777;
    border 0;
    outline none
    font-family inherit;
    cursor pointer;
    transition all 0.2s ease-out;
    -moz-transition all 0.2s ease-out;
    -webkit-transition all 0.2s ease-out;
    -o-transition all 0.2s ease-out;
  .error-tip
    font-size 13px
    color #ff0000
    margin 20px 0
    .icon-error
      display inline-block
      width 13px
      height 13px
      background url(../../assets/icon/icon-error.png) no-repeat
      background-size cover
  .sub-btn
    margin-top 20px
</style>
