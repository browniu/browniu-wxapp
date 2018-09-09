<template>
  <div class="module-horizon">
    <div class="title">
      <span>{{data.title}}</span>
      <i class="iconfont">&#xe783;</i>
    </div>
    <scroll-view class="main" scroll-x>
      <ul class="items">
        <li v-for="(item, index) in data.list" :key="index">
          <div class="item-post" :style="{backgroundImage:'url('+item.img+')'}"></div>
          <div class="item-title">
            <h1>{{item.title}}</h1>
            <p>{{item.sub}}</p>
            <span>
              <i class="iconfont">&#xe848; </i>{{item.price}}
            </span>
          </div>
        </li>
      </ul>
    </scroll-view>
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
.module-horizon {
  padding 15px 10px 10px
  border-bottom 8px solid co_10
  .title {
    text-align center
    font-size 16px
    color co_6
    margin-bottom 15px
    & span {
      display inline-block
      margin-right 4px
    }
    & i {
      display inline-block
      color co_3
    }
  }
  .main {
    height 200px
    & .items {
      white-space nowrap
      float left
      & li {
        display inline-block
        margin-right 12px
        & .item-post {
          border-radius 3px
          height 150px
          width 250px
          background-color co_10
          background-size 120% auto
          background-position center center
          background-repeat no-repeat
        }
        & .item-title {
          position relative
          & h1 {
            margin 10px 0 3px
            font-size 14px
            color co_6
          }
          & p {
            font-size 12px
            color co_7
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
              transform scale(.9)
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