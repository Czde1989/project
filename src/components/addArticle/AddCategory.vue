<template>
  <div>
    <div class="add-category">
      <h2>添加博客分类</h2>
      <p>
        <span>分类名称：</span>
        <input type="text" v-model="inputValue">
      </p>
      <button class="submit" @click="submit">确认添加</button>
    </div>
    <blog-sider></blog-sider>
  </div>
</template>

<script>
import SiderComponent from '@/components/sider/SiderComponent.vue'
import axios from 'axios'
export default {
  name: 'addCategory',
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    modelHide () {
      setTimeout(() => {
        this.$store.commit({
          type: 'isShowAlert',
          data: false
        })
      }, 3000)
    },
    showAlert (type, text) {
      this.$store.dispatch({
        type: 'set_Alert',
        data: {
          show: true,
          type: type,
          text: text
        }
      })
      this.modelHide()
    },
    submit () {
      const self = this
      if (this.inputValue === '') {
        this.showAlert('error', '您还没有添加分类呢')
        return
      }
      axios.post('/api/add_cate', {name: this.inputValue}).then(res => {
        this.showAlert('success', res.data.message)
        self.inputValue = ''
      }).catch(res => {
        console.log(res)
      })
    }
  },
  mounted () {
    this.$store.dispatch({
      type: 'set_ShowLoading',
      data: false
    })
  },
  components: {
    'blog-sider': SiderComponent
  }
}
</script>

<style lang="stylus">
.add-category
  width 850px
  background-color #fff
  padding: 15px 20px
  box-sizing border-box
  float left
  .submit
    background-color #efefef
    color #333
    border none
    width 120px
    padding 10px 25px
    border-radius 3px
    margin-top 15px
    cursor pointer
    outline none
    &:hover
      background-color #bfbfbf
      color #fff
  p
    width 850px
    margin 20px 0 10px 0
    span
      display inline-block
    input
      width 70%
      border 1px solid #efefef
      border-radius 3px
      box-sizing border-box
      font-size 13px
      line-height 30px
      padding 0 5px
      margin-top 5px
      outline none
</style>
