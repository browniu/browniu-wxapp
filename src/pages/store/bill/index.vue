<template>
  <div class="bill">
    <scroll-view scroll-y class="main">
      <div class="item goods">
        <div class="title">商品清单</div>
        <div class="container">
          <div class="list">
            <div class="element" v-for="(item, index) in billData.goods" :key="index">
              <div class="post"><img mode="widthFix" :src="item.post" alt="goods-posts"></div>
              <div class="standard">{{item.title}} | {{item.standard.color}}{{item.standard.version}}</div>
              <div class="price">
                <span>{{item.number}}x</span>{{item.price}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item address">
        <div class="title">收货地址</div>
        <div class="container">
          <div class="contain">
            <span>{{billData.address.phone}} </span>
            <span>{{billData.address.name}} </span>
            <span>收</span>
            <p>{{billData.address.detail}}</p>
          </div>
          <i class="iconfont">&#xe7eb;</i>
        </div>
      </div>
      <div class="item invoice">
        <div class="title">发票信息</div>
        <div class="container">
          <div class="contain">
            电子发票：
            <span>{{billData.invoice}}</span>
          </div>
          <i class="iconfont">&#xe7eb;</i>
        </div>
      </div>
      <div class="item discount">
        <div class="title">折扣信息</div>
        <div class="container">
          <div class="contain">
            <span v-if="!billData.discount">未使用优惠券</span>
          </div>
          <i class="iconfont">&#xe7eb;</i>
        </div>
      </div>
      <div class="item count">
        <div class="title">订单结算</div>
        <div class="container">
          <li>
            <span>商品总价</span>
            <i>{{countAll}}元</i>
          </li>
          <li>
            <span>运费</span>
            <i>10元</i>
          </li>
          <li>
            <span>总计</span>
            <i>{{countAll+10}}元</i>
          </li>
        </div>
      </div>
    </scroll-view>
    <div class="pay" @click="payNow">微信支付</div>
  </div>
</template>

<script>
import bill from '../bill/bill.json'
export default {
  data () {
    return {
      billData: {},
      countAll: 0
    }
  },
  methods: {
    payNow () {
      wx.showToast({
        icon: 'succeed',
        title: '谢谢支持'
      })
      setTimeout(() => {
        wx.switchTab({
          url: '../index/main'
        })
      }, 1000)
    }
  },
  onLoad () {
    this.billData = bill
    for (let index = 0; index < this.billData.goods.length; index++) {
      this.countAll += this.billData.goods[index].number * this.billData.goods[index].price
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
.bill {
  .main {
    height 100vh
    margin-bottom 100px
    .item {
      box-sizing border-box
      padding 0 15px
      border-top 5px solid co_10
      &:first-child {
        border-top 0px solid co_10
      }
      .title {
        font-size 12px
        color co_2
        box-sizing border-box
        padding 15px 0 5px
        border-bottom 1px solid co_10
      }
      &.goods {
        .container {
          .element {
            padding 15px 0
            overflow hidden
            border-bottom 1px solid co_10
            & .post {
              height 30px
              width 30px
              border 0px solid co_12
              border-radius 3px
              overflow hidden
              float left
              & img {
                width 120%
              }
            }
            & .standard {
              margin-top 8px
              margin-left 10px
              float left
              display inline
              font-size 14px
              color co_6
            }
            & .price {
              margin-top 8px
              color co_13
              font-size 14px
              float right
              & span {
                font-size 12px
                display inline-block
                transform scale(0.9)
                color co_2
                margin-right 3px
              }
            }
          }
        }
      }
      &.address {
        & .container {
          position relative
          padding 15px 0
          .contain {
            font-size 14px
            color co_6
            & p {
              margin-top 3px
            }
          }
          i {
            position absolute
            right 0
            top 50%
            transform translateY(-50%)
            color co_16
          }
        }
      }
      &.invoice {
        display none
        & .container {
          position relative
          padding 15px 0
          & .contain {
            font-size 14px
            color co_2
            & span {
              color co_6
            }
          }
          i {
            position absolute
            right 0
            top 50%
            transform translateY(-50%)
            color co_16
          }
        }
      }
      &.discount {
        display none
        & .container {
          position relative
          padding 15px 0
          .contain {
            font-size 14px
            color co_6
          }
          i {
            position absolute
            right 0
            top 50%
            transform translateY(-50%)
            color co_16
          }
        }
      }
      &.count {
        .container {
          margin-bottom 50px
          position relative
          li {
            padding 12px 0
            border-bottom 1px solid co_10
            font-size 14px
            span {
              color co_6
            }
            i {
              float right
              color co_13
            }
          }
          li:last-child {
            i {
              color co_14
            }
          }
        }
      }
    }
  }
  .pay {
    position fixed
    width 100%
    bottom 0
    left 0
    height 50px
    text-align center
    line-height 50px
    font-size 14px
    color #fff
    background co_3
  }
}
</style>