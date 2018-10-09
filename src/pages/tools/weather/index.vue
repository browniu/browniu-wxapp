<template>
  <div>Hello Vue!{{currentData.date}}</div>
</template>

<script>
let bmap = require('../../../utils/bmap-wx.js')
export default {
  data () {
    return {
      currentData: ['currentCity', 'date', 'pm25', 'temperature', 'weatherDesc', 'wind'],
      originalData: ['currentCity', ['des', 'tipt', 'title', 'zs'], 'pm25', ['date', 'dayPictureUrl', 'nightPictureUrl', 'temperature', 'weather', 'wind']]
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
      }
    })
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
</style>