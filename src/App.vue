<template>
  <div id="app">
    <blog-load :isLoading="showLoading"></blog-load>
    <blog-header></blog-header>
    <div class="container clearfix">
      <router-view/>
      <blog-top></blog-top>
    </div>
    <blog-footer></blog-footer>
    <blog-alert v-show="alertData.show" :className="alertData.type" :text="alertData.text"></blog-alert>
  </div>
</template>

<script>
import HeaderComponent from '@/components/header/HeaderComponent'
import TopComponent from '@/components/tool/ScrollTop'
import Loading from '@/components/tool/Loading'
import Alert from '@/components/tool/ModelComponent'
import Footer from '@/components/footer/FooterComponent'
import './assets/stylus/base.styl'
export default {
  name: 'App',
  computed: {
    showLoading () {
      return this.$store.getters.getShowLoading
    },
    alertData () {
      return this.$store.getters.getAlert
    }
  },
  components: {
    'blog-header': HeaderComponent,
    'blog-top': TopComponent,
    'blog-load': Loading,
    'blog-footer': Footer,
    'blog-alert': Alert
  }
}
</script>

<style lang="stylus">
  #app
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    .container
      padding 0 15px 30px 15px
      min-height calc(100% - 200px)
</style>
