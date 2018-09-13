<template>
  <div :class="['tools',theme===1?'theme1':'',theme===2?'theme2':'']">
    <main>
      <ol>
        <li v-for="(item, index) in tools" :key="index">
          <i v-if="item.label">new</i>
          <a @click="verify(index)" class="counter">{{item.name}}</a>
        </li>
        <li v-if="!login">
          <button open-type="getUserInfo" @click="identity">🔑 权限验证</button>
          <a>🔑 权限验证</a>
        </li>
      </ol>
    </main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      develop: true,
      access: false,
      login: false,
      theme: 0,
      tools: [
        { href: '../tools/remainder/main', name: 'Killer 3', label: false, access: false },
        { href: '../tools/realView/main', name: '真实视窗', label: false, access: false },
        { href: '../tools/w_overTimePay/main', name: '旺旺加班费', label: false, access: false },
        { href: '../tools/dice/main', name: '摇骰子', label: false, access: false },
        { href: '../store/index/main', name: '🚧 施工中', label: false, access: false },
        { href: '../tools/lab/main', name: '🔬 实验室', label: false, access: true }
      ]
    }
  },
  methods: {
    verify (index) {
      if (index === 4 && !this.tools[3].access) {
        wx.switchTab({
          url: '../store/index/main'
        })
        return
      }
      wx.vibrateShort()
      if (this.tools[index].access) {
        if (this.access) {
          wx.navigateTo({
            url: this.tools[index].href
          })
        } else {
          wx.vibrateLong()
          wx.showToast({
            title: '立ち入り禁止',
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
    this.identity()
    if (this.develop) {
      // wx.switchTab({
      //   url: '../store/index/main'
      // })
      wx.navigateTo({
        url: '../store/detail/main?id=g0001'
      })
    }
  },
  created () {
    this.theme = Math.floor(Math.random() * 2 + 1)
  }
}
</script>
<style lang='stylus' scoped>
@import '../../assets/styles/index.styl'
.tools {
  color co_11
  height 100vh
  position relative
  background-color #fff
  background-repeat no-repeat
  overflow hidden
  &.theme1 {
    background-image url('http://pb85uax7t.bkt.clouddn.com/forage_6.jpg')
    background-position bottom right
    background-size 150%
  }
  &.theme2 {
    background-image url('https://cdn.dribbble.com/users/256781/screenshots/2876842/flowers_dribbble-2.gif')
    background-position bottom center
    background-position-y 403px
    background-size 80%
  }
  & main {
    padding 15px
    ol {
      display flex
      flex-direction row
      flex-wrap wrap
      justify-content center
      width 100%
      & li {
        width calc(((100% - 4px) / 3))
        font-size 14px
        color co_7
        margin 0
        display inline-block
        text-align center
        line-height 120px
        height 120px
        background co_10
        position relative
        margin-right 2px
        margin-bottom 2px
        &:nth-of-type(3n) {
          margin-right 0
        }
        & i {
          position absolute
          top -40%
          right 5px
          color co_13
          font-size 12px
          font-weight bold
          transform scale(0.6)
        }
        & button {
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
