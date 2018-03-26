<template>
  <div id="app">
    <blog-load :isLoading="showLoading"></blog-load>
    <blog-header></blog-header>
    <div class="container clearfix">
      <router-view/>
      <blog-top></blog-top>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '@/components/header/HeaderComponent'
import TopComponent from '@/components/tool/ScrollTop'
import Loading from '@/components/tool/Loading'
import './assets/stylus/base.styl'
export default {
  name: 'App',
  computed: {
    showLoading () {
      return this.$store.getters.getShowLoading
    }
  },
  components: {
    'blog-header': HeaderComponent,
    'blog-top': TopComponent,
    'blog-load': Loading
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
