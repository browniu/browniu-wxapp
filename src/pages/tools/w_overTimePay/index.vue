<template>
  <div class="overtimePay">
    <div class="texture"></div>
    <div class="model">
      <div class="face">
        <div class="eye-shade"></div>
        <div :class="['eye-white',eyeClose?'eye_close':'']">
          <div :style="{transform:'translateX('+eyeMove*0.7+'px)'}" :class="['eye-ball',eyeState?'active':'']"></div>
        </div>
        <div class="eye-shade right"></div>
        <div :class="['eye-white right',eyeClose?'eye_close':'']">
          <div :style="{transform:'translateX('+eyeMove*0.7+'px)'}" :class="['eye-ball',eyeState?'active':'']"></div>
        </div>
      </div>
    </div>
    <main>
      <form>
        <div class="inputGrop">
          <label :class="[label1State ? 'active' : '']" for="pay">岗位薪资</label>
          <input type="number" name="pay" @input="enterValue($event)" @focus="input1Focus" @blur="input1Blur($event)" v-model="pay">
        </div>
        <div class="inputGrop">
          <label :class="[label3State ? 'active' : '']" for="pay">总加班时间（小时）</label>
          <input type="number" name="pay" @input="enterValue($event)" @focus="input3Focus" @blur="input3Blur($event)" v-model="hour">
        </div>
      </form>
      <p>本月的旺旺加班费是
        <span>{{overtimePay}}</span>
        元</p>
    </main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pay: '',
      day: '',
      hour: '',
      label1State: false,
      label2State: false,
      label3State: false,
      eyeState: false,
      eyeMove: 0
    }
  },
  computed: {
    overtimePay: function () {
      if (isNaN((this.pay / 22 / 8 * this.hour).toFixed(2))) {
        return 0
      }
      return (this.pay / 22 / 8 * this.hour).toFixed(2)
    }
  },
  methods: {
    input1Focus () {
      this.label1State = true
      this.eyeState = true
    },
    input3Focus () {
      this.label3State = true
      this.eyeState = true
    },
    input1Blur (ev) {
      this.eyeMove = 0
      this.eyeState = false
      if (ev.target.value.length === 0) {
        this.label1State = false
      }
    },
    input3Blur (ev) {
      this.eyeMove = 0
      this.eyeState = false
      if (ev.target.value.length === 0) {
        this.label3State = false
      }
    },
    enterValue (e) {
      console.log(e.target.value.length)
      if (e.target.value.length < 10) {
        this.eyeMove = e.target.value.length
      }
    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: '旺旺加班费'
    })
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
.overtimePay {
  text-align center
  color co_11
  height 100vh
  position relative
  background-color #fff
  overflow hidden
  & .texture {
    height 100vh
    width 100vw
    position fixed
    top 0
    left 0
    background-image url('http://www.hotkidclub.com/cpn/ceo-intro/images/theme-pattern_5.jpg')
    opacity 0.2
  }
  & .model {
    font-size 60px
    margin-bottom 15px
    margin-top 80px
    & .face {
      height 2em
      width 2em
      position relative
      left 50%
      transform translateX(-50%)
      margin 0
      padding 0
      background-image url('../../../assets/images/main_model.svg')
      background-size contain
      background-repeat no-repeat
      & .eye-shade {
        background #231815
        width 0.3em
        height 0.4em
        position absolute
        top 0.5em
        left 0.55em
        border-radius 50%
        border 0.05em solid #231815
        &.right {
          left 1.05em
        }
      }
      & .eye-white {
        position absolute
        width 0.3em
        height 0.4em
        border-radius 50%
        background #fff
        z-index 10
        top 0.5em
        left 0.55em
        transition transform 0.1s ease
        border 0.05em solid #231815
        & .eye-ball {
          position absolute
          right 0
          top 0.1em
          height 0.2em
          width 0.2em
          border-radius 50%
          transition transform 0.7s
          background #231815
          transform translate(0, 0)
          &.active {
            right 0.15em
            top 0.18em
          }
        }
        &.right {
          left auto
          right 0.55em
        }
        &.eye_close {
          transform scaleY(0.03)
        }
      }
    }
  }
  main {
    & form {
      display inline-block
      & .inputGrop {
        position relative
        & label {
          position absolute
          z-index 10
          top 50%
          left 10px
          transform translateY(-50%)
          color #aaa
          // font-weight lighter
          font-size 14px
          transition 0.15s ease
          &.active {
            top -10px
            left 3px
            font-size 12px
            color #333
            font-weight normal
          }
        }
        & input {
          text-align left
          box-sizing border-box
          border-radius 3px
          height 50px
          width 250px
          letter-spacing 3px
          outline none
          border 0
          font-size 16px
          padding 0 10px
          margin-bottom 25px
          background #fff
        }
      }
    }
    & p {
      font-size 14px
      color co_7
      & span {
        color co_3
        font-weight bolder
      }
    }
  }
}
</style>
