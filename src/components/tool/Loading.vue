<template>
  <div class="loading" v-show="isLoading">
    <span class="icon icon-loading"></span>
  </div>
</template>

<script>
export default {
  props: ['isLoading']
}
</script>

<style lang="stylus">
.loading
  width 100%
  height 100%
  position fixed
  z-index 1000
  background rgba(0,0,0,0.1)
  .icon
    display block
    margin 150px auto
    width 50px
    height 50px
    background url(../../assets/icon/loading.svg) no-repeat
    background-size cover
    animation anit 0.5s linear infinite
@keyframes anit
  from
    transform rotate(0deg)
  to
    transform rotate(360deg)
</style>
