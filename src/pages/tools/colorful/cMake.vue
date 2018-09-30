<template>
  <div class="colorful-make">
    <div class="upload" @click="choose">
      <canvas :style="{width:canvasWidth+'px',height:canvasHeight+'px'}" canvas-id="canvasIn" class="canvas"></canvas>
      <div v-if="imgPath" class="image" :style="{backgroundImage:'url('+imgPath+')'}"></div>
    </div>
    <div class="select">
      <i v-for="(item, index) in colorsSelect" :key="index" :style="{backgroundColor:'rgb('+item[0]+','+item[1]+','+item[2]+')'}">
      </i>
    </div>
    <scroll-view scroll-y class="card">
      <div class="color" v-for="(item, index) in colorsSelect" :key="index">
        <i @longpress="getCode($event,item)" :style="{backgroundColor:'rgb('+item[0]+','+item[1]+','+item[2]+')'}">
          <span v-if="!imgPath">{{item}}</span>
        </i>
      </div>
      <div class="color" v-for="(item, index) in colors" :key="index">
        <i @longpress="getCode($event,item)" :style="{backgroundColor:'rgb('+item[0]+','+item[1]+','+item[2]+')'}"></i>
      </div>
    </scroll-view>
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
      colors: 0,
      colorsHex: '',
      colorsSelect: ['c', 'o', 'l', 'o', 'r'],
      colorCode: false
    }
  },
  methods: {
    choose () {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          wx.showLoading({
            title: '正在提取'
          })
          this.imgPath = res.tempFilePaths[0]
          console.log('this.imgPath:' + this.imgPath)
          wx.getImageInfo({
            src: res.tempFilePaths[0],
            success: (imgInfo) => {
              // this.canvasWidth = imgInfo.width
              // this.canvasHeight = imgInfo.height
              let {
                path
              } = imgInfo
              let scale = 0.1 * 350 / Math.max(imgInfo.width, imgInfo.height)
              this.canvasWidth = Math.floor(scale * imgInfo.width)
              this.canvasHeight = Math.floor(scale * imgInfo.height)
              setTimeout(() => {
                this.colorThief = new ColorThief('canvasIn')
                this.colorThief.getPalette({
                  width: this.canvasWidth,
                  height: this.canvasHeight,
                  imgPath: path,
                  colorCount: 5,
                  quality: 1
                }, (colors) => {
                  console.log('colors', colors)
                  this.colorsSelect = [colors[0], colors[1], colors[2], colors[3], colors[4]]
                })
              }, 1500)
              setTimeout(() => {
                this.colorThief = new ColorThief('canvasIn')
                this.colorThief.getPalette({
                  width: this.canvasWidth,
                  height: this.canvasHeight,
                  imgPath: path,
                  colorCount: 51,
                  quality: 1
                }, (colors) => {
                  console.log('colors', colors)
                  this.colors = colors
                  wx.hideLoading()
                })
              }, 2000)
            }
          })
        }
      })
    },
    getCode (e, item) {
      wx.setClipboardData({
        data: this.RGB2Hex(item),
        success: (res) => {
          wx.vibrateShort()
          wx.showToast({
            title: '已复制色值',
            icon: 'succeed',
            during: '1000'
          })
        }
      })
    },
    RGB2Hex (e) {
      return '#' + ((1 << 24) + (e[0] << 16) + (e[1] << 8) + e[2]).toString(16).slice(1)
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
    height 35vh
    width 100%
    overflow hidden
    background-color co_10
    .canvas {
      position absolute
      top 0
      left 0
      z-index -100
      &:before {
        content ''
        display inline-block
        height 100%
        width 100%
        position absolute
        background #000
        left 0
        top 0
      }
    }
    .image {
      width 100%
      height 100%
      background-position center center
      background-size cover
      background-repeat no-repeat
      position relative
      z-index 100
    }
  }
  .card {
    margin-top 15px
    height 63vh
    width 100%
    & .color {
      width 20vw
      height 20vw
      float left
      display inline-block
      position relative
      & i {
        font-size 12px
        text-align center
        overflow hidden
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        height 90%
        width 90%
        border-radius 3px
        background-color co_10
        & span {
          position absolute
          top 50%
          left 50%
          display inline-block
          transform translate(-50%, -50%)
          transition 0.3s
          opacity 1
          font-size 18px
          color #333
          opacity .3
        }
      }
    }
  }
  .select {
    width 100%
    overflow hidden
    margin-top 1px
    & i {
      height 1vh
      width 20%
      background-color co_10
      float left
    }
  }
}
</style>