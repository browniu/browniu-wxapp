<template>
  <div class="theDay">
    <div class="main" :style="{backgroundImage:'url('+theme[themeIndex].bgi+')'}">
      <div :class="['gradient',controlPanel?'act':'']" :style="{background:'linear-gradient(to top, rgba('+theme[themeIndex].bgca+', 0), rgba('+theme[themeIndex].bgca+', 1))'}"></div>
      <div :class="['inner',controlPanel?'act':'']" @click="cpSwitch">
        <div class="container">
          <div class="title">
            <p>距离</p>
            <h1>{{theThing}}</h1>
          </div>
          <div class="timer">
            <div class="timer-grop">
              <span>{{dateData.day}}</span>
              <i>天</i>
            </div>
            <div class="timer-grop">
              <span>{{dateData.hour}}</span>
              <i>时</i>
            </div>
            <div class="timer-grop">
              <span>{{dateData.minute}}</span>
              <i>分</i>
            </div>
            <div class="timer-grop">
              <span>{{dateData.second}}</span>
              <i>秒</i>
            </div>
          </div>
          <div class="date">
            {{dateEndShow}}
          </div>
        </div>
        <div class="blur" :style="{backgroundImage:'url('+theme[themeIndex].bgi+')'}"></div>
      </div>
    </div>
    <div :class="['panel',controlPanel?'act':'']">
      <!-- <div class="blur" :style="{backgroundImage:'url('+theme[themeIndex].bgi+')'}"></div> -->
      <div class="slogan">
        <span v-for="(item, index) in slogan" :key="index">{{item}}</span>
      </div>
      <picker-view class="date-picker" indicator-style="height: 50px;color:green;" mask-style="" @change="pickerChange">
        <picker-view-column>
          <view class="picker-item" v-for="(item, index) in pickerItem" :key="index">{{item}}年</view>
        </picker-view-column>
        <picker-view-column>
          <view class="picker-item" v-for="(item, index) in 12" :key="index">{{item+1}}月</view>
        </picker-view-column>
        <picker-view-column>
          <view class="picker-item" v-for="(item, index) in 31" :key="index">{{item+1}}日</view>
        </picker-view-column>
        <picker-view-column>
          <view class="picker-item" v-for="(item, index) in 24" :key="index">{{item}}时</view>
        </picker-view-column>
      </picker-view>
      <!-- <div class="picker-date">{{pickerDate}}</div> -->
      <input type="text" placeholder="你在等什么？" v-model="theThingCache">
      <div class="theme-picker">
        <span @click="themeSwitch(index)" :class="['item',themeIndex===index?'act':'']" v-for="(item, index) in theme" :key="index" :style="{backgroundImage:'url('+item.bgi+')'}">
        </span>
      </div>
      <div @click="submit" class="button" :style="{backgroundColor:theme[themeIndex].bgc}">就这么决定了</div>
    </div>
  </div>
</template>

