<template>
  <div class="dice" @click="shakeDice">
    <div class="main">
      <div :class="['inner',shake?'rotate':'',dice===1?'dice1':'',dice===2?'dice2':'',dice===3?'dice3':'',dice===4?'dice4':'',dice===5?'dice5':'',dice===6?'dice6':'']">
        <li v-for="(item, index) in 6" :key="index"></li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dice: null,
      shake: false
    }
  },
  methods: {
    shakeDice () {
      this.shake = false
      setTimeout(() => {
        this.shake = true
      }, 0)
      this.dice = Math.floor(Math.random() * 6 + 1)
    }
  },
  onLoad () {
    wx.setNavigationBarTitle({
      title: '摇骰子'
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
co_1 = rgba(249, 206, 205, 1)
co_2 = #663c6d
.dice {
  height 100vh
  overflow hidden
  background co_2
  background linear-gradient(to bottom, #b31217, #e52d27)
  position relative
  & .main {
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    & .inner {
      transition 1s ease
      height 200px
      width 200px
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
        transition 0.5s ease 1s
      }
      &.rotate {
        animation shake 1.5s cubic-bezier(0.97, 0.01, 0.27, 1.01)
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
        }
      }
      &.dice4 {
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
        & li:nth-child(5) {
          top 50%
          left 50%
        }
        & li:nth-child(6) {
          top 50%
          left 50%
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
        & li:nth-child(5) {
          top 50%
          left 50%
        }
        & li:nth-child(6) {
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