export const html5FileReader = (file) => {
  if (typeof FileReader === 'undefined') {
    console.log('你的浏览器不支持FileReader，无法进行上传操作！')
    return
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = function () {
      resolve(this.result)
    }
    reader.readAsDataURL(file)
  })
}
