<template>
  <div class="list-wrapper">
    <list-item v-if="artList.length"
               v-for="article in artList"
               :key="article._id"
               :item="article">
    </list-item>
    <p v-show="artList.length === 0">什么都没有</p>
  </div>
</template>

<script>
import axios from 'axios'
import ArticleComponent from './ArticleComponent.vue'
export default {
  name: 'ListComponent',
  data () {
    return {
      artList: []
    }
  },
  mounted () {
    axios.get('/api/articles').then(response => {
      if (response.data) {
        this.artList = response.data
      }
    }, response => {
      console.log(response)
    })
  },
  components: {
    'list-item': ArticleComponent
  }
}
</script>

<style lang="stylus" scoped>
.list-wrapper
  width 850px
  float left
</style>
