import Music from 'music'
// canvas
console.log('xixixi')
var canvas = wx.createCanvas()

console.log(canvas.width, canvas.height)

var context = canvas.getContext('2d')
context.fillStyle = 'brown'
context.fillRect(0, 0, 200, 200)

export default class Main {
  restart() {
    this.music = new Music()
  }
}
