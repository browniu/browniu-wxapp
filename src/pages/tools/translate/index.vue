<template>
  <div class="translate">
    <div v-if="pressState" :class="['tips',touchUpState?'act':'']">
      <div class="icon"></div>
      <div class="info">{{tipsInfo}}</div>
    </div>
    <div class="inner">
      <div class="main" @click="menuHide">
        <scroll-view :scroll-top="scrollPos" scroll-with-animation="true" scroll-y class="chatFlow" id="CF">
          <div class="padding"></div>
          <div :class="['item',item.enTrans?'left':'',chatFlowDate[index]===''?'timeClose':'']" v-for="(item, index) in chatFlowData" :key="index">
            <div class="date"><span>{{chatFlowDate[index]}}</span></div>
            <div class="hero" @longpress="speak(item.recResultTransVoice,index)">
              <span></span>
            </div>
            <div class="content">
              <div class="inner" @longpress="menuSwitch(index,$event)">
                <div :class="['menu',menuIndex===index?'act':'']">
                  <div class="menuInner">
                    <li v-if="item.recResultTransVoice" @click="menuCenter(0,index)">发音</li>
                    <li @click="menuCenter(1,index)">修正</li>
                    <li @click="menuCenter(2,index)">拷贝</li>
                    <li @click="menuCenter(3,index)">记录</li>
                    <li @click="menuCenter(4,index)">删除</li>
                  </div>
                </div>
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
          <div class="padding"></div>
        </scroll-view>
      </div>
      <div class="panel">
        <div class="input" @click="inputSwitch"><span :class="[textInput?'act':'']"></span></div>
        <div class="holder"><span :class="[pressState?'act':'']">
            <input v-model="inputValue" @confirm="inputTrans" v-if="textInput" type="text">
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
      chatFlowDataPreset: [
        {
          enTrans: false,
          date: '1542174706375',
          recResult: '我是中国熊，我说的汉语会被直接转换成英语',
          recResultTrans: 'I am a Chinese bear, and the Chinese I speak will be converted directly into English',
          recResultTransVoice: 'https://browniu-c8bfe1.tcb.qcloud.la/trans/transPre1.mp3?sign=036a20ee867ebc24941f56c8e86a70ee&t=1542176803'
        },
        {
          enTrans: true,
          date: '1542007350561',
          recResult: 'I am an American bunny and my English will be translated directly into Chinese',
          recResultTrans: '我是一只美国兔，我说的英语将被直接翻译成中文',
          recResultTransVoice: 'https://browniu-c8bfe1.tcb.qcloud.la/trans/transPre2.mp3?sign=036a20ee867ebc24941f56c8e86a70ee&t=1542176803'
        },
        {
          enTrans: false,
          date: '1542175104354',
          recResult: '没错，现在我们可以无障碍尬聊了',
          recResultTrans: 'Yes, now we can speak freely',
          recResultTransVoice: 'https://browniu-c8bfe1.tcb.qcloud.la/trans/transPre3.mp3?sign=036a20ee867ebc24941f56c8e86a70ee&t=1542176803'
        },
        {
          enTrans: true,
          date: '1542179215200',
          recResult: 'We can also act as your dictionary',
          recResultTrans: '我们也可以做你的字典',
          recResultTransVoice: 'https://browniu-c8bfe1.tcb.qcloud.la/trans/transPre4.mp3?sign=036a20ee867ebc24941f56c8e86a70ee&t=1542176803'
        },
        {
          enTrans: false,
          date: '1542179215966',
          recResult: '还有很多隐藏技能哦，快来试试吧',
          recResultTrans: 'There are many hidden skills. Come and try it',
          recResultTransVoice: 'https://browniu-c8bfe1.tcb.qcloud.la/trans/transPre5.mp3?sign=036a20ee867ebc24941f56c8e86a70ee&t=1542176803'
        }
      ],
      chatFlowData: [],
      chatFlowDateOver: [],
      currentChatItem: {
        enTrans: false,
        date: '',
        recResult: '',
        recResultTrans: '正在聆听...',
        recResultTransVoice: ''
      },
      chatFlowDate: [],
      itemGene: false,
      scrollPos: 0,
      scrollP: 9999,
      inputValue: '',
      inputFacus: false,
      query: {},
      menuIndex: null,
      userId: '',
      chatFlowDataDeleteFlag: false
    }
  },
  methods: {
    init () {
      this.queryInit()
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
            this.currentChatItem.recResultTrans = '正在思考...'
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
      this.scrollAct()
    },
    startRec () {
      if (this.itemGene) {
        this.itemPush()
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
          this.speak(res.filename)
          this.itemPush()
        },
        fail: function (res) {
          console.log('fail tts', res)
        }
      })
    },
    speak (v) {
      if (v) {
        this.voice = wx.createInnerAudioContext()
        this.voice.src = v
        this.voice.play()
        wx.vibrateShort()
      }
    },
    inputSwitch () {
      if (this.textInput) {
        this.textInput = false
        this.inputFacus = false
      } else {
        this.textInput = true
        this.inputFacus = true
      }
    },
    inputTrans () {
      if (this.inputValue) {
        this.currentChatItem.recResult = this.inputValue
        this.currentChatItem.recResultTrans = '正在思考...'
        if (this.enTrans) this.translate(this.lg.en, this.lg.ch, this.currentChatItem.recResult)
        else this.translate(this.lg.ch, this.lg.en, this.currentChatItem.recResult)
      }
    },
    langSwitch () {
      if (this.itemGene) return
      if (this.enTrans) {
        this.enTrans = false
        this.errorInfo = '没听到声音'
        this.buttonInfo = '按住 说话'
        this.tipsInfo = '手指上滑，取消发送'
        this.currentChatItem.recResultTrans = '正在聆听...'
      } else {
        this.enTrans = true
        this.errorInfo = 'there is no voice'
        this.buttonInfo = 'Hold To Talk'
        this.currentChatItem.recResultTrans = 'listening...'
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
        this.currentChatItem.recResultTrans = 'listening...'
      }
    },
    itemPush () {
      this.contentGene = false
      this.itemGene = false
      let curtime = new Date()
      this.currentChatItem.date = curtime.getTime()
      this.currentChatItem.enTrans = this.enTrans
      this.chatFlowData.push(this.currentChatItem)
      if (this.enTrans) {
        this.currentChatItem = {
          enTrans: false,
          date: '',
          recResult: '',
          recResultTrans: 'Listening...',
          recResultTransVoice: ''
        }
      } else {
        this.currentChatItem = {
          enTrans: false,
          date: '',
          recResult: '',
          recResultTrans: '正在聆听...',
          recResultTransVoice: ''
        }
      }
      this.dateTrans()
      this.inputValue = ''
      this.scrollAct()
    },
    dateTrans () {
      this.chatFlowDate = []
      for (let index = 0; index < this.chatFlowData.length; index++) {
        let date = this.chatFlowData[index].date
        if (index > 0) {
          let datePre = this.chatFlowData[index - 1].date
          let timeStampDis = date - datePre
          if (timeStampDis < 60000) {
            this.chatFlowDate.push('')
          } else {
            this.chatFlowDate.push(this.dateDistance(date))
          }
        } else {
          this.chatFlowDate.push(this.dateDistance(date))
        }
      }
      // console.log(this.chatFlowDate)
      this.overtime()
    },
    overtime () {
      let cT = (new Date()).getTime()
      for (let index = 0; index < this.chatFlowData.length; index++) {
        let date = this.chatFlowData[index].date
        let dateDis = cT - date
        if (dateDis > 120000 && this.chatFlowData[index].recResultTransVoice) {
          let source = this.chatFlowData[index].recResultTransVoice.split('://')[1].split('/')[0]
          if (source === 'ae.weixin.qq.com') this.chatFlowData[index].recResultTransVoice = ''
        }
      }
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
        let fullDateN = fullDate.getMinutes()

        let disDate = new Date(parseInt(timeGap))
        // let disDateH = disDate.getHours()
        let disDateM = disDate.getMinutes()
        if (disWeek > 1) {
          return fullDateY + '年' + fulldateM + '月' + fullDateD + '日'
        }
        if (disDay > 1) {
          if (fullDateX === 0) return '星期日' + ' ' + fullDateH + ':' + fullDateN
          if (fullDateX === 1) return '星期一' + ' ' + fullDateH + ':' + fullDateN
          if (fullDateX === 2) return '星期二' + ' ' + fullDateH + ':' + fullDateN
          if (fullDateX === 3) return '星期三' + ' ' + fullDateH + ':' + fullDateN
          if (fullDateX === 4) return '星期四' + ' ' + fullDateH + ':' + fullDateN
          if (fullDateX === 5) return '星期五' + ' ' + fullDateH + ':' + fullDateN
          if (fullDateX === 6) return '星期六' + ' ' + fullDateH + ':' + fullDateN
        }
        if (disHour > 1) {
          let last = ''
          if (disHour > 12) {
            last = '昨天'
          }
          if (fullDateH < 13) return last + '上午 ' + (fullDateH - 12).toString() + ':' + fullDateN.toString().padStart(2, '0')
          if (fullDateH < 19) return last + '下午 ' + (fullDateH - 12).toString() + ':' + fullDateN.toString().padStart(2, '0')
          if (fullDateH < 25) return last + '晚上 ' + (fullDateH - 12).toString() + ':' + fullDateN.toString().padStart(2, '0')
        }
        if (disMinute > 1) {
          return disDateM + '分钟前'
        }
      }
      return '刚刚发生'
    },
    queryInit () {
      this.query = wx.createSelectorQuery()
      this.query.select('#CF').boundingClientRect()
      this.query.selectViewport().scrollOffset()
    },
    scrollAct () {
      setTimeout(() => {
        this.scrollPos = this.scrollP
      }, 100)
      this.query.exec(function (res) {
        this.scrollP = res[0].bottom
      })
    },
    menuSwitch (index, e) {
      let itemL = this.chatFlowData.length
      let itemC = parseInt(e.currentTarget.dataset.eventid.split('-')[1])
      if (itemL < 4 || itemL - itemC < 5) {
        this.menuIndex = index
      } else {
        this.deleteItem(index)
      }
      wx.vibrateShort()
    },
    menuCenter (index, itemIndex) {
      this.menuIndex = null
      this.scrollAct()
      if (index === 0) this.speechItem(itemIndex)
      if (index === 1) this.fixItem(itemIndex)
      if (index === 2) this.copyItem(itemIndex)
      if (index === 3) this.recordItem(itemIndex)
      if (index === 4) this.deleteItem(itemIndex)
    },
    menuHide () {
      this.menuIndex = null
    },
    speechItem (e) {
      console.log('I will speech this item ' + e)
      this.speak(this.chatFlowData[e].recResultTransVoice, e)
    },
    fixItem (e) {
      console.log('I will fix this item ' + e)
      wx.showToast({
        icon: 'none',
        title: '修正功能开发中',
        during: '1000'
      })
    },
    copyItem (e) {
      console.log('I will copy this item ' + e)
      wx.setClipboardData({
        data: (this.chatFlowData[e].recResultTrans).toString(),
        icon: 'none',
        success: (res) => {
          console.log(res)
        }
      })
    },
    recordItem (e) {
      console.log('I will record this item ' + e)
      wx.showToast({
        icon: 'none',
        title: '笔记本功能开发中',
        during: '1000'
      })
    },
    deleteItem (e) {
      console.log('I will detele this item ' + e)
      wx.showModal({
        title: '',
        content: '确定删除这条记录吗？',
        success: (res) => {
          if (res.confirm) {
            this.chatFlowData.splice(e, 1)
            if (this.chatFlowDataDeleteFlag) this.chatFlowDataDeleteFlag = false
            else this.chatFlowDataDeleteFlag = true
          } else if (res.cancel) {
            console.log('cancel')
          }
        }
      })
      this.dateTrans()
    },
    testData (base) {
      const db = wx.cloud.database()
      db.collection(base).get({
        success: res => {
          if (res.data.length === 0) {
            console.log('data clean')
            this.initData(db, base)
          } else {
            this.chatFlowData = res.data[0].chatFlow
            // console.log(this.chatFlowData)
            this.userId = res.data[0]._id
            this.dateTrans()
          }
        }
      })
    },
    initData (db, base) {
      console.log('I will init data')
      // this.chatFlowData = this.chatFlowDataPreset
      db.collection(base).add({
        data: {
          date: new Date(),
          chatFlow: this.chatFlowDataPreset
        },
        success: (res) => {
          this.testData('translate')
          console.log(res)
        }
      })
    },
    updateData (base, userId) {
      const db = wx.cloud.database()
      db.collection(base).doc(userId).update({
        data: {
          chatFlow: this.chatFlowData
        }
      })
    }
  },
  onLoad () {
    this.init()
    this.testData('translate')
    // this.speech(this.lg.ch, '小唠滴你四沙雕嘛,滴你四沙雕嘛,你四沙雕嘛,四沙雕嘛,沙雕嘛,雕嘛,嘛')
    console.log(this.dateDistance(1542179215200))
    console.log(new Date(1542179215200))
  },
  onUnload () {
    this.updateData('translate', this.userId)
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
      overflow visible
      height 100%
      & .chatFlow {
        padding-bottom 20px
        height 100%
        & .padding {
          height 20px
          width 100%
          background #000
          opacity 0
        }
        & .item {
          margin-top 50px
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
              & .menu {
                display none
                position absolute
                color #fff
                right 0
                top -35px
                width 100%
                white-space nowrap
                padding 0 5px
                z-index 100
                opacity 0.7
                overflow visible
                height 30px
                &.act {
                  display block
                }
                &:before {
                  content ''
                  display inline-block
                  border 10px solid transparent
                  border-top 10px solid #000
                  position absolute
                  left 50%
                  bottom -18px
                  transform translateX(-50%)
                }
                & .menuInner {
                  background #000
                  border-radius 30px
                  position absolute
                  right 0
                  top 0
                }
                & li {
                  display inline-block
                  height 30px
                  line-height 30px
                  padding 0 15px
                  font-size 12px
                  border-left 1rpx solid rgba(255, 255, 255, 0.3)
                  &:first-child {
                    border-left 0
                  }
                }
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
                & .menu {
                  right unset
                  left 0
                  & .menuInner {
                    right unset
                    left 0
                  }
                }
              }
            }
          }
          &.timeClose {
            margin-top 15px
            & .date {
              display none
            }
          }
          &.current {
            margin-top 15px
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