<template>
  <div class="duck">
    <canvas canvas-id="myCanvas" @click="fly"></canvas>
    <div v-if="!running" class="panel" @click="start">
      <!-- <div class="start">go</div> -->
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      info: 1,
      vh: wx.getSystemInfoSync().screenHeight,
      vw: wx.getSystemInfoSync().screenWidth,
      number: 20,
      step: 0.1,
      timer: {},
      duckData: [],
      dataList: [],
      velocity: 0,
      heroPosition: 0,
      heroRotation: 0,
      swingIndex: 0,
      swing: 0,
      render: {},
      ctx: {},
      landX: 0,
      skyX: 0,
      pipeX: 0,
      music: [0, 0, 0, 0],
      save: true,
      scope: 0,
      scopeData: [0, 0, 0],
      buff: 0,
      ftp: 10,
      gravity: 0.25,
      running: false,
      pipeTopH: 300,
      pipeBotH: 400
    }
  },
  methods: {

    renderZ () {
      const ctx = wx.createCanvasContext('myCanvas')
      this.ctx = ctx
      this.timer = setInterval(() => {
        ctx.clearRect(0, 0, this.vh, this.vw)
        // ctx.setFillStyle('brown')
        // ctx.fillRect((this.vw / 2 - 25), this.heroPosition, 50, 50)
        // ctx.rotate(30 * Math.PI / 180)
        this.renderSky(ctx)
        if (this.running) {
          this.renderPipes(ctx, 0)
          this.renderPipes(ctx, 200)
          this.renderHero(ctx)
          this.scopeCout()
          this.renderScope(ctx)
        }
        this.renderLand(ctx)
        ctx.draw()
      }, 1000 / this.ftp)
    },
    renderHero (ctx, gravity) {
      this.velocity += this.gravity
      this.heroRotation = Math.min((this.velocity / 20) * 90, 90)
      this.heroPosition += this.velocity
      if (this.heroPosition > this.vh - 120) {
        if (this.save) {
          this.music[3].play()
          this.save = false
        } else {
          // this.music[0].play()
        }
        this.velocity = -4.5
      }
      this.swingIndex++
      if (this.swingIndex === 10) {
        this.swingIndex = 0
        this.swing++
        if (this.swing === 4) {
          this.swing = 0
        }
      }
      ctx.save()
      ctx.translate((this.vw / 2 - 17), this.heroPosition)
      ctx.rotate(this.heroRotation * Math.PI / 180)
      ctx.drawImage('../../../assets/images/duck/bird.png', 0, 24 * this.swing, 34, 24, 0, -10, 34, 24)
      ctx.restore()
    },
    renderLand (ctx) {
      this.landX -= 0.6
      if (this.landX < -48) this.landX = 0
      ctx.save()
      ctx.drawImage('../../../assets/images/duck/land.png', 0 + this.landX, this.vh - 100)
      ctx.drawImage('../../../assets/images/duck/land.png', 336 + this.landX, this.vh - 100)
      ctx.restore()
    },
    renderSky (ctx) {
      this.skyX -= 0.2
      if (this.skyX < -275) this.skyX = 0
      ctx.save()
      // draw sky
      ctx.drawImage('../../../assets/images/duck/sky.png', 0 + this.skyX, this.vh - 200)
      ctx.drawImage('../../../assets/images/duck/sky.png', 275 + this.skyX, this.vh - 200)
      ctx.drawImage('../../../assets/images/duck/sky.png', 550 + this.skyX, this.vh - 200)
      ctx.restore()
    },
    renderScope (ctx) {
      ctx.save()
      for (let i = 0; i < this.scopeData.length; i++) {
        ctx.drawImage('../../../assets/images/duck/f_' + this.scopeData[i] + '.png', 20 + 40 * i, 50)
      }
      ctx.restore()
    },
    renderPipes (ctx, position) {
      this.pipeX -= 0.6
      if (this.pipeX < -this.vw - 100 - position) {
        this.pipeTopH = Math.random() * 200 + 100
        this.pipeBotH = this.pipeTopH + 100
        this.pipeX = 0
      }
      ctx.save()
      ctx.drawImage('../../../assets/images/duck/pipetop.png', position + this.vw + 50 + this.pipeX, this.pipeTopH - 512)
      ctx.drawImage('../../../assets/images/duck/pipebottom.png', position + this.vw + 50 + this.pipeX, this.pipeBotH)
    },
    display () {
      setInterval(() => {
        this.info = this.info + this.step
        console.log(this.info)
      }, 15)
    },
    musicLoader () {
      this.music[0] = wx.createInnerAudioContext()
      this.music[0].src = 'http://pb85uax7t.bkt.clouddn.com/sfx_wing.mp3'
      this.music[1] = wx.createInnerAudioContext()
      this.music[1].src = 'http://pb85uax7t.bkt.clouddn.com/sfx_point.ogg'
      this.music[2] = wx.createInnerAudioContext()
      this.music[2].src = 'http://pb85uax7t.bkt.clouddn.com/sfx_die.ogg'
      this.music[3] = wx.createInnerAudioContext()
      this.music[3].src = 'http://pb85uax7t.bkt.clouddn.com/sfx_hit.ogg'
    },
    fly () {
      this.save = true
      this.music[0].play()
      this.velocity = -4.5
    },
    scopeCout () {
      this.buff++
      if (this.buff === 200) {
        this.scope = this.scope + 1
        this.scopeCover(this.scope)
        this.buff = 0
      }
    },
    start () {
      this.running = true
    },
    scopeCover (s) {
      this.music[1].play()
      let scopes = s.toString()
      this.scopeData = []
      for (let i = 0; i < scopes.length; i++) {
        this.scopeData.push(scopes[i])
      }
    }
  },
  onLoad () {
    // this.musicLoader()
    // this.renderZ()
    // this.scopeCover(0)
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
.duck {
  color co_3
  canvas {
    background #4ec0ca
    height 100vh
    width 100vw
  }
  .scope {
    text-align center
    position relative
    bottom 60px
    & .item {
      background-image url('../../../assets/images/duck/f_0.png')
      background-repeat no-repeat
      background-size contain
      display inline-block
      background-position center
      height 40px
      width 35px
    }
  }
  .panel {
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -80%)
    z-index 100
    padding 10px 25px
    border-radius 3px
    font-size 14px
    color co_2
    background-image url('../../../../static/duck/splash.png')
    height 28vh
    width 28vh
    background-repeat no-repeat
    background-size contain
  }
  .go {
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    font-size 16px
  }
}
</style>