<template>
  <div class="songs">
    <!-- <div class="texture" :style="{backgroundImage:'url('+songs[songIndex][0]+')',backgroundPosition:scrollP+'% center'}"></div> -->
    <div class="texture" :style="{backgroundPosition:scrollP+'%  bottom'}"></div>
    <div class="inner">
      <div class="article">
        <div class="title">
          <h1 @click="listSwitch(index)" :class="[songList?'close':'',songList&&songIndex===index?'act':'']" v-for="(item, index) in songs" :key="index">
            <span :class="[songList&&songIndex===index?'act':'']">{{item[2]}}</span>
            <div class="subInfo">
              {{item[1]}}
            </div>
            <!-- <div @click="listSwitch" :class="['switch',songIndex===index&&songList?'act':'']">1</div> -->
          </h1>
        </div>
        <scroll-view v-if="scrollReflash" :class="['content',songList?'act':'']" scroll-x scroll-left="1000" @scroll="scrollView">
          <span class="content-inner" v-for="(item, index) in songs[songIndex][3]" :key="index">
            <p>{{item}}</p><br>
          </span>
        </scroll-view>
      </div>
    </div>
  </div>
</template>

<script>
import songs from '../songs/songsLib.json'
export default {
  data () {
    return {
      songs: {},
      songIndex: 0,
      songList: false,
      scrollFirst: true,
      scrollW: 0,
      scrollC: 0,
      scrollP: 0,
      scrollReflash: true
    }
  },
  methods: {
    scrollView (e) {
      if (this.scrollFirst) {
        this.scrollFirst = false
        this.scrollW = e.target.scrollLeft
      }
      if (this.scrollW - e.target.scrollLeft > 0) {
        // let a = e.target.scrollWidth
        this.scrollC = e.target.scrollLeft
        this.scrollP = (((this.scrollW - this.scrollC) / this.scrollW) * 100).toFixed(4)
      }
      console.log(this.scrollP)
    },
    listSwitch (e) {
      if (this.songList) {
        this.songList = false
        setTimeout(() => {
          this.songIndex = 0
          this.scrollReflash = false
          setTimeout(() => {
            this.scrollReflash = true
          }, 10)
        }, 500)
        return
      }
      this.songList = true
      this.songIndex = e
    }
  },
  onLoad () {
    this.songs = songs.songs
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
@font-face {
  font-family 'qingke'
  // src url('http://pb85uax7t.bkt.clouddn.com/SYSF.otf') format('truetype')
  src url('http://pb85uax7t.bkt.clouddn.com/HYYS.TTF') format('truetype')
}
c1 = #f0ead0
c2 = #52462c
c3 = #7e6048
c4 = #f6efeb
c5 = #c6ab9a
c6 = #493b32
.songs {
  height 100vh
  width 100vw
  overflow hidden
  background c4
  color c3
  font-family qingke
  & .texture {
    transform translate(-50%, -50%) rotate(90deg)
    transition background-position 1.5s linear
    height 100vw
    width 100vh
    position absolute
    top 50%
    left 50%
    z-index 0
    background-image url('https://www.transparenttextures.com/patterns/bedge-grunge.png')
    background-image url('http://pb85uax7t.bkt.clouddn.com/forage_6.jpg')
    background-repeat no-repeat
    background-size 120% auto
    background-position 0% bottom
    opacity 0.15
  }
  & .inner {
    box-sizing border-box
    padding 10px
    text-align left
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%) rotate(90deg)
    position relative
    z-index 1
    width 100vh
    height 100vw
    writing-mode vertical-rl
    & .article {
      // position absolute
      // top 50%
      // left 50%
      width 100%
      // transform translate(-50%, -50%)
      & .title {
        position relative
        z-index 1
        & h1 {
          font-size 18px
          letter-spacing 3px
          position relative
          transition width 1s ease, opacity 1s ease, padding-top 0.3s ease, border-left 0.7s ease
          height 100vw
          text-align left
          box-sizing border-box
          padding-top 45px
          width 80px
          line-height 80px
          border-left 1px solid rgba(0, 0, 0, 0.05)
          overflow hidden
          &.close {
            width 0
            opacity 0
          }
          &.act {
            padding-top 20px
            border-left 1px solid rgba(0, 0, 0, 0)
            width 60px
            opacity 1
            color c6
          }
          & span {
            transition border-left 0.7s ease
            border-left 2px solid rgba(0, 0, 0, 0)
            display inline-block
            box-sizing border-box
            width 100%
            &.act {
              border-left 2px solid c6
              &~.subInfo {
                opacity 0
              }
            }
          }
          & .subInfo {
            transition opacity 0.7s ease
            position absolute
            margin-top 10px
            width 20px
            display inline-block
            color c5
            font-size 12px
            writing-mode vertical-rl
            opacity 1
          }
          & .switch {
            transition 0.7s
            position absolute
            bottom 0
            height 50px
            width 100%
            background #000
            display inline-block
            opacity 0
            &.act {
              opacity 1
            }
          }
        }
      }
      & .content {
        transition 1s ease
        box-sizing border-box
        width 0%
        overflow hidden
        box-sizing border-box
        padding-top 20px
        &.act {
          width calc(100% - 120px)
        }
        & .content-inner {
          & p {
            display inline-block
            font-size 16px
            letter-spacing 3px
            line-height 50px
            white-space nowrap
            border-left 1px solid rgba(0, 0, 0, 0.05)
            max-height 90vw
            overflow hidden
          }
        }
      }
      ::-webkit-scrollbar {
        width 0
        height 0
        color transparent
      }
    }
  }
}
</style>


