export class Reload
{
  constructor({position})
  {
    this.position = position
    this.load_progress = 0
    this.eject_chamber = false
    this.load_chamber = false
  }

  draw(c, mouse)
  {
    //red bar near reticle
    c.save()

    //draws a red bar when you eject the gun
    if(this.eject_chamber)
      {
        c.fillStyle = 'red'
        c.fillRect(mouse.x + 30, mouse.y - 20, 70, 20)
      }
        
    //draw a green bar loading up over the red bar
    if(this.load_chamber)
    {
      c.fillStyle = 'green'
      const green_width = (this.load_progress / 100) * 70;    // Scale green bar width
      c.fillRect(mouse.x + 30, mouse.y - 20, green_width, 20) //draws bar based on green_width
      //c.fillRect(mouse.x + 30, mouse.y - 40, 70, 20)
    }
      
    c.restore()
  }

  update(c, mouse)
  {
    if (this.load_progress)
    {
      this.load_progress += 1; // Adjust the speed by changing the increment value
      if (this.load_progress >= 100)
      {
        this.load_progress = 0; // Reset for next reload cycle
        //this.load_chamber = false; // End load state
      }
    }

    this.draw(c, mouse)
  }
}
  