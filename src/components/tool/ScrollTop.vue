<template>
  <div class="fixed scroll-top" @click="handlerTop" v-show="show">
    <i class="icon icon-top"></i>
  </div>
</template>

<script>
export default {
  name: 'top',
  data () {
    return {
      show: false
    }
  },
  methods: {
    scrollHandler () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 300) {
        this.show = true
      } else {
        this.show = false
      }
    },
    handlerTop () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let oldScrollTop = scrollTop
      let step = 2
      let index = 1
      let timer = setInterval(function () {
        if (scrollTop >= oldScrollTop / 2) {
          index++
          step = step + 0.04 * (2 * index + 1)
        } else {
          index--
          step = step - 0.04 * (2 * index + 1)
        }
        if (scrollTop <= 0) {
          clearInterval(timer)
          document.documentElement.scrollTop = document.body.scrollTop = 0
        } else {
          scrollTop = scrollTop - step
          document.documentElement.scrollTop = document.body.scrollTop = scrollTop
        }
      }, 1)
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollHandler)
  }
}
</script>

<style lang="stylus">
.fixed
  position fixed
  right 100px
  bottom 50px
.scroll-top
  width 30px
  height 30px
  border-radius 4px
  background #fff
  cursor pointer
  .icon-top
    display block
    width 30px
    height 30px
    background url(../../assets/icon/top.svg) center center no-repeat
    background-size 20px 20px
</style>
