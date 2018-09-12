<template>
  <div class="module-cross" :style="{color:data.color,textAlign:data.position,backgroundColor:data.bgcolor}">
    <div class="main" :style="{color:data.color,textAlign:data.position,backgroundColor:data.bgcolor}">
      <div class="inner">
        <h1>{{data.title}}</h1>
        <p>{{data.sub}}</p>
        <div class="button">
          {{data.button}}
          <span></span>
        </div>
      </div>
      <div class="texture"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      require: true
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
.module-cross {
  .main {
    border-bottom 6px solid #fff
    position relative
    height 135px
    background-image url('http://pb85uax7t.bkt.clouddn.com/vichy.png')
    & .texture {
      height 50px
      width 97px
      position absolute
      left 50%
      bottom -7px
      transform translateX(-50%)
      background-position left top
      background-size auto 60px
      background-repeat no-repeat
      background-image url('http://pb85uax7t.bkt.clouddn.com/sp_logo_login.png')
    }
    & .inner {
      text-align center
      box-sizing border-box
      padding 0 15px
      width 100%
      position absolute
      top 35%
      left 50%
      transform translate(-50%, -50%)
      overflow hidden
      & h1 {
        font-size 16px
        display inline-block
      }
      & .button {
        margin-top 10px
        position relative
        display inline-block
        color #fff
        padding 6px 18px
        font-size 12px
        & span {
          opacity 0.3
          position absolute
          height 100%
          width 100%
          left 0
          top 0
          background #fff
          z-index -1
          border-radius 5px
        }
      }
    }
  }
}
</style>