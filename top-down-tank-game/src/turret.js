export class Turret
{
    constructor({ position })
    {
      this.position = position // {x, y}
      this.rotation = 0 // Turret's rotation

    // Load the image
    this.image = new Image()
    this.image.src = './player_turret.png'
    this.width = 194 / 2  // Set image width
    this.height = 76 / 2 // Set image height
    }
  
    draw(c)
    {
      c.save()
      c.translate(this.position.x , this.position.y) // Center turret at player's position
      c.rotate(this.rotation) // Rotate the turret to face the mouse (independently of player)
      c.drawImage(this.image, -20, -this.height / 2, this.width, this.height) //offset rotation on image by 20px
      c.restore()
    }
  
    // Update the turret's state
    update(c, position, mouse)
    {
      this.position = position // Keep turret's position in sync with player
      
      // Calculate the angle to the mouse position
      const angleToMouse = Math.atan2(mouse.y - (position.y + 10), mouse.x - (position.x + 10))
      this.rotation = angleToMouse // Update turret rotation based on mouse position
      this.draw(c) // Draw the turret after updating
    }
}  