<template>
  <div class="life-container">
    <Banner></Banner>
    <input-com v-show="isAdmin" />
    <preview-image v-show="previewImage"></preview-image>
    <div class="life-list" v-if="lifeData.length">
      <list-item v-for="item in lifeData" :key="item._id" :item="item" :showLink="true"></list-item>
    </div>
    <load-more v-on:custom-loadMore="loadMore" :loadView="loadedOver"></load-more>
  </div>
</template>

<script>
import axios from 'axios'
import Banner from './item/Banner.vue'
import ListItem from './item/listItem.vue'
import LoadMore from '@/components/tool/LoadMore.vue'
import InputCom from '@/components/tool/InputComponent.vue'
import PreviewImage from './item/PreviewImage.vue'
export default {
  name: 'life',
  data () {
    return {
      currentLength: 0,
      loadedOver: false
    }
  },
  computed: {
    previewImage () {
      return this.$store.getters.getShowPreviewImage
    },
    isAdmin () {
      const query = this.$route.query
      return query.admin === 'czde'
    },
    lifeData () {
      return this.$store.getters.getLifeData
    }
  },
  methods: {
    getData (api, type) {
      this.$store.dispatch({
        type: 'set_ShowLoading',
        data: false
      })
      axios.get(api).then(res => {
        this.$store.dispatch({
          type: type,
          data: res.data.data
        })
        this.currentLength += res.data.data.length
        if (this.currentLength === res.data.count) {
          this.loadedOver = true
        }
      })
    },
    getLifeData () {
      const apiUrl = '/api/life'
      this.getData(apiUrl, 'set_LifeData')
    },
    loadMore () {
      const len = this.currentLength
      const apiUrl = '/api/life?skip=' + len
      this.getData(apiUrl, 'push_LifeData')
    }
  },
  mounted () {
    this.getLifeData()
  },
  created () {},
  components: {
    Banner,
    ListItem,
    LoadMore,
    InputCom,
    PreviewImage
  }
}
</script>

<style lang="stylus">
.life-container
  width 100%
  max-width 800px
  margin 0 auto
  background-color #fff
  .life-list
    padding 15px 80px 35px 60px
</style>
