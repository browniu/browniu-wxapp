// let instance

// /**
//  * 统一的音效管理器
//  */
// export default class Music {
//   constructor() {
//     if (instance)
//       return instance

//     instance = this

//     this.bgmAudio = new Audio()
//     this.bgmAudio.loop = true
//     // this.bgmAudio.src = 'http://pb85uax7t.bkt.clouddn.com/QNXT.mp3'
//     this.bgmAudio.src = 'bgm.mp3'

//     this.playBgm()
//   }

//   playBgm() {
//     this.bgmAudio.play()
//   }
// }
let instance

export default class Music {
  constructor() {
    if (instance)
      return instance

    instance = this

    this.bgmAudio = new Audio()
    this.bgmAudio.loop = true
    this.bgmAudio.src = 'http://pb85uax7t.bkt.clouddn.com/QNXT.mp3'

    this.playBgm()
  }

  playBgm() {
    this.bgmAudio.play()
  }
}
