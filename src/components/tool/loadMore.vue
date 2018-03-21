<template>
  <div class="more-wrapper">
    <p>加载更多<span>»</span></p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus">
.more-wrapper
  width 100%
  text-align center
  padding 20px 0
  border-top 1px dotted #ddd
  p
    width 150px
    margin 0 auto
    cursor pointer
    &:hover
      text-decoration underline
    span
      display inline-block
      margin-left 5px
      font-size 18px
      transform rotate(90deg)
</style>
