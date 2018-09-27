<script>
// import 'assets/js/iconfont.js'
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
  }
}
</script>
<style lang='stylus'>
@import 'assets/styles/iconfont.css'
html, body {
  margin 0
  padding 0
  overflow hidden
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
}
// /* this rule will be remove */
* {
  transition width 2s
  -moz-transition width 2s
  -webkit-transition width 2s
  -o-transition width 2s
}
@font-face {
  font-family 'iconfont' /* project id 796664 */
  src url('//at.alicdn.com/t/font_796664_o203xek2cr.eot')
  src url('//at.alicdn.com/t/font_796664_o203xek2cr.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_796664_o203xek2cr.woff') format('woff'), url('//at.alicdn.com/t/font_796664_o203xek2cr.ttf') format('truetype'), url('//at.alicdn.com/t/font_796664_o203xek2cr.svg#iconfont') format('svg')
}
.iconfont {
  font-family 'iconfont'
  font-size 16px
  font-style normal
  color #9e9595
}
.navigatePosition {
  box-sizing border-box
  padding-top 70px
}
</style>
