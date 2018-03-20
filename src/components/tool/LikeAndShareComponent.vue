<template>
  <div class="ls-part">
    <div class="widget" :class="{active: likeActived}" @click="likeHandler">
      <span class="icon icon-like"></span>
      <p>点赞（{{like}}）</p>
    </div>
    <div class="widget share" @click="shareHandler">
      <span class="icon icon-share"></span>
      <p>分享</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      likeActived: false,
      like: this.likeNumber
    }
  },
  props: ['likeNumber'],
  methods: {
    likeHandler () {
      const artId = window.location.hash.split('detail/')[1]
      let localStorageOfBlogLike = JSON.parse(window.localStorage.getItem('BLOG_ART_LIKE_RECORD')) || {}
      if (!localStorageOfBlogLike[artId]) {
        this.addArtLikeData(artId, localStorageOfBlogLike)
      }
    },
    shareHandler () {
      console.log('share')
    },
    addArtLikeData (id, localStorageOfBlogLike) {
      axios.get('/api/add_like/' + id).then(res => {
        if (res.status === 200) {
          this.likeActived = true
          this.like += 1
          localStorageOfBlogLike[id] = 1
          window.localStorage.setItem('BLOG_ART_LIKE_RECORD', JSON.stringify(localStorageOfBlogLike))
        }
      })
    },
    getLikeStatus () {
      const artId = window.location.hash.split('detail/')[1]
      let localStorageOfBlogLike = JSON.parse(window.localStorage.getItem('BLOG_ART_LIKE_RECORD'))
      if (localStorageOfBlogLike && localStorageOfBlogLike[artId]) {
        this.likeActived = true
      }
    }
  },
  mounted () {
    this.getLikeStatus()
  }
}
</script>

<style lang="stylus">
.ls-part
  width 100%
  padding 50px 0
  text-align center
  .widget
    width 100px
    display inline-block
    color #555
    margin 0 40px
    cursor pointer
    .icon
      display block
      width 60px
      height 60px
      margin 0 auto
    .icon-like
      background url(../../assets/icon/icon-like.png) no-repeat
      background-size cover
    .icon-share
      background url(../../assets/icon/icon-share.png) no-repeat
      background-size cover
    p
      font-size 14px
  .widget.active
    color #85b7e2
    .icon-like
      background url(../../assets/icon/icon-like-s.png) no-repeat
      background-size cover
</style>
