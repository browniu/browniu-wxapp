<template>
  <div class="weather">
    <div class="texture" :style="{backgroundImage:'url('+tempImage+')'}"></div>
    <div class="main">
      <div class="window" @longpress="imgSwitch">
        <div :class="['container',isDay?'bright':'']">
          <div class="clock">
            <div class="inner" :style="{transform:'rotate('+clockDeg+'deg)'}">
              <div class="clockItem" :style="{transform:'rotate(-'+clockDeg+'deg)'}"><span :style="{backgroundColor:tempColor}"></span>
                <i :style="{backgroundColor:tempColor}">
                  <b class="iconfont w1" v-if="currentWeatherIndex[0]===1&&isDay">&#xe62f;</b>
                  <b class="iconfont w12" v-if="currentWeatherIndex[0]===1&&!isDay">&#xe9ff;</b>
                  <b class="iconfont w2" v-if="currentWeatherIndex[0]===2">&#xe72e;</b>
                  <b class="iconfont w3" v-if="currentWeatherIndex[0]===3">&#xe67d;</b>
                  <b class="iconfont w4" v-if="currentWeatherIndex[0]===4">&#xe605;</b>
                  <b class="iconfont w5" v-if="currentWeatherIndex[0]===5">&#xe692;</b>
                </i>
              </div>
            </div>
          </div>
          <div class="inner" :style="{backgroundImage:'url('+tempImage+')'}">
          </div>
        </div>
      </div>
      <div class="info">
        <div class="temprature">
          <p>【{{currentWeather}}·{{currentWind}}】</p>
          <span class="weather">
            {{currentTemprature}}
          </span>
        </div>
      </div>
    </div>
    <div class="label">
      <span>{{currentLocation}}</span>
      <div class="feeling"><b>{{currentFeel}}</b></div>
      <div class="date">{{currentDate}}</div>
      <div class="angle"></div>
    </div>
    <div class="more">
      <span @click="moreSwitch(index)" :class="[moreIndex===index?'act':'']" v-for="(item, index) in moreWeather" :key="index">
        <div class="inner">
          <div :class="['owInfo',moreIndex===index?'act':'']">
            <div class="ow-temp">{{moreTemp[index]}}·{{moreWind[index]}}</div>
            <div class="ow-des">{{moreDes[index]}}</div>
            <div class="ow-date">{{moreDate[index]}} <b>{{moreFeel[index]}}</b></div>
          </div>
        </div>
        <div :class="['arrow',moreIndex===index-1?'act':'']"></div>
        <div :class="['dayName',moreIndex!=index?'act':'']">{{['今','明','后','外'][index]}}</div>
        <div :style="{backgroundColor:item}" class="liner"></div>
      </span>
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
      currentTemp: '25',
      currentWeather: '万里晴空',
      currentWeatherIndex: [1, 6, 1],
      currentWind: '微',
      currentLocation: '上海',
      currentDate: '十月十一',
      currentFeel: '舒',
      moreWeather: ['#DCD4CC', '#445454', '#8C9CA4', '#445454'],
      moreWeatherInfo: [
        { 'date': '十月十日 日曜日', 'temperature': '二十至十五度', 'weather': '阴转多云', 'wind': '微风' },
        { 'date': '十月十一 月耀日', 'temperature': '十七至十二度', 'weather': '晴空万里', 'wind': '中风' },
        { 'date': '十月十二 火耀日', 'temperature': '二十至十三度', 'weather': '晴空万里', 'wind': '强风' },
        { 'date': '十月十三 水耀日', 'temperature': '十至八度', 'weather': '晴转多云', 'wind': '微风' }
      ],
      moreDes: ['晴空万里', '晴空万里', '晴空万里', '晴空万里'],
      moreWind: ['微风 西北', '微风 西北', '微风 西北', '微风 西北'],
      moreDate: ['十月十日 日曜日', '十月十日 日曜日', '十月十日 日曜日', '十月十日 日曜日'],
      moreTemp: ['二十至十五度', '二十至十五度', '二十至十五度', '二十至十五度'],
      moreFeel: ['寒', '冷', '舒', '暖', '热', '炎'],
      currentTime: [],
      isDay: true,
      clockDeg: 0,
      tempColor: '#ff5027',
      tempImage: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539145924402&di=14054b87eaada69222a5bcf9623d3928&imgtype=0&src=http%3A%2F%2F3img.zhuokearts.com%2Fauction.pics%2F2012%2F10%2F6%2Fzc-8339-4854.jpg',
      moreIndex: 0,
      tempOpen: 3,
      tempEnd: 31
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
      for (let i = 0; i < n.length; i++) str += '零一二三四五六七八九'.charAt(n.charAt(i)) + unit.charAt(i)
      return str.replace(/零(仟|佰|十|分)/g, '零').replace(/(零)+/g, '零').replace(/零(兆|万|亿|度)/g, '$1').replace(/(兆|亿)万/g, '$1').replace(/(京|兆)亿/g, '$1').replace(/(京)兆/g, '$1').replace(/(京|兆|亿|仟|佰|十)(万?)(.)仟/g, '$1$2零$3仟').replace(/^度零?|零秒/g, '')
    },
    DE (e) {
      if (e === '晴') {
        this.currentWeatherIndex[0] = 1
        return '晴空万里'
      }
      if (e === '晴转阴') {
        this.currentWeatherIndex[0] = 3
        return '风起云涌'
      }
      if (e === '晴转小雨') {
        this.currentWeatherIndex[0] = 4
        return '和风细雨'
      }
      if (e === '阴') {
        this.currentWeatherIndex[0] = 3
        return '阴云密布'
      }
      if (e === '阴转多云') {
        this.currentWeatherIndex[0] = 2
        return '拨云见日'
      }
      if (e === '多云') {
        this.currentWeatherIndex[0] = 2
        return '云卷云舒'
      }
      if (e === '多云转阴') {
        this.currentWeatherIndex[0] = 3
        return '山雨欲来'
      }
      if (e === '多云转晴') {
        this.currentWeatherIndex[0] = 1
        return '云淡风轻'
      }
      if (e === '多云转小雨') {
        this.currentWeatherIndex[0] = 4
        return '春风化雨'
      }
      if (e === '多云转阵雨') {
        this.currentWeatherIndex[0] = 4
        return '风驰雨骤'
      }
      if (e === '晴转多云') {
        this.currentWeatherIndex[0] = 2
        return '云合雾集'
      }
      if (e === '小雨转阴') {
        this.currentWeatherIndex[0] = 3
        return '风歇水止'
      }
      if (e === '小雨转多云') {
        this.currentWeatherIndex[0] = 2
        return '朝云暮雨'
      }
      if (e === '阴转小雨') {
        this.currentWeatherIndex[0] = 4
        return '础润而雨'
      }
      if (e === '阴转晴') {
        this.currentWeatherIndex[0] = 1
        return '烟消云散'
      }
      if (e === '小雨') {
        this.currentWeatherIndex[0] = 4
        return '淫雨霏霏'
      }
      if (e === '阵雨') {
        this.currentWeatherIndex[0] = 4
        return '急风骤雨'
      }
      if (e === '阵雨转晴') {
        this.currentWeatherIndex[0] = 1
        return '雨过天晴'
      }
      if (e === '阵雨转多云') {
        this.currentWeatherIndex[0] = 1
        return '雨后初霁'
      }
      return '风花雪月'
    },
    CHN (e) {
      let zero = ''
      if (e < 0) {
        zero = '零下'
        e = Math.abs(e)
      }
      let l = e.toString().length
      let string = '零一二三四五六七八九'
      if (l === 1) {
        return zero + string[e]
      } else if (l < 3) {
        let second = parseInt(e.toString()[0])
        let first = parseInt(e.toString()[1])
        if (second === 1) {
          second = ''
        } else { second = string[second] }
        if (first === 0) {
          first = ''
        } else { first = string[first] }
        return zero + second + '十' + first
      } else {
        return '超出范围'
      }
    },
    QYR (e) {
      return ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'][e]
    },
    WIND (e) {
      let direction = e.split('风')[0]
      let windDes = '清'
      if (e.indexOf('级') > -1) {
        let level = e.split('风')[1].split('级')[0].split('-')[0]
        if (level > 2) { windDes = '微' }
        if (level > 4) { windDes = '阵' }
        if (level > 6) { windDes = '烈' }
        if (level > 8) { windDes = '狂' }
        if (level > 10) { windDes = '飓' }
        if (level > 12) { windDes = '暴' }
      }
      if (e.indexOf('无') > -1) {
        windDes = '缭乱'
        direction = ''
      }
      return [windDes, direction]
    },
    FEEL (e) {
      if (e < -30) { return '封' }
      if (e < -10) { return '冰' }
      if (e < 0) {
        this.currentWeatherIndex[1] = 1
        return '寒'
      }
      if (e < 10) {
        this.currentWeatherIndex[1] = 2
        return '冻'
      }
      if (e < 15) {
        this.currentWeatherIndex[1] = 3
        return '冷'
      }
      if (e < 20) {
        this.currentWeatherIndex[1] = 3
        return '凉'
      }
      if (e < 24) {
        this.currentWeatherIndex[1] = 4
        return '爽'
      }
      if (e < 28) {
        this.currentWeatherIndex[1] = 4
        return '舒'
      }
      if (e < 32) {
        this.currentWeatherIndex[1] = 5
        return '暖'
      }
      if (e < 36) {
        this.currentWeatherIndex[1] = 5
        return '热'
      }
      if (e < 42) { return '炎' }
      if (e < 48) { return '酷' }
      if (e < 52) { return '火' }
      if (e > 55) { return '爆' }
    },
    someDayAgo (e) {
      let date = new Date()
      date.setDate(date.getDate() + e)
      return [date.getMonth() + 1, date.getDate(), date.getDay()]
    },
    getTime () {
      this.currentTime = new Date()
      this.currentTime = [this.currentTime.getHours(), this.currentTime.getMinutes(), this.currentTime.getMonth() + 1, this.currentTime.getDate()]
      this.clockDeg = this.currentTime[0] * 30 + this.currentTime[1] * 0.25
      if (this.currentTime[0] > 18 && this.currentTime[0] < 6) {
        this.isDay = false
        this.currentWeatherIndex[2] = 2
      }
      let cm = '月'
      let cd = '日'
      if (this.CHN(this.currentTime[2]).length > 1) {
        cm = ''
      }
      if (this.CHN(this.currentTime[3]).length > 1) {
        cd = ''
      }
      this.currentDate = this.CHN(this.currentTime[2]) + cm + this.CHN(this.currentTime[3]) + cd
      this.moreDate = [
        this.CHN(this.someDayAgo(0)[0]) + '月' + this.CHN(this.someDayAgo(0)[1]) + ' ' + this.QYR(this.someDayAgo(0)[2]),
        this.CHN(this.someDayAgo(1)[0]) + '月' + this.CHN(this.someDayAgo(1)[1]) + ' ' + this.QYR(this.someDayAgo(1)[2]),
        this.CHN(this.someDayAgo(2)[0]) + '月' + this.CHN(this.someDayAgo(2)[1]) + ' ' + this.QYR(this.someDayAgo(2)[2]),
        this.CHN(this.someDayAgo(3)[0]) + '月' + this.CHN(this.someDayAgo(3)[1]) + ' ' + this.QYR(this.someDayAgo(3)[2])
      ]
    },
    moreSwitch (e) {
      this.moreIndex = e
    },
    imgSwitch () {
      wx.vibrateShort()
      if (this.currentTemp > this.tempEnd - 2) {
        this.currentTemp = 4
      } else {
        this.currentTemp++
      }
      this.tempColor = temp.temp[this.currentTemp].bgc
      this.tempImage = temp.temp[this.currentTemp].bgi
      this.currentTemprature = this.DX(this.currentTemp)
      console.log(this.currentTemprature.length)
      if (this.currentTemprature.length === 2) {
        this.currentTemprature = '零上' + this.currentTemprature
      }
    },
    getMore () {
      // get more data
      this.moreWind = [
        this.WIND(this.originalData.weather_data[0].wind)[0] + '风 ' + this.WIND(this.originalData.weather_data[0].wind)[1],
        this.WIND(this.originalData.weather_data[1].wind)[0] + '风 ' + this.WIND(this.originalData.weather_data[0].wind)[1],
        this.WIND(this.originalData.weather_data[2].wind)[0] + '风 ' + this.WIND(this.originalData.weather_data[0].wind)[1],
        this.WIND(this.originalData.weather_data[3].wind)[0] + '风 ' + this.WIND(this.originalData.weather_data[0].wind)[1]
      ]
      this.moreDes = [
        this.DE(this.originalData.weather_data[0].weather),
        this.DE(this.originalData.weather_data[1].weather),
        this.DE(this.originalData.weather_data[2].weather),
        this.DE(this.originalData.weather_data[3].weather)
      ]
      this.moreTemp = [
        this.CHN(this.originalData.weather_data[0].temperature.split(' ')[2].split('℃')[0]) + '至' + this.CHN(this.originalData.weather_data[0].temperature.split(' ')[0]) + '度',
        this.CHN(this.originalData.weather_data[1].temperature.split(' ')[2].split('℃')[0]) + '至' + this.CHN(this.originalData.weather_data[1].temperature.split(' ')[0]) + '度',
        this.CHN(this.originalData.weather_data[2].temperature.split(' ')[2].split('℃')[0]) + '至' + this.CHN(this.originalData.weather_data[2].temperature.split(' ')[0]) + '度',
        this.CHN(this.originalData.weather_data[3].temperature.split(' ')[2].split('℃')[0]) + '至' + this.CHN(this.originalData.weather_data[3].temperature.split(' ')[0]) + '度'
      ]
      this.moreFeel = [
        this.FEEL((parseInt(this.originalData.weather_data[0].temperature.split(' ')[0]) + parseInt(this.originalData.weather_data[0].temperature.split(' ')[2].split('℃')[0])) / 2),
        this.FEEL((parseInt(this.originalData.weather_data[1].temperature.split(' ')[0]) + parseInt(this.originalData.weather_data[1].temperature.split(' ')[2].split('℃')[0])) / 2),
        this.FEEL((parseInt(this.originalData.weather_data[2].temperature.split(' ')[0]) + parseInt(this.originalData.weather_data[2].temperature.split(' ')[2].split('℃')[0])) / 2),
        this.FEEL((parseInt(this.originalData.weather_data[3].temperature.split(' ')[0]) + parseInt(this.originalData.weather_data[3].temperature.split(' ')[2].split('℃')[0])) / 2)
      ]
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
        // get more data
        this.getMore()
        // get current data
        this.currentWeather = this.DE(this.currentData.weatherDesc)
        this.currentWind = this.WIND(this.currentData.wind)[0] + '风'
        this.currentLocation = this.currentData.currentCity.split('市')[0]
        this.currentTemprature = this.CHN(this.currentData.date.split('：')[1].split('℃')[0]) + '度'
        this.currentFeel = this.FEEL(this.currentData.date.split('：')[1].split('℃')[0])
        if (this.currentTemprature.length === 2 && this.currentTemprature !== '零度') {
          this.currentTemprature = '零上' + this.currentTemprature
        }
        if (this.currentTemprature === '零度') {
          this.currentTemprature = '永恒' + this.currentTemprature
        }
        if (this.currentTemprature[0] === '十') {
          this.currentTemprature = '一' + this.currentTemprature
        }
        this.currentTemp = this.currentData.date.split('：')[1].split('℃')[0]
        if (this.currentTemp > this.tempOpen && this.currentTemp < this.tempEnd) {
          this.tempColor = temp.temp[this.currentTemp].bgc
          this.tempImage = temp.temp[this.currentTemp].bgi
        }
        // this.currentWeatherIndex = parseInt(this.currentWeatherIndex[0] + '' + this.currentWeatherIndex[1] + '' + this.currentWeatherIndex[2])
        console.log(this.currentWeatherIndex)
      }
    })
    // get time
    this.getTime()
    // get moreInfo
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
  & .texture {
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
      padding 90px 0 30px
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
                & b {
                  position absolute
                  top 50%
                  left 50%
                  color #fff
                  font-size 12px
                  transform translate(-50%, -50%) scale(0.95)
                  opacity 0.3
                }
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
        font-size 42px
        letter-spacing 5px
      }
      p {
        margin 5px 12px 0
        font-size 14px
        color co_6
        letter-spacing 3px
      }
    }
  }
  .label {
    background c3
    width 30px
    position fixed
    top 0
    left 20px
    text-align center
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
    & .feeling {
      position relative
      height 18px
      top -2px
      width 100%
      display inline-block
      &:before {
        position absolute
        border-radius 50%
        content ''
        display inline-block
        height 15px
        width 15px
        border 1px solid co_14
        opacity 0.5
        top 50%
        left 50%
        transform translate(-50%, -50%)
      }
      & b {
        color co_14
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%) scale(0.8)
        font-size 12px
      }
    }
    & .date {
      position relative
      z-index 10
      font-size 12px
      transform scale(0.5)
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
    height 90px
    width 100%
    z-index 99
    & span {
      transition 0.7s
      width 20%
      height 100%
      display inline-block
      float left
      position relative
      &.act {
        width 40%
      }
      & .liner {
        width 100%
        height 100%
        position absolute
        bottom 0
        background #000
        opacity 0.08
      }
      & .arrow {
        position absolute
        height 1px
        width 50%
        background c3
        top 50%
        left 50%
        transform translate(-50%, -50%) scale(0.7)
        opacity 0
        transition 0.7s ease
        &:before {
          position absolute
          right 0
          bottom 0
          height 0px
          width 0px
          border 5px solid transparent
          border-bottom 5px solid c3
          content ''
          display inline-block
        }
        &.act {
          opacity 0
        }
      }
      & .dayName {
        font-size 14px
        transition 0.7s
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%) scale(0.8)
        color #aaa
        opacity 0
        &.act {
          opacity 1
        }
      }
      & .inner {
        box-sizing border-box
        padding-top 6px
        .owInfo {
          transition 0.7s ease
          transform scale(0.7)
          opacity 0
          &.act {
            opacity 1
          }
          .ow-temp {
            font-size 12px
            color #666
            margin-left 3px
            white-space nowrap
          }
          .ow-des {
            font-size 36px
            margin 10px 0
            white-space nowrap
          }
          .ow-date {
            font-size 12px
            color #666
            margin-left 3px
            white-space nowrap
            & b {
              position relative
              top 0px
              left 1px
              display inline-block
              color co_14
              transform scale(0.8)
              &:before {
                position absolute
                border-radius 50%
                content ''
                display inline-block
                height 18px
                width 18px
                border 1px solid co_14
                opacity 0.5
                top 45%
                left 50%
                transform translate(-50%, -50%)
              }
            }
          }
        }
      }
    }
  }
}
</style>