<template>
  <div class="sider-wrapper">
    <div class="me">
      <span class="avatar"></span>
      <p>陈章德</p>
      <p class="small">好好学习，天天向上...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SiderComponent'
}
</script>

<style lang="stylus">
.sider-wrapper
  width 315px
  float right
  padding: 40px 45px
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

</style>
