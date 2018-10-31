<template>
  <scroll-view scroll-y class="tools">
    <!-- <div class="navigetion">
      brown's magic
    </div> -->
    <div class="texture"></div>
    <div v-if="tipsSwitch" class="tips">{{tipsInfo}}</div>
    <main>
      <ol>
        <li v-for="(item, index) in tools" :key="index">
          <img v-if="index===0" mode="widthFix" src="../../../static/images/killer.svg" alt="">
          <img v-if="index===1" mode="widthFix" src="../../../static/images/lab.svg" alt="">
          <img v-if="index===2" mode="widthFix" src="../../../static/images/timer.svg" alt="">
          <img v-if="index===3" mode="widthFix" src="../../../static/images/message.svg" alt="">
          <img v-if="index===4" mode="widthFix" src="../../../static/images/store.svg" alt="">
          <img v-if="index===5" mode="widthFix" src="../../../static/images/out.svg" alt="">
          <img v-if="index===6" mode="widthFix" src="../../../static/images/list.svg" alt="">
          <img v-if="index===7" mode="widthFix" src="../../../static/images/organization.svg" alt="">
          <img v-if="index===8" mode="widthFix" src="../../../static/images/download.svg" alt="">
          <img v-if="index===9" mode="widthFix" src="../../../static/images/heart.svg" alt="">
          <img v-if="index===10" mode="widthFix" src="../../../static/images/favorite.svg" alt="">
          <img v-if="index===11" mode="widthFix" src="../../../static/images/realView.svg" alt="">
          <p>{{item.name}}</p>
          <a @click="verify(index)"></a>
        </li>
        <!-- <li>
          <img mode="widthFix" src="../../../static/images/lock.svg" alt="">
          <p>开启专属</p>
          <button open-type="getUserInfo" @click="identity"></button>
        </li> -->
        <li>
          <span></span>
        </li>
      </ol>
    </main>
  </scroll-view>
</template>
<script>
export default {
  data () {
    return {
      develop: true,
      access: false,
      login: false,
      theme: 1,
      tools: [
        { href: '../tools/remainder/main', name: '杀手三', icon: 'Killer 3', label: false, access: false },
        { href: '../tools/realView/main', name: '适配档案', icon: '真实视窗', label: false, access: false },
        { href: '../tools/w_overTimePay/main', name: '加班汪', icon: 'timer', label: false, access: false },
        { href: '../tools/dice/main', name: '变色骰', icon: 'message', label: false, access: false },
        { href: '../store/index/main', name: 'Friend\'s', icon: 'store', label: false, access: false },
        { href: '../tools/japan/main', name: '中日汇', icon: 'heart', label: false, access: false },
        { href: '../tools/theDay/main', name: '等风来', icon: 'heart', label: false, access: false },
        { href: '../tools/colorful/main', name: '自然色', icon: 'heart', label: false, access: false },
        { href: '../tools/weather/main', name: '冷暖自知', icon: 'heart', label: false, access: false },
        { href: '../tools/songs/main', name: '红心集', icon: 'heart', label: false, access: false },
        { href: '../tools/bird/main', name: '冲鸭小宝贝', icon: 'heart', label: false, access: false },
        { href: '../tools/lab/main', name: '实验室', icon: 'lab', label: false, access: true }
      ],
      tipsInfo: '这是一条小提示',
      tipsSwitch: false,
      firstLoad: true
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
          this.tips('立入禁止')
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
          this.tips('专属 ' + res.userInfo.nickName + ' 的魔盒已开启')
          if (res.userInfo.nickName === 'Zodiarts') {
            this.access = true
          }
        }
      })
    },
    tips (e) {
      this.tipsInfo = e
      this.tipsSwitch = true
      setTimeout(() => {
        this.tipsSwitch = false
      }, 2000)
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
        url: '../tools/lab/main'
      })
    }
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
      animation: {
        duration: 0,
        timingFunc: 'easeIn'
      }
    })
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
  background linear-gradient(135deg, #3ca55c, #b5ac49)
  overflow hidden
  &.theme1 {
    background-image url('http://pb85uax7t.bkt.clouddn.com/forage_6.jpg')
    background-position bottom right
    background-size 150%
  }
  & .navigetion {
    display none
    width 100%
    box-sizing border-box
    padding 0 15px
    font-size 18px
    color #fff
    margin-bottom 10px
  }
  & main {
    padding 15px
    padding-top 80px
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
        background-color rgba(255, 255, 255, 0.05)
        position relative
        margin-right 5px
        margin-bottom 5px
        box-sizing border-box
        padding-top 35px
        &:nth-of-type(3n) {
          margin-right 0
        }
        &:last-child {
          height 50px
          padding-top 0px
          & span {
            margin 0
            opacity 0.5
            position relative
            top 50%
            transform translateY(-120%)
            height 7px
            width 7px
            border-radius 50%
            background #fff
            display inline-block
            &:before, &:after {
              height 7px
              width 7px
              border-radius 50%
              background #fff
              display inline-block
              content ''
              position absolute
            }
            &:before {
              left -12px
            }
            &:after {
              right -12px
            }
          }
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
  & .tips {
    z-index 9999
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    color #fff
    font-size 12px
    padding 10px 15px
    background rgba(0, 0, 0, 0.3)
    border-radius 3px
  }
  & .texture {
    position fixed
    top 0
    left 0
    height 100vh
    width 100vw
    background-image url('http://pb85uax7t.bkt.clouddn.com/indexbg-80.jpg')
    background-size cover
    background-position top left
    background-repeat no-repeat
    opacity 0.8
  }
  ::-webkit-scrollbar {
    width 0
    height 0
    color transparent
  }
}
</style>
