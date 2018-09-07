<template>
  <div class="index">
    <main>
      <a class="link" @click="vibrate" href="/pages/tool/main">
        <div class="inner">小工具</div>
      </a>
    </main>
    <button class="login" open-type="getUserInfo" @click="login"></button>
  </div>
</template>

<script>

export default {
  data () {
    return {
      motto: 'Hello Brown',
      userInfo: {}
    }
  },
  methods: {
    getUserInfo () {
      wx.getUserInfo({
        success: (res) => {
          this.userInfo = res.userInfo
          console.log(res.userInfo)
        }
      })
    },
    vibrate () {
      wx.vibrateShort()
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/styles/index.styl'
.index {
  height 100vh
  position relative
  background url('http://pb85uax7t.bkt.clouddn.com/uniparent-02-2-1.jpg')
  background-position center center
  background-position-y 160px
  background-size contain
  background-repeat no-repeat
  overflow hidden
  main {
    position absolute
    top 30%
    left 50%
    transform translate(-50%, -50%)
    & .link {
      color #fff
      background co_3
      padding 15px 0px
      width 180px
      border-radius 30px
      & .inner {
        text-align center
        position relative
        z-index 2
        letter-spacing 2px
        font-size 16px
      }
      &:before, &:after {
        content ''
        position absolute
        left 0
        display inline-block
        height 100%
        width 100%
        border-radius 5px
        background co_3
        z-index 1
      }
      &:before {
        top 0
      }
      &:after {
        left 50%
        transform translateX(-50%)
        width 80%
        height 50%
        bottom -5px
        z-index 0
        color co_1
        filter blur(10px)
      }
    }
  }
  .login {
    position absolute
    font-size 12px
    border 0
    outline none
    bottom 0
    background co_3
    height 20px
    width 20px
    border-radius 50%
    transform translateY(50%) translateX(-60%)
  }
}
</style>
