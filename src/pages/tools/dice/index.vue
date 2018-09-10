<template>
  <div class="dice">
    <!-- <button @click="shakeDice">摇一摇</button> -->
    <div class="main">
      <div :class="['inner',shake?'rot':'']" @click="shakeDice">
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
      this.shake = true
      setTimeout(() => {
        this.shake = false
      }, 1000)
      console.log('shake')
      this.dice = Math.floor(Math.random() * 6 + 1)
    }
  }
}
</script>
<style lang='stylus' scoped>
// @import '../../../assets/styles/index.styl'
co_1 = #e639a3
co_2 = #663c6d
.dice {
  height 100vh
  overflow hidden
  background co_2
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
      border 2px solid co_1
      &.rot {
        transform rotate(720deg)
      }
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
      }
    }
  }
}
</style>