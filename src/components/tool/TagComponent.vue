<template>
  <span class="el-tag">{{item}}<i class="icon icon-close"></i></span>
</template>

<script>
export default {
  name: 'toolTag',
  props: ['item'],
  data () {
    return {

    }
  },
  methods: {
    del (index) {
      console.log(index)
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-tag
  display inline-block
  padding 8px 10px
  border-radius 2px
  background-color #fff
  margin-right 5px
  font-size 12px
  .icon-close
    display inline-block
    width 12px
    height 12px
    position relative
    left 5px
    top 1px
    background url(../../assets/icon/close.svg) center center no-repeat
    background-size 8px 8px
    cursor pointer
    &:hover
      background-color #00B7FF
      border-radius 50%
</style>
