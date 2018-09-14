<template>
  <div class="detail">
    <div class="main">
      <div class="swiper">
        <swiper class="swiper-container" indicator-dots="false" autoplay="true" interval="3000" circular="true" current="2" duration="500" indicator-active-color="rgba(255,255,255,1)" indicator-color="rgba(255,255,255,.3)">
          <swiper-item v-if="swiperLoading" v-for="(item, index) in goodsData.swiper" :key="index" class="swiper-item" :style="{backgroundImage:'url('+item+')'}">
          </swiper-item>
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
      <div class="info">
        <div class="main-title">
          <div class="title">{{goodsData.info.title}}</div>
          <div class="label">
            <span :class="['iconfont','icon-'+item]" v-for="(item, index) in goodsData.info.label" :key="index"></span>
          </div>
        </div>
        <div class="sub-title">{{goodsData.info.subTitle}}</div>
        <div class="price">
          <span>{{goodsData.info.price}}元</span>
          <span>{{goodsData.info.prePrice}}元</span>
        </div>
      </div>
      <div class="standard" @click="showStandardPop">规格参数
        <i class="iconfont">&#xe7eb;</i>
      </div>
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
      goodsData: {},
      standardPop: false,
      swiperLoading: false
    }
  },
  onLoad () {
    this.goodsData = goods[this.$root.$mp.query.id]
    console.log(this.goodsData)
    wx.setNavigationBarTitle({
      title: this.goodsData.info.title
    })
  },
  onShow () {
    this.swiperLoading = false
    setTimeout(() => {
      this.swiperLoading = true
    }, 0)
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
  width 100vw
  & .main {
    & .swiper {
      background #fff
      border-bottom 8px solid co_10
      & .swiper-container {
        background-image url('https://cdn.dribbble.com/users/722246/screenshots/4723489/category-loading.gif')
        background-position center center
        background-size contain
        height 280px
        & .swiper-item {
          top 0
          position absolute
          width 100%
          height 100%
          overflow hidden
          background-color co_10
          background-position center center
          background-size auto 160%
          background-repeat no-repeat
          & .img {
            height 100%
            width 100%
            background #000
          }
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
    & .info {
      border-bottom 1px solid co_10
      box-sizing border-box
      padding 18px 15px 13px
      & .main-title {
        & .title {
          font-size 16px
          color co_11
          display inline-block
        }
        & .label {
          margin-left 5px
          display inline-block
          & span {
            margin 0 3px
            &:nth-child(1) {
              color co_14
            }
            &:nth-child(2) {
              font-size 14px
              color co_3
              position relative
              top -1px
            }
            &:nth-child(3) {
              font-size 12px
              position relative
              top -2px
              color co_15
            }
          }
        }
      }
      & .sub-title {
        font-size 12px
        color co_2
        margin 5px 0 10px
      }
      & .price {
        & span {
          &:first-child {
            font-size 20px
            color co_14
          }
          &:last-child {
            font-size 12px
            color co_2
            text-decoration line-through
            margin-left 5px
          }
        }
      }
    }
    & .standard {
      color co_7
      box-sizing border-box
      padding 15px
      font-size 14px
      border-bottom 10px solid co_10
      & i {
        float right
        position relative
        top 2px
        color co_16
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