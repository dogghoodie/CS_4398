export class Reticle
{
  constructor({ position })
  {
    this.position = position
    this.size = 20
    this.color = 'red'
  }

  draw(c, mouse)
  {
    c.save()
    c.beginPath()
    c.arc(mouse.x, mouse.y, this.size, 0, Math.PI * 2)
    c.strokeStyle = this.color
    c.lineWidth = 2
    c.stroke()
    c.restore()
  }

  update(c, mouse)
  {
    this.draw(c, mouse)
    this.position = { x: mouse.x, y: mouse.y }
  }
}
