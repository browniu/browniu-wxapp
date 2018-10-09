<template>
  <div class="weather">Hello Vue!{{currentData.date}}
    <div class="test">
      万里无云
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
    new bmap.BMapWX().weather({
      fail: (res) => {
        console.log(res)
      },
      success: (res) => {
        console.log(res)
        this.currentData = res.currentWeather[0]
        this.originalData = res.originalData.results[0]
        this.currentTemprature = this.currentData.date.split('：')[1].split('℃')[0]
      }
    })
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
@font-face {
  font-family 'qingke'
  src url('http://pb85uax7t.bkt.clouddn.com/fzqingke.TTF') format('truetype')
  /* iOS 4.1- */
}
.weather {
  color co_3
  font-family serif
  .test {
    font-family qingke
    font-weight 500
    font-size 4em
    font-size 100px
  }
}
</style>