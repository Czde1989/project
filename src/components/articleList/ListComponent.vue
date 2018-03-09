<template>
  <div class="list-wrapper">
    <list-item></list-item>
    <list-item></list-item>
    <list-item></list-item>
  </div>
</template>

<script>
import ArticleComponent from './ArticleComponent.vue'
export default {
  name: 'ListComponent',
  components: {
    'list-item': ArticleComponent
  }
}
</script>

<style lang="stylus">
.list-wrapper
  width 850px
  float left
</style>
