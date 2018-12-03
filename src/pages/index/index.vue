<template>
  <scroll-view scroll-y class="tools">
    <!-- <div class="navigetion">
      brown's magic
    </div>-->
    <div class="texture"></div>
    <div v-if="tipsSwitch" class="tips">{{tipsInfo}}</div>
    <main>
      <ol>
        <li v-for="(item, index) in list" :key="index">
          <img v-if="item.icon==='killer'" mode="widthFix" src="../../../static/images/killer.svg">
          <img v-if="item.icon==='lab'" mode="widthFix" src="../../../static/images/lab.svg">
          <img v-if="item.icon==='timer'" mode="widthFix" src="../../../static/images/timer.svg">
          <img
            v-if="item.icon==='message'"
            mode="widthFix"
            src="../../../static/images/message.svg"
          >
          <img v-if="item.icon==='store'" mode="widthFix" src="../../../static/images/store.svg">
          <img v-if="item.icon==='out'" mode="widthFix" src="../../../static/images/out.svg">
          <img v-if="item.icon==='list'" mode="widthFix" src="../../../static/images/list.svg">
          <img
            v-if="item.icon==='light'"
            mode="widthFix"
            src="https://browniu-c8bfe1.tcb.qcloud.la/draw/light.svg?sign=6d5e6fefa251b3ebc59c7468ed1a03e3&t=1543558510"
          >
          <img
            v-if="item.icon==='organization'"
            mode="widthFix"
            src="../../../static/images/organization.svg"
          >
          <img
            v-if="item.icon==='download'"
            mode="widthFix"
            src="../../../static/images/download.svg"
          >
          <img v-if="item.icon==='heart'" mode="widthFix" src="../../../static/images/heart.svg">
          <img
            v-if="item.icon==='favorite'"
            mode="widthFix"
            src="../../../static/images/favorite.svg"
          >
          <img
            v-if="item.icon==='realView'"
            mode="widthFix"
            src="../../../static/images/realView.svg"
          >
          <img
            v-if="item.icon==='corrot'"
            style="width:10.5%"
            mode="widthFix"
            src="https://browniu-c8bfe1.tcb.qcloud.la/duck/duck_face_1.png?sign=1527800af2e75d975f25a00357486a8f&t=1541469024"
          >
          <img
            v-if="item.icon==='chat'"
            style="width:25%"
            mode="widthFix"
            src="https://browniu-c8bfe1.tcb.qcloud.la/trans/chat4.svg?sign=a6afd81a50ba9482f9a81f54c81250db&t=1542242300"
          >
          <img
            v-if="item.icon==='game'"
            mode="widthFix"
            src="https://browniu-c8bfe1.tcb.qcloud.la/game.svg?sign=b88933fa1be313dd75403f7e9223570f&t=1542180222"
          >
          <img
            v-if="item.icon==='pineapple'"
            mode="widthFix"
            src="https://browniu-c8bfe1.tcb.qcloud.la/index/pineapple.svg?sign=b305367be12b22b54ec1af3561ba2542&t=1542675550"
          >
          <img
            v-if="item.icon==='Apple'"
            mode="widthFix"
            src="https://browniu-c8bfe1.tcb.qcloud.la/index/Apple.svg?sign=b305367be12b22b54ec1af3561ba2542&t=1542675550"
          >
          <img
            v-if="item.icon==='fire'"
            style="width:18%"
            mode="widthFix"
            src="https://browniu-c8bfe1.tcb.qcloud.la/fire/fire_icon.png?sign=b229258bad723f5c9560630e0d0360e0&t=1543298512"
          >
          <img
            v-if="item.icon==='animation'"
            mode="widthFix"
            src="https://browniu-c8bfe1.tcb.qcloud.la/draw/animation.svg?sign=3123e03962588161a3c02121afc12201&t=1543299690"
          >
          <!-- <div class="icon" :style="{backgroundImage:'url('+item.icon+')'}">
</div>
          -->
          <p>{{item.name}}</p>
          <a @click="verify(index)"></a>
        </li>
        <li v-if="more">
          <img mode="widthFix" src="../../../static/images/lock.svg" alt>
          <p>开启专属</p>
          <button open-type="getUserInfo" @click="identity"></button>
        </li>
        <li class="more" v-if="!more" @click="moreSwitch">
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
      devIndex: null, // 14
      access: false,
      login: false,
      theme: 1,
      test: './',
      tools: [
        { href: '../tools/remainder/main', name: '杀手三', icon: 'killer', label: false, access: false },
        { href: '../tools/realView/main', name: '适配档案', icon: 'lab', label: false, access: false },
        { href: '../tools/w_overTimePay/main', name: '加班汪', icon: 'timer', label: false, access: false },
        { href: '../tools/dice/main', name: '大富翁', icon: 'message', label: false, access: false },
        { href: '../store/index/main', name: 'Friend\'s', icon: 'store', label: false, access: false },
        { href: '../tools/japan/main', name: '中日汇', icon: 'out', label: false, access: false },
        { href: '../tools/theDay/main', name: '等风来', icon: 'list', label: false, access: false },
        { href: '../tools/colorful/main', name: '自然色', icon: 'organization', label: false, access: false },
        { href: '../tools/weather/main', name: '冷暖自知', icon: 'download', label: false, access: false },
        { href: '../tools/songs/main', name: '在路上', icon: 'heart', label: false, access: false },
        { href: '../tools/bird/main', name: '胡萝卜骑士', icon: 'corrot', label: false, access: false },
        { href: '../tools/translate/main', name: '译聊', icon: 'chat', label: false, access: false },
        { href: '../tools/legendary/main', name: '大菠萝', icon: 'pineapple', label: false, access: false },
        { href: '../tools/fire/main', name: '暖角', icon: 'fire', label: false, access: false },
        { href: '../tools/draw/main', name: '烟花巷', icon: 'light', label: false, access: false },
        { href: '../tools/lab/main', name: '实验室', icon: 'realView', label: false, access: true }
      ],
      list: [],
      tipsInfo: '这是一条小提示',
      tipsSwitch: false,
      firstLoad: true,
      more: false,
      admin: 'Prime'
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
          this.tips('暂不对外开发')
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
          if (res.userInfo.nickName === this.admin) {
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
    },
    moreSwitch () {
      this.more = true
      this.list = this.tools
    }
  },
  onLoad () {
    this.list = this.tools.slice(0, 12)
    this.more = false
  },
  onUnload () {
    this.list = this.tools.slice(0, 12)
    this.more = false
  },
  mounted () {
    wx.cloud.init({
      traceUser: true
    })
    if (this.devIndex) {
      // wx.switchTab({
      //   url: '../store/index/main'
      // })
      wx.navigateTo({
        url: this.tools[this.devIndex].href
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
    background-image url('https://browniu-c8bfe1.tcb.qcloud.la/songs/forage_6.jpg?sign=c24bee782ad7040b7b24584dfade6b6f&t=1543803977')
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
        &.more {
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
        & .icon {
          height 30px
          width 30px
          display inline-block
          background-image url('../../../static/images/killer.svg')
          background-size contain
          background-position center
        }
        & p {
          position absolute
          bottom 20%
          left 50%
          transform translate(-50%, -50%)
          white-space nowrap
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
    background-image url('https://browniu-c8bfe1.tcb.qcloud.la/index/indexbg-80.jpg?sign=ac3d1cda63375c320ab15c890eb03488&t=1543804149')
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
