<template>
  <div class="colorful-explore" @click="next" @longpress="getPlan">
    <div :class="['colors',nextSwitch?'during':'',afterSwitch?'after':'',lastSwitch?'last':'']">
      <li class="item" @click="current(item,index)" v-for="(item, index) in colorsBefore" :key="index" :style="{backgroundColor:item}">
        <span>{{item}}</span>
      </li>
      <li class="item" @click="current(item,index)" v-for="(item, index) in colorsAfter" :key="index" :style="{backgroundColor:item}">
        <span>{{item}}</span>
      </li>
    </div>
  </div>
</template>
<script>
import colorList from '../colorful/colors.json'
export default {
  data () {
    return {
      colorsBefore: [],
      colorsAfter: [],
      colorsList: [],
      resortList: [],
      nextSwitch: false,
      afterSwitch: false,
      showIndex: 1,
      currentPlan: []
    }
  },
  methods: {
    next () {
      wx.vibrateShort()
      this.showIndex++
      if (this.showIndex < this.colorsList.length) {
        if (!this.nextSwitch && !this.afterSwitch) {
          this.nextSwitch = true
          setTimeout(() => {
            console.log(this.showIndex)
            this.colorsBefore = this.resortList[this.showIndex]
            this.afterSwitch = true
          }, 700)
        } else {
          this.afterSwitch = false
          this.lastSwitch = true
          setTimeout(() => {
            console.log(this.showIndex)
            this.colorsAfter = this.resortList[this.showIndex]
            this.nextSwitch = false
            this.lastSwitch = false
          }, 700)
        }
      } else {
        this.showIndex = -1
      }
    },
    getPlan () {
      wx.vibrateLong()
      // console.log(this.colorsBefore, this.colorsAfter, this.nextSwitch, this.afterSwitch, this.lastSwitch)
      wx.setClipboardData({
        data: (this.currentPlan).toString(),
        icon: 'none',
        success: (res) => {
          wx.showToast({
            icon: 'succeed',
            title: '已拷贝方案 ',
            during: '1000'
          })
        }
      })
    },
    getCode (e, item) {
      wx.vibrateShort()
      wx.setClipboardData({
        data: item,
        success: (res) => {
          wx.showToast({
            icon: 'succeed',
            title: '已拷贝色值 ',
            during: '1000'
          })
        }
      })
    },
    randomArray (length) {
      var i, index, temp
      let arr = [length]
      for (i = 1; i <= length; i++) {
        arr[i - 1] = i
      }
      for (i = 1; i <= length; i++) {
        index = parseInt(Math.random() * (length - i)) + i
        if (index !== i) {
          temp = arr[i]
          arr[i] = arr[index]
          arr[index] = temp
        }
      }
      return arr
    },
    resortArray (list) {
      let randomIndex = this.randomArray(this.colorsList.length)
      for (let index = 0; index < randomIndex.length; index++) {
        const element = randomIndex[index] - 1
        this.resortList.push(this.colorsList[element])
      }
    },
    current (item, index) {
      if (this.colorsBefore[index] === item) {
        this.currentPlan = this.colorsAfter
      } else {
        this.currentPlan = this.colorsBefore
      }
    }
  },
  onLoad () {
    this.colorsList = colorList.colorList
    console.log(this.colorsList)
    this.resortArray(this.colorsfList)
    this.colorsBefore = this.resortList[this.showIndex]
    this.colorsAfter = this.resortList[this.showIndex + this.colorsList.length - 2]
    this.currentPlan = this.colorsBefore
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
@import '../colorful/animation.css'
.colorful-explore {
  height 100%
  .colors {
    position relative
    height 100%
    background #000
    & li {
      box-sizing border-box
      padding 0 30px
      position absolute
      vertical-align middle
      height 20%
      width 100%
      transition 0.7s cubic-bezier(1, 0.01, 0.4, 1)
      & span {
        display inline-block
        font-size 12px
        color #fff
        position absolute
        top 50%
        opacity 0.2
        transform translateY(-50%)
      }
      &:nth-child(1) {
        top 0%
        z-index 50
      }
      &:nth-child(2) {
        top 20%
        z-index 40
      }
      &:nth-child(3) {
        top 40%
        z-index 30
      }
      &:nth-child(4) {
        top 60%
        z-index 20
      }
      &:nth-child(5) {
        top 80%
        z-index 10
      }
      &:nth-child(6) {
        top 0%
        transform translateX(100%)
        z-index 51
      }
      &:nth-child(7) {
        transform translateX(-100%)
        top 20%
        z-index 41
      }
      &:nth-child(8) {
        transform translateX(100%)
        top 40%
        z-index 31
      }
      &:nth-child(9) {
        transform translateX(-100%)
        top 60%
        z-index 21
      }
      &:nth-child(10) {
        transform translateX(100%)
        top 80%
        z-index 11
      }
    }
    &.during {
      & li {
        &:nth-child(1) {
          opacity 0.5
        }
        &:nth-child(2) {
          opacity 0.5
        }
        &:nth-child(3) {
          opacity 0.5
        }
        &:nth-child(4) {
          opacity 0.5
        }
        &:nth-child(5) {
          opacity 0.5
        }
        &:nth-child(6) {
          transform translateX(0)
        }
        &:nth-child(7) {
          transform translateX(0)
        }
        &:nth-child(8) {
          transform translateX(0)
        }
        &:nth-child(9) {
          transform translateX(0)
        }
        &:nth-child(10) {
          transform translateX(0)
        }
      }
    }
    &.after {
      & li {
        &:nth-child(1) {
          transform translateX(100%)
          opacity 1
        }
        &:nth-child(2) {
          transform translateX(-100%)
          opacity 1
        }
        &:nth-child(3) {
          transform translateX(100%)
          opacity 1
        }
        &:nth-child(4) {
          transform translateX(-100%)
          opacity 1
        }
        &:nth-child(5) {
          transform translateX(100%)
          opacity 1
        }
      }
    }
    &.last {
      & li {
        &:nth-child(1) {
          z-index 51
          transform translateX(0)
        }
        &:nth-child(2) {
          z-index 41
          transform translateX(0)
        }
        &:nth-child(3) {
          z-index 31
          transform translateX(0)
        }
        &:nth-child(4) {
          z-index 21
          transform translateX(0)
        }
        &:nth-child(5) {
          z-index 11
          transform translateX(0)
        }
        &:nth-child(6) {
          z-index 50
          opacity 0.5
        }
        &:nth-child(7) {
          z-index 50
          opacity 0.5
        }
        &:nth-child(8) {
          z-index 50
          opacity 0.5
        }
        &:nth-child(9) {
          z-index 50
          opacity 0.5
        }
        &:nth-child(10) {
          z-index 50
          opacity 0.5
        }
      }
    }
  }
}
</style>