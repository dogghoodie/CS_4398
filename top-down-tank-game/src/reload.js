export class Reload
{
  constructor({position})
  {
    this.position = position
    this.load_progress = 0
    this.reloadStage = 0 // 0: not reloading, 1: open chamber, 2: loading chamber
    this.canShoot = true
  }

  draw(c, mouse)
  {
    //red bar near reticle
    c.save()

    //draws a red bar when you eject the gun
    if(this.reloadStage === 1 || this.reloadStage === 2)
      {
        c.fillStyle = 'red'
        c.fillRect(mouse.x + 30, mouse.y - 20, 70, 20)
        //c.fillRect(20, 500, 50, 50)       // Gun Loading Animation
      }
        
    //draw a green bar loading up over the red bar
    if(this.reloadStage === 2)
    {
      c.fillStyle = 'green'
      const green_width = (this.load_progress / 100) * 70    // Scale green bar width
      c.fillRect(mouse.x + 30, mouse.y - 20, green_width, 20) //draws bar based on green_width
      //c.fillRect(70, 500, 50, 50)         // Gun Loading Animation
    }
      
    c.restore()
  }

  update(c, mouse)
  {
    if (this.load_progress)
    {
      this.load_progress += 1             // Adjust the speed by changing the increment value
      if (this.load_progress >= 100)
      {
        this.canShoot = true
        this.load_progress = 0            // Reset for next reload cycle
        //this.load_chamber = false         // End load state
        //this.eject_chamber = false        // Chamber is closed
      }
    }

    this.draw(c, mouse)
  }
}
  