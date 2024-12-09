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
  }

  draw(c)
  {
    c.save()
    c.translate(this.position.x - this.position_offset.x , this.position.y - this.position_offset.y) // Center turret at tank's position
    c.rotate(this.rotation) // Rotate the turret to face a direction
    c.drawImage(this.image, -this.rotation_offset, -this.height / 2, this.width, this.height)
    c.restore()
  }

  // Update the turret's state
  update(c, position, mouse)
  {
    this.position = position // Keep turret's position
    
    // Calculate the angle to the mouse position
    const angleToMouse = Math.atan2(mouse.y - (position.y + 10), mouse.x - (position.x + 10))
    this.rotation = angleToMouse // Update turret rotation based on position
    this.draw(c) // Draw the turret after updating
  }
}