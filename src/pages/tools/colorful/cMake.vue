<template>
  <div class="colorful-make">
    <div class="tips" v-if="!imgPath">
      <img @click="choose" src="https://cdn.dribbble.com/users/34020/screenshots/3993396/otp_icon_upload.gif" alt="">
      <p>点击图标拍照取色吧</p>
    </div>
    <div class="upload">
      <div v-if="imgPath" class="panel">
        <i class="iconfont" @click="choose">&#xe7ee;</i>
        <i :class="['iconfont',favoriteSwitch?'act':'']" @click="favorite">&#xe6a2;</i>
      </div>
      <canvas :style="{width:canvasWidth+'px',height:canvasHeight+'px'}" canvas-id="canvasIn" class="canvas"></canvas>
      <canvas canvas-id="canvasShow" class="canvasShow"></canvas>
      <div v-if="imgPath" class="image" :style="{backgroundImage:'url('+imgPath+')'}"></div>
    </div>
    <div class="card">
      <div class="color" v-for="(item, index) in colors" :key="index">
        <i :class="[colorBarSwitch?'act':'']" @longpress="getCode($event,item)" :style="{backgroundColor:'rgb('+item[0]+','+item[1]+','+item[2]+')'}">
          <span :class="[item[0]>200]&&item[1]>200?'black':''">
            <li>{{hexs[index]}}</li>
            <li> {{'R '+item[0]}}</li>
            <li> {{'G '+item[1]}}</li>
            <li> {{'B '+item[2]}}</li>
          </span>
        </i>
      </div>
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
      colors: 5,
      colorsHex: '',
      colorsSelect: [],
      colorCode: false,
      favoriteSwitch: false,
      colorBarSwitch: false,
      hexs: [],
      theDate: '',
      vh: wx.getSystemInfoSync().screenHeight,
      vw: wx.getSystemInfoSync().screenWidth
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
          this.favoriteSwitch = false
          this.colorBarSwitch = false
          wx.getImageInfo({
            src: this.imgPath,
            success: (imgInfo) => {
              let imgRate = imgInfo.width / imgInfo.height
              console.log(imgRate)
              this.renderCanvasShow(imgRate)
              let scale = 0.1 * 350 / Math.max(imgInfo.width, imgInfo.height)
              this.canvasWidth = Math.floor(scale * imgInfo.width)
              this.canvasHeight = Math.floor(scale * imgInfo.height)
              let outime = 0
              var outimerTimer = setInterval(() => {
                outime++
                if (outime > 5) {
                  wx.showToast({
                    icon: 'none',
                    title: '颜色太单调了',
                    during: 1000
                  })
                  setTimeout(() => {
                    clearInterval(outimerTimer)
                    this.imgPath = ''
                  }, 1000)
                }
              }, 1000)
              setTimeout(() => {
                this.colorThief = new ColorThief('canvasIn')
                this.colorThief.getPalette({
                  width: this.canvasWidth,
                  height: this.canvasHeight,
                  imgPath: this.imgPath,
                  colorCount: 100,
                  quality: 99
                }, (colors) => {
                  this.colors = colors
                  this.hexs = [this.RGB2Hex(colors[0]), this.RGB2Hex(colors[1]), this.RGB2Hex(colors[2]), this.RGB2Hex(colors[3]), this.RGB2Hex(colors[4])]
                  clearInterval(outimerTimer)
                  wx.hideLoading()
                  setTimeout(() => {
                    this.colorBarSwitch = true
                  }, 100)
                })
              }, 1000)
            }
          })
        }
      })
    },
    favorite (e) {
      const db = wx.cloud.database()
      db.collection('colorful').get({
        success: res => {
          if (res.data.length > 19) {
            wx.showToast({
              title: '目前只能收藏20条',
              icon: 'none',
              during: 3000
            })
          } else {
            if (!this.favoriteSwitch) {
              this.favoriteSwitch = true
              this.uploadData()
            }
          }
        }
      })
    },
    getCode (e, item) {
      wx.vibrateShort()
      wx.showToast({
        icon: 'none',
        title: '已拷贝色值 ' + this.RGB2Hex(item),
        during: '1000'
      })
      // wx.setClipboardData({
      //   data: this.RGB2Hex(item),
      //   icon: 'none',
      //   success: (res) => {
      //   }
      // })
    },
    RGB2Hex (e) {
      return ('#' + ((1 << 24) + (e[0] << 16) + (e[1] << 8) + e[2]).toString(16).slice(1)).toUpperCase()
    },
    judgeBlack (e) {
      if ((e[0] > 200 && e[1] > 200) || (e[0] > 200 && e[3] > 200) || (e[1] > 200 && e[2] > 200)) {
        this.blackTheme = true
      }
    },
    uploadData () {
      const db = wx.cloud.database()
      db.collection('colorful').where({
        colors: this.hexs
      }).get({
        success: res => {
          console.log('[数据库] [查询记录] 成功: ', res.data)
          if (res.data.length === 0) {
            console.log('is new')
            db.collection('colorful').add({
              data: {
                colors: this.hexs,
                date: this.theDate
              },
              success: function (res) {
                console.log(res)
                wx.showToast({
                  title: '已加入收藏',
                  icon: 'succeed',
                  during: 2000
                })
              }
            })
          } else {
            wx.showToast({
              title: '已经存在了哦',
              icon: 'succeed',
              during: 2000
            })
          }
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
    },
    renderCanvasShow (imgRate) {
      const ctx = wx.createCanvasContext('canvasShow')
      ctx.save()
      if (imgRate < 1) {
        ctx.drawImage(this.imgPath, 0, -((this.vw / imgRate) - (this.vh / 2)) / 2, this.vw, this.vw / imgRate)
      } else {
        ctx.drawImage(this.imgPath, -(((this.vh / 2) * imgRate) - this.vw) / 2, 0, (this.vh / 2) * imgRate, this.vh / 2)
      }
      ctx.restore()
      ctx.draw()
    }
  },
  onLoad () {
    let dateNow = new Date()
    this.theDate = dateNow.getFullYear() + '-' + dateNow.getMonth() + '-' + dateNow.getDate()
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
.colorful-make {
  height 100vh
  overflow hidden
  .tips {
    padding-top 30%
    box-sizing border-box
    position absolute
    top 0
    left 0
    display inline-block
    height 100%
    width 100%
    background #fff
    z-index 99
    text-align center
    & p {
      font-size 14px
      position relative
      top -30px
      color co_2
    }
    & img {
      position relative
      left -5px
    }
  }
  .upload {
    position relative
    height 50vh
    width 100%
    overflow hidden
    background-color co_10
    .panel {
      z-index 101
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      i {
        position absolute
        display inline-block
        bottom 20px
        right 20px
        font-size 32px
        color #fff
        opacity 0.65
        &:last-child {
          right 80px
        }
        &.act {
          color co_14
          opacity 1
        }
      }
    }
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
    .canvasShow {
      position absolute
      height 50vh
      width 100vw
      background #000
      z-index 98 !important
    }
    .image {
      width 100%
      height 100%
      background green
      background-position center center
      background-size cover
      background-repeat no-repeat
      position relative
      z-index 100
      display none
    }
    .switch-tip {
      position absolute
      z-index 100
      bottom 15px
      right 15px
      color #fff
      font-size 16px
    }
  }
  .card {
    padding 5px 0
    height 50vh
    width 100%
    background co_10
    box-sizing border-box
    & .color {
      width 20%
      height 100%
      display inline-block
      position relative
      box-sizing border-box
      &:before {
        position absolute
        display inline-block
        top 0
        right 0
        content ''
        height 100%
        width 1px
        background rgba(255, 255, 255, 0.8)
      }
      &:last-child:before {
        display none
      }
      & i {
        font-size 12px
        text-align center
        background-color co_10
        height 0%
        width 100%
        transition 1s cubic-bezier(0, 0.9, 0.34, 0.99)
        &.act {
          height 100%
          & span {
            opacity 0.3
          }
        }
        & span {
          opacity 0
          position absolute
          right 5px
          top 0
          display inline-block
          font-size 18px
          color #fff
          font-size 12px
          transform scale(0.8)
          text-align-last right
          &.black {
            color #000
          }
        }
      }
    }
  }
}
</style>