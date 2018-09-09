<template>
  <div class="module-vertical">
    <div class="title">
      <span>{{data.title}}</span>
      <i class="iconfont">&#xe783;</i>
    </div>
    <div class="main">
      <ul class="items">
        <li v-for="(item, index) in data.list" :key="index" :style="{backgroundImage:'url('+item.img+')'}">
          <div class="item-title">
            <h1>{{item.title}}</h1>
            <p>{{item.sub}}</p>
            <i v-if="item.label" class="iconfont">&#xe667;</i>
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
.module-vertical {
  padding 15px 10px
  //border-bottom 8px solid co_10
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
    & .items {
      display grid
      grid-template-columns 50% auto
      grid-column-gap 10px
      grid-row-gap 10px
      & li {
          border-radius 2px
          height 120px
          background-color co_10
          background-size auto 120%
          background-position left top
          background-repeat no-repeat
        & .item-title {
          transform scale(.8)
          position relative
          left -5px
          top 8px
          & h1 {
            font-size 14px
            color co_6
          }
          & p {
            font-size 12px
            color co_7
          }
          & i {
            font-size 24px
            color co_13
          }
        }
      }
    }
  }
}
</style>