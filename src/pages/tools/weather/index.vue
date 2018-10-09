<template>
  <div class="weather">{{currentData.date}}{{currentData.currentCity}}
    <div class="test">
      {{currentTemprature}}
    </div>
  </div>
</template>

<script>
let bmap = require('../../../utils/bmap-wx.js')
export default {
  data () {
    return {
      currentData: ['currentCity', 'date', 'pm25', 'temperature', 'weatherDesc', 'wind'],
      originalData: ['currentCity', ['des', 'tipt', 'title', 'zs'], 'pm25', ['date', 'dayPictureUrl', 'nightPictureUrl', 'temperature', 'weather', 'wind']],
      currentTemprature: ''
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

        this.currentTemprature = this.DX(this.currentData.date.split('：')[1].split('℃')[0])
      }
    })
  },
  methods: {
    DX (n) {
      if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) return '数据非法'
      let unit = '京亿万仟佰拾兆万仟佰拾亿仟佰拾万仟佰拾度分秒'
      let str = ''
      n += '00'
      let p = n.indexOf('.')
      if (p >= 0) {
        n = n.substring(0, p) + n.substr(p + 1, 2)
      }
      unit = unit.substr(unit.length - n.length)
      // 零壹贰叁肆伍陆柒捌玖 一二三四五六七八九
      for (let i = 0; i < n.length; i++) str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i)
      return str.replace(/零(仟|佰|拾|分)/g, '零').replace(/(零)+/g, '零').replace(/零(兆|万|亿|度)/g, '$1').replace(/(兆|亿)万/g, '$1').replace(/(京|兆)亿/g, '$1').replace(/(京)兆/g, '$1').replace(/(京|兆|亿|仟|佰|拾)(万?)(.)仟/g, '$1$2零$3仟').replace(/^度零?|零秒/g, '')
    }
  }
}
</script>
<style lang='stylus' scoped>
c1 = #f1eee9
c2 = #070304
@import '../../../assets/styles/index.styl'
@font-face {
  font-family 'qingke'
  src url('http://pb85uax7t.bkt.clouddn.com/fzqingke.TTF') format('truetype')
}
.weather {
  height 100vh
  overflow hidden
  background c1
  color c2
  font-family qingke
  .test {
    font-size 50px
  }
}
</style>