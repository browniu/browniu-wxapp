<template>
  <div class="colorful-explore" @click="next" @longpress="getPlan">
    <div :class="['colors',nextSwitch?'during':'',afterSwitch?'after':'',lastSwitch?'last':'']">
      <li class="item" v-for="(item, index) in colorsBefore" :key="index" :style="{backgroundColor:item}">
        <span>{{item}}</span>
      </li>
      <li class="item" v-for="(item, index) in colorsAfter" :key="index" :style="{backgroundColor:item}">
        <span> {{item}}</span>
      </li>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      colorsBefore: [],
      colorsAfter: [],
      colorList: [
        ['#f7f4e3', '#d2e1c8', '#fee4a6', '#f9c4aa', '#494949'],
        ['#550527', '#688E26', '#FAA613', '#F44708', '#A10702'],
        ['#2176AE', '#57B8FF', '#B66D0D', '#FBB13C', '#FE6847'],
        ['#003049', '#D62828', '#F77F00', '#FCBF49', '#EAE2B7'],
        ['#2176AE', '#57B8FF', '#B66D0D', '#FBB13C', '#FE6847'],
        ['#002500', '#929982', '#EDCBB1', '#B7245C', '#7C3238'],
        ['#B8D8D8', '#7A9E9F', '#4F6367', '#EEF5DB', '#FE5F55'],
        ['#CA054D', '#3B1C32', '#A4D4B4', '#FFCF9C', '#B96D40'],
        ['#25283D', '#8F3985', '#98DFEA', '#07BEB8', '#EFD9CE'],
        ['#7C9EB2', '#52528C', '#372554', '#231123', '#000000'],
        ['#F0B67F', '#FE5F55', '#D6D1B1', '#C7EFCF', '#EEF5DB'],
        ['#3A3335', '#D81E5B', '#F0544F', '#FDF0D5', '#C6D8D3'],
        ['#F18F01', '#048BA8', '#2E4057', '#99C24D', '#2F2D2E'],
        ['#2B193D', '#2C365E', '#484D6D', '#4B8F8C', '#C5979D'],
        ['#2B59C3', '#253C78', '#D36582', '#FFEECF', '#C9A690'],
        ['#584B53', '#57B8FF', '#9D5C63', '#FEF5EF', '#E4BB97'],
        ['#011627', '#FDFFFC', '#2EC4B6', '#E71D36', '#FF9F1C']
      ],
      resortList: [],
      nextSwitch: false,
      afterSwitch: false,
      showIndex: 1
    }
  },
  methods: {
    next () {
      wx.vibrateShort()
      this.showIndex++
      console.log(this.showIndex)
      if (this.showIndex < 17) {
        if (!this.nextSwitch && !this.afterSwitch) {
          this.nextSwitch = true
          setTimeout(() => {
            this.colorsBefore = this.colorList[this.showIndex]
            this.afterSwitch = true
          }, 700)
        } else {
          this.afterSwitch = false
          this.lastSwitch = true
          setTimeout(() => {
            this.colorsAfter = this.colorList[this.showIndex]
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
      wx.setClipboardData({
        data: (this.colorsBefore).toString(),
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
      let randomIndex = this.randomArray(this.colorList.length)
      for (let index = 0; index < randomIndex.length; index++) {
        const element = randomIndex[index] - 1
        this.resortList.push(this.colorList[element])
      }
    }
  },
  onLoad () {
    this.resortArray(this.colorList)
    this.colorsBefore = this.resortList[this.showIndex]
    this.colorsAfter = this.resortList[this.showIndex + 1]
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