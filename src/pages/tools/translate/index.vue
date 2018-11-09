<template>
  <div class="translate">
    <div v-if="pressState" :class="['tips',touchUpState?'act':'']">
      <div class="icon"></div>
      <div class="info">{{tipsInfo}}</div>
    </div>
    <div class="inner">
      <div class="main">
        <!-- <div class="result">
          <p>{{recResult}}</p>
          <p>{{recResultTrans}}</p>
        </div>
        <div :class="['button',pressState?'act':'']" @longpress="startRec" @touchend="stopRec">按住说话</div> -->
        <div class="chatFlow">
          <div class="item">
            <div class="hero">
              <span></span>
            </div>
            <div class="content"></div>
          </div>
        </div>
      </div>
      <div class="panel">
        <div class="input" @click="inputSwitch"><span :class="[textInput?'act':'']"></span></div>
        <div class="holder"><span :class="[pressState?'act':'']">
            <input :focus="textInput" v-if="textInput" type="text">
            <div @touchmove="touchUpTest" @touchend="stopRec" @longpress="startRec" v-if="!textInput" class="button">
              <i v-if="!enTrans">按住 说话</i>
              <i v-if="enTrans">Hold To Talk</i>
              <div class="progress" :style="{transform:'scaleX('+(recProcess/1000)+')'}"></div>
            </div>
          </span></div>
        <div class="lang" @click="langSwitch"><span :class="[enTrans?'act':'']"></span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      plugin: {},
      manager: {},
      pressState: false,
      recResult: '识别结果',
      recResultTrans: '返回结果',
      lg: {
        'ch': 'zh_CN',
        'en': 'en_US',
        'hk': 'zh_HK'
      },
      voice: {},
      textInput: false,
      enTrans: false,
      timeRecProcess: {},
      recProcess: 0,
      touchUpStart: 0,
      touchUpEnd: 0,
      touchUpSwitch: true,
      touchUpState: false,
      tipsInfo: '手指上滑，取消发送',
      cancelRec: false
    }
  },
  methods: {
    init () {
      this.plugin = requirePlugin('WechatSI')
      this.manager = this.plugin.getRecordRecognitionManager()
      this.manager.onRecognize = function (res) {
        console.log('current result', res.result)
        console.log('原来的this.recResult ' + this.recResult)
      }
      this.manager.onStop = res => {
        if (!this.cancelRec) {
          console.log('record file path', res.tempFilePath)
          console.log('result', res.result)
          if (res.result === '' || !res.result) {
            wx.showToast({
              title: '没听到声音',
              icon: 'none',
              duration: 2000
            })
          } else {
            this.recResult = (res.result).split('。')[0]
            this.translate(this.lg.ch, this.lg.en, this.recResult)
          }
        } else {
          console.log('已取消')
          this.cancelRec = false
        }
      }
      this.manager.onStart = function (res) {
        console.log('成功开始录音识别', res)
      }
      this.manager.onError = function (res) {
        console.error('error msg', res.msg)
      }
    },
    startRec () {
      console.log('开始录音')
      this.pressState = true
      this.recProcess = 0
      this.manager.start({ duration: 20000, lang: 'zh_CN' })
      this.timeRecProcess = setInterval(() => {
        this.recProcess++
        if (this.recProcess === 1000) clearInterval(this.timeRecProcess)
      }, 20)
      wx.vibrateShort()
    },
    stopRec (e) {
      this.resetAll()
      this.manager.stop()
    },
    translate (f, t, c) {
      this.plugin.translate({
        lfrom: f,
        lto: t,
        content: c,
        success: res => {
          if (res.retcode === 0) {
            console.log('result', res.result)
            this.recResultTrans = res.result
            this.speech(t, this.recResultTrans)
          } else {
            console.warn('翻译失败', res)
          }
        },
        fail: function (res) {
          console.log('网络失败', res)
        }
      })
    },
    speech (l, c) {
      this.plugin.textToSpeech({
        lang: l,
        tts: true,
        content: c,
        success: res => {
          console.log('succ tts', res.filename)
          this.speak(res.filename)
        },
        fail: function (res) {
          console.log('fail tts', res)
        }
      })
    },
    speak (v) {
      this.voice = wx.createInnerAudioContext()
      this.voice.src = v
      this.voice.play()
    },
    inputSwitch () {
      if (this.textInput) this.textInput = false
      else this.textInput = true
    },
    langSwitch () {
      if (this.enTrans) this.enTrans = false
      else this.enTrans = true
    },
    touchUpTest (e) {
      if (this.touchUpSwitch) {
        this.touchUpSwitch = false
        this.touchUpStart = e.clientY
      }
      this.touchUpEnd = e.clientY
      if (this.touchUpStart - this.touchUpEnd > 50) {
        this.touchUpState = true
        this.tipsInfo = '松开手指，取消发送'
        this.cancelRec = true
      } else {
        this.touchUpState = false
        this.tipsInfo = '手指上滑，取消发送'
        this.cancelRec = false
      }
    },
    resetAll () {
      clearInterval(this.timeRecProcess)
      this.recProcess = 0
      this.pressState = false
      this.touchUpStart = 0
      this.touchUpEnd = 0
      this.touchUpSwitch = true
      this.touchUpState = false
      this.tipsInfo = '手指上滑，取消发送'
    }
  },
  onLoad () {
    this.init()
    // this.speech(this.lg.ch, '小唠滴你四沙雕嘛,滴你四沙雕嘛,你四沙雕嘛,四沙雕嘛,沙雕嘛,雕嘛,嘛')
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
c1 = #f4f4f6
c2 = #ebebeb
c3 = #82858a
c4 = #a8e562
c5 = #000402
c6 = #091201
c7 = #d6d6d8
PIT = 37%
PH = 85px
heroSize = 50px
.translate {
  background c2
  height 100vh
  width 100vw
  overflow hidden
  position fixed
  &>.inner {
    & .main {
      box-sizing border-box
      padding 90px 0 50px
      & .chatFlow {
        & .item {
          & .hero {
            float right
            height 50px
            width 50px
            display inline-block
            & span {
              height 80%
              width 80%
              display inline-block
              position relative
              top 0
              left 0
              background-image url('https://browniu-c8bfe1.tcb.qcloud.la/trans/translate_hero_1.jpg?sign=bc33c74075a1ab91c9e7b24ef1bf0f39&t=1541747265')
              background-position center
              background-size contain
              background-repeat no-repeat
              border-radius 3px
            }
            &.left {
              float left
            }
          }
          & .content {
            display inline-block
            background orange
            min-height 50px
            width calc(100vw - 50px)
          }
        }
      }
    }
    & .panel {
      border-top 1rpx solid c7
      height PH
      width 100%
      background c1
      position fixed
      bottom 0
      left 0
      text-align center
      &>div {
        height 100%
        display inline-block
      }
      & .input, & .lang {
        width 20%
        & span {
          height 10vw
          width 10vw
          border 1rpx solid c7
          display inline-block
          border-radius 50%
          position relative
          top PIT
          transform translateY(-50%)
          background-position center
          background-size 80%
          background-repeat no-repeat
        }
      }
      & .input {
        float left
        & span {
          background-image url('https://browniu-c8bfe1.tcb.qcloud.la/trans/keyboard.svg?sign=bc33c74075a1ab91c9e7b24ef1bf0f39&t=1541747265')
          &.act {
            background-image url('https://browniu-c8bfe1.tcb.qcloud.la/trans/voice.svg?sign=bc33c74075a1ab91c9e7b24ef1bf0f39&t=1541747265')
          }
        }
      }
      & .lang {
        float right
        & span {
          background-image url('https://browniu-c8bfe1.tcb.qcloud.la/trans/chinese.svg?sign=bc33c74075a1ab91c9e7b24ef1bf0f39&t=1541747265')
          &.act {
            background-image url('https://browniu-c8bfe1.tcb.qcloud.la/trans/english.svg?sign=bc33c74075a1ab91c9e7b24ef1bf0f39&t=1541747265')
          }
        }
      }
      & .holder {
        width 60%
        & span {
          display inline-block
          height 10vw
          width 100%
          position relative
          top PIT
          transform translateY(-50%)
          border 1rpx solid c7
          border-radius 3px
          transition 0.3s ease
          &.act {
            background c7
          }
          & input {
            margin 0
            height 100%
            text-align left
            box-sizing border-box
            padding 0 10px
          }
          & .button {
            display inline-block
            height 100%
            width 100%
            text-align center
            padding 0
            line-height 10vw
            overflow hidden
            & i {
              position relative
              top -1px
              display inline-block
              margin 0
              font-size 14px
              color c3
              letter-spacing 1px
            }
            & .progress {
              position absolute
              top 0
              left 0
              height 100%
              width 100%
              background c4
              opacity 0.5
              transform scaleX(0)
              transform-origin 0
            }
          }
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
    padding 15px 10px
    background rgba(0, 0, 0, 0.7)
    border-radius 3px
    text-align center
    & .icon {
      display inline-block
      height 80px
      width 80px
      background-position center
      background-size 100%
      background-repeat no-repeat
      background-image url('https://browniu-c8bfe1.tcb.qcloud.la/trans/mico.svg?sign=bc33c74075a1ab91c9e7b24ef1bf0f39&t=1541747265')
      opacity 0.7
    }
    & .info {
      padding 2px 8px
      border-radius 3rpx
      transition 0.1s ease
    }
    &.act {
      & .icon {
        background-image url('https://browniu-c8bfe1.tcb.qcloud.la/trans/cancel.svg?sign=bc33c74075a1ab91c9e7b24ef1bf0f39&t=1541747265')
        background-size 90%
      }
      & .info {
        background brown
      }
    }
  }
}
</style>