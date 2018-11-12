<template>
  <div class="translate">
    <div v-if="pressState" :class="['tips',touchUpState?'act':'']">
      <div class="icon"></div>
      <div class="info">{{tipsInfo}}</div>
    </div>
    <div class="inner">
      <div class="main">
        <scroll-view scroll-top="3000" scroll-y class="chatFlow">
          <div :class="['item',item.enTrans?'left':'']" v-for="(item, index) in chatFlowData" :key="index">
            <div class="date"><span>{{chatFlowDate[index]}}</span></div>
            <div class="hero">
              <span></span>
            </div>
            <div class="content">
              <div class="inner">
                <p>{{item.recResultTrans}}</p>
                <div class="orign">
                  <p>{{item.recResult}}</p>
                </div>
              </div>
            </div>
          </div>
          <div :class="['item current',enTrans?'left':'']" v-if="contentGene">
            <div class="hero">
              <span></span>
            </div>
            <div class="content">
              <div class="inner">
                <p @longpress="speak(currentChatItem.recResultTransVoice)">{{currentChatItem.recResultTrans}}</p>
                <div class="orign" v-if="currentChatItem.recResult">
                  <p>{{currentChatItem.recResult}}</p>
                </div>
              </div>
            </div>
          </div>
        </scroll-view>
      </div>
      <div class="panel">
        <div class="input" @click="inputSwitch"><span :class="[textInput?'act':'']"></span></div>
        <div class="holder"><span :class="[pressState?'act':'']">
            <input :focus="textInput" v-if="textInput" type="text">
            <div @touchmove="touchUpTest" @touchend="stopRec" @longpress="startRec" v-if="!textInput" class="button">
              <i>{{buttonInfo}}</i>
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
      recResult: '',
      recResultTrans: '正在聆听...',
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
      cancelRec: false,
      voiceData: null,
      contentGene: false,
      errorInfo: '没听到声音',
      buttonInfo: '按住 说话',
      tipsInfo: '手指上滑，取消发送',
      chatFlowData: [
        {
          enTrans: false,
          date: '1542007175561',
          recResult: '可以介绍一下你们的政策吗',
          recResultTrans: 'May I introduce your policy?',
          recResultTransVoice: ''
        },
        {
          enTrans: true,
          date: '1542007175561',
          recResult: '可以介绍一下你们的政策吗',
          recResultTrans: 'May I introduce your policy?',
          recResultTransVoice: ''
        },
        {
          enTrans: false,
          date: '1542007175561',
          recResult: '可以介绍一下你们的政策吗',
          recResultTrans: 'May I introduce your policy?',
          recResultTransVoice: ''
        },
        {
          enTrans: true,
          date: '1542007175561',
          recResult: '可以介绍一下你们的政策吗',
          recResultTrans: 'May I introduce your policy?',
          recResultTransVoice: ''
        },
        {
          enTrans: true,
          date: '1542007350561',
          recResult: 'Any changes to this policy will be posted on this page. By accessing our website after such changes are posted, you indicate your acceptance of the revised policy. ',
          recResultTrans: '此政策的任何更改将在本页上公布。在这些更改发布后访问我们的网站，表示您接受修改后的政策。',
          recResultTransVoice: ''
        }
      ],
      currentChatItem: {
        enTrans: false,
        date: '',
        recResult: '',
        recResultTrans: '正在聆听...',
        recResultTransVoice: ''
      },
      chatFlowDate: [],
      itemGene: false
    }
  },
  methods: {
    init () {
      this.plugin = requirePlugin('WechatSI')
      this.manager = this.plugin.getRecordRecognitionManager()
      this.manager.onStop = res => {
        if (!this.cancelRec) {
          console.log('result', res.result)
          if (res.result === '' || !res.result) {
            wx.showToast({
              title: this.errorInfo,
              icon: 'none',
              duration: 2000
            })
            this.contentGene = false
          } else {
            this.currentChatItem.recResult = res.result
            if (this.enTrans) this.translate(this.lg.en, this.lg.ch, this.currentChatItem.recResult)
            else this.translate(this.lg.ch, this.lg.en, this.currentChatItem.recResult)
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
      this.dateTrans()
    },
    startRec () {
      if (this.itemGene) {
        this.itemPush()
        this.itemGene = false
      }
      this.contentGene = true
      console.log('开始录音')
      this.pressState = true
      this.recProcess = 0
      if (this.enTrans) {
        this.manager.start({ duration: 20000, lang: this.lg.en })
      } else {
        this.manager.start({ duration: 20000, lang: this.lg.ch })
      }
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
            this.currentChatItem.recResultTrans = res.result
            this.speech(t, this.currentChatItem.recResultTrans)
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
          this.currentChatItem.recResultTransVoice = res.filename
          this.speak()
          this.itemGene = true
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
      wx.vibrateShort()
    },
    inputSwitch () {
      if (this.textInput) this.textInput = false
      else this.textInput = true
    },
    langSwitch () {
      if (this.enTrans) {
        this.enTrans = false
        this.errorInfo = '没听到声音'
        this.buttonInfo = '按住 说话'
        this.recResultTrans = '正在聆听...'
        this.tipsInfo = '手指上滑，取消发送'
      } else {
        this.enTrans = true
        this.errorInfo = 'there is no voice'
        this.buttonInfo = 'Hold To Talk'
        this.recResultTrans = 'listening...'
        this.tipsInfo = 'Finger up and cancel'
      }
    },
    touchUpTest (e) {
      if (this.touchUpSwitch) {
        this.touchUpSwitch = false
        this.touchUpStart = e.clientY
      }
      this.touchUpEnd = e.clientY
      if (this.touchUpStart - this.touchUpEnd > 50) {
        this.touchUpState = true
        if (this.enTrans) this.tipsInfo = 'Release finger and cancel'
        else this.tipsInfo = '松开手指，取消发送'

        this.cancelRec = true
      } else {
        this.touchUpState = false
        if (this.enTrans) this.tipsInfo = 'Finger up and cancel'
        else this.tipsInfo = '手指上滑，取消发送'
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
      if (this.cancelRec) this.contentGene = false
      if (this.enTrans) {
        this.tipsInfo = 'Finger up and cancel'
        this.recResultTrans = 'listening...'
      }
    },
    itemPush () {
      let curtime = new Date()
      this.currentChatItem.date = curtime.getTime()
      this.currentChatItem.enTrans = this.enTrans
      console.log(this.currentChatItem)
      this.chatFlowData.push(this.currentChatItem)
      this.currentChatItem = {
        enTrans: false,
        date: '',
        recResult: '',
        recResultTrans: '正在聆听...',
        recResultTransVoice: ''
      }
      this.dateTrans()
    },
    dateTrans () {
      this.chatFlowDate = []
      for (let index = 0; index < this.chatFlowData.length; index++) {
        let date = this.chatFlowData[index].date
        this.chatFlowDate.push(this.dateDistance(date))
      }
      console.log(this.chatFlowDate)
    },
    dateDistance (d) {
      let currentDate = new Date()
      let curtiemStamp = currentDate.getTime()
      let timeGap = curtiemStamp - d
      let minute = 1000 * 60
      let hour = minute * 60
      let day = hour * 24
      if (timeGap || timeGap > 0) {
        let disMinute = timeGap / minute
        let disHour = timeGap / hour
        let disDay = timeGap / day
        let disWeek = timeGap / (day * 7)
        let fullDate = new Date(parseInt(d))
        let fullDateY = fullDate.getFullYear()
        let fulldateM = fullDate.getMonth() + 1
        let fullDateD = fullDate.getDate()
        let fullDateX = fullDate.getDay()
        let fullDateH = fullDate.getHours()
        let fullDateM = fullDate.getMinutes()
        if (disWeek > 1) {
          return fullDateY + '年' + fulldateM + '月' + fullDateD + '日'
        }
        if (disDay > 1) {
          if (fullDateX === 0) return '星期日' + ' ' + fullDateH + ':' + fullDateM
          if (fullDateX === 1) return '星期一' + ' ' + fullDateH + ':' + fullDateM
          if (fullDateX === 2) return '星期二' + ' ' + fullDateH + ':' + fullDateM
          if (fullDateX === 3) return '星期三' + ' ' + fullDateH + ':' + fullDateM
          if (fullDateX === 4) return '星期四' + ' ' + fullDateH + ':' + fullDateM
          if (fullDateX === 5) return '星期五' + ' ' + fullDateH + ':' + fullDateM
          if (fullDateX === 6) return '星期六' + ' ' + fullDateH + ':' + fullDateM
        }
        if (disHour > 1) {
          if (fullDateH < 13) return '上午 ' + fullDateH + ':' + fullDateM
          if (fullDateH < 19) return '下午 ' + fullDateH + ':' + fullDateM
          if (fullDateH < 25) return '晚上 ' + fullDateH + ':' + fullDateM
        }
        if (disMinute > 1) {
          return fullDateM + '分钟前'
        }
      }
      return '刚刚'
    }
  },
  onLoad () {
    this.init()
    // this.speech(this.lg.ch, '小唠滴你四沙雕嘛,滴你四沙雕嘛,你四沙雕嘛,四沙雕嘛,沙雕嘛,雕嘛,嘛')
    // console.log(this.dateDistance(1542007175561))
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
c8 = #8fb85c
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
    height 100%
    & .main {
      box-sizing border-box
      padding 50px 0 PH
      height 100%
      & .chatFlow {
        height 100%
        & .item {
          margin-bottom 50px
          position relative
          &:first-child {
            margin-top 25px
          }
          & .hero {
            float right
            height 50px
            width 50px
            display inline-block
            & span {
              height 80%
              width 80%
              display inline-block
              background-image url('https://browniu-c8bfe1.tcb.qcloud.la/trans/translate_hero_1.jpg?sign=bc33c74075a1ab91c9e7b24ef1bf0f39&t=1541747265')
              background-position center
              background-size contain
              background-repeat no-repeat
              border-radius 3px
            }
          }
          & .content {
            text-align right
            display inline-block
            // background orange
            min-height 50px
            width calc(100vw - 50px)
            box-sizing border-box
            padding 0 15px 0 50px
            &>.inner {
              text-align left
              display inline-block
              background c4
              border-radius 3px
              position relative
              padding 10px
              font-size 14px
              min-height 20px
              color c6
              &:before {
                content ''
                display inline-block
                position absolute
                top 12.5px
                right -10px
                border 8px solid transparent
                border-left 8px solid c4
                border-right 5px solid transparent
              }
              & .orign {
                border-top 1px solid rgba(143, 184, 92, 0.4)
                margin-top 5px
                padding-top 3px
                opacity 0.5
                font-size 12px
              }
            }
          }
          & .date {
            position absolute
            left 50%
            transform translateX(-50%) scale(0.75)
            top -30px
            font-size 12px
            background rgba(0, 0, 0, 0.1)
            padding 3px 5px
            border-radius 3px
            color #fff
          }
          &.left {
            & .hero {
              float left
              position relative
              & span {
                position absolute
                right 0
                background-image url('https://browniu-c8bfe1.tcb.qcloud.la/trans/translate_hero_2.jpg?sign=bc33c74075a1ab91c9e7b24ef1bf0f39&t=1541747265')
              }
            }
            & .content {
              text-align left
              padding 0 50px 0 15px
              &>.inner {
                background #fff
                &:before {
                  right unset
                  left -10px
                  border-right 8px solid #fff
                  border-left 5px solid transparent
                }
                & .orign {
                  border-top 1px solid rgba(143, 184, 92, 0.15)
                }
              }
            }
          }
          &.current {
            margin-top -25px
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
          background-image url('https://browniu-c8bfe1.tcb.qcloud.la/trans/english.svg?sign=bc33c74075a1ab91c9e7b24ef1bf0f39&t=1541747265')
          &.act {
            background-image url('https://browniu-c8bfe1.tcb.qcloud.la/trans/chinese.svg?sign=bc33c74075a1ab91c9e7b24ef1bf0f39&t=1541747265')
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