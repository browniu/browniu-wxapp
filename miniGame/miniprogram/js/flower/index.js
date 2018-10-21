// 引入渲染器
import Seed from '../base/seed'
import Main from '../main'

// // 获取声音数据
// (function getVoiceData() {
//   wx.cloud.init()
//   const db = wx.cloud.database()
//   var voiceData = []
//   var loaded = false
//   // 避开数据大小限制的措施（分段获取）
//   let dataId = [
//     "5bca82ceee4ea49e91753f67",
//     "5bca83b5ee4ea49e91753fe0",
//     "5bca8438ee4ea49e91754031"
//   ];
//   for (let i = 0; i < 3; i++) {
//     db
//       .collection("test")
//       .doc(dataId[i])
//       .get()
//       .then(res => {
//         voiceData.push(res.data["VD" + (i + 1)]);
//         // console.log(voiceData)
//         if (i === 2) {
//           voiceData = voiceData[0].concat(voiceData[1]).concat(voiceData[2]);
//           console.log(voiceData);
//           loaded = true;
//         }
//       });
//   }
// })()

// getVoiceData()
// 获取设备常量
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

// 彼岸花相关常量设置
const FLOWER_IMG_SRC = 'images/enemy.png'
const FLOWER_WIDTH = 100
const FLOWER_HEIGHT = 100

// 渲染器渲染
export default class FLOWER extends Seed {
  constructor() {
    super(FLOWER_IMG_SRC, FLOWER_WIDTH, FLOWER_HEIGHT)

    // 定义渲染主角的属性
    this.voiceData = this.voiceData
    this.loaded = this.loaded
    this.x = screenWidth / 2 - this.width / 2
    this.y = screenHeight / 2 - this.height / 2
    this.index = 0
    this.colors = [
      [61, 151, 198],
      [61, 151, 198],
      [61, 151, 198],
      [61, 151, 198],
      [61, 151, 198],
      [61, 151, 198],
      [61, 151, 198],
      [61, 151, 198],
      [61, 151, 198],
      [61, 151, 198],
      [62, 150, 197],
      [70, 145, 191],
      [80, 137, 182],
      [92, 129, 173],
      [106, 119, 162],
      [120, 109, 151],
      [136, 98, 139],
      [151, 87, 126],
      [167, 76, 114],
      [183, 65, 102],
      [198, 55, 90],
      [211, 45, 79],
      [223, 37, 70],
      [243, 23, 54],
      [243, 23, 54],
      [243, 23, 54],
      [243, 23, 54],
      [243, 23, 54],
      [243, 23, 54],
      [243, 23, 54],
      [243, 23, 54],
      [243, 23, 54],
      [243, 23, 54],
      [243, 23, 54],
      [243, 23, 54],
      [243, 23, 54],
      [243, 23, 54],
      [243, 23, 54],
      [243, 23, 54]
    ]
  }
}
