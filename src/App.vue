<template>
  <div id="app">
    <blog-header></blog-header>
    <div class="container clearfix">
      <router-view/>
      <blog-sider></blog-sider>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '@/components/header/HeaderComponent'
import SiderComponent from '@/components/sider/SiderComponent.vue'
import './assets/stylus/base.styl'
export default {
  name: 'App',
  components: {
    'blog-header': HeaderComponent,
    'blog-sider': SiderComponent
  }
}
</script>

<style lang="stylus">
  #app
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
</style>
