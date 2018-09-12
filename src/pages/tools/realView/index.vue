<template>
  <div class="deviceView">
    <main>
      <div class="container">
        <h1>[
          <span>{{viewHeight}}</span>,
          <span>{{viewWidth}}</span>]</h1>
        <p>{{showInfo}}</p>
      </div>
      <div class="sub">
        <div @click="subInfo" :class="['button',buttonState?'act':'']">{{buttonInfo}}</div>
        <i>包含当前系统及视窗信息将被记录，此类数据可作为优化适配方案的重要参考。</i>
      </div>
      <div class="list">
        <ul class="list-inner">
          <li v-for="(item, index) in dataList" :key="index">
            {{item.view1Device}}
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // upload data
      showInfo: wx.getSystemInfoSync().model + ' | ' + wx.getSystemInfoSync().brand + ' | ' + wx.getSystemInfoSync().system + ' | ' + wx.getSystemInfoSync().statusBarHeight + ' | ' + wx.getSystemInfoSync().benchmarkLevel,
      viewDevice: wx.getSystemInfoSync().model,
      viewHeight: wx.getSystemInfoSync().windowHeight,
      viewWidth: wx.getSystemInfoSync().windowWidth,
      viewInfo: {
        'brand': wx.getSystemInfoSync().brand,
        'system': wx.getSystemInfoSync().system,
        'statusBarHeight': wx.getSystemInfoSync().statusBarHeight,
        'benchmarkLevel': wx.getSystemInfoSync().benchmarkLevel,
        'language': wx.getSystemInfoSync().language,
        'pixelRatio': wx.getSystemInfoSync().pixelRatio,
        'platform': wx.getSystemInfoSync().platform,
        'version': wx.getSystemInfoSync().version,
        'screenHeight': wx.getSystemInfoSync().screenHeight,
        'screenWidth': wx.getSystemInfoSync().screenWidth
      },
      // download data
      dataList: [1, 2, 3],
      buttonInfo: '提交设备信息',
      buttonState: false,
      subCount: 0
    }
  },
  methods: {
    subInfo () {
      if (!this.buttonState) {
        this.buttonInfo = '提交成功，多谢支持'
        this.buttonState = true
        const db = wx.cloud.database()
        const _ = db.command
        db.collection('realView').where(_.and([
          {
            view1Device: _.eq(this.viewDevice)
          },
          {
            view2Height: _.eq(this.viewHeight)
          },
          {
            view3Width: _.eq(this.viewWidth)
          }
        ])).get({
          success: res => {
            console.log('[数据库] [查询记录] 成功: ', res)
            if (res.data.length === 0) {
              console.log('is new')
              db.collection('realView').add({
                data: {
                  view1Device: this.viewDevice,
                  view2Height: this.viewHeight,
                  view3Width: this.viewWidth,
                  view4Info: this.viewInfo,
                  due: new Date('2018-09-01')
                },
                success: function (res) {
                  console.log(res)
                }
              })
            } else {
              wx.showToast({
                icon: 'succeed',
                title: '数据已收录'
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
      }

      this.subCount++

      if (this.subCount === 2) {
        this.buttonInfo = '该机型数据已收录，谢谢'
      }
      if (this.subCount === 3) {
        this.buttonInfo = '感受到了你的热情'
      }
      if (this.subCount === 4) {
        this.buttonInfo = '可以不要调戏我吗'
      }
      if (this.subCount === 5) {
        this.buttonInfo = '请尊重一个按钮的工作'
      }
      if (this.subCount > 5) {
        this.buttonInfo = '你皮任你皮'
      }
    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '真实视窗'
    })
    const db = wx.cloud.database()
    db.collection('realView').get().then(res => {
      this.dataList = res.data
      console.log(res.data)
    })
  }
}
</script>
<style lang='stylus' scoped>
co_g_1 = #9dd6c5
co_g_2 = #e38785
co_g_3 = #34495e
co_g_4 = #f1f1f1
co_g_5 = #a3a9ad
.deviceView {
  height 100vh
  width 100vw
  background #fff
  text-align center
  position relative
  & main {
    max-width 400px
    position absolute
    top 30%
    left 50%
    transform translate(-50%, -50%)
    width 70%
    & .container {
      & h1 {
        margin 0
        color co_g_5
        box-sizing border-box
        letter-spacing 1px
        font-size 48px
        font-weight 200
        color co_g_4
        & span:nth-child(1) {
          color co_g_1
        }
        & span:nth-child(2) {
          color co_g_2
        }
      }
      & p {
        border-top 1px solid co_g_4
        padding 10px 5px
        display inline-block
        margin-top 10px
        color co_g_5
        font-size 12px
        line-height 16px
      }
    }
    & .sub {
      & .button {
        user-select none
        text-align center
        margin 30px 0 10px
        color #fff
        height 50px
        line-height 50px
        width 100%
        display inline-block
        background co_g_1
        border-radius 50px
        &.act {
          background #d3d7da
        }
      }
      & i {
        width 120%
        display block
        font-size 12px
        line-height 16px
        color co_g_5
        font-style normal
        transform scale(0.6)
        position relative
        left 50%
        transform translateX(-50%) scale(0.7)
      }
    }
    & form {
      position absolute
      z-index -9999
      visibility hidden
    }
  }
  & .data {
    height 10px
    width 10px
    position absolute
    bottom 0
    left 0
  }
}
</style>
