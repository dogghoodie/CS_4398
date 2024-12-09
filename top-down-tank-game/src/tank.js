export class Tank
{
    constructor({ position, velocity, rotation, width, height, image_source})
    {
        this.position = position
        this.velocity = velocity
        this.rotation = rotation
        this.width = width
        this.height = height

        this.image = new Image()
        this.image.src = image_source  // Reference relative to the public folder
    }

    draw(c)
    {   
        c.save()
        c.translate(this.position.x, this.position.y)
        c.rotate(this.rotation)
        c.drawImage(this.image, -30, -this.height / 2, this.width , this.height)
        c.restore()
    }

    update(c)
    {
        this.draw(c)
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}
