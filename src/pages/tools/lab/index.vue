<template>
  <div class="duck" @click="fly">
    <div class="main">
      <!-- <img src="../../../assets/images/duck/sky.png" alt=""> -->
      <div class="inner">
        <div :class="['sky',running?'act':'']">
          <div class="playground">
            <div class="hero" :style="{top:heroPosition+'px'}"></div>
          </div>
        </div>
        <div :class="['land',running?'act':'']"></div>
      </div>
    </div>
    <div v-if="!running" class="panel" @click="run">
      <div class="start">start</div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      openID: null,
      json: {},
      weatherData: 'weather',
      sourceCount: 0,
      loaded: false,
      running: false,
      innerAudioContext: {},
      heroPosition: 200,
      velocity: 0
    }
  },
  methods: {
    loaded () {
      this.sourceCount++
      console.log(this.sourceCount)
      if (this.sourceCount === 3) {
        this.init()
        this.loaded = true
      }
    },
    init () {
      console.log('loaded')
    },
    run () {
      if (this.running) {
        this.running = false
      } else {
        this.running = true
        let gravity = 0.25
        setInterval(() => {
          this.velocity += gravity
          if (this.velocity < 20) {
            this.heroPosition += this.velocity
          }
        }, 1000.0 / 60.0)
      }
    },
    fly () {
      console.log('fly')
      // this.innerAudioContext.play()
      this.velocity = -4.6
    }
  },
  onLoad () {
    this.innerAudioContext = wx.createInnerAudioContext()
    this.innerAudioContext.autoplay = false
    this.innerAudioContext.src = 'http://pb85uax7t.bkt.clouddn.com/sfx_wing.mp3'
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
@import 'keyframe.css'
.duck {
  background #4ec0ca
  height 100vh
  width 100vw
  overflow hidden
  .inner {
    .sky {
      height 80vh
      background-image url('../../../assets/images/duck/sky.png')
      background-repeat repeat-x
      background-position 0 100%
      animation animSky 7s linear infinite
      animation-play-state paused
      &.act {
        animation-play-state running
      }
      .playground {
        .hero {
          position absolute
          top 50%
          left 50%
          transform translate(-50%, -50%)
          background-image url('../../../assets/images/duck/bird.png')
          height 24px
          width 34px
          animation animBird 300ms steps(4) infinite
        }
      }
    }
    .land {
      position fixed
      bottom 0
      height 20vh
      width 100%
      background-image url('../../../assets/images/duck/land.png')
      background-repeat repeat-x
      background-size auto 100%
      animation animLand 2516ms linear infinite
      animation-play-state paused
      &.act {
        animation-play-state running
      }
    }
  }
  .panel {
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    z-index 100
    background #fff
    padding 10px 25px
    border-radius 3px
    font-size 14px
    color co_2
  }
}
</style>