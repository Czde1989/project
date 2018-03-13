<template>
  <div class="add-category">
    <h2>添加博客分类</h2>
    <p>
      <span>分类名称：</span>
      <input type="text" v-model="inputValue">
    </p>
    <button class="submit" @click="submit">确认添加</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'addCategory',
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    submit () {
      const self = this
      if (this.inputValue === '') {
        alert('您还没有添加分类呢')
        return
      }
      axios.post('/api/add_cate', {name: this.inputValue}).then(res => {
        alert(res.data.message)
        self.inputValue = ''
      }).catch(res => {
        console.log(res)
      })
    }
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
