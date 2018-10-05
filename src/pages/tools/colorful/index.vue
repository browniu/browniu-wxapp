<template>
  <div class="colorful">
    <div class="main">
      <cExplore v-if="tab===0"></cExplore>
      <cMake v-if="tab===1"></cMake>
      <cFavorite v-if="tab===2"></cFavorite>
    </div>
    <div class="tab">
      <div :class="['item',tab===index?'act':'']" @click="tab=index" v-for="(item, index) in tabMenu" :key="index">{{item}}</div>
    </div>
  </div>
</template>

<script>
import cExplore from '../colorful/cExplore.vue'
import cMake from '../colorful/cMake.vue'
import cFavorite from '../colorful/cFavorite.vue'
export default {
  data () {
    return {
      tab: 0,
      tabMenu: ['探索', '制作', '收藏']
    }
  },
  components: {
    cExplore,
    cMake,
    cFavorite
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
.colorful {
  height 100vh
  width 100vw
  // background linear-gradient(45deg, #7d51fb, #51c9ff)
  overflow hidden
  box-sizing border-box
  // padding-top 30px
  .main {
    height calc(100% - 40px)
  }
  .tab {
    position fixed
    z-index 9999
    bottom 0
    width 100%
    //background-color rgba(0, 0, 0, 0.5)
    background-color #000
    & .item {
      transition 0.1s
      display inline-block
      width 33%
      height 40px
      line-height 40px
      font-size 12px
      color rgba(255, 255, 255, 0.3)
      text-align center
      &.act {
        color #fff
        font-size 12px
        font-weight bold
      }
      &:last-child {
        width calc(100% - 66%)
      }
    }
  }
}
</style>