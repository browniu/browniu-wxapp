// 引入渲染器
import Seed from '../base/seed'

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

    // 彼岸花默认处于屏幕底部居中位置
    this.x = screenWidth / 2 - this.width / 2
    this.y = screenHeight / 2 - this.height / 2 + 200
  }
}
