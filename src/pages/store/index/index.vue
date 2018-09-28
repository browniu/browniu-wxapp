<template>
  <scroll-view scroll-y class="store-index" @scroll="fixedTabTop($event)">
    <!-- <div class="info">{{info}}</div> -->

    <head>
      <div class="search">
        <i class="iconfont">&#xe7e3;</i>
        <span>搜索商品, 共13241款好物</span>
      </div>
    </head>
    <div class="tabTop">
      <scroll-view scroll-x :class="['items',tabTopFixed?'fixed':'']">
        <div class="inner">
          <li @click="itemStateUpdate(index)" :class="[itemState===index?'act':'']" v-for="(item, index) in indexItems" :key="index">{{item}}</li>
        </div>
      </scroll-view>
    </div>
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
    <main>
      <div class="module"></div>
      <indexClass1 v-if="itemState===0"></indexClass1>
      <indexClass2 v-if="itemState===1"></indexClass2>
      <indexClass3 v-if="itemState===2"></indexClass3>
      <indexClass4 v-if="itemState===3"></indexClass4>
      <indexClass5 v-if="itemState===4"></indexClass5>
      <indexClass6 v-if="itemState===5"></indexClass6>
      <indexClass7 v-if="itemState===6"></indexClass7>
    </main>
  </scroll-view>
</template>

<script>
import indexClass1 from '../components/indexClass1.vue'
import indexClass2 from '../components/indexClass2.vue'
import indexClass3 from '../components/indexClass3.vue'
import indexClass4 from '../components/indexClass4.vue'
import indexClass5 from '../components/indexClass5.vue'
import indexClass6 from '../components/indexClass6.vue'
import indexClass7 from '../components/indexClass7.vue'
export default {
  components: {
    indexClass1,
    indexClass2,
    indexClass3,
    indexClass4,
    indexClass5,
    indexClass6,
    indexClass7
  },
  data () {
    return {
      info: '',
      tabTopFixed: false,
      itemState: 0,
      indexItems: ['新品推荐', '服饰配件', '玩偶抱枕', '数位家电', '家居旅行', '萌宠文具', '儿童']
    }
  },
  methods: {
    itemStateUpdate (index) {
      this.itemState = index
    },
    fixedTabTop (e) {
      if (e.target.scrollTop > 32) {
        this.tabTopFixed = true
      }
      if (e.target.scrollTop < 32) {
        this.tabTopFixed = false
      }
    }
  },
  mounted () {
    wx.setNavigationBarTitle({
      title: 'Friends 小卖部'
    })
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
.info {
  position fixed
  top 20px
  left 20px
  z-index 9999
  font-size 16px
  color #000
}
.store-index {
  height 100vh
  & head {
    padding 0 15px
    box-sizing border-box
    & .search {
      background co_10
      height 35px
      border-radius 5px
      line-height 35px
      font-size 12px
      color co_7
      padding 0 15px
      box-sizing border-box
      width 100%
      & i {
        display inline-block
        margin-right 2px
        position relative
        top 1px
        font-size 13px
      }
    }
  }
  & .tabTop {
    width 100%
    height 40px
    & .items {
      transition 0.7s
      background #fff
      width 100vw
      position relative
      z-index 99
      &:before {
        position absolute
        height 50%
        width 110%
        bottom 0
        left 50%
        transform translateX(-50%)
        opacity 0.3
        background #165d53
        filter blur(3px)
        z-index -1
      }
      &.fixed {
        position fixed
        top 0
        &:before {
          content ''
        }
      }
      & .inner {
        background #fff
        white-space nowrap
        & li {
          background #fff
          margin 0
          text-align center
          font-size 14px
          color co_7
          display inline-block
          padding 0 10px
          height 40px
          line-height 42px
          position relative
          &.act {
            color co_1
            font-weight bolder
            &:before {
              content ''
              display inline-block
              height 2px
              width 100%
              background co_1
              position absolute
              bottom 0
              left 50%
              transform translateX(-50%)
            }
          }
        }
      }
    }
  }
  & .swiper {
    border-bottom 8px solid co_10
    & .swiper-container {
      height 200px
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
</style>