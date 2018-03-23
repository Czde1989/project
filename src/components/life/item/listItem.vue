<template>
  <div class="life-item">
    <div class="left">
      <div class="date" :title="item.time">
        <p class="day">{{formateDate.day}}</p>
        <p class="month">{{formateDate.month}}月</p>
      </div>
      <p class="year">{{formateDate.year}}</p>
    </div>
    <div class="main">
      <div class="img-box" v-if="item.pictures">
        <span v-for="(pic, index) in item.pictures" :key="index" :class="classname">
          <img :src="'http://localhost:3000' + pic" @load="loadedImage($event)" alt="">
        </span>
      </div>
      <div class="text-box">{{item.content}}</div>
      <div class="tag-box" v-if="item.tags">
        <span v-for="tag in item.tags" :key="tag">● {{tag}}</span>
      </div>
      <div class="link-box" v-show="showLink">
        <router-link :to="'/life/' + item._id">热度（{{item.views}}）</router-link>
        <router-link :to="'/life/' + item._id">评论（{{item.comments.length}}）</router-link>
        <router-link :to="'/life/' + item._id">全文链接</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'showLink'],
  computed: {
    classname () {
      const picArr = this.item.pictures
      let classname = ''
      switch (picArr.length) {
        case 1: classname = 'col-1'
          break
        case 2: classname = 'col-2'
          break
        default: classname = 'col-3'
          break
      }
      return classname
    },
    formateDate () {
      const time = new Date(this.item.time)
      return {
        year: time.getFullYear(),
        month: time.getMonth() + 1,
        day: time.getDate()
      }
    }
  },
  methods: {
    loadedImage (evt) {
      const imgObj = evt.target
      const parent = imgObj.parentNode
      if (parent.className.indexOf('col-1') > -1) return
      const size = { w: parent.offsetWidth, h: parent.offsetHeight }
      const image = new Image()
      image.onload = function () {
        imgObj.style.width = this.width * size.w / this.height + 'px'
        imgObj.style.height = size.h + 'px'
      }
      image.src = imgObj.src
    }
  }
}
</script>

<style lang="stylus">
.life-item
  display flex
  &:not(:first-child)
    margin-top 50px
  &:not(:last-child)
    padding-bottom 25px
    border-bottom 2px dashed #ddd
  .left
    width 84px
    text-align center
    .year
      font-size 20px
      font-weight 600
      color #ccc
    .date
      width 80px
      height 80px
      border 2px solid #828d95
      border-radius 50%
      p
        color #828d95
        margin 0
      .day
        font-size 28px
        line-height 56px
      .month
        font-size 14px
        line-height 1
  .main
    width calc(100% - 84px)
    margin-left 20px
    .img-box
      width 100%
      display flex
      flex-flow row wrap
      align-content flex-start
      span
        overflow hidden
      .col-3
        width 180px
        height 180px
        background-color #032f62
        margin-right 5.33px
        margin-bottom 3px
        img
          position relative
          left 50%
          top 50%
          transform translate(-50%, -50%)
      .col-2
        width 270px
        height 270px
        margin-right 8px
        img
          position relative
          left 50%
          top 50%
          transform translate(-50%, -50%)
      .col-1
        width 100%
      img
        width 100%
    .text-box
      padding 14px 0 0
      font-size 15px
      color #737373
      line-height 24px
    .tag-box
      margin-top 30px
      color #fefefe
      font-size 12px
      font-family "Hiragino Sans GB","Microsoft YaHei",\5FAE\8F6F\96C5\9ED1,tahoma,arial,simsun,\5B8B\4F53
      span
        display inline-block
        padding 2px 10px 2px 8px
        margin 0 12px 10px 0
        cursor default
        white-space nowrap
        border-radius 15px
        background-color #828d95
        transition all 0.2s ease-out
    .link-box
      margin-top 20px
      a
        font-size 12px
        color #828d95
        margin-right 10px
        &:hover
          color #666
</style>
