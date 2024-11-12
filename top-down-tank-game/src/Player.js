export class Player
{
    constructor({ position, velocity })
    {
        this.position = position
        this.velocity = velocity
        this.rotation = 0
        this.image = new Image()
        this.image.src = './player.png'  // Reference relative to the public folder

        this.width = 125
        this.height = 125
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
