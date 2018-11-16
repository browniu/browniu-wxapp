<template>
  <div class="legendary" id="lege" @click="play">
    <video v-if="curSource" @timeupdate="playState" id="videoBg" :show-progress="false" show-center-play-btn="false" :loop="false" enable-progress-gesture="false" objectFit="cover" show-play-btn="false" :autoplay="true" :muted="true" width="100vw" eight="100vh" :src="curSource" :controls="false" event-model="bubble">
      <cover-view class="inner">
        <cover-view :class="['texture',loaded?'act':'']"></cover-view>
        <!-- <cover-view class="contain" @touchstart="scrollStart" @touchmove="scroll" @touchEnd="scrollEnd">
          <cover-view :style="{height:videoDur*100+'px'}" class="conInner">
            <cover-view id="coverTop">xixixi</cover-view>
          </cover-view>
        </cover-view> -->
      </cover-view>
    </video>
  </div>
</template>

<script>
export default {
  data () {
    return {
      source: [
        'https://browniu-c8bfe1.tcb.qcloud.la/legendary_1.mp4?sign=d0ebbb02e36750853c0754ee4a476df2&t=1542362340',
        'https://browniu-c8bfe1.tcb.qcloud.la/legendary_2.mp4?sign=d0ebbb02e36750853c0754ee4a476df2&t=1542362340',
        'https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4'
      ],
      curSource: null,
      videoContext: {},
      loaded: false,
      videoDur: 22,
      videoCur: 2,
      touchStart: 0,
      touchCur: 0,
      vh: wx.getSystemInfoSync().windowWidth,
      playing: false
    }
  },
  computed: {
    touchDisPer: function () {
      return (this.touchCur - this.touchStart) / this.vh
    },
    videoScrollDis: function () {
      return ((this.touchCur - this.touchStart) / this.vh) * 22
    }
  },
  methods: {
    init () {
      this.videoContext = wx.createVideoContext('videoBg')
      setTimeout(() => {
        this.curSource = this.source[1]
      }, 100)
    },
    reset () {
      this.curSource = null
      this.loaded = false
    },
    playState (e) {
      if (this.playing) {
        return
      } else {
        console.log('loaded')
        this.loaded = true
        this.videoContext.pause()
      }
      console.log(e)
      if (this.loaded) {
        console.log(this.videoDur)
      }
    },
    play () {
      if (this.playing) {
        this.playing = false
        this.videoContext.pause()
      } else {
        this.playing = true
        this.videoContext.play()
      }
    },
    scroll (e) {
      this.touchCur = e.clientY
      this.videoCur = this.videoScrollDis
      console.log(this.videoCur)
      this.videoContext.seek(this.videoCur)
    },
    scrollStart (e) {
      this.touchStart = e.clientY
    },
    scrollEnd (e) {
      // console.log(e.clientY)
      console.log(this.touchDisPer)
    }
  },
  onLoad () {
    this.init()
  },
  onUnload () {
    this.reset()
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
.legendary {
  background #000
  height 100vh
  video {
    height 60vh
    width 100vw
    margin 0
    padding 0
    background #000
    margin-top 40px
    .inner {
      height 100%
      width 100%
      & .texture {
        height 100%
        width 100%
        position absolute
        z-index 0
        top 0
        left 0
        transition 0.7s ease
        background #000
        opacity 1
        &.act {
          opacity 0
        }
      }
      & .contain {
        position relative
        z-index 1
        height 100%
        width 100%
        overflow-y scroll
        & .conInner {
          background brown
          width 30px
        }
      }
    }
  }
}
</style>
