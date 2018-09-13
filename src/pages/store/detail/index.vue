<template>
  <div class="detail">
    <div class="main">
      <div class="swiper">
        <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" circular="true" duration="500" indicator-active-color="rgba(255,255,255,1)" indicator-color="rgba(255,255,255,.3)">
          <swiper-item class="swiper-item" style="background-image:url('https://vos.line-scdn.net/website/uploads/website_1/zh-tw/wpicon_img_280.png')"></swiper-item>
          <swiper-item class="swiper-item" style="background-image:url('https://vos.line-scdn.net/website/uploads/website_1/zh-tw/wpicon_img_191.png')"></swiper-item>
          <swiper-item class="swiper-item" style="background-image:url('https://vos.line-scdn.net/website/uploads/website_1/zh-tw/wpicon_img_159.png')"></swiper-item>
        </swiper>
        <ul class="slogan">
          <li>
            <i class="iconfont">&#xe7b6;</i>BROWNIU官方</li>
          <li>
            <i class="iconfont">&#xe842;</i>满66元包邮</li>
          <li>
            <i class="iconfont">&#xe786;</i>48小时无忧退款</li>
        </ul>
      </div>
      <div class="standard" @click="showStandardPop">规格参数</div>
    </div>
    <div :class="['standard-pop',standardPop?'show':'']">
      <div class="inner">
        <div class="close" @click="showStandardPop">X</div>
      </div>
    </div>
    <div class="navigate"></div>
  </div>
</template>

<script>
import goods from '../detail/goods.json'
export default {
  data () {
    return {
      goodsInfo: {},
      standardPop: false
    }
  },
  onLoad () {
    this.goodsInfo = goods[this.$root.$mp.query.id]
    console.log(this.goodsInfo)
  },
  methods: {
    showStandardPop () {
      if (this.standardPop) {
        this.standardPop = false
      } else {
        this.standardPop = true
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
.detail {
  & .main {
    & .swiper {
      border-bottom 8px solid co_10
      & .swiper-container {
        height 320px
        & .swiper-item {
          overflow hidden
          background-color co_10
          background-position center center
          background-size auto 100%
          background-repeat no-repeat
          & image {
            position absolute
            left 50%
            transform translateX(-50%)
          }
        }
      }
      & .slogan {
        text-align center
        margin 10px 0
        & li {
          text-align center
          font-size 12px
          color co_7
          display inline-block
          &:nth-child(2) {
            margin 0 20px
          }
          & i {
            font-size 13px
            display inline-block
            margin-right 3px
            color co_3
          }
        }
      }
    }
  }
  & .standard-pop {
    overflow hidden
    transition 0.3s ease
    z-index -1
    top 0
    left 0
    position absolute
    height 100vh
    width 100vw
    background rgba(0, 0, 0, 0)
    & .inner {
      transition 0.3s ease
      position absolute
      bottom -250px
      left 0
      height 250px
      width 100%
      z-index 98
      background #fff
    }
    &.show {
      z-index 90
      background rgba(0, 0, 0, 0.3)
      & .inner {
        bottom 0
      }
    }
  }
  & .navigate {
    z-index 99
    height 50px
    width 100%
    background co_2
    position fixed
    left 0
    bottom 0
  }
}
</style>