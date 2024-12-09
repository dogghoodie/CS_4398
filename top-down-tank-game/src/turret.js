import { Projectile } from "./projectile"

export class Turret
{
    constructor({ position, image_source, rotation_offset, position_offset })
    {
      this.position = position // {x, y}
      this.rotation = 0 // Turret's rotation

      // Load the image
      this.image = new Image()
      this.image.src = image_source //'./player_turret.png'
      this.width = 194 / 2  // Set image width
      this.height = 76 / 2 // Set image height

      this.rotation_offset = rotation_offset
      this.position_offset = position_offset

      //this.projectile = new Projectile[]
    }
  
    draw(c)
    {
      c.save()
      c.translate(this.position.x - this.position_offset.x , this.position.y - this.position_offset.y) // Center turret at player's position
      c.rotate(this.rotation) // Rotate the turret to face the mouse (independently of player)
      c.drawImage(this.image, -this.rotation_offset, -this.height / 2, this.width, this.height) //offset rotation on image by 20px
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

    /*
    update(c, position, player_position)
    {
      this.position = position
      const angleToPlayer = Math.atan2(player_position.y - (player_position.y + 10), player_position.x - (player_position.x + 10))
      this.rotation = angleToPlayer
      this.draw(c)
    }
    */
}