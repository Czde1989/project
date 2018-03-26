<template>
  <div class="show-box">
    <div class="top">
      <span><i class="icon icon-image pull-left"></i>图片预览（{{previewImageList.length}}/9）</span>
      <span class="icon icon-close pull-right" title="取消上传图片并关闭预览" @click="close"></span>
    </div>
    <div class="img-box">
      <div class="img" v-for="(item, index) in previewImageList" :key="index">
        <img :src="item" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    previewImageList () {
      return this.$store.getters.getPreviewImageList
    }
  },
  methods: {
    close () {
      this.$store.dispatch({
        type: 'clear_PreviewImageList'
      })
      this.$store.dispatch({
        type: 'set_ShowPreviewImage',
        data: false
      })
    }
  }
}
</script>

<style lang="stylus">
.show-box
  width 600px
  margin 15px auto
  border 1px solid #ddd
  box-sizing border-box
  padding 15px
  .top
    height 24px
    line-height 24px
    font-size 14px
    color #666
    margin-bottom 15px
    .icon
      display block
      width 24px
      height 24px
    .icon-image
      margin-top 2px
      background url(../../../assets/icon/image.svg) no-repeat
      background-size 21.4px 20px
    .icon-close
      cursor pointer
      background url(../../../assets/icon/close_gray.svg) no-repeat
      background-size cover
      &:hover
        background url(../../../assets/icon/close.svg) no-repeat center center
        background-size 20px 20px
  .img-box
    width 100%
    display flex
    flex-flow row wrap
    align-content flex-start
    .img
      flex 33.333%
      max-width 189px
      text-align center
      margin-bottom 5px
      img
        width 180px
</style>
