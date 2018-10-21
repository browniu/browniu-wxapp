// 引入相关资源
import Player from "./player/index";
import Flower from "./flower/index";
import BackGround from "./runtime/background";
import GameInfo from "./runtime/gameinfo";
import Music from "./runtime/music";
import DataBus from "./databus";

// 初始化 画布
let ctx = canvas.getContext("2d");
let databus = new DataBus();

// 初始化 云服务
wx.cloud.init();
const db = wx.cloud.database();

// 设置动画帧率
wx.setPreferredFramesPerSecond(60);

// 初始化数据
var index = 0;
var voiceData = [];
var loaded = false;
/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    // 维护当前requestAnimationFrame的id
    this.aniId = 0;
    this.restart();
    this.login();
  }
  login() {
    // 获取 openid
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        window.openid = res.result.openid;
        // console.log(window.openid);
        this.getVoiceData();
      },
      fail: err => {
        console.error("get openid failed with error", err);
      }
    });
  }
  getVoiceData() {
    // 避开数据大小限制的措施（分段获取）
    let dataId = [
      "5bcb5148ee4ea49e9175904f",
      "5bcb5182ee4ea49e9175907d",
      "5bcb51ffee4ea49e917590c1"
    ];
    // for (let i = 0; i < 3; i++) {
    //   db
    //     .collection("voice")
    //     .doc(dataId[i])
    //     .get()
    //     .then(res => {
    //       voiceData.push(res.data["VD" + (i)]);
    //       // console.log(voiceData)
    //       if (i === 2) {
    //         voiceData = voiceData[0].concat(voiceData[1]).concat(voiceData[2]);
    //         console.log(voiceData);
    //         loaded = true;
    //         // this.music.playBgm()
    //       }
    //     });
    // }
    db.collection('voice').doc('5bcb7094ee4ea49e91759e23').get().then(res => {
      voiceData.push(res.data['VD0']);
      db.collection('voice').doc('5bcb70a4ee4ea49e91759e39').get().then(res => {
        voiceData.push(res.data['VD1']);
        db.collection('voice').doc('5bcb70b4ee4ea49e91759e5c').get().then(res => {
          voiceData.push(res.data['VD2']);
          voiceData = voiceData[0].concat(voiceData[1]).concat(voiceData[2]);
          console.log(voiceData);
          this.music.playBgm()
          setTimeout(() => {
            loaded = true;
          }, 200);
        })
      })
    })
    // console.log(voiceData)
    // 正常的获取
    // db.collection('test').doc('5bca82ceee4ea49e91753f67').get().then(res => {
    //   console.log(res)
    //   // voiceData = res.data[0].voiceData
    //   // console.log(voiceData)
    // })
    // db.collection('test').add({
    //     data: {
    //       voiceData: voiceData,
    //     }
    //   })
    //   .then(res => {
    //     console.log(res)
    //   })
  }
  // 游戏重置
  restart() {
    databus.reset();

    canvas.removeEventListener("touchstart", this.touchHandler);

    this.bg = new BackGround(ctx);
    this.player = new Player(ctx);
    this.Flower = new Flower(ctx);
    this.gameinfo = new GameInfo();
    this.music = new Music();
    console.log(loaded)

    this.bindLoop = this.loop.bind(this);
    this.hasEventBind = false;

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(this.bindLoop, canvas);
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    // console.log(loaded);
    // 渲染背景
    this.bg.render(ctx);
    if (loaded) {
      // 渲染彼岸花
      this.Flower.drawToCanvas(ctx, loaded, voiceData);
    }
    // index++;
    // if (loaded && index < voiceData.length) {
    //   console.log(index, voiceData.length);
    //   // console.log(voiceData);
    //   ctx.fillStyle = "brown";
    //   console.log(voiceData[index][100]);
    //   ctx.fillRect(0, 0, 200, index);
    // } else {
    //   index = 0;
    // }
    // console.log('xixixi')
    // ctx.clearRect(0, 0, canvas.width, canvas.height)
    // 渲染主角
    // this.player.drawToCanvas(ctx);
    // 渲染分数
    // this.gameinfo.renderGameScore(ctx, databus.score)
  }

  // 游戏逻辑更新主函数
  update() {
    // 背景更新
    this.bg.update();
  }

  // 实现游戏帧循环
  loop() {
    // databus.frame++

    this.update();
    this.render();

    this.aniId = window.requestAnimationFrame(this.bindLoop, canvas);
  }
}
