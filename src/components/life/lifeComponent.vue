<template>
  <div class="life-container">
    <Banner></Banner>
    <input-com v-show="isAdmin" />
    <preview-image v-show="previewImage"></preview-image>
    <div class="life-list" v-if="lifeData.length">
      <list-item v-for="item in lifeData" :key="item._id" :item="item" :showLink="true"></list-item>
    </div>
    <load-more></load-more>
  </div>
</template>

<script>
import axios from 'axios'
import Banner from './item/banner.vue'
import ListItem from './item/listItem.vue'
import LoadMore from '@/components/tool/loadMore.vue'
import InputCom from '@/components/tool/inputComponent.vue'
import PreviewImage from './item/previewImage.vue'
export default {
  name: 'life',
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
    getLifeData () {
      axios.get('/api/life').then(res => {
        this.$store.dispatch({
          type: 'set_LifeData',
          data: res.data
        })
      })
    },
    dataHandle (data) {
      data.forEach(item => {
        let arr = []
        const pics = item.pictures
        pics.forEach(pic => {
          let picObj = {
            url: 'http://localhost:3000' + pic
          }
          console.log(this.getImageNatureSize(picObj.url))
          arr.push(picObj)
        })
        item.pictures = arr
      })
      return data
    },
    getImageNatureSize (url) {
      const image = new Image()
      image.onload = function () {
        return {
          nW: this.width,
          nH: this.height
        }
      }
      image.src = url
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
