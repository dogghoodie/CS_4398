import { Tank } from "./tank"
import { Turret } from "./turret"
import { Projectile } from "./projectile"

export class Player extends Tank
{
    constructor({ position, velocity })
    {
        super({
            position,
            velocity,
            rotation: 0, //generates a number between 0-359,
            width: 125,
            height: 125,
            image_source: './player.png'
        })

        //initialize turrent
        this.turret = new Turret ({
            position: { x: position.x, y:position.y },
            image_source: './player_turret.png',
            rotation_offset: 20,
            position_offset: {x: 2, y: 0},
        })

        this.projectile = []
        this.projectile_speed = 100
    }

    update(c, mouse)
    {
        super.update(c) //tank update
        this.turret.update(c, this.position, mouse) //turret update
        
        //projectile update
        for (let i = this.projectile.length - 1; i >= 0; i--)
        {
            this.projectile[i].update(c)
  
            // Remove projectiles that are off-screen
            if (this.projectile[i].position.x + 10 < 0 ||
              this.projectile[i].position.x - 10 > c.canvas.width ||
              this.projectile[i].position.y + 10 < 0 ||
              this.projectile[i].position.y - 10 > c.canvas.height)
            {
                this.projectile.splice(i, 1)
            }
        }
    }

    fire_projectile()
    {
        this.projectile.push(
            new Projectile ({
              position: {
                x: this.turret.position.x + Math.cos(this.turret.rotation) * 1,
                y: this.turret.position.y + Math.sin(this.turret.rotation) * 1,
              },
              
              velocity: {
                x: Math.cos(this.turret.rotation) * this.projectile_speed,
                y: Math.sin(this.turret.rotation) * this.projectile_speed,
              },

              rotation: this.turret.rotation,
              width: 128,
              height: 128,
              rotation_offset: -50,
              position_offset: {x: -5, y: 0},
              image_source: './player_projectile.png',
            })
        )
    }
}
