<template>
  <div class="dice" @click="shakeDice">
    <!-- <div class="texture">
      <div :style="{background:'rgb('+colors[dice-1][0]+')'}" :class="['texture-inner',shake?'rotate':'']">
        <span :style="{borderTopColor:'rgb('+colors[dice-1][1]+')',borderRightColor:'rgb('+colors[dice-1][1]+')'}"></span>
      </div>
    </div> -->
    <div class="main">
      <div :class="['inner',shake?'rotate':'',dice===1?'dice1':'',dice===2?'dice2':'',dice===3?'dice3':'',dice===4?'dice4':'',dice===5?'dice5':'',dice===6?'dice6':'']">
        <li :class="['texture-inner',shake?'rotate':'']" v-for="(item, index) in 6" :key="index"></li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dice: 1,
      shake: false,
      colors: [
        [[168, 237, 234], [254, 214, 227]],
        [[52, 143, 80], [86, 180, 211]],
        [[131, 96, 195], [46, 191, 145]],
        [[255, 110, 127], [191, 233, 255]],
        [[62, 81, 81], [222, 203, 164]],
        [[218, 68, 83], [137, 33, 107]]
      ]
    }
  },
  methods: {
    shakeDice () {
      this.shake = false
      setTimeout(() => {
        this.shake = true
      }, 0)
      this.dice = Math.floor(Math.random() * 6 + 1)
      console.log(this.dice)
    }
  },
  onLoad () {
    this.shakeDice()
    wx.setNavigationBarTitle({
      title: '大富翁'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#b31217',
      animation: {
        duration: 200,
        timingFunc: 'easeIn'
      }
    })
  }
}
</script>
<style lang='stylus' scoped>
@import '../dice/keyframe.css'
co_1 = #fff
co_2 = #663c6d
textureSize = 120vh
textureInnerSize = 60vh
.dice {
  height 100vh
  overflow hidden
  background co_2
  background linear-gradient(45deg, #003973, #e5e5be)
  & .texture {
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    height textureSize
    width textureSize
    background #000
    z-index 0
    & .texture-inner {
      transition background 2s cubic-bezier(0.86, 0.01, 0, 1)
      height 100%
      width 100%
      background #dd3e54
      &.rotate {
        animation unshake 5s cubic-bezier(0.86, 0.01, 0, 1)
      }
      & span {
        transition 2s cubic-bezier(0.86, 0.01, 0, 1)
        display inline-block
        height 0
        width 0
        border textureInnerSize solid #6be585
        border-bottom-color transparent
        border-left-color transparent
      }
    }
  }
  & .main {
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    & .inner {
      transition 1s ease
      height 200px
      width 200px
      // border-top-left-radius 50%
      // border-bottom-right-radius 50%
      border 1px solid co_1
      & li {
        height 15px
        width 15px
        background co_1
        list-style none
        border-radius 50%
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        transition 0.7s ease 0.7s
      }
      &.rotate {
        animation shake 1.5s cubic-bezier(0.86, 0.01, 0, 1)
      }
      &.dice1 {
        & li {
          top 50%
          left 50%
        }
      }
      &.dice2 {
        & li:nth-child(odd) {
          top 25%
          left 75%
        }
        & li:nth-child(even) {
          top 75%
          left 25%
        }
      }
      &.dice3 {
        & li:nth-child(odd) {
          top 25%
          left 75%
        }
        & li:nth-child(even) {
          top 75%
          left 25%
        }
        & li:last-child {
          top 50%
          left 50%
          border-radius 50%
        }
      }
      &.dice4 {
        & li:nth-child(1) {
          top 25%
          left 25%
        }
        & li:nth-child(2), & li:nth-child(5) {
          top 25%
          left 75%
        }
        & li:nth-child(3), & li:nth-child(6) {
          top 75%
          left 25%
        }
        & li:nth-child(4) {
          top 75%
          left 75%
        }
      }
      &.dice5 {
        & li:nth-child(1) {
          top 25%
          left 25%
        }
        & li:nth-child(2) {
          top 25%
          left 75%
        }
        & li:nth-child(3) {
          top 75%
          left 25%
        }
        & li:nth-child(4) {
          top 75%
          left 75%
        }
        & li:nth-child(5), & li:nth-child(6) {
          top 50%
          left 50%
        }
      }
      &.dice6 {
        & li:nth-child(1) {
          top 25%
          left 37.5%
        }
        & li:nth-child(2) {
          top 50%
          left 37.5%
        }
        & li:nth-child(3) {
          top 75%
          left 37.5%
        }
        & li:nth-child(4) {
          top 25%
          left 62.5%
        }
        & li:nth-child(5) {
          top 50%
          left 62.5%
        }
        & li:nth-child(6) {
          top 75%
          left 62.5%
        }
      }
    }
  }
}
</style>