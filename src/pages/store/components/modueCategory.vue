<template>
  <div v-if="data.list" class="module-category" :id="'cate_'+data.index">
    <!-- <div class="title">
      <span>{{data.index}}</span>
    </div> -->
    <div class="main">
      <ul class="items">
        <li v-for="(item, index) in data.list" :key="index">
          <div :class="['item-post',item.img===''?'null':'']" :style="{backgroundImage:'url('+item.img+')'}">
          </div>
          <div class="item-title">
            <h1>{{item.title}}</h1>
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
.module-category {
  padding 20px 10px 20px
  border-bottom 6px solid co_10
  &:last-child {
    border-bottom 0
  }
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
      display flex
      flex-direction row
      flex-wrap wrap
      justify-content left
      & li {
        width calc(((100% - 20px) / 3))
        margin-right 10px
        &:nth-of-type(3n) {
          margin-right 0
        }
        & .item-post {
          border-radius 3px
          height 70px
          background-size auto 100%
          background-position center center
          background-repeat no-repeat
          position relative
          &.null {
            background co_10
          }
        }
        & .item-title {
          text-align center
          margin 5px 0 0
          position relative
          & h1 {
            font-size 12px
            color co_7
            font-weight normal
          }
        }
      }
    }
  }
}
</style>