<template>
  <div class="remainder navigatePosition">
    <label for="field"></label>
    <input id="killNumber" name="field" v-model="killNumber" type="number">
    <p>能被
      <i>3</i> 整除且最接近输入值的整数是<br>
      <span :class="((killNumber % 3)===0?'act':'')">{{killNumber - killNumber % 3}}</span> ||
      <span>{{killNumber - killNumber % 3 + 3}}</span>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      killNumber: 0,
      killer: 3
    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: 'Killer 3'
    })
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
.remainder {
  // height 100vh
  width 100vw
  height 100vh
  overflow hidden
  background #fff
  text-align center
  background-image url('https://www.transparenttextures.com/patterns/brilliant.png')
  padding-top 80px
  &>input {
    text-align center
    display inline-block
    outline none
    border 0
    height 50px
    width 250px
    background #f8f8f8
    outline none
    font-size 16px
    color co_13
    padding 0 15px
    margin-bottom 15px
    border-radius 3px
  }
  p {
    line-height 25px
    color co_11
    font-size 16px
    font-weight normal
    & i {
      color co_13
      display inline-block
    }
  }
  p input {
    display inline-block
    height 15px
    padding 5px
    margin 0 5px
  }
  & span {
    font-size 18px
    color co_3
    font-weight bold
    margin 0 5px
    transition 0.3s
    &.act {
      color co_13
      font-weight bolder
    }
  }
}
</style>
