<template>
  <div class="sider-wrapper">
    <div class="me">
      <span class="avatar"></span>
      <p>陈章德</p>
      <p class="small">好好学习，天天向上...</p>
    </div>
    <div class="github">
      <a href="https://github.com/Czde1989" target="_blank">
        <i class="icon icon-github"></i>https://github.com/Czde1989
      </a>
    </div>
    <div class="sider-footer">
      <div class="item">
        <strong>{{postArticleNumber}}</strong>
        <p>文章数</p>
      </div>
      <div class="item">
        <strong>{{messageNumber}}</strong>
        <p>留言板</p>
      </div>
      <div class="item">
        <p class="gzh">公众号</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SiderComponent',
  data () {
    return {
      postArticleNumber: 1,
      messageNumber: 0
    }
  }
}
</script>

<style lang="stylus">
.sider-wrapper
  width 315px
  float right
  padding 40px 45px
  box-sizing border-box
  text-align center
  background #fff
  .avatar
    display block
    width 80px
    height 80px
    margin 0 auto 20px
    border-radius 50%
    background url(../../assets/avatar.jpg) center center no-repeat
    background-size cover
  .small
    font-size 14px
    color #ddd
    margin 22px auto 20px
  .github
    font-size 13px
    a
      color #333
    .icon-github
      display inline-block
      width 16px
      height 16px
      margin-right 3px
      background url(../../assets/icon/github.svg) no-repeat
      background-size cover
  .sider-footer
    width 100%
    margin 20px auto
    padding 15px 0
    position relative
    display flex
    div.item
      width 33.33%
      height 38px
      color #333
      strong
        font-weight normal
      p
        font-size 13px
        color #ddd
        margin 0
      p.gzh
        font-size 16px
        color #333
        line-height 38px
    &:before,&:after
      content ''
      display block
      height 1px
      background #bfbfbf
      position absolute
      left 0
      right 0
    &:before
      top 0
    &:after
      bottom 0
</style>
