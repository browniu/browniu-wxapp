<template>
  <div class="detail">
    <scroll-view scroll-y class="main">
      <div class="swiper">
        <swiper class="swiper-container" autoplay="true" interval="3000" circular="true" current="2" duration="500" indicator-active-color="rgba(255,255,255,1)" indicator-color="rgba(255,255,255,.3)">
          <swiper-item v-for="(item, index) in goodsData.swiper" :key="index" :class="['swiper-item',swiperLoading?'act':'']">
            <img mode="widthFix" :src="item" alt="swiperPost">
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
          <span>{{goodsPrice}}元</span>
          <span>{{goodsPrePrice}}元</span>
        </div>
      </div>
      <div class="standard" @click="showStandardPop">规格参数
        <span class="select" v-show="standardReady">{{standardColor}} {{standardVersion}}
          <strong>x{{standardNumber}}</strong>
        </span>
        <i class="iconfont">&#xe7eb;</i>
      </div>
      <div class="feature">
        <ul class="feature-tab">
          <li :class="[feature?'act':'']" @click="feature = true">概述</li>
          <li :class="[!feature?'act':'']" @click="feature = false">参数</li>
        </ul>
        <div v-if="feature" class="feature-main">
          <p v-for="(item, index) in goodsData.feature" :key="index">
            <img mode="widthFix" :src="item" alt="feature">
          </p>
        </div>
        <div v-if="!feature" class="feature-sub">
          <li v-for="(item, index) in goodsData.argument" :key="index">
            <h1>{{item.title}}</h1>
            <p>{{item.contain}}</p>
          </li>
        </div>
      </div>
      <div class="addition">
        <div class="addition-title">
          常见问题
        </div>
        <div class="addition-contain">
          <li>
            <h1>
              <i class="iconfont">&#xe87f;</i>购买运费如何收取？</h1>
            <p>
              单笔订单金额（不含运费）满88元免邮费；不满88元，每单收取10元运费。(港澳台地区需满500元免邮费；不满500元，每单收取30元运费)
            </p>
          </li>
          <li>
            <h1>
              <i class="iconfont">&#xe87f;</i>BROWNIU的订单如何配送？</h1>
            <p>
              BROWNIU会根据商品所在地、顾客所在地和商品的尺寸重量优选物流配送商，确保优质用户体验。目前暂不支持自选快递，具体物流信息可在下单成功后“我的订单-追踪物流”中查看。
            </p>
          </li>
          <li>
            <h1>如何申请退换货？</h1>
            <p>
              自收到商品之日起30日内，顾客可申请无忧退货；如果是退货，退款将原路返还，不同的银行处理时间不同，预计1-5个工作日到账。
            </p>
          </li>
          <li>
            <h1>
              <i class="iconfont">&#xe87f;</i>如何申请退换货？</h1>
            <p>
              自收到商品之日起30日内，顾客可申请无忧退货；如果是退货，退款将原路返还，不同的银行处理时间不同，预计1-5个工作日到账。
            </p>
          </li>
          <li>
            <h1>
              <i class="iconfont">&#xe87f;</i>如何开具发票？</h1>
            <p>
              请在下单时选择“我要开发票”并填写相关信息（APP仅限2.4.0及以上版本）。开具增值税专用发票需在下单时填写增票资质信息。温馨提示：请确保增票资质信息与贵司税务登记证信息一致，避免因开票信息错误给贵司带来损失。
            </p>
          </li>
        </div>
      </div>
    </scroll-view>
    <div :class="['standard-pop',standardPop?'show':'']">
      <div class="cover"></div>
      <div class="inner">
        <div class="close" @click="showStandardPop">
          <i class="iconfont">&#xe60e;</i>
        </div>
        <div class="container">
          <div class="container-header">
            <div class="post">
              <img mode="widthFix" :src="goodsData.swiper[2]" alt="">
            </div>
            <div class="title">
              <div class="main">
                {{goodsData.info.title}}
                <span class="argument">{{standardColor}}</span>
                <span class="argument">{{standardVersion}}</span>
                <span class="argument"> x{{standardNumber}}</span>
              </div>
              <div class="sub">{{goodsPrice*standardNumber}}元</div>
            </div>
          </div>
          <div class="container-items">
            <div class="item version">
              <div class="title">版本</div>
              <div class="items">
                <li @click="standard1 = index; goodsPrice = item.price; goodsPrePrice = item.preprice; standardVersion= item.name" :class="[standard1===index?'act':'']" v-for="(item, index) in goodsData.standard.version" :key="index">{{item.name}}
                  <i>¥{{item.price}}</i>
                </li>
              </div>
            </div>
            <div class="item color">
              <div class="title">
                颜色
              </div>
              <div class="items">
                <li @click="standard2 = index; standardColor=item" :class="[standard2===index?'act':'']" v-for="(item, index) in goodsData.standard.color" :key="index">{{item}}</li>
              </div>
            </div>
            <div class="item number">
              <div class="title">数量</div>
              <div class="items">
                <li @click="standardNumberCounter('-')">-</li>
                <li>{{standardNumber}}</li>
                <li @click="standardNumberCounter('+')">+</li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="navigate">
      <div :class="['favorite',favorite?'act':'']" @click="favoriteClick">
        <i class="iconfont">&#xe6a2;</i>
      </div>
      <div @click="gotoCar" class="shopping">
        <i class="iconfont">&#xe7cf;
          <div v-if="shopCarNumber > 0" class="number">
            <span>{{shopCarNumber}}</span>
          </div>
        </i>
      </div>
      <div class="add" @click="add">加入购物车</div>
      <div class="buy" @click="buy">
        <span>立即购买</span>
      </div>
    </div>
  </div>
