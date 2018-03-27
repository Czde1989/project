<template>
  <header class="header">
    <div class="container clearfix">
      <a class="logo pull-left" href="/">Czdeの小屋</a>
      <nav class="nav-bar pull-right">
        <div class="nav-list">
          <router-link to="/">首页</router-link>
          <router-link to="/life">点滴</router-link>
          <router-link to="/archives" :class="{'router-link-exact-active': $route.path.indexOf('archives') > -1}">归档</router-link>
          <router-link to="/board">留言板</router-link>
          <!--<router-link to="/about">关于</router-link>-->
          <span class="triangle"></span>
        </div>
        <div class="search-bar" title="支持模糊搜索">
          <input type="text" name="searchText" v-model.lazy="searchText" @change="change" placeholder="搜索标签、标题">
          <span class="icon icon-search"></span>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'HeaderComponent',
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    change () {
      // const data = this.searchText
      // const path = this.$route.path
      this.$router.push({path: '/archives', query: {type: 'search', q: this.searchText}})
      // this.search(path, data)
    }
  }
}
</script>

<style lang="stylus">
  .header
    height: 86px
    margin-bottom 32px
    background-color: #24292c
    .logo
      line-height: 86px
      color: #fff
      padding: 0 20px
      &:hover
        background-color: rgba(255,255,255,0.2)
    .nav-list
      display: inline-block
      position: relative
      a:nth-child(1):hover ~ .triangle,a:nth-child(1).router-link-exact-active ~ .triangle
        left: 30px
      a:nth-child(2):hover ~ .triangle,a:nth-child(2).router-link-exact-active ~ .triangle
        left: 109px
      a:nth-child(3):hover ~ .triangle,a:nth-child(3).router-link-exact-active ~ .triangle
        left: 195px
      a:nth-child(4):hover ~ .triangle,a:nth-child(4).router-link-exact-active ~ .triangle
        left: 285px
      a:nth-child(5):hover ~ .triangle,a:nth-child(5).router-link-exact-active ~ .triangle
        left: 375px
      a
        display: inline-block
        height: 86px;
        line-height: 86px
        padding: 0 23px
        color: #999
        font-size: 16px
        &:hover,&.router-link-exact-active
          color: #fff
          & ~ .triangle
            display: block
      .triangle
        transition: all 0.3s ease-out
        -moz-transition: all 0.3s ease-out
        -webkit-transition: all 0.3s ease-out
        -o-transition: all 0.3s ease-out
        display: none
        position: absolute
        bottom: 0
        width: 0
        height: 0
        padding: 0
        border-left: 8px solid transparent
        border-right: 8px solid transparent
        border-bottom: 8px solid #ededef
    .search-bar
      display: inline-block
      margin-left 23px
      position relative
      .icon
        position: absolute
        left: 11px
        top: 7px
        display: inline-block
        height: 0
        width: 16px
        padding-top: 16px
        text-indent: -9999px
        overflow: hidden
        background: url(../../assets/icon/search.svg) no-repeat
        background-size: cover
      input
        width: 226px
        height: 28px
        padding: 0 10px 0 31px
        border-radius: 30px
        font-size: 12px
        color: #fff
        background-color: #000
        transition: all 0.2s ease-out
        -moz-transition: all 0.2s ease-out
        -webkit-transition: all 0.2s ease-out
        -o-transition: all 0.2s ease-out
        &::-webkit-input-placeholder
          color: #bfbfbf
</style>
