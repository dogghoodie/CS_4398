export class Reload
{
  constructor({position})
  {
    this.position = position
    this.load_progress = 0
    this.reloadStage = 3 // 0: empty, 1: loading, 2: loaded
    this.canShoot = true
  }

  draw(c, mouse)
  {
    //red bar near reticle
    c.save()

    if(this.reloadStage === 1 || this.reloadStage === 2)
      {
        c.fillStyle = 'yellow'
        c.fillRect(mouse.x + 30, mouse.y - 16, 70, 12)

        // Gun Loading Animation
        c.fillStyle = 'black'
        const black_width = (this.load_progress / 100) * 70    // Scale black bar width
        c.fillRect(mouse.x + 30, mouse.y+4, black_width, 8) // draws bar based on black_width
      }
    if(this.reloadStage === 2)
      {
        c.fillStyle = 'green'
        c.fillRect(mouse.x + 30, mouse.y - 16, 70, 12)
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
        this.load_progress = 0 
        if (this.reloadStage === 2) this.canShoot = true
        else this.reloadStage = 0
                  
        //this.load_chamber = false         // End load state
        //this.eject_chamber = false        // Chamber is closed
      }
      else this.draw(c, mouse)
    } else if(this.reloadStage === 0)
      { 
        c.fillStyle = 'red'
        c.fillRect(mouse.x + 30, mouse.y - 16, 70, 12)
      }
  }
}