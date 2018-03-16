<template>
  <div class="comment">
    <div class="cm-top clearfix">
      <p class="info pull-left">
        <span class="name">{{item.username}}</span>
        <span class="time">{{item.time}}</span>
      </p>
      <p class="floor pull-right">{{index}}楼</p>
    </div>
    <div class="cm-content">{{item.content}}</div>
  </div>
</template>

<script>
export default {
  props: ['item', 'index']
}
</script>

<style lang="stylus">
.comment
  width 100%
  overflow hidden
  padding 20px 0 22px 0
  border-bottom 1px dashed #eee
  .cm-top
    font-size 13px
    color #999
    overflow hidden
    .name
      font-size 16px
      color #3a3a3a
      margin-right 5px
  .cm-content
    margin-top 5px
    line-height 21px
</style>