<script>
// import { formatTime } from '../../../utils/index.js'
export default {
  data () {
    return {
      controlPanel: false,
      theme: [{
        'bgi': 'http://pb85uax7t.bkt.clouddn.com/stock-photo-172526585.jpg',
        'bgc': '#a69f91',
        'bgca': '166, 159, 145'
      }, {
        'bgi': 'http://pb85uax7t.bkt.clouddn.com/stock-photo-179567537.jpg',
        'bgc': '#2d8f64',
        'bgca': '45, 143, 100'
      }],
      themeIndex: 0,
      second: 0,
      dateData: {
        'second': 0,
        'minute': 0,
        'hour': 0,
        'day': 0
      },
      dateEnd: '2018-10-02,00:00:00',
      dateEndShow: '0000-00-00',
      pickerItem: [],
      pickerDate: {
        'year': 0,
        'month': 0,
        'day': 0,
        'hour': 0
      },
      slogan: ['一个时间', '一件事情', '一场等待', '一份执念'],
      theThing: '等风来',
      theThingCache: ''
    }
  },
  methods: {
    cpSwitch () {
      if (this.controlPanel) {
        this.controlPanel = false
      } else {
        this.controlPanel = true
      }
    },
    getTime () {
      let dateNow = new Date()
      let dateEnd = new Date(this.dateEnd)
      let dateLeft = Math.round((dateEnd.getTime() - dateNow.getTime()) / 1000)
      let day = parseInt(dateLeft / (24 * 60 * 60))
      let hour = parseInt(dateLeft / (60 * 60) % 24)
      let minute = parseInt(dateLeft / 60 % 60)
      let second = parseInt(dateLeft % 60)
      this.dateData = {
        second: second,
        minute: minute,
        hour: hour,
        day: day
      }
    },
    pickerChange (e) {
      let pd = e.target.value
      this.pickerDate = [pd[0] + 2018, pd[1] + 1, pd[2] + 1, pd[3]]
    },
    themeSwitch (e) {
      this.themeIndex = e
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: this.theme[this.themeIndex].bgc,
        animation: {
          duration: 0,
          timingFunc: 'easeIn'
        }
      })
    },
    submit () {
      // verify timeline
      let dateNow = new Date()
      let dateEnd = new Date(this.pickerDate[0] + '-' + this.pickerDate[1] + '-' + this.pickerDate[2] + ',' + this.pickerDate[3] + ':00:00')
      let dateLeft = Math.round((dateEnd.getTime() - dateNow.getTime()) / 1000)
      if (isNaN(dateLeft) || dateLeft < 0) {
        wx.vibrateLong()
        wx.showToast({
          title: '往事不可追',
          icon: 'none',
          duration: 2000
        })
        return
      }
      // update time count
      this.dateEnd = this.pickerDate[0] + '-' + this.pickerDate[1] + '-' + this.pickerDate[2] + ',' + this.pickerDate[3] + ':00:00'
      this.theThing = this.theThingCache
      // verify thing
      if (this.theThingCache === '') {
        this.theThing = '等风来'
      }
      this.dateEndShow = (this.dateEnd).split(',')[0]
      this.controlPanel = false
      // upload data
      this.updateData()
    },
    initDate () {
      let date = new Date()
      date.setDate(date.getDate() + 7)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      this.dateEnd = year + '-' + month + '-' + day + ',00:00:00'
      this.updateData()
    },
    updateData () {
      const db = wx.cloud.database()
      db.collection('theDay').get({
        success: res => {
          console.log('[数据库] [查询记录] 成功: ', res.data[0])
          if (res.data.length === 0) {
            console.log('is new')
            db.collection('theDay').add({
              data: {
                dateEnd: this.dateEnd,
                theThing: this.theThing,
                theme: this.themeIndex,
                due: new Date('2018-09-01')
              },
              success: function (res) {
                console.log(res)
              }
            })
          } else {
            console.log('update dateData')
            db.collection('theDay').doc(res.data[0].id).update({
              data: {
                dateEnd: this.dateEnd,
                theThing: this.theThing,
                theme: this.themeIndex,
                due: new Date('2018-09-01')
              },
              success: function (res) {
                console.log(res)
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
    },
    tipS (e) {
      wx.vibrateShort()
      wx.showToast({
        title: e,
        icon: 'none',
        duration: 3000
      })
    }
  },
  onLoad () {
    // init navigation
    wx.setNavigationBarTitle({
      title: '等风来'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000000',
      animation: {
        duration: 200,
        timingFunc: 'easeIn'
      }
    })
    // init dataData
    const db = wx.cloud.database()
    db.collection('theDay').get({
      success: res => {
        console.log('[数据库] [查询记录] 成功: ', res.data[0])
        // no record
        if (!res.data[0]) {
          this.initDate()
          this.tipS('没有查询到你的事件哦')
          return
        }
        // get record
        // date is able
        this.dateEnd = res.data[0].dateEnd
        // date is overdue
        let dateNow = new Date()
        let dateEnd = new Date(this.dateEnd)
        let dateLeft = Math.round((dateEnd.getTime() - dateNow.getTime()) / 1000)
        if (dateLeft < 0) {
          this.initDate()
          this.tipS('你的事件已经过期了哦')
          return
        }
        this.theThing = res.data[0].theThing
        this.themeIndex = res.data[0].theme
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: this.theme[this.themeIndex].bgc,
          animation: {
            duration: 200,
            timingFunc: 'easeIn'
          }
        })
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
    this.dateEndShow = (this.dateEnd).split(',')[0]
    for (let index = 0; index < 101; index++) {
      this.pickerItem.push(2018 + index)
    }
    setInterval(() => {
      this.getTime()
    }, 1000)
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
.theDay {
  .main {
    height 100vh
    width 100vw
    background-size auto 100%
    background-repeat no-repeat
    background-position top center
    &:before {
      content ''
      display inline-block
      height 100%
      width 100%
      top 0
      left 0
      background rgba(0, 0, 0, 0.3)
      position absolute
      z-index 0
    }
    .gradient {
      transition 0.3s
      position absolute
      top 0
      left 0
      width 100%
      height 50px
      &.act {
        height 150px
      }
    }
    .inner {
      transition 0.3s
      position relative
      z-index 1
      left 50%
      top 50%
      transform translate(-50%, -50%)
      overflow hidden
      &.act {
        border-radius 10px
        max-width 80%
        top 15%
        transform translate(-50%, -50%)
        & .blur {
          top 185%
          opacity 0
        }
      }
      & .blur {
        transition 0.3s
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        height 100vh
        width 100vw
        background-size auto 100%
        background-repeat no-repeat
        background-position top center
        filter blur(10px)
        opacity 0.85
      }
      & .container {
        position relative
        z-index 1
        text-align center
        color #fff
        padding 15px 0
        & .title {
          & p {
            letter-spacing 1px
            font-size 12px
            opacity 0.7
            margin-bottom 5px
          }
          & h1 {
            letter-spacing 1px
            font-size 16px
            opacity 1
          }
        }
        & .timer {
          margin 10px 0 5px
          & .timer-grop {
            display inline-block
            position relative
            padding 0 15px
            & span {
              font-size 36px
              font-weight 400
            }
            & i {
              display inline-block
              font-size 12px
              position absolute
              top 9px
              right 0
              opacity 0.7
            }
          }
        }
        & .date {
          font-size 12px
          opacity 0.7
        }
      }
    }
  }
  .panel {
    z-index 10
    position absolute
    height 70%
    width 100%
    background rgba(255, 255, 255, 0.9)
    transition 0.3s
    left 0
    bottom -70%
    overflow hidden
    &.act {
      bottom 0
    }
    & .blur {
      transition 0.3s
      position absolute
      // top 50%
      // left 50%
      // transform translate(-50%, -50%)
      bottom 0
      left 0
      height 100vh
      width 100vw
      background-size auto 100%
      background-repeat no-repeat
      background-position top center
      filter blur(30px)
      opacity 1
    }
    & .slogan {
      text-align center
      font-size 14px
      color co_2
      padding 15px
      & span {
        display inline-block
        margin-right 10px
      }
    }
    & .date-picker {
      width 100%
      height 150px
      text-align center
      color #666
      & .picker-item {
        line-height 50px
      }
    }
    & input {
      font-size 14px
      width 100%
      height 50px
      margin-top 8px
      background #fff
      box-sizing border-box
      padding 0 15px
    }
    & .theme-picker {
      font-size 14px
      margin-top 8px
      width 100%
      height 80px
      // background #fff
      box-sizing border-box
      padding 10px
      & .item {
        height 100%
        width 100px
        margin-right 5px
        display inline-block
        background-size cover
        background-position center center
        background-repeat no-repeat
        border 1px solid #fff
        box-sizing border-box
        &.act {
          border 1px solid green
        }
      }
    }
    & .button {
      height 60px
      width 100%
      line-height 60px
      font-size 16px
      color #fff
      text-align center
      position absolute
      bottom 0
      left 0
      letter-spacing 1px
    }
  }
}
</style>