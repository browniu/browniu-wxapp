<template>
  <div class="colorful-make">
    <div class="upload" @click="choose">
      <canvas :style="{width:canvasWidth+'px',height:canvasHeight+'px'}" canvas-id="canvasIn" class="canvas"></canvas>
      <!-- <div class="image" :style="{backgroundImage:'url('+imgPath+')'}"></div> -->
    </div>
    <div class="card">
      <div class="color" :style="{backgroundColor:'rgb('+item[0]+','+item[1]+','+item[2]+')'}" v-for="(item, index) in colors" :key="index"></div>
    </div>
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
      colors: []
    }
  },
  methods: {
    choose () {
      wx.chooseImage({
        success: (res) => {
          wx.getImageInfo({
            src: res.tempFilePaths[0],
            success: (imgInfo) => {
              this.canvasWidth = imgInfo.width
              this.canvasHeight = imgInfo.height
              this.imgPath = imgInfo.path
              this.colorThief.getPalette({
                width: this.canvasWidth,
                height: this.canvasHeight,
                imgPath: this.imgPath,
                colorCount: 51,
                quality: 1
              }, (colors) => {
                console.log('colors', colors)
                this.colors = colors
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
    height 50vh
    width 100%
    & .color {
      width 2%
      height 100%
      display inline-block
    }
  }
}
</style>