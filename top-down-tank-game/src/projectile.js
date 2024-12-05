export class Projectile
{
    constructor({position, velocity})
    {
        this.position = position
        this.velocity = velocity
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
    }
}