<template>
  <div class="deviceView">
    <main>
      <div class="container">
        <h1>
          [<span>{{height}}</span>,
          <span>{{width}}</span>]</h1>
        <p>{{deviceInfo}}</p>
      </div>
      <div class="sub">
        <div @click="subInfo" :class="['button',buttonState?'act':'']">{{buttonInfo}}</div>
        <i>包含当前设备系统及视窗尺寸信息将被记录，此类数据可作为应用适配优化方案的重要依据。</i>
      </div>
      <form id="form" action="http://browniu.gz01.bdysite.com/subData.php" method="post" target="subIframe">
        <input name="height" type="text" v-model="height">
        <input name="width" type="text" v-model="width">
        <input name="info" type="text" v-model="deviceInfo">
      </form>
      <iframe name="subIframe" style="display:none;"></iframe>
    </main>
    <a href="http://browniu.gz01.bdysite.com/dataList.php" class="data"></a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      height: wx.getSystemInfoSync().windowHeight,
      width: wx.getSystemInfoSync().windowWidth,
      deviceInfo: wx.getSystemInfoSync().model + ' | ' + wx.getSystemInfoSync().brand + ' | ' + wx.getSystemInfoSync().system + ' | ' + wx.getSystemInfoSync().statusBarHeight,
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

        wx.request({
          url: 'http://browniu.gz01.bdysite.com/subData.php',
          data: {
            width: this.width,
            height: this.height,
            info: this.deviceInfo
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            console.log(res.data)
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
    console.log(wx.getSystemInfoSync())
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
    top 40%
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
        margin 50px 0 10px
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
