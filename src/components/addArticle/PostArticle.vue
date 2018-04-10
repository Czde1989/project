<template>
  <div>
    <div class="post-wrapper">
      <p>
        <span>文章标题</span>
        <input type="text" name="title" v-model="formData.title" placeholder="请输入文章标题"></p>
      <p>
        <span>文章分类</span>
        <select v-if="categories.length" v-on:change="selectIndex($event)">
          <option value="">请选择分类</option>
          <option v-for="category in categories" :key="category._id" :value="category._id">{{category.name}}</option>
        </select>
        <em class="text" v-else>还没有分类，先去<router-link to="/add_cate">添加</router-link>吧</em>
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
    <blog-sider></blog-sider>
  </div>
</template>

<script>
import axios from 'axios'
import SiderComponent from '@/components/sider/SiderComponent.vue'
export default {
  name: 'post',
  data () {
    return {
      formData: {
        title: '',
        desc: '',
        content: '',
        tags: [],
        categoryId: ''
      },
      inputVisible: false,
      inputValue: '',
      categories: []
    }
  },
  methods: {
    modelHide () {
      setTimeout(() => {
        this.$store.commit({
          type: 'isShowAlert',
          data: false
        })
      }, 4000)
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
      const data = this.formData
      if (data.title === '') {
        this.showAlert('error', '文章标题不能为空')
        return false
      }
      if (data.categoryId === '') {
        this.showAlert('error', '请选择文章类型')
        return false
      }
      if (data.content === '') {
        this.showAlert('error', '内容不能为空')
        return false
      }
      axios.post('/api/post', data).then(res => {
        if (res.data.status === 'success') {
          this.$router.push('/')
        }
      }).catch(res => {
        console.log(res)
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
    },
    selectIndex (event) {
      this.formData.categoryId = event.target.value
    }
  },
  mounted () {
    const self = this
    axios.get('/api/categories').then(res => {
      this.$store.dispatch({
        type: 'set_ShowLoading',
        data: false
      })
      if (res.status === 200) {
        self.categories = res.data
      }
    })
  },
  components: {
    'blog-sider': SiderComponent
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
    em.text
      display block
      line-height 30px
      margin-top 5px
      padding 0 5px
      background-color #fff
      a
        color: #00B7FF
        text-decoration underline
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
