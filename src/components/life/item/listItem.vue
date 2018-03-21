<template>
  <div class="life-item">
    <div class="left">
      <div class="date" title="2018-03-21 15:43:50">
        <p class="day">21</p>
        <p class="month">3月</p>
      </div>
      <p class="year">2018</p>
    </div>
    <div class="main">
      <div class="img-box">
        <img src="../../../../static/images/life/along.jpg" alt="">
      </div>
      <div class="text-box">所以说生活一定不能太平淡，你总得给自己制造点波澜，就像黑暗之后才能迎来光明，大悲过后才愿图强。</div>
      <div class="tag-box">
        <span>● 坚持信仰</span>
      </div>
      <div class="link-box">
        <router-link to="/life/:id">热度（120）</router-link>
        <router-link to="/life/:id">评论（12）</router-link>
        <router-link to="/life/:id">全文链接</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
.life-item
  display flex
  &:not(:first-child)
    margin-top 50px
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
