<template>
  <transition name="slide-fade">
    <div class="model-wrapper">
      <div class="model-content" :class="className">
        <span class="icon pull-left"></span>{{text}}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: 'info'
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus">
.model-wrapper
  width 250px
  position fixed
  top 100px
  left 50%
  margin-left -125px
  .model-content
    border-radius 3px
    padding 15px
    .icon
      display inline-block
      width 20px
      height 20px
      margin-right 5px
    &.error
      background-color #fef0f0
      boder 2px solid #fde2e2
      color #f56c6c
      .icon
        background url(../../assets/icon/icon-error.svg) no-repeat
        background-size cover
    &.warning
      background-color #fdf6ec
      boder 2px solid #faecd8
      color #e6a23c
      .icon
        background url(../../assets/icon/icon-warning.svg) no-repeat
        background-size cover
    &.success
      background-color #f0f9eb
      boder 2px solid #e1f3d8
      color #67c23a
      .icon
        background url(../../assets/icon/icon-success.svg) no-repeat
        background-size cover
    &.info
      background-color #ebeef5
      boder 2px solid #edf2fc
      color #909399
      .icon
        background url(../../assets/icon/icon-info.svg) no-repeat
        background-size cover
.slide-fade-enter-active
  transition all .3s ease
.slide-fade-leave-active
  transition all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
.slide-fade-enter, .slide-fade-leave-to
  transform translateY(-50px)
  opacity 0
</style>
