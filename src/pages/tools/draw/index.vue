<template>
  <div class="draw">
    <scroll-view
      scroll-y
      class="ctx"
    >
      <div
        class="item"
        v-for="(item, index) in textData"
        v-if="item.text"
        :key="index"
      >
        <div class="img">
          <img
            :src="item.img"
            alt="gif"
            mode="widthFix"
          >
        </div>
        <div class="text">
          <span>{{item.text}}</span>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      textData: [
        {
          text: 'Rockets are the show stoppers. The quiet dad who drops profound truth bombs when least expected. He silently listens to loud, exuberant chatter and chimes in with a one liner right at the end. “You know rockets are actually vertical submarines.”',
          img: 'https://browniu-c8bfe1.tcb.qcloud.la/draw/draw_rocket.gif?sign=0687a5afec68757f18dcf00fa3aa5df9&t=1543302929'
        },
        {
          text: 'Meet our resident Flower pot.. The immaculately well groomed aunt that has definitely made a pinterest board of outfit ideas. She neverattends a function without polished nails or a hair out of place.',
          img: 'https://browniu-c8bfe1.tcb.qcloud.la/draw/draw_flowerpot_2.gif?sign=0687a5afec68757f18dcf00fa3aa5df9&t=1543302929'
        },
        {
          text: 'On to the self proclaimed “Party Starter”. Uncle Chakravarty who has had one too many at the pre-cocktail party and seems to be spinning more than the Chakri itself. He is as mad as a hatter and is the first to turn any conversation into a toast. Cheers!',
          img: 'https://browniu-c8bfe1.tcb.qcloud.la/draw/draw_flowerpot_2.gif?sign=0687a5afec68757f18dcf00fa3aa5df9&t=1543302929'
        },
        {
          text: '',
          img: ''
        },
        {
          text: '',
          img: ''
        },
        {
          text: '',
          img: ''
        },
        {
          text: '',
          img: ''
        }
      ]
    }
  },
  methods: {
    fontLoader () {
      wx.loadFontFace({
        family: 'webfont',
        source: 'url("https://browniu-c8bfe1.tcb.qcloud.la/draw/draw_2.woff2?sign=4825299c668cdc9883d98b70580534ff&t=1543306577")'
      })
    },
    init () {
      this.fontLoader()
    }
  },
  onLoad () {
    this.init()
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
c1 = #141742
c2 = #90BFF6
.draw {
  background c1
  height 100vh
  width 100vw
  overflow hidden
  font-family webfont
  .ctx {
    height 100%
    .item {
      & .img {
        width 100%
        position relative
        border-bottom 0px solid #fff
        text-align center
        img {
          display inline-block
          width 100%
        }
        &:before {
          content ''
          display inline-block
          background #000
          position absolute
          bottom 0
          left 0
          width 100%
          height 80px
          background linear-gradient(to top, rgba(20, 23, 66, 1), rgba(20, 23, 66, 0))
        }
      }
      & .text {
        color c2
        font-size 16px
        padding 0 15px
        font-weight 300
        & span {
          opacity 0.6
        }
      }
      &:nth-child(2) {
        & .text {
          width 40%
        }
        & .img {
          position absolute
          float right
          right -80px
          img {
            width 80%
          }
        }
      }
      &:nth-child(3) {
        position relative
        & .img {
          display none
          // position absolute
        }
      }
    }
  }
}
</style>