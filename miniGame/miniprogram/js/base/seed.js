/**
 * 种子孵化器
 */
export default class Seed {
  constructor(imgSrc = '', width=  0, height = 0, x = 0, y = 0) {
    this.img     = new Image()
    this.img.src = imgSrc

    this.width  = width
    this.height = height

    this.x = x
    this.y = y

    this.visible = true
  }

  /**
   * 将种子孵化出来
   */
  drawToCanvas(ctx) {
    // console.log(ctx)
    if ( !this.visible )
      return
    // 开始干活
    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}
