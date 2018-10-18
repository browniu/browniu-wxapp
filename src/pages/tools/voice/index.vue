<template>
  <div class="voice">
    <canvas style="width: 300px; height: 200px;" canvas-id="myCanvas"></canvas>
    <navigator target="miniProgram" open-type="navigate" app-id="wx2b2d3506dcaec625" path="" extra-data="" version="release">打开绑定的小程序</navigator>
  </div>
</template>

<script>
export default {
  onLoad () {
    // audio
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = false
    innerAudioContext.src = 'http://pb85uax7t.bkt.clouddn.com/QNXT.mp3'
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    console.log(innerAudioContext)
    // canvas
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setFillStyle('green')
    ctx.fillRect(10, 10, 150, 75)
    ctx.draw()
    // animation
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
.voice {
  color co_3
}
</style>