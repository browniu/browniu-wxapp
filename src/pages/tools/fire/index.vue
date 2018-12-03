<template>
  <div class="fire">
    <div :class="['load',loaded?'act':'']"></div>
    <div class="texture"></div>
    <div class="item">
      <img
        mode="widthFix"
        src="https://browniu-c8bfe1.tcb.qcloud.la/fire/fire_item_2.gif?sign=fb57b0b9cf494c0a3758b68fa281d352&t=1543281919"
        alt
      >
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      Vctx: {},
      vw: wx.getSystemInfoSync().screenWidth,
      vh: wx.getSystemInfoSync().screenHeight,
      music: {},
      loaded: false
    }
  },
  methods: {
    init () {
      this.musicLoader()
    },
    musicLoader () {
      this.music = wx.createInnerAudioContext()
      this.music.src = 'https://browniu-c8bfe1.tcb.qcloud.la/fire/fire_voice.mp3?sign=e69c2d8316b639cbac5a33fd2d562e83&t=1543300213'
      this.music.play()
    }
  },
  onLoad () {
    this.init()
    setTimeout(() => {
      this.loaded = true
      this.music.play()
    }, 3000)
  },
  onUnload () {
    this.music.stop()
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
.fire {
  height 100vh
  width 100vw
  overflow hidden
  position relative
  .texture {
    position absolute
    z-index 1
    height 100%
    width 100%
    top 0
    left 0
    background-image url('https://browniu-c8bfe1.tcb.qcloud.la/fire/fire_2.png?sign=fb57b0b9cf494c0a3758b68fa281d352&t=1543281919')
    background-size cover
    background-position center
    background-repeat no-repeat
    opacity 1
  }
  .item {
    position absolute
    height 100%
    width 100%
    top 0
    left 0
    z-index 0
    & img {
      position absolute
      top 28%
      left 33%
      width 200px
    }
  }
  .load {
    position absolute
    top 0
    left 0
    bottom 0
    right 0
    background #000
    z-index 3
    opacity 1
    transition 0.7s ease
    &.act {
      opacity 0
    }
  }
}
</style>