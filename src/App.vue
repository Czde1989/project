<template>
  <div id="app">
    <blog-header></blog-header>
    <div class="container clearfix">
      <router-view/>
      <blog-top></blog-top>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '@/components/header/HeaderComponent'
import TopComponent from '@/components/tool/scrollTop'
import './assets/stylus/base.styl'
export default {
  name: 'App',
  components: {
    'blog-header': HeaderComponent,
    'blog-top': TopComponent
  }
}
</script>

<style lang="stylus">
  #app
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    .container
      padding 0 15px 30px 15px
</style>
