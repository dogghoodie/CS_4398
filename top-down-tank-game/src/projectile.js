export class Projectile
{
    constructor({position, velocity, rotation, width, height, rotation_offset, position_offset, image_source})
    {
        this.position = position
        this.velocity = velocity
        this.rotation = rotation
        this.width = width
        this.height = height
        this.rotation_offset = rotation_offset
        this.position_offset = position_offset
        this.image = new Image()
        this.image.src = image_source
    }

    draw(c)
    {
        /*
        c.fillStyle = 'lime';
        c.fillRect(this.position.x, this.position.y, 20, 20); // Draw the lime square (player)
        */
        c.save()
        c.translate(this.position.x - this.position_offset.x, this.position.y - this.position_offset.y)
        c.rotate(this.rotation)
        c.drawImage(this.image, -this.rotation_offset, -this.height/2, this.width , this.height)
        c.restore()
    }

    update(c)
    {
        this.draw(c)        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}