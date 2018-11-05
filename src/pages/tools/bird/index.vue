<template>
  <div class="duck" @click="fly">
    <canvas canvas-id="myCanvas" class="hero" @click="fly"></canvas>
    <div class="main">
      <div class="inner">
        <div :class="['sky',running?'act':'']">
          <div class="playground">
            <div :class="['pipes',pipesStatus?'act':'']">
              <div v-if="index>pipesIndex" class="item" v-for="(item, index) in pipes" :key="index">
                <div class="top" :style="{height:(item*10)+'%'}"></div>
                <div class="bottom" :style="{height:((level-item)*10)+'%'}"></div>
              </div>
            </div>
          </div>
        </div>
        <div :class="['land',running?'act':'']">
          <div :class="['scope',getScop?'act':'']">
            <div :style="{backgroundImage:'url(http://pb85uax7t.bkt.clouddn.com/f_'+item+'.png)'}" class="item" v-for="(item, index) in scopeData" :key="index"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!running" class="panel" @click="run">
      <!-- <div class="start">go</div> -->
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
      music: [0, 0, 0, 0, 0],
      heroPosition: 200,
      heroRotation: 0,
      heroStatus: 0,
      velocity: 0,
      timer: {},
      pipes: [],
      pipesGen: {},
      pipesDes: {},
      pipesDelate: {},
      pipesIndex: 0,
      pipesStatus: -3,
      pipeTop: 0,
      pipeBot: 0,
      k: 0,
      scope: 0,
      scopeData: [],
      viewHeight: wx.getSystemInfoSync().windowHeight,
      level: 8,
      gravity: 0.25,
      vh: wx.getSystemInfoSync().screenHeight,
      vw: wx.getSystemInfoSync().screenWidth,
      save: true,
      swing: 0,
      swingIndex: 0,
      getScop: false
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
        this.reset()
      } else {
        this.music[4].play()
        this.running = true
        this.scopeShow(0)
        this.timer = setInterval(() => {
          this.renderZ()
          this.crash()
        }, 1000.0 / 60.0)
        this.pipesGen = setInterval(() => {
          this.pipesStatus++
          this.pipeBot = Math.round(this.pipes[this.pipesStatus])
          this.pipeTop = this.pipeBot + 2
          this.pipes.push((Math.random() * 3 + 2).toFixed(0))
          this.k = 0
        }, 1500)
        this.pipesDelate = setTimeout(() => {
          this.pipesDes = setInterval(() => {
            this.pipesIndex++
          }, 1500)
        }, 7500)
      }
    },
    reset () {
      this.velocity = 0
      this.running = false
      this.heroPosition = 200
      this.heroRotation = 0
      this.pipes = []
      this.pipesStatus = -3
      this.pipesIndex = 0
      this.scope = 0
      this.save = true
      console.log('reset')
      clearInterval(this.timer)
      clearInterval(this.pipesGen)
      clearInterval(this.pipesDes)
      clearTimeout(this.pipesDelate)
    },
    fly () {
      this.music[0].play()
      setTimeout(() => {
        this.music[0].stop()
      }, 300)
      this.save = true
      this.velocity = -4.5
    },
    over () {
      this.ctx.clearRect(0, 0, this.vh, this.vw)
      this.music[4].stop()
      this.music[3].play()
      setTimeout(() => {
        this.music[4].stop()
        this.music[3].stop()
      }, 800)
      this.running = true
      this.run()
    },
    bounce () {

    },
    musicLoader () {
      this.music[0] = wx.createInnerAudioContext()
      this.music[0].src = 'http://pb85uax7t.bkt.clouddn.com/sfx_wing.mp3'
      this.music[1] = wx.createInnerAudioContext()
      this.music[1].src = 'https://browniu-c8bfe1.tcb.qcloud.la/duck/point.mp3?sign=c109a29d10828e6db7fb8f1900df8868&t=1541403035'
      this.music[2] = wx.createInnerAudioContext()
      this.music[2].src = 'https://browniu-c8bfe1.tcb.qcloud.la/duck/die.mp3?sign=4a318bde5376b264556a1ae90e337a5c&t=1541403247'
      this.music[3] = wx.createInnerAudioContext()
      this.music[3].src = 'https://browniu-c8bfe1.tcb.qcloud.la/duck/hit.mp3?sign=2ce216c6e71b6a781a03d5e49f637998&t=1541403005'
      this.music[4] = wx.createInnerAudioContext()
      this.music[4].src = 'http://pb85uax7t.bkt.clouddn.com/Nintendo.mp3'
    },
    scopeShow (s) {
      // this.music[1].play()
      let scopes = s.toString()
      this.scopeData = []
      for (let i = 0; i < scopes.length; i++) {
        this.scopeData.push(scopes[i])
      }
    },
    createCtx () {
      const ctx = wx.createCanvasContext('myCanvas')
      this.ctx = ctx
      ctx.setFillStyle('brown')
      ctx.fillRect((this.vw / 2 - 25), this.heroPosition, 50, 50)
    },
    renderZ () {
      let ctx = this.ctx
      ctx.clearRect(0, 0, this.vh, this.vw)
      this.velocity += this.gravity
      this.heroRotation = Math.min((this.velocity / 20) * 90, 90)
      this.heroPosition += this.velocity
      if (this.heroPosition > this.vh - 150) {
        if (this.save) {
          this.music[3].play()
          setTimeout(() => {
            this.music[3].stop()
          }, 800)
          this.save = false
        } else {
          this.music[0].play()
          setTimeout(() => {
            this.music[0].stop()
          }, 300)
        }
        this.velocity = -6
      }
      this.swingIndex++
      if (this.swingIndex === 10) {
        this.swingIndex = 0
        this.swing++
        if (this.swing === 6) {
          this.swing = 0
        }
      }
      ctx.save()
      // ctx.fillRect((this.vw / 2 - 25), this.heroPosition, 50, 50)
      ctx.translate((this.vw / 2 - 17), this.heroPosition)
      ctx.rotate(this.heroRotation * Math.PI / 180)
      ctx.drawImage('../../../assets/images/duck/rabbit_6_s.png', 0, 34 * this.swing, 65, 34, 0, 0, 65, 34)
      ctx.restore()
      ctx.draw()
    },
    crash () {
      this.k++
      this.heroStatus = (this.heroPosition / this.viewHeight) * 10
      // 坠毁地面
      // if (this.heroStatus > 8) {
      //   this.over()
      //   return
      // }
      // 碰撞区间
      if (this.k > 75 && this.k < 90 && this.pipesStatus > 0) {
        if (this.heroStatus < this.pipeBot || this.heroStatus > this.pipeTop) {
          this.over()
          return
        }
        if (this.k === 80) {
          this.scope = this.scope + 1
          this.getScop = true
          this.music[1].play()
          setTimeout(() => {
            this.music[1].stop()
            this.getScop = false
          }, 800)
          this.scopeShow(this.scope)
        }
      }
    }
  },
  onShow () {
    this.music[4].stop()
    this.over()
  },
  onHide () {
    this.music[4].stop()
  },
  onLoad () {
    this.musicLoader()
    // this.bgm()
    this.createCtx()
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
@import 'keyframe.css'
.duck {
  background #c7f5f6
  height 100vh
  width 100vw
  overflow hidden
  canvas {
    height 100vh
    width 100vw
    position absolute
    z-index 1
    top 0
    left 0
  }
  .inner {
    .sky {
      height 80vh
      // background-image url('../../../assets/images/duck/sky.png')
      background-repeat repeat-x
      background-position 0 100%
      animation animSky 7s linear infinite
      animation-play-state paused
      &.act {
        animation-play-state running
      }
      .playground {
        height 100%
        width 100vw
        overflow hidden
        position fixed
        .hero {
          position absolute
          top 50%
          left 45%
          background-image url('../../../assets/images/duck/bird.png')
          height 24px
          width 34px
          animation animBird 300ms steps(4) infinite
        }
        .pipes {
          height 100%
          white-space nowrap
          .item {
            height 100%
            width 30px
            display inline-block
            position absolute
            left 900px
            animation animPipe 6000ms linear infinite
            &:last-child {
              left -100px
            }
            &.act {
              left -100px
            }
            & .top {
              position absolute
              top 0
              left 0
              width 100%
              // background-image url('../../../assets/images/duck/pipe.png')
              background #ffad10
              background-repeat repeat-y
              background-size 100% auto
              background-position 0 0
              &:before {
                height 30px
                width 100%
                display inline-block
                position absolute
                bottom -5px
                left 0
                content ''
                background-image url('../../../assets/images/duck/pipe-down.png')
                background-repeat no-repeat
                background-size 100% auto
                display none
              }
            }
            & .bottom {
              position absolute
              bottom 0
              width 100%
              background #ffad10
              // background-image url('../../../assets/images/duck/pipe.png')
              &:before {
                height 30px
                width 103%
                display inline-block
                position absolute
                top -5px
                left 0
                content ''
                background-image url('../../../assets/images/duck/pipe-up.png')
                background-repeat no-repeat
                background-size 100% auto
                display none
              }
            }
          }
        }
      }
    }
    .land {
      position fixed
      bottom 0
      height 20vh
      width 100%
      // background #aaa
      // background-image url('../../../assets/images/duck/land3.png')
      background-repeat repeat-x
      background-size auto 100%
      animation animLand 2516ms linear infinite
      animation-play-state paused
      &.act {
        animation-play-state running
      }
      .scope {
        text-align center
        position relative
        top 50%
        transform translateY(-30%)
        &.act {
          transform translateY(-30%) scale(1.3)
        }
        & .item {
          background-image url('../../../assets/images/duck/f_0.png')
          background-repeat no-repeat
          background-size contain
          display inline-block
          background-position center
          height 50px
          width 45px
        }
      }
    }
  }
  .panel {
    position absolute
    z-index 100
    top 50%
    left 50%
    transform translate(-50%, -80%)
    z-index 100
    padding 10px 25px
    border-radius 3px
    font-size 14px
    color co_2
    background-image url('../../../../static/duck/splash.png')
    background #ffad10
    height 28vh
    width 28vh
    background-repeat no-repeat
    background-size contain
  }
}
</style>