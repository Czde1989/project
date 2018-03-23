<template>
  <div class="input-box">
    <div class="inner">
      <form id="form" enctype="multipart/form-data">
        <textarea class="input-area" placeholder="说点什么吧" v-model="formData.content"></textarea>
        <div class="upload-box">
          <span class="icon upload-image" title="上传相册图片" @click="uploadImage"></span>
          <span class="icon upload-audio" title="上传音乐视频" @click="uploadAudio"></span>
        </div>
        <input type="file" name="lifePic" ref="picFileBtn" id="picFileBtn" multiple="multiple"/>
        <input type="file" name="lifeAudio" ref="audioFileBtn" id="audioFileBtn"/>
      </form>
    </div>
    <button class="submit" @click="submitHandler">发表</button>
  </div>
</template>

<script>
import { html5FileReader } from '@/assets/js/upload'
import axios from 'axios'
export default {
  data () {
    return {
      formData: {
        content: '',
        lifePic: [],
        lifeAudio: []
      }
    }
  },
  methods: {
    uploadImage () {
      const inputFile = this.$refs.picFileBtn
      inputFile.click()
      inputFile.onchange = () => {
        this.previewImage(inputFile.files)
        inputFile.onchange = null
      }
      // inputFile.addEventListener('change', function () {
      // this.uploadPictureHandler(inputFile.files)
      // }.bind(this), false)
    },
    uploadAudio () {
      alert('暂时不支持上传音视频，敬请谅解！')
    },
    submitHandler () {
      if (this.formData.content === '') {
        alert('说点什么吧！')
        return
      }
      let data = new FormData()
      let files = this.$refs.picFileBtn.files
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          data.append('life-pic', files[i])
        }
      }
      data.append('content', this.formData.content)
      axios.post('/api/life', data).then(res => {
        this.$store.dispatch({
          type: 'post_Status',
          data: res.data
        })
        this.formData.content = ''
        this.$refs.picFileBtn.value = ''
        this.$store.dispatch({
          type: 'clear_PreviewImageList'
        })
        this.$store.dispatch({
          type: 'set_ShowPreviewImage',
          data: false
        })
      })
    },
    previewImage (files) {
      for (let key in files) {
        let file = files[key]
        if (Object.prototype.toString.call(file) === '[object File]') {
          if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif') {
            this.formData.lifePic.push(file)
            html5FileReader(file).then(rs => {
              this.$store.dispatch({
                type: 'set_PreviewImageList',
                data: rs
              })
              this.$store.dispatch({
                type: 'set_ShowPreviewImage',
                data: true
              })
            })
          } else {
            console.log('只支持上传jpg/png/gif/jpeg格式的文件，请重新选择')
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.input-box
  width 600px
  margin 0 auto 30px
  .inner
    width 100%
    height 82px
    box-sizing border-box
    position relative
    border 1px solid #ddd
    input[type=file]
      opacity 0
      width 50px
      overflow hidden
      position absolute
      top 25px
      z-index -1
    input[name=lifePic]
      right 50px
    input[name=lifeAudio]
      right 0
    .input-area
      width 500px
      height 80px
      padding 8px
      box-sizing border-box
      border-right 1px solid #ddd
      resize none
      outline none
    .upload-box
      width 100px
      height 80px
      position absolute
      right 0
      top 0
      cursor pointer
      .icon
        display inline-block
        width 50px
        height 100%
        box-sizing border-box
      .upload-audio
        float right
        background url(../../assets/icon/audio.svg) center center no-repeat
        background-size 25px 25px
        &:hover
          background url(../../assets/icon/audio_s.svg) center center no-repeat
          background-size 25px 25px
      .upload-image
        border-right 1px solid #ddd
        background url(../../assets/icon/camera.svg) center center no-repeat
        background-size 30px 30px
        &:hover
          background url(../../assets/icon/camera_s.svg) center center no-repeat
          background-size 30px 30px
  .submit
    outline none
    margin-top 8px
    color #fff
    background rgba(19,142,243,0.8)
    border none
    width 100px
    padding 8px 0
    cursor pointer
    &:hover
      background rgba(19,142,243,1)

</style>
