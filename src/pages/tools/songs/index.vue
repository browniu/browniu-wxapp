<template>
  <div class="songs">
    <div class="texture"></div>
    <div class="shadow"></div>
    <div class="inner">
      <div class="article">
        <h1 class="title">{{songs[songIndex][0]}}</h1>
        <scroll-view scroll-x class="content" scroll-left="1000">
          <span v-for="(item, index) in songs[songIndex][1]" :key="index">
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
      songIndex: 0
    }
  },
  onLoad () {
    this.songs = songs.songs
    console.log(this.songs)
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
@font-face {
  font-family 'qingke'
  src url('http://pb85uax7t.bkt.clouddn.com/HYYS.TTF') format('truetype')
}
c1 = #f0ead0
c2 = #52462c
.songs {
  height 100vh
  width 100vw
  overflow hidden
  background c1
  color c2
  font-family qingke
  & .texture {
    transform translate(-50%, -50%) rotate(90deg)
    height 100vw
    width 100vh
    position absolute
    top 50%
    left 50%
    z-index 0
    background-image url('https://www.transparenttextures.com/patterns/bedge-grunge.png')
    background-image url('http://pb85uax7t.bkt.clouddn.com/cwi-121.jpg')
    background-size cover
    background-position center center
    opacity 0.15
  }
  & .shadow {
    position absolute
    left 0
    height 30%
    width 100%
    background #000
    background linear-gradient(0deg, rgba(240, 234, 208, 0), rgba(240, 234, 208, 1))
    z-index 100
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
      position absolute
      top 50%
      left 50%
      width 100%
      transform translate(-50%, -50%)
      & .title {
        display inline-block
        position relative
        font-size 24px
        margin-left 20px
        border-left 3px solid rgba(0, 0, 0, 0.5)
        position fixed
        right 15px
        z-index 100
      }
      & .content {
        box-sizing border-box
        width 100%
        padding 0 60px
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
      ::-webkit-scrollbar {
        width 0
        height 0
        color transparent
      }
    }
  }
}
</style>