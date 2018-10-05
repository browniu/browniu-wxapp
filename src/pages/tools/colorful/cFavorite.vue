<template>
  <div class="colorful-favorite">
    <div class="main">
      <scroll-view scroll-y class="list">
        <div class="item" v-for="(item, index) in colorData" :key="index">
          <div class="inner">
            <div class="post">
              <li @longpress="getCode($event,item)" :style="{backgroundColor:item}" v-for="(item, postindex) in item.colors" :key="postindex">
                <!-- {{item}} -->
              </li>
            </div>
            <div class="sub">
              <div class="button" @click="deleteThis(item._id)" colors="item">
                <i class="iconfont">&#xe863;</i>
              </div>
              <div class="button" @click="copyAll(item.colors)">
                <i class="iconfont">&#xe7b6;</i>
                <span>ColorCard</span>
              </div>
              <div class="date">{{item.date}}</div>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      colorData: []
    }
  },
  onLoad () {
    this.getData()
  },
  methods: {
    getData () {
      const db = wx.cloud.database()
      db.collection('colorful').get({
        success: res => {
          this.colorData = res.data
          this.colorData = this.colorData.reverse()
        }
      })
    },
    deleteThis (e) {
      console.log(e)
      const db = wx.cloud.database()
      db.collection('colorful').doc(e).remove({
        success: (res) => {
          this.getData()
        }
      })
    },
    copyAll (e) {
      wx.vibrateShort()
      wx.setClipboardData({
        data: e.toString(),
        success: (res) => {
          wx.showToast({
            title: '方案已拷贝',
            during: '2000'
          })
        }
      })
    },

    getCode (e, item) {
      wx.vibrateShort()
      wx.setClipboardData({
        data: ('#' + ((1 << 24) + (item[0] << 16) + (item[1] << 8) + item[2]).toString(16).slice(1)).toUpperCase(),
        icon: 'none',
        success: (res) => {
          wx.showToast({
            title: '色值已拷贝',
            during: '2000'
          })
        }
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
.colorful-favorite {
  .main {
    .list {
      height 100vh
      width 100vw
      box-sizing border-box
      padding 40px 10px
      background co_10
      .item {
        transition 0.3s
        &:first-child {
          position relative
          width 100%
          height 220px
          margin-bottom 15px
          border-radius 5px
          &:before {
            z-index 1
            content ''
            display inline-block
            position absolute
            left 50%
            bottom 0px
            height 50%
            width 90%
            transform translateX(-50%)
            background #000
            opacity 0.1
            filter blur(5px)
          }
          & .inner {
            position relative
            z-index 3
            height 100%
            width 100%
            background #fff
            border-radius 5px
            overflow hidden
            & .post {
              height 75%
              & li {
                display inline-block
                width 20%
                height 100%
                line-height 50px
                color #fff
                font-size 12px
              }
            }
            & .sub {
              height 15%
              padding 2.5% 0 15px 0
              & .button {
                display inline-block
                height 100%
                box-sizing border-box
                padding 5px 10px 2px
                margin-left 5px
                border-radius 3px
                color #a9bdd3
                font-size 12px
                border 1px solid #e9f2f9
                &:nth-child(2) {
                  display inline-block
                }
                & i {
                  display inline-block
                  margin-right 3px
                  position relative
                  top 3px
                  color co_2
                }
                & span {
                  display inline
                }
              }
              & .date {
                float right
                font-size 12px
                color #a9bdd3
                padding-top 2.5%
                padding-right 15px
              }
            }
          }
        }
        &:nth-child(odd) {
          float right
        }
        position relative
        display inline-block
        width 48.5%
        height 180px
        margin-bottom 15px
        border-radius 5px
        &:before {
          z-index 1
          content ''
          display inline-block
          position absolute
          left 50%
          bottom 0px
          height 50%
          width 90%
          transform translateX(-50%)
          background #000
          opacity 0.1
          filter blur(5px)
        }
        & .inner {
          position relative
          z-index 3
          height 100%
          width 100%
          background #fff
          border-radius 3px
          overflow hidden
          & .post {
            height 82%
            & li {
              display inline-block
              width 20%
              height 100%
              line-height 50px
              color #fff
              font-size 12px
            }
          }
          & .sub {
            height 10%
            padding 2.5% 0 15px 5px
            & .button {
              display inline-block
              height 100%
              box-sizing border-box
              padding 5px 5px 5px
              margin-right 15px
              border-radius 3px
              color #a9bdd3
              font-size 12px
              border 0px solid #e9f2f9
              &:nth-child(2) {
                display none
              }
              & i {
                display inline-block
                margin-right 3px
                position relative
                top 0
                color co_2
              }
              & span {
                display none
              }
            }
            & .date {
              float right
              font-size 12px
              color #a9bdd3
              padding-top 2.5%
              padding-right 5px
            }
          }
        }
      }
    }
  }
}
</style>