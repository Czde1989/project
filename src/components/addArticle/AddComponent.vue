<template>
  <div class="post-wrapper">
    <p>
      <span>文章标题</span>
      <input type="text" name="title" v-model="formData.title" placeholder="请输入文章标题"></p>
    <p>
      <span>文章分类</span>
      <select>
        <option value="">请选择分类</option>
        <option value="1">HTML</option>
        <option value="2">CSS/CSS3</option>
        <option value="3">JavaScript</option>
      </select>
    </p>
    <p>
      <span>文章摘要</span>
      <input type="text" name="desc" v-model="formData.desc" placeholder="请输入文章摘要"></p>
    <p>
      <span>文章内容</span>
      <textarea type="text" rows="5" name="content" v-model="formData.content" placeholder="请输入文章内容"></textarea>
    </p>
    <p>
      <span v-if="formData.tags.length" v-for="(tag, index) in formData.tags" :key="tag" @click="del(index)" class="el-tag">{{tag}}<i class="icon icon-close"></i></span>
      <input v-if="inputVisible"
             type="text" ref="saveTagInput"
             class="input-tag" v-model="inputValue"
             @keyup.enter="handleInputConfirm"
             @blur="handleInputConfirm">
      <button class="add-tag" v-else @click="showInput">新增标签</button>
    </p>

    <button class="submit" @click="submit">发布</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'post',
  data () {
    return {
      formData: {
        title: '',
        desc: '',
        content: '',
        tags: []
      },
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    submit () {
      const data = this.formData
      axios.post('/api/post', data).then(response => {
        console.log(response)
      }).catch(response => {
        console.log(response)
      })
    },
    del (index) {
      this.formData.tags.splice(index, 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.formData.tags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style lang="stylus">
.post-wrapper
  width 850px
  float left
  .submit
    background-color #fff
    border none
    width 100px
    padding 10px 25px
    border-radius 3px
    margin-top 15px
    cursor pointer
    &:hover
      background-color #f8f8f8
  p
    width 850px
    margin 0 0 10px 0
    span
      display block
    input, textarea, select
      width 100%
      box-sizing border-box
      font-size 13px
      line-height 30px
      padding 0 5px
      margin-top 5px
      outline none
    select
      appearance:none;
      -moz-appearance:none;
      -webkit-appearance:none;
      width 450px
      height 30px
      border none
    .input-tag
      width 100px
      height 30px
      line-height 30px
    .add-tag
      border-radius 2px
      background-color none
      border none
      padding 8px 10px
      cursor pointer
    .el-tag
      display inline-block
      padding 8px 10px
      border-radius 2px
      background-color #fff
      margin-right 5px
      font-size 12px
      .icon-close
        display inline-block
        width 12px
        height 12px
        position relative
        left 5px
        top 1px
        background url(../../assets/icon/close.svg) center center no-repeat
        background-size 8px 8px
        cursor pointer
        &:hover
          background-color #00B7FF
          border-radius 50%
</style>
