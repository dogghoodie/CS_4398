export class Projectile
{
    constructor({position, velocity, image_source})
    {
        this.position = position
        this.velocity = velocity
        
        this.image = new Image()
        this.image.src = image_source
    }

    draw(c)
    {
        c.fillStyle = 'lime';
        c.fillRect(this.position.x, this.position.y, 20, 20); // Draw the lime square (player)
    }

    update(c)
    {
        this.draw(c)        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        /*
        // Remove projectiles that are off-screen
        if (this.position.x + 10 < 0 ||
            this.position.x - 10 > c.canvas.width ||
            this.position.y + 10 < 0 ||
            this.position.y - 10 > c.canvas.height)
        {
            this.splice(i, 1)
        }
        */

    }
}