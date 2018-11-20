<template>
  <div class="legendary" id="lege">
    <div class="inner" @touchstart="scrollStart" @touchmove="scroll" @touchend="scrollEnd">
      <video @progress="progre" :duration="10" v-if="curSource" @timeupdate="playState" id="videoBg" :show-progress="false" show-center-play-btn="false" :loop="false" enable-progress-gesture="false" objectFit="cover" show-play-btn="false" :autoplay="true" :muted="true" width="100vw" eight="100vh" :src="curSource" :controls="false" event-model="bubble">
        <cover-view class="cover-inner" @touchstart="scrollStart" @touchmove="scroll" @touchend="scrollEnd">
          <cover-view :class="['texture',loaded?'act':'']"></cover-view>
          <!-- <cover-view class="contain">
            <cover-view class="list">
              <cover-view class="item">
                <cover-view class="title">Mac Pro</cover-view>
                <cover-view class="desc">Built for creativity on an epic scale.</cover-view>
              </cover-view>
            </cover-view>
          </cover-view> -->
        </cover-view>
      </video>
      <div class="container">
        <div class="features">
          <div :class="['item',seekIndex===index?'act':'']" v-for="(item, index) in desc" :key="index">
            <div class="title">
              <h1>{{item.tit}}</h1>
              <p><span>{{item.sub}}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      source: [
        'https://browniu-c8bfe1.tcb.qcloud.la/legendary/legendary_8.mp4?sign=2491152f4ddba1a02e704a7310ed0f32&t=1542592278'
      ],
      desc: [
        {
          'tit': 'Mac Pro',
          'sub': 'Built for creativity on an epic scale.'
        },
        {
          'tit': 'A unique vision Designed for yours.',
          'sub': 'Mac has always been built around a singular vision:  to create machines that are as powerful and functional as they are beautiful and intuitive. Mac Pro is a stunning realization of that ideal. All the elements that define a pro computer — graphics, storage, expansion, processing power, and memory — have been rethought and reengineered.  So you have the power and performance to bring your biggest ideas to life.'
        },
        {
          'tit': 'Power.Structure',
          'sub': 'Engineered around workstation graphics with dual GPUs, PCIe-based SSD storage, high-performance Thunderbolt 2, Xeon processors, fast memory, and support for 4K video, Mac Pro delivers brilliant performance across the board.'
        },
        {
          'tit': 'Processor.',
          'sub': 'Mac Pro is muscle through and through, starting with the Intel Xeon E5, available with 6, 8, or 12 cores of processing power on a single die. And with up to 30MB of L3 cache, 40GB/s of PCI Express gen 3 bandwidth, and 256-bit-wide floating-point instructions, you’ll never be at a loss for speed.'
        },
        {
          'tit': 'Memory.',
          'sub': 'Every component in Mac Pro is optimized for performance. That includes a four-channel DDR3 memory controller running at 1866MHz. It supports up to 64GB of memory and delivers up to 60GB/s of memory bandwidth, which means you can fly through even the most compute-intensive tasks in no time. And since it’s ECC memory, your render job, video export, or simulation won’t be stopped by transient memory errors.'
        },
        {
          'tit': 'Graphics.',
          'sub': 'Traditionally, pro computers have relied primarily on the CPU for their computing power. But as GPU performance has dramatically increased, software developers have begun to leverage that power in their apps. With Mac Pro, we looked ahead and engineered an even more powerful GPU architecture. Not only does it feature an AMD FirePro workstation-class GPU — it features two of them. And each is available with up to 6GB of dedicated VRAM with up to 2048 stream processors. With all that power, you’ll be able to do things like seamlessly edit full-resolution 4K video while simultaneously rendering effects in the background — and still have enough power to connect up to three high-resolution 5K displays.'
        },
        {
          'tit': 'Storage.',
          'sub': 'Mac Pro is muscle through and through, starting with the Intel Xeon E5, available with 6, 8, or 12 cores of processing power on a single die. And with up to 30MB of L3 cache, 40GB/s of PCI Express gen 3 bandwidth, and 256-bit-wide floating-point instructions, you’ll never be at a loss for speed.'
        },
        {
          'tit': 'A unfied theramal core.',
          'sub': 'Mac Pro packs an unprecedented amount of power in an unthinkable amount of space. A big reason we were able to do that is the ingenious unified thermal core. Rather than using multiple heat sinks and fans to cool the processor and graphics cards, we built everything around a single piece of extruded aluminum designed to maximize airflow as well as thermal capacity. It works by conducting heat away from the CPU and GPUs and distributing that heat uniformly across the core. That way, if one processor isn’t working as hard as the others, the extra thermal capacity can be shared efficiently among them. No computer has been built this way before. And yet it makes so much sense, it’s now hard to imagine building one any other way.'
        },
        {
          'tit': 'A single brakthrough fan.',
          'sub': 'Mac Pro packs an unprecedented amount of power in an unthinkable amount of space. A big reason we were able to do that is the ingenious unified thermal core. Rather than using multiple heat sinks and fans to cool the processor and graphics cards, we built everything around a single piece of extruded aluminum designed to maximize airflow as well as thermal capacity. It works by conducting heat away from the CPU and GPUs and distributing that heat uniformly across the core. That way, if one processor isn’t working as hard as the others, the extra thermal capacity can be shared efficiently among them. No computer has been built this way before. And yet it makes so much sense, it’s now hard to imagine building one any other way.'
        },
        {
          'tit': 'A unfied theramal core.',
          'sub': 'An incredible amount of innovation went into designing a fan system capable of cooling such a high-performance device. Instead of adding extra fans, we engineered a single, larger fan that pulls air upward through a bottom intake. As air passes vertically through the center of the device, it absorbs heat and carries it out the top. It’s simple and elegant — and also astonishingly quiet. To achieve that, we had to consider every detail: the number of blades, the size of the blades, the spacing of the blades, and even the shape of the blades. By minimizing air resistance throughout the system, we were able to design a fan with backward-curved impeller blades that runs at fewer revolutions per minute, draws air more efficiently as it spins, and creates considerably less noise.'
        },
        {
          'tit': 'Expansion,vastly expanded.',
          'sub': 'In creating Mac Pro, we wanted to provide an enormous amount of expansion — without being limited to the space inside the enclosure. Designed with built-in Thunderbolt 2, USB 3, Gigabit Ethernet, and HDMI 1.4 ports, Mac Pro has everything you need to build a workstation completely customized to what you need and how you work.'
        },
        {
          'tit': 'Advanced wireless',
          'sub': 'In creating Mac Pro, we wanted to provide an enormous amount of expansion — without being limited to the space inside the enclosure. Designed with built-in Thunderbolt 2, USB 3, Gigabit Ethernet, and HDMI 1.4 ports, Mac Pro has everything you need to build a workstation completely customized to what you need and how you work.'
        },
        {
          'tit': 'Expansion,vastly expanded.',
          'sub': 'Access your network over three-stream 802.11ac Wi-Fi for the latest in high-speed wireless connectivity. For all your other wireless connections, Mac Pro includes Bluetooth 4.0. It’s the easiest way to connect your keyboard, mouse, and other wireless devices without having to physically attach anything.'
        },
        {
          'tit': 'Radical.Yet completely logical.',
          'sub': 'Mac Pro looks unlike any other computer. Because it is unlike any other computer. By rethinking the architecture of its internal components, we had the chance to rethink the entire enclosure. And since everything centers around a unified thermal core, we were free to design a much leaner, lighter, quieter, and far more streamlined structure. Its unique design and beautiful finishes are executed to an extraordinary degree of precision. And at just 9.9 inches tall with a diameter of just 6.6 inches, it’s a pro desktop computer that can actually sit on your desk.'
        }
      ],
      curSource: null,
      videoContext: {},
      loaded: false,
      videoDur: 22,
      videoCur: 2,
      touchStart: 0,
      touchEnd: 0,
      touchCur: 0,
      vh: wx.getSystemInfoSync().windowWidth,
      playing: false,
      seekIndex: 0,
      seekData: [0, 4, 7, 12, 14, 18, 20, 23, 31, 37, 40, 42, 45],
      testLoad: {}
    }
  },
  computed: {
    touchDisPer: function () {
      return (this.touchCur - this.touchStart) / this.vh
    }
  },
  methods: {
    init () {
      this.videoContext = wx.createVideoContext('videoBg')
      this.fontLoad()
      setTimeout(() => {
        this.curSource = this.source[0]
        this.testLoad = setInterval(() => {
          if (this.loaded) {
            this.seekSwitch()
            clearInterval(this.testLoad)
          }
        }, 20)
      }, 100)
    },
    reset () {
      this.curSource = null
      this.loaded = false
    },
    playState (e) {
      if (!this.playing) {
        this.loaded = true
      }
    },
    play () {
      if (this.playing) {
        this.playing = false
        this.videoContext.pause()
      } else {
        this.playing = true
        this.videoContext.play()
      }
    },
    scroll (e) {
      this.touchEnd = e.clientY
      // console.log(this.touchEnd)
    },
    scrollStart (e) {
      this.touchStart = e.clientY
      // console.log(this.touchStart)
    },
    scrollEnd () {
      this.touchCur = this.touchStart - this.touchEnd
      // console.log(this.touchCur)
      if (this.touchCur > 80) {
        this.seekSwitch()
      }
    },
    seekHandle (e) {
      this.videoContext.seek(this.seekData[e])
      this.videoContext.play()
      this.playing = true
      setTimeout(() => {
        this.videoContext.pause()
        this.playing = false
        if (e === this.seekData.length - 2) this.loaded = false
      }, (this.seekData[e + 1] - this.seekData[e]) * 1000 + 150)
    },
    seekSwitch () {
      if (!this.playing) {
        if (this.seekIndex === 0) this.loaded = true
        this.seekHandle(this.seekIndex)
        this.seekIndex++
        if (this.seekIndex > this.seekData.length - 2) {
          this.seekIndex = 0
        }
      }
    },
    fontLoad () {
      wx.loadFontFace({
        family: 'webfont',
        source: 'url("https://fonts.gstatic.font.im/s/opensans/v15/mem5YaGs126MiZpBA-UN_r8OUuhs.ttf")'
      })
    }
  },
  onLoad () {
    this.init()
  },
  onUnload () {
    this.reset()
  }
}
</script>
<style lang='stylus' scoped>
@import '../../../assets/styles/index.styl'
@import '../legendary/keyframe.css'
.legendary {
  background #000
  height 100vh
  .inner {
    height 100%
    video {
      height 50vh
      width 100vw
      margin 0
      padding 0
      background #000
      margin-top 30px
      .cover-inner {
        height 100vh
        width 100%
        z-index 100
        & .texture {
          height 100vh
          width 100%
          position absolute
          z-index 0
          top 0
          left 0
          transition 0.7s ease
          background #000
          opacity 1
          &.act {
            opacity 0
          }
        }
        & .contain {
          text-align center
          padding-top 50vh
          & .list {
            & .item {
              font-family 'webfont'
              color #fff
              & .title {
                font-size 36px
              }
              & .desc {
                font-size 12px
                opacity 0.7
              }
            }
          }
        }
      }
    }
    .container {
      height 50vh
      margin 0
      padding 0
      box-sizing border-box
      padding-top 20px
      position relative
      & .features {
        & .item {
          position absolute
          top 0
          width 100%
          box-sizing border-box
          padding 15px 32px 0
          color #fff
          opacity 0
          transition opacity 0.5s ease
          animation leave 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)
          &.act {
            transition opacity 0.7s ease
            opacity 1
            animation come 0.7s cubic-bezier(0.645, 0.045, 0.355, 1)
          }
          & .title {
            text-align center
            font-family webfont
            font-weight 300
            & h1 {
              font-size 32px
              line-height 32px
            }
            & p {
              text-align left
              margin-top 15px
              font-size 12px
              line-height 16px
              opacity 0.5
              & span {
                text-align justify
                display inline-block
                position relative
                left 50%
                transform translateX(-50%)
              }
            }
          }
        }
      }
    }
  }
}
</style>
