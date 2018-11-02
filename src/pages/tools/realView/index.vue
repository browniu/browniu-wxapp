<template>
  <div class="deviceView navigatePosition">
    <main>
      <div class="container">
        <h1>[<span>{{viewHeight}}</span>,<span>{{viewWidth}}</span>]</h1>
        <p>{{showInfo}}</p>
      </div>
      <div class="sub">
        <div @click="subInfo" :class="['button',buttonState?'act':'']">{{buttonInfo}}</div>
        <i>包含当前系统及视窗信息将被记录，此类数据可作为优化适配方案的重要参考。</i>
      </div>
      <div class="list">
        <ul class="list-inner">
          <table>
            <thead>
              <span>机型</span>
              <span>视窗</span>
              <span>系统</span>
              <span>顶栏</span>
              <span>比率</span>
              <span>性能</span>
            </thead>
            <scroll-view scroll-y class="tbody">
              <li v-for="(item, index) in dataList" :key="index">
                <span>{{item.view1Device}}</span>
                <span>{{item.view2Height}},{{item.view3Width}}</span>
                <span>{{item.view4Info.system}}</span>
                <span>{{item.view4Info.statusBarHeight}}</span>
                <span>{{item.view4Info.pixelRatio}}</span>
                <span>{{item.view4Info.benchmarkLevel}}</span>
              </li>
            </scroll-view>
          </table>
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
      dataList: [],
      dataListDetail: {},
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
              wx.showToast({
                icon: 'succeed',
                title: '已加入数据库'
              })
              db.collection('realView').add({
                data: {
                  view1Device: this.viewDevice,
                  view2Height: this.viewHeight,
                  view3Width: this.viewWidth,
                  view4Info: this.viewInfo,
                  due: new Date()
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
            this.getAllData('realView', this.dataList)
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
    },
    getAllData (base, container) {
      const db = wx.cloud.database()
      db.collection(base).count().then(res => {
        let time = Math.ceil(res.total / 20)
        for (let i = 0; i < time; i++) {
          if (i === 0) {
            db.collection(base).get().then(res => {
              for (let i = 0; i < res.data.length; i++) {
                container.push(res.data[i])
              }
            })
          } else {
            db.collection(base).skip(20 * i).get().then(res => {
              for (let i = 0; i < res.data.length; i++) {
                container.push(res.data[i])
              }
              // console.log(container)
            })
          }
        }
      })
    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '真实视窗'
    })
    this.getAllData('realView', this.dataList)
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
co_g_1 = #9dd6c5
co_g_2 = #e38785
co_g_3 = #34495e
co_g_4 = #f1f1f1
co_g_5 = #a3a9ad
.deviceView {
  height 100vh
  width 100vw
  overflow hidden
  background #fff
  text-align center
  position relative
  & main {
    width 100%
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
        margin 10px 0 10px
        color #fff
        height 50px
        line-height 50px
        width 70%
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
    & .list {
      margin-top 30px
      & .list-inner {
        & table {
          padding 10px
          box-sizing border-box
          text-align left
          // transform scale(0.8)
          // width 100%
          & thead {
            padding 8px 10px
            font-size 12px
            background co_10
            color co_2
            white-space nowrap
            span {
              display inline-block
              overflow hidden
              &:nth-child(1) {
                width 25%
              }
              &:nth-child(2) {
                width 20%
              }
              &:nth-child(3) {
                width 26%
              }
              &:nth-child(4) {
                width 10%
              }
              &:nth-child(5) {
                width 10%
              }
              &:nth-child(6) {
                width 10%
              }
            }
          }
          & .tbody {
            height calc(70vh - 200px)
            overflow hidden
            & li {
              font-size 12px
              white-space nowrap
              border-bottom 1px solid co_10
              padding-bottom 10px
              span {
                display inline-block
                margin-top 10px
                overflow hidden
                box-sizing border-box
                overflow hidden
                &:nth-child(1) {
                  position relative
                  left 10px
                  width 20%
                  box-sizing border-box
                  margin-right 5%
                }
                &:nth-child(2) {
                  position relative
                  left 10px
                  width 20%
                }
                &:nth-child(3) {
                  width 26%
                }
                &:nth-child(4) {
                  width 10%
                }
                &:nth-child(5) {
                  width 10%
                }
                &:nth-child(6) {
                  width 10%
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
