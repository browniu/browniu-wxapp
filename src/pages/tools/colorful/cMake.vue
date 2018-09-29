<template>
  <div class="colorful-make">
    <div class="upload" @click="choose">
      <canvas canvas-id="canvasIn" class="canvas"></canvas>
      <div class="image" :style="{backgroundImage:'url('+imgPath+')'}"></div>
    </div>
    <div class="card" :style="{backgroundColor:'rgb('+domainColor+')'}"></div>
  </div>
</template>

<script>
import ColorThief from '../../../utils/colorThief.js'

export default {
  data () {
    return {
      imgPath: null,
      canvasWidth: 0,
      canvasHeight: 400,
      domainColor: ''
    }
  },
  methods: {
    choose () {
      wx.chooseImage({
        success: (res) => {
          wx.getImageInfo({
            src: res.tempFilePaths[0],
            success: (res) => {
              this.colorThief.getPalette({
                width: res.width,
                height: res.height,
                imgPath: res.path,
                colorCount: 100
              }, (colors) => {
                console.log('colors', colors)
                this.domainColor = colors[0][0] + ',' + colors[0][1] + ',' + colors[0][2]
              })
              this.imgPath = res.path
              const ctx = wx.createCanvasContext('canvasIn', this)
              ctx.drawImage(res.path, 0, 0, res.width, res.height)
              ctx.draw(false, () => {
                wx.canvasGetImageData({
                  canvasId: 'canvasIn',
                  x: 0,
                  y: 0,
                  width: res.width,
                  height: res.height,
                  success: (res) => {
                    console.log(res)
                  }
                })
              })
            }
          })
        }
      })
    }
  },
  onLoad () {
    this.colorThief = new ColorThief('canvasIn')
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
.colorful-make {
  .upload {
    position relative
    height 50vh
    width 100%
    overflow hidden
    .canvas {
      position absolute
      top 0
      left 0
      height 1px
      width 1px
      opacity 0
    }
    .image {
      width 100%
      height 100%
      background #fff
      background-position center center
      background-size cover
      background-repeat no-repeat
    }
  }
  .card {
    height 100px
    width 100%
    margin-top 10px
    background #000
  }
}
</style>