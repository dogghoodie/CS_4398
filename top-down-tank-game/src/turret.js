export class Turret
{
  constructor({ position, image_source, rotation_speed, rotation_offset, position_offset })
  {
    this.position = position // {x, y}
    this.rotation = 0 // Turret's rotation

    // Load the image
    this.image = new Image()
    this.image.src = image_source //'./player_turret.png'
    this.width = 194 / 2  // Set image width
    this.height = 76 / 2 // Set image height

    this.rotation_speed = rotation_speed
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
  update(c, position, target)
  {
    this.position = position // Keep turret's position
    
    // Calculate the angle to the mouse position
    const target_rotation = Math.atan2(target.y - (position.y + 10), target.x - (position.x + 10))
    
    //attempt to normalize? the angle difference between -PI and PI
    //dunno how this works exactly
    let angle_difference = target_rotation - this.rotation

    if (angle_difference > Math.PI)
    {
      angle_difference -= this.rotation_speed * Math.PI
    }

    if (angle_difference < -Math.PI)
    {
      angle_difference += this.rotation_speed * Math.PI
    }

    //attempt to clamp? rotation speed?
    if(angle_difference > this.rotation_speed)
    {
      this.rotation += this.rotation_speed
    }

    else if (angle_difference < -this.rotation_speed)
    {
      this.rotation -= this.rotation_speed
    }

    else
    {
      this.rotation = target_rotation
    }
    
    //this.rotation = target_rotation // Update turret rotation based on position
    this.draw(c) // Draw the turret after updating
  }
}