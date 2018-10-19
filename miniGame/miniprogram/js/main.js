// 引入相关资源
import Player from './player/index'
import Flower from './flower/index'
import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import DataBus from './databus'

// 初始化 画布
let ctx = canvas.getContext('2d')
let databus = new DataBus()

// 初始化 云服务
wx.cloud.init()
const db = wx.cloud.database()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    this.restart()
    this.login()
  }
  login() {
    // 获取 openid
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        window.openid = res.result.openid
        // console.log(window.openid)
        this.getVoiceData()
      },
      fail: err => {
        console.error('get openid failed with error', err)
      }
    })
  }
  getVoiceData() {
    db.collection('voice').get().then(res => {
      var voiceData = res.data[0].voiceData
      // console.log(voiceData)
    })
  }
  // 游戏重置
  restart() {
    databus.reset()

    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )

    this.bg = new BackGround(ctx)
    this.player = new Player(ctx)
    this.Flower = new Flower(ctx)
    this.gameinfo = new GameInfo()
    this.music = new Music()

    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    // console.log('xixixi')
    // ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 渲染背景
    // this.bg.render(ctx)

    // 渲染主角
    // this.player.drawToCanvas(ctx)
    
    // 渲染彼岸花
    this.Flower.drawToCanvas(ctx)

    // 渲染分数
    this.gameinfo.renderGameScore(ctx, databus.score)

  }

  // 游戏逻辑更新主函数
  update() {
    // 背景更新
    this.bg.update()

  }

  // 实现游戏帧循环
  loop() {
    // databus.frame++

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}

