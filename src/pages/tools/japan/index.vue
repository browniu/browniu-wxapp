<template>
  <div class="japan">
    <div class="screen">
      <div class="item cny">
        <h1>{{cnyResult}}</h1>
        <p>¥人民币
          <span v-if="!exchangeSwitch">目标货币</span>
        </p>
      </div>
      <div class="item jap">
        <h1>{{japResult}}</h1>
        <p>¥日元
          <span v-if="exchangeSwitch">目标货币</span>
        </p>
      </div>
    </div>
    <div class="control">
      <div class="inner">
        <div class="switch" @click="exSwitch">
          <div class="ex">
            <i :class="['iconfont',!exchangeSwitch?'act':'']">&#xe613;</i>
            <i :class="['iconfont',exchangeSwitch?'act':'']">&#xe613;</i>
          </div>
          <div class="flag">
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="keyboard" @click.stop="keyPress">
          <div @touchstart="keyTouch = item" @touchend="keyDown" :data-value="item" v-for="(item, index) in keyValue" :key="index" :class="['key',keyTouch===item?'touch':'']">{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyValue: [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'C'],
      result: '',
      japResult: 0,
      cnyResult: 0,
      exchangeSwitch: true,
      exchangeRate: 17.1278,
      keyTouch: false
    }
  },
  methods: {
    keyDown () {
      console.log('keyDown')
      setTimeout(() => {
        this.keyTouch = false
      }, 100)
    },
    exchange () {
      let R = Number(this.result)
      if (this.exchangeSwitch) {
        this.cnyResult = R
        this.japResult = (R * this.exchangeRate).toFixed(2)
      } else {
        this.cnyResult = (R / this.exchangeRate).toFixed(2)
        this.japResult = R
      }
    },
    exSwitch () {
      console.log('exchange switch')
      this.result = ''
      this.japResult = 0
      this.cnyResult = 0
      if (this.exchangeSwitch) {
        this.exchangeSwitch = false
      } else {
        this.exchangeSwitch = true
      }
    },
    keyPress (e) {
      console.log(e.target.dataset.value)
      switch (e.target.dataset.value) {
        case '.': this.keyPoint()
          break
        case 'C': this.keyClear()
          break
        default: this.keyNumber(e.target.dataset.value)
          break
      }
      this.exchange()
    },
    keyPoint () {
      console.log('this is point')
      if (this.result.indexOf('.') > -1) return false
      if (!this.result.length) {
        this.result = '0.'
      } else {
        this.result = this.result + '.'
      }
    },
    keyClear () {
      console.log('this is clear')
      this.result = ''
    },
    keyNumber (e) {
      console.log('this is number ' + e)
      let R = this.result
      if (R.indexOf('.') > -1) {
        console.log('have point')
        if (R.substring(R.indexOf('.') + 1).length < 2) {
          this.result = R + e
        }
      } else {
        console.log('none point')
        if (R.length && Number(R.charAt(0)) === 0) return
        this.result = R + e
      }
      if (e === 0 && R.length === 0) {
        console.log('first zero')
        this.result = '0.'
      }
    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '中日友好'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#1e3479',
      animation: {
        duration: 200,
        timingFunc: 'easeIn'
      }
    })
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
keyWidth = calc(((100vw - 3px) / 3))
keyHeight = calc(((100vw - 2px) / 5.5))
c_1 = #003a61
c_2 = #367f9d
c_2_1 = #4252c0
c_2_2 = #6340a9
c_2_3 = #4432d8
c_2_4 = #1e3479
.japan {
  height 100vh
  background linear-gradient(to bottom, c_2_4, c_2_3)
  .screen {
    & .item {
      box-sizing border-box
      padding 25px
      & h1 {
        font-size 36px
        font-weight lighter
        font-weight 100
        color rgba(255, 255, 255, 0.7)
      }
      & p {
        margin-top 3px
        font-size 12px
        color rgba(255, 255, 255, 0.5)
        position relative
        & span {
          position absolute
          top -5px
          transform scale(0.6)
          display inline-block
          background rgba(255, 255, 255, 0.3)
          padding 5px 8px
          border-radius 3px
          font-size 12px
        }
      }
    }
    .cny {
      border-bottom 1px solid rgba(255, 255, 255, 0.03)
    }
  }
  .control {
    position fixed
    bottom 0
    &:before {
      z-index 0
      content ''
      display inline-block
      height 100%
      width 100%
      position absolute
      top 0
      left 0
      background rgba(10, 29, 88, 0.7)
      filter blur(10px)
    }
    .inner {
      position relative
      z-index 1
      background linear-gradient(135deg, c_2_2, c_2_1)
      .switch {
        height 65px
        border-bottom 1px solid rgba(255, 255, 255, 0.03)
        position relative
        .ex {
          width 30px
          height 30px
          position absolute
          top 50%
          left 50%
          transform translate(-50%, -50%)
          i {
            position absolute
            font-size 12px
            color rgba(0, 0, 0, 0.15)
            transform scale(0.7)
            top 13px
            &:last-child {
              top 3px
              transform scale(0.7) rotate(180deg)
            }
            &.act {
              transform scale(0.9)
              color rgba(160, 180, 253, 1)
              &:last-child {
                transform scale(0.9) rotate(180deg)
              }
            }
          }
        }
        .flag {
          height 100%
          width 42%
          margin 0 auto
          position relative
          & span {
            position absolute
            top 50%
            transform translateY(-50%)
            float left
            height 25px
            width 25px
            background #fff
            border-radius 50%
            display inline-block
            background url('http://pb85uax7t.bkt.clouddn.com/chinaFlagScreen.jpg')
            background-size 110%
            background-position center center
            background-repeat no-repeat
            &:last-child {
              background-image url('http://pb85uax7t.bkt.clouddn.com/japanFlagScreen.jpg')
              right 0
              float right
            }
          }
        }
      }
      .keyboard {
        margin-top 15px
        display flex
        flex-direction row
        flex-wrap wrap
        justify-content left
        width 100%
        .key {
          transition 0.3s
          height keyHeight
          line-height keyHeight
          width keyWidth
          // background co_10
          margin-right 1px
          margin-bottom 1px
          font-size 18px
          font-weight light
          text-align center
          color rgba(255, 255, 255, 1)
          background rgba(50, 132, 158, 0)
          &.touch {
            background rgba(255, 255, 255, 0.05)
          }
          &:nth-of-type(3n) {
            margin-right 0
          }
        }
      }
    }
  }
}
</style>