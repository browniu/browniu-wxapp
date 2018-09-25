<template>
  <div class="theDay" @click="cpSwitch">
    <div class="main" :style="{backgroundImage:'url('+theme[themeIndex].bgi+')'}">

      <div class="gradient" :style="{background:'linear-gradient(to top, rgba('+theme[themeIndex].bgca+', 0), rgba('+theme[themeIndex].bgca+', 1))'}"></div>

      <div :class="['inner',controlPanel?'act':'']">
        <div class="container">
          <div class="title">
            <p>距离</p>
            <h1>去京都看浮世绘</h1>
          </div>
          <div class="timer">
            <div class="timer-grop">
              <span>7</span>
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
            2018-10-02
          </div>
        </div>
        <div class="blur" :style="{backgroundImage:'url('+theme[themeIndex].bgi+')'}"></div>
      </div>
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
        'second': '',
        'minute': '',
        'hour': '',
        'day': ''
      }
    }
  },
  methods: {
    cpSwitch () {
      if (this.controlPanel) {
        this.controlPanel = false
      } else {
        this.controlPanel = true
      }
    }
  },
  onLoad () {
    wx.setNavigationBarTitle({
      title: '那一天'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: this.theme[this.themeIndex].bgc,
      animation: {
        duration: 200,
        timingFunc: 'easeIn'
      }
    })
    let date = new Date()
    this.dateData.second = date.getSeconds()
    this.dateData.minute = date.getMinutes()
    this.dateData.hour = date.getUTCHours()
    console.log(date.getDay())
    setInterval(() => {
      this.dateData.second = 60 - new Date().getSeconds()
    }, 1000)
    setInterval(() => {
      this.dateData.minute = 60 - new Date().getMinutes()
    }, 60000)
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
      position absolute
      top 0
      left 0
      width 100%
      height 50px
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
        border-radius 50px
        max-width 80%
        top 20%
        transform translate(-50%, -50%) scale(0.8)
        & .blur {
          top 180%
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
}
</style>