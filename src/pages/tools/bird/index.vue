<template>
  <div class="duck" @click="fly">
    <canvas v-show="running" canvas-id="myCanvas" class="hero" @click="fly"></canvas>
    <div class="main">
      <div class="inner">
        <div class="info">
          <div class="best">
            <div
              :style="{backgroundImage:'url(https://browniu-c8bfe1.tcb.qcloud.la/duck/f_'+item+'.png?sign=ea63044cc0ffce1fc0c888e6d6278484&t=1541555605)'}"
              class="item"
              v-for="(item, index) in scopeBest"
              :key="index"
            ></div>
          </div>
          <div :class="['scope',getScop?'act':'']">
            <div
              :style="{backgroundImage:'url(https://browniu-c8bfe1.tcb.qcloud.la/duck/f_'+item+'.png?sign=ea63044cc0ffce1fc0c888e6d6278484&t=1541555605)'}"
              class="item"
              v-for="(item, index) in scopeData"
              :key="index"
            ></div>
          </div>
        </div>
        <div :class="['sky',running?'act':'']">
          <div class="cloud"></div>
          <div class="playground">
            <div :class="['pipes',pipesStatus?'act':'']">
              <div v-if="index>pipesIndex" class="item" v-for="(item, index) in pipes" :key="index">
                <div class="top" :style="{height:(item*10)+'%'}">
                  <i
                    v-if="index%2===0"
                    :style="{backgroundImage:'url('+gotList[gotItem[0]]+')'}"
                    :class="[gotIndex===index?'got':'']"
                  ></i>
                  <i
                    v-if="index%2!=0"
                    :style="{backgroundImage:'url('+gotList[gotItem[1]]+')'}"
                    :class="[gotIndex===index?'got':'']"
                  ></i>
                </div>
                <div class="bottom" :style="{height:((level-item)*10)+'%'}"></div>
              </div>
            </div>
          </div>
        </div>
        <div :class="['land',running?'act':'']"></div>
      </div>
    </div>
    <div v-if="!running" class="panel" @click="run">
      <div class="inner"></div>
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
      scopeBest: [0],
      scopeData: [],
      viewHeight: wx.getSystemInfoSync().windowHeight,
      level: 8,
      gravity: 0.25,
      vh: wx.getSystemInfoSync().screenHeight,
      vw: wx.getSystemInfoSync().screenWidth,
      save: true,
      swing: 0,
      swingIndex: 0,
      getScop: false,
      gotIndex: 0,
      gotItem: [0, 1],
      gotList: [
        'https://browniu-c8bfe1.tcb.qcloud.la/duck/bird_nangua.png?sign=f3b9b120df92f3818f0df24506aa84ec&t=1541473996',
        'https://browniu-c8bfe1.tcb.qcloud.la/duck/bird_qiezi.png?sign=190f11738975f2137353370c5738d48f&t=1541475483',
        'https://browniu-c8bfe1.tcb.qcloud.la/duck/bird_potato.png?sign=fb928cf2e034f2c4016f3e3a83f9273b&t=1541476411',
        'https://browniu-c8bfe1.tcb.qcloud.la/duck/bird_qingcai.png?sign=8c891468136a04d6f478600494a7ac2a&t=1541489554',
        'https://browniu-c8bfe1.tcb.qcloud.la/duck/bird_ou.png?sign=1c5b918b1915254d86839d85c1e7c2a6&t=1541490101',
        'https://browniu-c8bfe1.tcb.qcloud.la/duck/lajiao.png?sign=74196bfa92729afe784c68b6bcbc6d9f&t=1541491198'
      ]
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
      this.musicLoader()
      // this.bgm()
      this.createCtx()
      // get scode
      this.getScopeBest()
    },
    run () {
      if (this.running) {
        this.running = false
        this.reset()
      } else {
        this.music[4].play()
        this.running = true
        this.scopeData = this.scopeShow(0)
        this.timer = setInterval(() => {
          this.ctx.clearRect(0, 0, this.vh, this.vw)
          this.renderZ()
          this.crash()
        }, 1000.0 / 60.0)
        this.pipesGen = setInterval(() => {
          this.pipesStatus++
          this.pipeBot = Math.round(this.pipes[this.pipesStatus]) - 0.2
          this.pipeTop = this.pipeBot + 2
          this.pipes.push((Math.random() * 3 + 2).toFixed(0))
          // console.log((Math.random() * 2 + 1).toFixed(0))
          this.gotItem[0] = (Math.random() * (this.gotList.length - 1) + 0).toFixed(0)
          this.gotItem[1] = (Math.random() * (this.gotList.length - 1) + 0).toFixed(0)
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
      this.gotIndex = 0
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
      this.subScopeBest(this.scope)
      this.music[4].stop()
      this.music[3].play()
      setTimeout(() => {
        this.music[4].stop()
        this.music[3].stop()
      }, 800)
      this.running = true
      this.run()
    },
    musicLoader () {
      this.music[0] = wx.createInnerAudioContext()
      this.music[0].src = 'https://browniu-c8bfe1.tcb.qcloud.la/bird/sfx_wing.mp3?sign=d502b7e1c4e9570368ee062ef9b2164e&t=1543804622'
      this.music[1] = wx.createInnerAudioContext()
      // this.music[1].src = 'https://browniu-c8bfe1.tcb.qcloud.la/duck/point.mp3?sign=c109a29d10828e6db7fb8f1900df8868&t=1541403035'
      this.music[1].src = 'https://browniu-c8bfe1.tcb.qcloud.la/duck/duck_get.mp3?sign=d3f67885084e526ea43bfaa75935fa09&t=1541558158'
      this.music[2] = wx.createInnerAudioContext()
      this.music[2].src = 'https://browniu-c8bfe1.tcb.qcloud.la/duck/die.mp3?sign=4a318bde5376b264556a1ae90e337a5c&t=1541403247'
      this.music[3] = wx.createInnerAudioContext()
      this.music[3].src = 'https://browniu-c8bfe1.tcb.qcloud.la/duck/hit.mp3?sign=2ce216c6e71b6a781a03d5e49f637998&t=1541403005'
      this.music[4] = wx.createInnerAudioContext()
      this.music[4].src = 'https://browniu-c8bfe1.tcb.qcloud.la/bird/Nintendo.mp3?sign=f84ff946280632c03bd7befef76e76ad&t=1543804704'
    },
    scopeShow (s) {
      let scopes = s.toString()
      let array = []
      for (let i = 0; i < scopes.length; i++) {
        array.push(scopes[i])
      }
      return array
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
      ctx.drawImage('../../../static/duck/rabbit_6_n3.png', 0, 40 * this.swing, 78, 40, 0, 0, 78, 40)
      ctx.restore()
      ctx.draw()
    },
    crash () {
      this.k++
      // console.log(this.k)
      this.heroStatus = (this.heroPosition / this.viewHeight) * 10
      // 坠毁地面
      // if (this.heroStatus > 8) {
      //   this.over()
      //   return
      // }
      // 碰撞区间
      if (this.k > 80 && this.k < 90 && this.pipesStatus > 0) {
        if (this.heroStatus < this.pipeBot || this.heroStatus > this.pipeTop) {
          this.over()
          return
        }
        if (this.k === 85) {
          this.gotIndex++
          this.scope = this.scope + 1
          this.getScop = true
          this.music[1].play()
          setTimeout(() => {
            this.music[1].stop()
            this.getScop = false
          }, 800)
          this.scopeData = this.scopeShow(this.scope)
        }
      }
    },
    getScopeBest () {
      console.log(this.scopeBest)
      const db = wx.cloud.database()
      db.collection('duck').get({
        success: res => {
          // console.log('[数据库] [查询记录] 成功: ', res)
          if (res.data.length === 0) {
            console.log('new player')
            db.collection('duck').add({
              data: {
                scopeBest: 0
              }
            })
          } else {
            this.scopeBest = this.scopeShow(res.data[0].scopeBest)
          }
        }
      })
    },
    subScopeBest (e) {
      const db = wx.cloud.database()
      const _ = db.command
      db.collection('duck').where(_.and([
        {
          scopeBest: _.lt(e)
        }
      ])).get({
        success: res => {
          // console.log('[数据库] [查询记录] 成功: ', res)
          if (res.data.length === 0) {
            console.log('no better')
          } else {
            console.log('this is new recode ' + e)
            this.scopeBest = this.scopeShow(e)
            db.collection('duck').doc(res.data[0]._id).update({
              data: {
                scopeBest: e
              },
              success: function (res) {
                console.log('refreshed')
              }
            })
          }
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('[数据库] [查询记录] 失败：', err)
        }
      })
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
    this.init()
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
@import 'keyframe.css'
.duck {
  // background radial-gradient(#c7f5f6, #c7f5f6, #92e5ef)
  background linear-gradient(#c7f5f6, #92e5ef)
  // background-image url('https://www.transparenttextures.com/patterns/brilliant.png')
  // background #c7f5f6
  height 100vh
  width 100vw
  overflow hidden
  position fixed
  &:before {
    content ''
    display inline-block
    height 100%
    width 100%
    position fixed
    top 0
    left 0
    background-image url('https://www.transparenttextures.com/patterns/little-pluses.png')
    opacity 0.2
    z-index 0
  }
  canvas {
    height 100vh
    width 100vw
    position fixed
    z-index 1
    top 0
    left 0
  }
  .inner {
    .info {
      position absolute
      top 5%
      left 5%
      min-width 30px
      z-index 100
      .best {
        text-align center
        z-index 10
        transition 0.2s ease
        & .item {
          background-image url('../../../assets/images/duck/f_0.png')
          background-repeat no-repeat
          background-size contain
          display inline-block
          background-position center
          height 20px
          width 10px
          margin 0 2px
        }
      }
      .scope {
        text-align center
        transform scale(0.7)
        transition 0.2s ease
        &.act {
          transform scale(1)
        }
        & .item {
          background-image url('../../../assets/images/duck/f_0.png')
          background-repeat no-repeat
          background-size contain
          display inline-block
          background-position center
          height 40px
          width 30px
          margin 0 3px
        }
      }
    }
    .sky {
      height 80vh
      & .cloud {
        z-index 11
        position fixed
        top 0
        height 120px
        width 100%
        background-image url('https://browniu-c8bfe1.tcb.qcloud.la/duck/smoke_6.png?sign=ab5707e7053357f0c7b5a1106c333034&t=1541492701')
        // background #000
        background-repeat repeat-x
        background-repeat no-repeat
        background-size auto 100%
        background-position 95% bottom
        animation animCloud 20s linear infinite
        transform scale(-1, -1)
      }
      .playground {
        height 100%
        width 100vw
        overflow hidden
        position fixed
        z-index 10
        .hero {
          z-index 1000
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
            width 50px
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
              background-image url('https://browniu-c8bfe1.tcb.qcloud.la/duck/bird_cong.png?sign=e58978fe2aef5bde0e5e854ff1c1c372&t=1541472541')
              // background #ffad10
              background-repeat no-repeat
              background-size 100% auto
              background-position center bottom
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
              & i {
                display inline-block
                position absolute
                height 30px
                width 30px
                background-image url('https://browniu-c8bfe1.tcb.qcloud.la/duck/bird_nangua.png?sign=f3b9b120df92f3818f0df24506aa84ec&t=1541473996')
                background-size contain
                background-repeat no-repeat
                background-position center
                bottom calc(-10vh - 13px)
                left 50%
                transform translateX(-50%)
                &.got {
                  display none
                }
              }
            }
            & .bottom {
              position absolute
              bottom 0
              width 100%
              // background #ffad10
              background-image url('https://browniu-c8bfe1.tcb.qcloud.la/duck/bird_cong.png?sign=e58978fe2aef5bde0e5e854ff1c1c372&t=1541472541')
              background-size 100% auto
              background-position center top
              background-repeat no-repeat
              // transform scale(1, -1)
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
      z-index 11
      position fixed
      bottom 0
      height 150px
      width 100%
      background-image url('https://browniu-c8bfe1.tcb.qcloud.la/duck/smoke_6.png?sign=ab5707e7053357f0c7b5a1106c333034&t=1541492701')
      // background #aaa
      background-repeat repeat-x
      background-repeat no-repeat
      background-size auto 100%
      background-position 0% bottom
      animation animLand 10s linear infinite
      // animation-play-state paused
      &.act {
        animation-play-state running
      }
    }
  }
  .panel {
    position absolute
    z-index 100
    padding 10px 25px
    border-radius 3px
    top 50%
    left 50%
    transform translate(-50%, -50%)
    font-size 14px
    color co_2
    // background #000
    & .inner {
      background-image url('https://browniu-c8bfe1.tcb.qcloud.la/duck/duck_face_1.png?sign=1527800af2e75d975f25a00357486a8f&t=1541469024')
      background-size contain
      background-position center
      height 250px
      width 80px
      background-repeat no-repeat
      animation shake-little2 5s ease-in-out infinite
    }
  }
}
</style>