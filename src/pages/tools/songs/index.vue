<template>
  <div class="songs">
    <div v-if="!showTime" class="cover">
      <video @timeupdate="playState" id="videoBg" class="songsCover" @click="scroll" :loop="false" :autoplay="true" :muted="true" show-play-btn="false" :controls="false" objectFit="cover" src="https://browniu-c8bfe1.tcb.qcloud.la/songs/songs_3.mp4?sign=7dbfc31e3cc071f09194854a1d871945&t=1542683253">
        <cover-view :class="['coverPost',step===2?'act':'',loaded?'loaded':'']" @click="scroll">
          <cover-view :class="['coverTexture',loaded?'loaded':'']"></cover-view>
          <cover-view class="left">
            <cover-image class="leftTit" src="https://browniu-c8bfe1.tcb.qcloud.la/songs/songs_cover_left_tit.jpg?sign=bb22281b3c00d50c5fa4835f6240e6fb&t=1542694449"></cover-image>
          </cover-view>
          <cover-view class="right">
            <cover-image class="rightTit" src="https://browniu-c8bfe1.tcb.qcloud.la/songs/songs_cover_right_tit.jpg?sign=bb22281b3c00d50c5fa4835f6240e6fb&t=1542694449"></cover-image>
          </cover-view>
        </cover-view>
      </video>
    </div>
    <div v-if="showTime" :class="['shadow',over?'act':'']"></div>
    <div v-if="showTime" class="texture"><i></i></div>
    <div v-if="showTime" class="inner">
      <div class="article">
        <div class="title">
          <h1 @click="listSwitch(index)" :class="[songList?'close':'',songList&&songIndex===index?'act':'']" v-for="(item, index) in songs" :key="index">
            <span :class="[songList&&songIndex===index?'act':'']">{{item[2]}}</span>
            <div class="subInfo">
              {{item[1]}}
            </div>
          </h1>
        </div>
        <scroll-view v-if="scrollReflash" :class="['content',songList?'act':'']" scroll-x scroll-left="1500">
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
      scrollReflash: true,
      loaded: false,
      step: 1,
      videoContext: {},
      plaing: false,
      showTime: false,
      over: false
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
      // console.log(this.scrollP)
    },
    listSwitch (e) {
      if (this.songList) {
        this.songList = false
        setTimeout(() => {
          this.songIndex = 0
          this.scrollReflash = false
          setTimeout(() => {
            this.scrollReflash = true
          }, 1)
        }, 500)
        return
      }
      this.songList = true
      this.songIndex = e
    },
    // 打乱重组
    randomArray (length) {
      var i, index, temp
      let arr = [length]
      for (i = 1; i <= length; i++) {
        arr[i - 1] = i
      }
      for (i = 1; i <= length; i++) {
        index = parseInt(Math.random() * (length - i)) + i
        if (index !== i) {
          temp = arr[i]
          arr[i] = arr[index]
          arr[index] = temp
        }
      }
      return arr
    },
    resortArray (oraginList) {
      let randomIndex = this.randomArray(oraginList.length)
      var targetList = []
      for (let index = 0; index < randomIndex.length; index++) {
        const element = randomIndex[index] - 1
        targetList.push(oraginList[element])
      }
      console.log(targetList)
      return targetList
    },
    fontLoad (fontA, font) {
      if (wx.getSystemInfoSync().system.split(' ')[0] === 'Android') {
        wx.loadFontFace({
          family: 'webfont',
          source: 'url("' + fontA + '")'
        })
        // this.isAndroid = true
      } else {
        wx.loadFontFace({
          family: 'webfont',
          source: 'url("' + font + '")'
        })
      }
    },
    scroll () {
      if (!this.plaing && this.loaded && !this.over) {
        this.step++
        if (this.step === 2) {
          // this.videoContext.seek(2)
          this.videoContext.play()
          this.plaing = true
          setTimeout(() => {
            this.videoContext.pause()
            this.plaing = false
            this.showTime = true
            setTimeout(() => {
              this.over = true
            }, 3000)
          }, 8000)
        }
        console.log(this.step)
      }
    },
    init () {
      this.fontLoad('http://pb85uax7t.bkt.clouddn.com/HYYS.TTF', 'https://browniu-c8bfe1.tcb.qcloud.la/HYYS.TTF?sign=623d810f767185fe34b4e7db6ce575eb&t=1541383437')
      this.songs = this.resortArray(songs.songs).slice(1, 9)
      this.videoContext = wx.createVideoContext('videoBg')
    },
    playState (e) {
      if (!this.plaing) {
        this.loaded = true
        console.log(e)
        this.videoContext.pause()
      }
    }
  },
  onLoad () {
    this.init()
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
@import '../songs/keyframe.css'
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
  background #fff
  color c3
  font-family 'webfont'
  & .texture {
    transform translate(-50%, -50%) rotate(90deg)
    transition background-position 1.5s linear
    height 100vw
    width 100vh
    position fixed
    top 50%
    left 50%
    z-index 0
    overflow hidden
    background-repeat no-repeat
    background-size 120% auto
    background-position 0% bottom
    opacity 0.25
    &:before, &:after {
      content ''
      display inline-block
      height 100%
      width 100%
      position absolute
      left 99.9%
      background-image url('https://browniu-c8bfe1.tcb.qcloud.la/forest-bg.jpg?sign=ece6aded7226a56660bc20eede59edbd&t=1541396995')
      background-repeat no-repeat
      background-size 100% auto
      background-position 0 bottom
      z-index 0
    }
    &:before {
      left 0
      animation run 30s linear infinite
    }
    &:after {
      animation run2 30s linear infinite
    }
    & i {
      height 100%
      width 100%
      display inline-block
      position fixed
      left 0
      top 0
      background-image url('https://browniu-c8bfe1.tcb.qcloud.la/forest-train.svg?sign=8fa943af3f3a61cea6c12899963a58d8&t=1541398285')
      background-size 100% auto
      background-position -80px bottom
      background-repeat no-repeat
      z-index 10
      animation run3 30s linear infinite
    }
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
          padding-top 40px
          width 11.11vh
          line-height 12vh
          border-left 1px solid rgba(0, 0, 0, 0.05)
          overflow hidden
          animation open 1.2s ease
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
  & .shadow {
    position absolute
    height 100vh
    width 100vw
    top 0
    left 0
    z-index 999
    background #fff
    animation leave 3s ease
    animation-fill-mode forwards
    &.act {
      display none
    }
  }
  & .cover {
    & .songsCover {
      height 100vh
      width 100vw
      & .coverPost {
        position absolute
        top 0
        left 0
        height 100vh
        width 100vw
        & .left {
          position absolute
          left 0
          top 0
          height 100vh
          width 51vw
          // background #fff
          & .leftTit {
            position absolute
            right -18px
            top 50%
            transform translateY(-50%) translateX(-18px)
            height 489px
            width 36px
            transition 3s cubic-bezier(0.645, 0.045, 0.355, 1)
          }
        }
        & .right {
          position absolute
          right 0
          top 0
          height 100vh
          width 49vw
          // background #fff
          & .rightTit {
            position absolute
            left -18px
            top 50%
            transform translateY(-50%) translateX(0)
            height 489px
            width 36px
            z-index 1
            transition 3s cubic-bezier(0.645, 0.045, 0.355, 1)
          }
          & .rightBg {
            display none
            position absolute
            z-index 0
            right 0
            top 0
            height 100vh
            width calc(100vh * (800 / 1667))
          }
        }
        & .coverTexture {
          height 100%
          width 100%
          background #fff
          top 0
          left 0
          position absolute
          opacity 1
          transition 0.7s ease
        }
        &.loaded {
          & .coverTexture {
            opacity 0
          }
          & .leftTit {
            transition 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)
            transform translateY(-50%) translateX(0px)
          }
        }
        &.act {
          // animation leave 0.7s cubic-bezier(0.645, 0.045, 0.355, 1)
          animation-fill-mode forwards
          & .left {
            & .leftTit {
              transition 5.5s cubic-bezier(0.645, 0.045, 0.355, 1)
              transform translateY(-50%) translateX(40px)
            }
          }
          & .right {
            & .rightTit {
              transition 5.5s cubic-bezier(0.645, 0.045, 0.355, 1)
              transform translateY(-50%) translateX(-40px)
            }
          }
        }
      }
    }
  }
}
</style>


