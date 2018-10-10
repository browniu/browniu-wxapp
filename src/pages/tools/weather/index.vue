<template>
  <div class="weather">
    <div class="texture" :style="{backgroundImage:'url('+tempImage+')'}"></div>
    <div class="main">
      <div class="window">
        <div :class="['container',isDay?'bright':'']">
          <div class="clock">
            <div class="inner" :style="{transform:'rotate('+clockDeg+'deg)'}">
              <div class="clockItem"><span :style="{backgroundColor:tempColor}"></span><i :style="{backgroundColor:tempColor}"></i></div>
            </div>
          </div>
          <div class="inner" :style="{backgroundImage:'url('+tempImage+')'}">
          </div>
        </div>
      </div>
      <div class="info">
        <div class="temprature">
          <p>【{{currentWeather}}·{{currentWind}}风】</p>
          <span class="weather">
            {{currentTemprature}}
          </span>
        </div>
      </div>
    </div>
    <div class="label">
      <span>{{currentLocation}}</span>
      <div class="date">十月十日</div>
      <div class="angle"></div>
    </div>
    <div class="more">
      <span :style="{backgroundColor:item}" v-for="(item, index) in moreWeather" :key="index"></span>
    </div>
  </div>
</template>

<script>
import temp from '../weather/temp.json'
let bmap = require('../../../utils/bmap-wx.js')
export default {
  data () {
    return {
      currentData: ['currentCity', 'date', 'pm25', 'temperature', 'weatherDesc', 'wind'],
      originalData: ['currentCity', ['des', 'tipt', 'title', 'zs'], 'pm25', ['date', 'dayPictureUrl', 'nightPictureUrl', 'temperature', 'weather', 'wind']],
      currentTemprature: '二十五度',
      currentWeather: '万里晴空',
      currentWind: '微',
      currentLocation: '上海',
      moreWeather: ['#27382d', '#3e262c', '#3b6d60', '#525355'],
      currentTime: [],
      isDay: true,
      clockDeg: 0,
      tempColor: '#ff5027',
      tempImage: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539145924402&di=14054b87eaada69222a5bcf9623d3928&imgtype=0&src=http%3A%2F%2F3img.zhuokearts.com%2Fauction.pics%2F2012%2F10%2F6%2Fzc-8339-4854.jpg'
    }
  },
  methods: {
    DX (n) {
      if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) return '数据非法'
      let unit = '京亿万仟佰十兆万仟佰十亿仟佰十万仟佰十度分秒'
      let str = ''
      n += '00'
      let p = n.indexOf('.')
      if (p >= 0) {
        n = n.substring(0, p) + n.substr(p + 1, 2)
      }
      unit = unit.substr(unit.length - n.length)
      // 零壹贰叁肆伍陆柒捌玖 零一二三四五六七八九
      for (let i = 0; i < n.length; i++) str += '零壹二三四五六七八九'.charAt(n.charAt(i)) + unit.charAt(i)
      return str.replace(/零(仟|佰|十|分)/g, '零').replace(/(零)+/g, '零').replace(/零(兆|万|亿|度)/g, '$1').replace(/(兆|亿)万/g, '$1').replace(/(京|兆)亿/g, '$1').replace(/(京)兆/g, '$1').replace(/(京|兆|亿|仟|佰|十)(万?)(.)仟/g, '$1$2零$3仟').replace(/^度零?|零秒/g, '')
    },
    DE (e) {
      if (e === '阴转多云') {
        return '阴转多云'
      }
    },
    getTime () {
      this.currentTime = new Date()
      this.currentTime = [this.currentTime.getHours(), this.currentTime.getMinutes()]
      this.clockDeg = this.currentTime[0] * 30 + this.currentTime[1] * 0.25
      if (this.currentTime[0] > 18 && this.currentTime[0] < 6) {
        this.isDay = false
      }
    }
  },
  onLoad: function () {
    // get data
    new bmap.BMapWX().weather({
      fail: (res) => {
        console.log(res)
      },
      success: (res) => {
        console.log(res)
        this.currentData = res.currentWeather[0]
        this.originalData = res.originalData.results[0]
        this.currentWeather = this.DE(this.currentData.weatherDesc)
        this.currentWind = this.currentData.wind.split('风')[1]
        this.currentLocation = this.currentData.currentCity.split('市')[0]
        this.currentTemprature = this.DX(this.currentData.date.split('：')[1].split('℃')[0])
        if (this.currentData.date.split('：')[1].split('℃')[0] > 9 && this.currentData.date.split('：')[1].split('℃')[0] < 31) {
          this.tempColor = temp.temp[this.currentData.date.split('：')[1].split('℃')[0]].bgc
          this.tempImage = temp.temp[this.currentData.date.split('：')[1].split('℃')[0]].bgi
        }
      }
    })
    // get time
    this.getTime()
  }
}
</script>
<style lang='stylus' scoped>
c1 = #f1eee9
c2 = #070304
c3 = #929194
@import '../../../assets/styles/index.styl'
@font-face {
  font-family 'qingke'
  src url('http://pb85uax7t.bkt.clouddn.com/fzqingke.TTF') format('truetype')
}
.weather {
  height 100vh
  overflow hidden
  color c2
  font-family qingke
  .texture {
    height 100%
    width 100%
    background-image url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539145924402&di=14054b87eaada69222a5bcf9623d3928&imgtype=0&src=http%3A%2F%2F3img.zhuokearts.com%2Fauction.pics%2F2012%2F10%2F6%2Fzc-8339-4854.jpg')
    background-size auto 110%
    background-position top center
    background-repeat no-repeat
    position absolute
    top 0
    left 0
    z-index 0
    opacity 0.09
  }
  .main {
    text-align center
    .window {
      padding 110px 0 20px
      .container {
        display inline-block
        height 200px
        width 200px
        background-color #0a265d
        border-radius 50%
        position relative
        &.bright {
          background-color #fff
        }
        .clock {
          position absolute
          top 50%
          left 50%
          transform translate(-50%, -50%)
          width 10px
          height 112%
          z-index 99
          & .inner {
            height 100%
            width 100%
            & .clockItem {
              height 25px
              width 25px
              float right
              display inline-block
              position relative
              & span {
                display block
                background co_14
                opacity 0.5
                border-radius 50%
                height 100%
                width 100%
              }
              &>i {
                display block
                border-radius 50%
                position absolute
                top 50%
                left 50%
                transform translate(-50%, -50%)
                background co_14
                height 70%
                width 70%
              }
              & i {
              }
            }
          }
        }
        &>.inner {
          height 100%
          width 100%
          border-radius 50%
          background-image url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539145924402&di=14054b87eaada69222a5bcf9623d3928&imgtype=0&src=http%3A%2F%2F3img.zhuokearts.com%2Fauction.pics%2F2012%2F10%2F6%2Fzc-8339-4854.jpg')
          background-size cover
          background-position center center
          box-shadow 1px 1px 5px rgba(0, 0, 0, 0.5) inset
          opacity 0.8
          position relative
        }
      }
    }
    .info {
      position relative
      left 18px
      .temprature {
        display inline-block
        writing-mode vertical-rl
        vertical-align middle
      }
      .weather {
        margin-left 100px
        font-size 45px
        letter-spacing 5px
      }
      p {
        margin 12px 12px 0
        font-size 14px
        color co_6
        letter-spacing 3px
      }
    }
  }
  .label {
    background c3
    width 30px
    height 70px
    position fixed
    top 0
    left 20px
    text-align center
    box-sizing border-box
    padding-top 12px
    & span {
      position relative
      z-index 10
      font-size 14px
      writing-mode vertical-rl
      letter-spacing 3px
      overflow hidden
      color #fff
    }
    & .date {
      position relative
      z-index 10
      font-size 12px
      transform scale(.5)
      color #fff
      top -5px
    }
    & .angle {
      position absolute
      bottom -8px
      height 0px
      width 0px
      border 15px solid c3
      border-bottom 8px solid transparent
    }
  }
  .more {
    position fixed
    bottom 0
    height 5px
    width 100%
    background #000
    z-index 99
    & span {
      width 25%
      height 100%
      display inline-block
      float left
    }
  }
}
</style>