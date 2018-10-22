<template>
  <div class="voice">
    <canvas canvas-id="myCanvas"></canvas>
  </div>
</template>

<script>
export default {
  data () {
    return {
      info: 1,
      vh: wx.getSystemInfoSync().screenHeight,
      vw: wx.getSystemInfoSync().screenWidth,
      number: 20,
      step: 0.1,
      timer: {}
    }
  },
  methods: {
    drew () {
      const ctx = wx.createCanvasContext('myCanvas')
      let time = setInterval(() => {
        this.info = this.info + this.step
        // console.log(this.info++)
        ctx.clearRect(0, 0, this.vh, this.vw)
        ctx.setFillStyle('brown')
        ctx.globalCompositeOperation = 'lighter'
        for (let index = 0; index < this.number; index++) {
          ctx.fillRect(((this.vw / this.number) - 5) * index, 0, this.vw / this.number, this.info)
        }
        if (this.info > this.vh) {
          clearInterval(time)
        }
        ctx.draw()
      }, 15)
    },
    music () {
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
    }
  },
  onLoad () {
    wx.getSystemInfoSync({
      success: (res) => {
        console.log(res)
      }
    })
    this.music()
    this.drew()
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
.voice {
  color co_3
  canvas {
    background #000
    height 100vh
    width 100vw
  }
}
</style>