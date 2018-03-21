<template>
  <div class="input-box">
    <div class="inner">
      <textarea class="input-area" placeholder="说点什么吧" v-model="formData.content"></textarea>
      <div class="upload-box">
        <span class="icon upload-image" title="上传相册图片"></span>
        <span class="icon upload-audio" title="上传音乐视频"></span>
      </div>
      <input type="file" name="lifePic" id="picFileBtn" multiple="multiple"/>
      <input type="file" name="lifeAudio" id="audioFileBtn"/>
    </div>
    <button class="submit">发表</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        content: '',
        lifePic: [],
        lifeAudio: []
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
