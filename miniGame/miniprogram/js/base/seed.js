/**
 * 种子孵化器
 */

export default class Seed {
  constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0) {
    this.img = new Image()
    this.img.src = imgSrc

    this.width = width
    this.height = height

    this.x = x
    this.y = y
    this.index = 0
    this.VDindex = 0
    this.voiceData = []
    this.beginAngle = 0
    this.angle = this.beginAngle
    this.angleGap = (2 * Math.PI) / 3
    this.total = 0
    this.visible = true
    this.valum = 150
  }

  /**
   * 将种子孵化出来
   */
  drawToCanvas(ctx, loaded, voiceData) {
    // console.log(voiceData[this.index][0])
    // console.log(this.VDindex);
    if (!this.visible)
      return
    // 开始干活
    // ctx.drawImage(
    //   this.img,
    //   this.x,
    //   this.y,
    //   this.width,
    //   this.height
    // )

    if (this.VDindex < voiceData.length - 2) {
      this.VDindex++
    } else {
      this.VDindex = 0
    }
    // console.log(this.VDindex);
    let colorIndex = ((voiceData[this.VDindex][27] / 250) * 35).toFixed(0)
    // console.log(colorIndex)
    // console.log(((voiceData[this.VDindex][1] / 200) * this.colors.length).toFixed(0))
    // ctx.fillStyle = 'rgb(' + this.colors[this.index] + ')'
    ctx.fillStyle = 'rgba(' + this.colors[10] + ',0.3)';
    ctx.strokeStyle = 'rgba(' + this.colors[colorIndex] + ',0.3)';
    // ctx.globalCompositeOperation = 'lighter';
    ctx.lineWidth = 10;
    // ctx.fillRect(
    //   this.x,
    //   this.y,
    //   this.width,
    //   voiceData[this.VDindex][1]
    // )
    // ctx.beginPath();
    // ctx.rotate(30)
    for (let i = 0; i < 28; i++) {
      // console.log(voiceData[this.VDindex][i])
      this.angle += 0;
      ctx.beginPath();
      ctx.moveTo(window.innerWidth / 2 + voiceData[this.VDindex][i] * Math.sin(this.angle), window.innerHeight / 2 + voiceData[this.VDindex][i] * Math.cos(this.angle));
      ctx.lineTo(window.innerWidth / 2 + voiceData[this.VDindex][i] * Math.sin(this.angle + this.angleGap), window.innerHeight / 2 + voiceData[this.VDindex][i] * Math.cos(this.angle + this.angleGap));
      ctx.lineTo(window.innerWidth / 2 + voiceData[this.VDindex][i] * Math.sin(this.angle + this.angleGap * 2), window.innerHeight / 2 + voiceData[this.VDindex][i] * Math.cos(this.angle + this.angleGap * 2));
      ctx.closePath();
      ctx.stroke();
      this.total += voiceData[this.VDindex][i];
    }
    this.beginAngle = (this.beginAngle + 0.00001 * this.total) % 2 * Math.PI;
    ctx.restore();
  }
}
