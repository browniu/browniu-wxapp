<template>
  <div class="module-select">
    <div class="title">
      <span>{{data.title}}</span>
    </div>
    <div class="main">
      <ul class="items">
        <li v-for="(item, index) in data.list" :key="index">
          <div class="item-post" :style="{backgroundImage:'url('+item.img+')'}">
            <i v-if="item.label" class="iconfont">&#xe667;</i>
            <div class="item-detail">{{item.sub}}</div>
          </div>
          <div class="item-title">
            <h1>{{item.title}}</h1>
            <span>
              <i class="iconfont">&#xe848;</i>{{item.price}}
            </span>
          </div>
        </li>
      </ul>
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
.module-select {
  padding 20px 10px 15px
  //border-bottom 8px solid co_10
  .title {
    text-align center
    font-size 14px
    color co_6
    margin-bottom 15px
    & span {
      display inline-block
      margin-right 4px
      position relative
      &:before, &:after {
        content ''
        height 1px
        width 20px
        background co_3
        display inline block
        position absolute
        top 45%
        transform translateY(-50%)
      }
      &:before {
        left -25px
      }
      &:after {
        right -25px
      }
    }
    & i {
      display inline-block
      color co_3
    }
  }
  .main {
    & .items {
      display grid
      grid-template-columns 50% auto
      grid-column-gap 10px
      grid-row-gap 30px
      & li {
        & .item-post {
          border-radius 3px
          height 220px
          background-color co_10
          background-size auto 115%
          background-position center center
          background-repeat no-repeat
          position relative
          & .item-detail {
            position absolute
            bottom 0
            width 100%
            font-size 12px
            background rgba(157, 214, 197, 0.4)
            color #fff
            padding 7px 8px
            box-sizing border-box
          }
          & i {
            position absolute
            top 5px
            left 10px
            font-size 18px
            color co_13
          }
        }
        & .item-title {
          margin 10px 0 0
          position relative
          & h1 {
            font-size 14px
            color co_6
          }
          & span {
            position absolute
            right 0
            top 0
            font-size 12px
            color co_14
            & i {
              color co_14
              font-size 12px
              transform scale(0.9)
              display inline-block
              margin-right 1px
            }
          }
        }
      }
    }
  }
}
</style>