</template>

<script>
import goods from '../detail/goods.json'
export default {
  data () {
    return {
      goodsData: {},
      standardPop: false,
      swiperLoading: false,
      favorite: false,
      feature: true,
      standard1: 0,
      standard2: 0,
      standard3: null,
      goodsPrice: 0,
      goodsPrePrice: 0,
      standardColor: '',
      standardVersion: '',
      standardNumber: 1,
      standardReady: false,
      shopCarNumber: 0
    }
  },
  onLoad () {
    this.goodsData = goods[this.$root.$mp.query.id]
    console.log(this.goodsData)
    this.goodsPrice = this.goodsData.info.price
    this.goodsPrePrice = this.goodsData.info.prePrice
    this.standardColor = this.goodsData.standard.color[0]
    this.standardVersion = this.goodsData.standard.version[0].name
    wx.setNavigationBarTitle({
      title: this.goodsData.info.title
    })
  },
  onShow () {
    this.standardReady = false
    this.standard1 = 0
    this.standard2 = 0
    this.standard3 = 0
    this.feature = true
    this.swiperLoading = false
    setTimeout(() => {
      this.swiperLoading = true
    }, 2500)
  },
  methods: {
    showStandardPop () {
      this.standardReady = true
      if (this.standardPop) {
        this.standardPop = false
      } else {
        this.standardPop = true
      }
    },
    favoriteClick () {
      if (this.favorite) {
        this.favorite = false
      } else {
        this.favorite = true
        wx.showToast({
          icon: 'succeed',
          title: '已加入收藏夹'
        })
      }
    },
    standardNumberCounter (e) {
      if (this.standardNumber > 0 && this.standardNumber < 6) {
        if (e === '-') {
          this.standardNumber--
          if (this.standardNumber === 0) {
            this.standardNumber = 1
          }
        }
        if (e === '+') {
          this.standardNumber++
          if (this.standardNumber === 6) {
            this.standardNumber = 5
          }
        }
      }
    },
    add () {
      if (this.standardReady) {
        console.log('add')
        this.shopCarNumber++
      } else {
        this.showStandardPop()
      }
    },
    gotoCar () {
      wx.navigateTo({
        url: '../shopCar/main'
      })
    },
    buy () {
      if (this.standardReady) {
        wx.navigateTo({
          url: '../bill/main'
        })
      } else {
        this.showStandardPop()
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
.detail {
  width 100vw
  height 100vh
  overflow hidden
  & .main {
    height 100vh
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
          opacity 0
          &.act {
            opacity 1
          }
          & img {
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            height 100%
            width 100%
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
      & span {
        margin-left 10px
        color co_6
        overflow hidden
        & strong {
          display inline-block
          color co_2
        }
      }
      & i {
        float right
        position relative
        top 2px
        color co_16
      }
    }
    & .feature {
      border-bottom 8px solid co_10
      & .feature-tab {
        height 40px
        line-height 40px
        position relative
        border-bottom 1px solid co_10
        &:before {
          height 30%
          width 1px
          background co_16
          position absolute
          left 50%
          top 52%
          transform translate(-50%, -50%)
          content ''
          display inline-block
        }
        & li {
          width 50%
          height 100%
          color co_2
          text-align center
          font-size 14px
          display inline-block
          &.act {
            color co_3
          }
        }
      }
      & .feature-main {
        margin-top 15px
        & img {
          width 100%
        }
      }
      & .feature-sub {
        & li {
          border-bottom 1px solid co_10
          padding 25px
          &:last-child {
            border-bottom 0
          }
          & h1 {
            color co_2
            font-size 12px
            font-weight normal
            margin-left 2px
            margin-bottom 8px
          }
          & p {
            color co_8
            font-size 18px
          }
        }
      }
    }
    & .addition {
      padding-bottom 50px
      & .addition-title {
        text-align center
        padding 15px 0
        font-size 16px
        color co_6
        border-bottom 1px solid co_10
      }
      & .addition-contain {
        box-sizing border-box
        padding 20px 15px
        & li {
          margin-bottom 20px
          & h1 {
            font-size 14px
            font-weight normal
            color co_11
            margin-bottom 8px
            & i {
              display inline-block
              color co_3
              margin-right 3px
              position relative
              top 1px
            }
          }
          & p {
            font-size 12px
            color co_7
          }
        }
      }
    }
  }
  & .standard-pop {
    &:before {
      height 100vh
      width 100vw
      background rgba(0, 0, 0, 0.4)
      z-index 97
      content ''
      display none
      position fixed
      top 0
      left 0
    }
    & .inner {
      transition 0.3s ease
      position fixed
      bottom -430px
      transform translateY(0px)
      left 0
      height 430px
      width 100%
      z-index 98
      background #fff
      & .close {
        position absolute
        top 0
        right 0
        height 40px
        width 40px
        & i {
          position absolute
          top 50%
          left 50%
          transform translate(-50%, -50%)
          color co_3
          font-size 18px
        }
      }
      & .container {
        box-sizing border-box
        padding 30px 20px 10px
        & .container-header {
          border-bottom 1px solid co_10
          padding-bottom 15px
          overflow hidden
          & .post {
            height 60px
            width 60px
            border 1px solid co_12
            border-radius 3px
            overflow hidden
            float left
            & img {
              width 100%
            }
          }
          & .title {
            margin-left 10px
            float left
            & .main {
              display inline
              font-size 14px
              color co_6
              & span:last-child {
                color co_2
              }
            }
            & .sub {
              color co_14
            }
          }
        }
        & .container-items {
          & .item {
            border-bottom 0px solid co_10
            padding 10px 0
            & .title {
              font-size 12px
              color co_2
            }
            & .items {
              margin-top 5px
              & li {
                display inline-block
                font-size 12px
                color co_7
                padding 10px 25px
                border-radius 3px
                border 1px solid co_12
                margin-right 10px
                &:last-child {
                  margin-right 0
                }
                &.act {
                  border 1px solid co_3
                  color co_6
                }
                & i {
                  transform scale(0.8)
                  color co_13
                  position relative
                  left -3px
                }
              }
            }
            &.number {
              & .items {
                & li {
                  font-size 16px
                  margin-right 0
                  border-radius 0
                  &:nth-child(2) {
                    padding 10px 30px
                    color co_3
                    border-right 0
                    border-left 0
                  }
                }
              }
            }
          }
        }
      }
    }
    &.show {
      &:before {
        display block
      }
      & .inner {
        transform translateY(-430px)
      }
    }
  }
  & .navigate {
    box-sizing border-box
    border-top 1px solid co_10
    z-index 99
    height 50px
    line-height 49px
    width 100%
    background #fff
    position fixed
    left 0
    bottom 0
    & div {
      display inline-block
      height 100%
      text-align center
      box-sizing border-box
      &:nth-child(1), &:nth-child(2) {
        font-size 18px
        border-right 1px solid co_10
        width 15%
      }
      &.favorite {
        & i {
          color co_16
        }
        &.act {
          & i {
            color co_14
          }
        }
      }
      &.shopping {
        & i {
          font-size 19px
          width 100%
          display inline-block
          color co_6
          position relative
          & .number {
            position absolute
            height 12.5px
            width 14px
            border-radius 50%
            display inline-block
            top 42%
            left 62%
            transform translate(-50%, -50%)
            background co_14
            & span {
              font-size 12px
              color #fff
              position absolute
              top 50%
              left 50%
              transform translate(-50%, -50%) scale(0.7)
            }
          }
        }
      }
      &:nth-child(3), &:nth-child(4) {
        border-right 0
        font-size 14px
        color co_7
        width 35%
      }
      &:last-child {
        color #fff
        background co_3
        float right
        height calc(100% + 1px)
        position relative
        top -1px
        & span {
          position relative
          top 4px
        }
      }
    }
  }
}
</style>