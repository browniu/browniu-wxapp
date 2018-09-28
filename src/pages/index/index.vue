<template>
  <scroll-view scroll-y class="tools navigatePosition">
    <!-- <div class="navigetion">
      <div class="title">brown's magic</div>
    </div> -->
    <main>
      <ol>
        <li v-for="(item, index) in tools" :key="index">
          <img v-if="index===0" mode="widthFix" src="../../../static/images/killer.svg" alt="">
          <img v-if="index===1" mode="widthFix" src="../../../static/images/lab.svg" alt="">
          <img v-if="index===2" mode="widthFix" src="../../../static/images/timer.svg" alt="">
          <img v-if="index===3" mode="widthFix" src="../../../static/images/message.svg" alt="">
          <img v-if="index===4" mode="widthFix" src="../../../static/images/store.svg" alt="">
          <img v-if="index===5" mode="widthFix" src="../../../static/images/heart.svg" alt="">
          <img v-if="index===6" mode="widthFix" src="../../../static/images/favorite.svg" alt="">
          <img v-if="index===7" mode="widthFix" src="../../../static/images/realView.svg" alt="">
          <p>{{item.name}}</p>
          <a @click="verify(index)"></a>
        </li>
        <li>
          <img mode="widthFix" src="../../../static/images/lock.svg" alt="">
          <p>身份验证</p>
          <button open-type="getUserInfo" @click="identity"></button>
        </li>
      </ol>
    </main>
  </scroll-view>
</template>
<script>
export default {
  data () {
    return {
      develop: false,
      access: false,
      login: false,
      firstLoad: true,
      theme: 1,
      tools: [
        { href: '../tools/remainder/main', name: 'Killer 3', icon: 'Killer 3', label: false, access: false },
        { href: '../tools/realView/main', name: '真实视窗', icon: '真实视窗', label: false, access: false },
        { href: '../tools/w_overTimePay/main', name: '旺旺加班费', icon: 'timer', label: false, access: false },
        { href: '../tools/dice/main', name: '摇骰子', icon: 'message', label: false, access: false },
        { href: '../store/index/main', name: '小卖部 (施工中)', icon: 'store', label: false, access: false },
        { href: '../tools/japan/main', name: '中日友好', icon: 'heart', label: false, access: false },
        { href: '../tools/theDay/main', name: '等风来', icon: 'heart', label: false, access: false },
        { href: '../tools/lab/main', name: '实验室', icon: 'lab', label: false, access: true }
      ]
    }
  },
  methods: {
    verify (index) {
      wx.vibrateShort()
      // store page
      if (index === 4) {
        wx.switchTab({
          url: '../store/index/main'
        })
        return
      }
      if (this.tools[index].access) {
        if (this.access) {
          wx.navigateTo({
            url: this.tools[index].href
          })
        } else {
          wx.vibrateLong()
          wx.hideToast({})
          wx.showToast({
            title: '立入禁止',
            icon: 'none',
            duration: 2000
          })
        }
      } else {
        wx.navigateTo({
          url: this.tools[index].href
        })
      }
    },
    identity () {
      wx.vibrateShort()
      wx.getUserInfo({
        success: (res) => {
          this.login = true
          this.userInfo = res.userInfo
          wx.showToast({
            title: '专属 ' + res.userInfo.nickName + ' 的魔盒已开启',
            icon: 'none',
            duration: 2000
          })
          if (res.userInfo.nickName === 'brown') {
            this.access = true
          }
        }
      })
    },
    vibrate () {
      wx.vibrateLong()
    }
  },
  mounted () {
    wx.cloud.init({
      traceUser: true
    })
    if (this.develop) {
      // wx.switchTab({
      //   url: '../store/index/main'
      // })
      wx.navigateTo({
        url: '../tools/theDay/main'
      })
    }
  },
  onLoad () {
    wx.setNavigationBarTitle({
      title: "brown's magic"
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#38274e',
      animation: {
        duration: 200,
        timingFunc: 'easeIn'
      }
    })
    if (this.firstLoad) {
      this.firstLoad = false
      wx.switchTab({
        url: '../store/mine/main'
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../../assets/styles/index.styl'
.tools {
  color co_11
  height 100vh
  position relative
  background-color #38274e
  background linear-gradient(to bottom, #38274e, #4f274b)
  background-repeat no-repeat
  overflow hidden
  &.theme1 {
    background-image url('http://pb85uax7t.bkt.clouddn.com/forage_6.jpg')
    background-position bottom right
    background-size 150%
  }
  & .navigetion {
    box-sizing border-box
    padding 30px 15px
    & .title {
      font-size 16px
      color #fff
    }
  }
  & main {
    padding 15px
    ol {
      display flex
      flex-direction row
      flex-wrap wrap
      justify-content left
      width 100%
      & li {
        width calc(((100% - 10px) / 3))
        font-size 12px
        color #fff
        margin 0
        display inline-block
        text-align center
        height 120px
        border-radius 3px
        background-color rgba(255, 255, 255, 0.03)
        position relative
        margin-right 5px
        margin-bottom 5px
        box-sizing border-box
        padding-top 35px
        &:nth-of-type(3n) {
          margin-right 0
        }
        & img {
          width 25%
          height auto
          margin-bottom 5px
        }
        & a, button {
          display inline-block
          position absolute
          top 0
          left 0
          border 0
          outline-style none
          background #000
          height 100%
          width 100%
          border-radius 0
          opacity 0
        }
      }
    }
  }
}
</style>
