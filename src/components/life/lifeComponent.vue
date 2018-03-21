<template>
  <div class="life-container">
    <Banner></Banner>
    <input-com v-show="showInputCom" />
    <div class="life-list">
      <list-item></list-item>
      <list-item></list-item>
      <list-item></list-item>
    </div>
    <load-more></load-more>
  </div>
</template>

<script>
import Banner from './item/banner.vue'
import ListItem from './item/listItem.vue'
import LoadMore from '@/components/tool/loadMore.vue'
import InputCom from '@/components/tool/inputComponent.vue'
export default {
  name: 'life',
  data () {
    return {
      showInputCom: true
    }
  },
  computed: {},
  methods: {},
  mounted () {},
  created () {},
  components: {
    Banner,
    ListItem,
    LoadMore,
    InputCom
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
