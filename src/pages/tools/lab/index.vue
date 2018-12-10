<template>
  <div class="lab">
    <canvas id="test-canvas" class="main" ref="container"></canvas>
  </div>
</template>

<script>
import lottie from 'lottie-miniapp'

export default {
  data () {
    return {
      anim: {},
      ctx: {},
      data: {}
    }
  },
  methods: {
    init () {
      this.canvasInit()
      this.dataInit()
      // this.lottileInit()
    },
    canvasInit () {
      this.ctx = wx.createCanvasContext('test-canvas')
      this.ctx.canvas = {
        width: wx.getSystemInfoSync().windowWidth,
        height: wx.getSystemInfoSync().windowHeight
      }
    },
    lottieInit () {
      this.anim = lottie.loadAnimation({
        renderer: 'canvas',
        loop: true,
        autoplay: true,
        animationData: this.data,
        rendererSettings: {
          context: this.ctx,
          clearCanvas: true
        }
      })
    },
    dataInit () {
      console.log('get data')
      const db = wx.cloud.database()
      db.collection('lottie').doc('5c0dd62ea055b172377d423f').get().then(res => {
        // res.data 包含该记录的数据
        this.data = res.data
        console.log(this.data)
        this.lottieInit()
      })
    }
  },
  onLoad () {
    this.init()
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
.lab {
  .main {
    display inline-block !important
    width 100vw
    height 100vh
    background brown
  }
}
</style>