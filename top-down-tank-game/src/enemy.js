import { Tank } from "./tank"
import { Turret } from "./turret"
import { Projectile } from "./projectile"

export class Enemy extends Tank
{
    constructor({ position, velocity })
    {
        super({
            position,
            velocity,
            //rotation: Math.floor(Math.random() * 359), //generates a number between 0-359
            rotation: 0, //generates a number between 0-359
            width: 125,
            height: 125,
            image_source: './enemy.png'
        })

        this.turret = new Turret ({
            position: { x: position.x, y: position.y },
            image_source: 'enemy_turret.png',
            rotation_speed: .009,
            rotation_offset: 29,
            position_offset: {x: -25, y: 0},
        })

        this.projectile = []
        this.projectile_speed = 50

        this.distance_traveled = 0
        this.milestone = 300


    }

    update(c, target)
    {
        super.update(c)
        
        // create a pseudo AI for aiming
        // generate 2 random numbers for the target offset
        const rand_x = Math.floor(Math.random() * 101) - 100 
        const rand_y = Math.floor(Math.random() * 101) - 100

        this.turret.update(c, this.position, {x: target.x + rand_x, y: target.y + rand_y})


        const SEARCH_DISTANCE = 200;
        const SPEED = 0.875;
        const ROTATIONAL_SPEED = 0.04;
        const FIRE_RANGE = 250;
        const ALIGNMENT_THRESHOLD = 0.1;
    
        const distance_x = target.x - this.position.x;
        const distance_y = target.y - this.position.y;
        const distance = Math.sqrt(distance_x * distance_x + distance_y * distance_y);
    
        if (distance > SEARCH_DISTANCE)
        {
            const target_rotation = Math.atan2(distance_y, distance_x);
            const rotation_difference = target_rotation - this.rotation;
            this.rotation += Math.sign(rotation_difference) * ROTATIONAL_SPEED;
    
            this.velocity.x = Math.cos(this.rotation) * SPEED;
            this.velocity.y = Math.sin(this.rotation) * SPEED;
        }
        
        else
        {
            this.velocity.x = Math.cos(this.rotation) * SPEED;
            this.velocity.y = Math.sin(this.rotation) * SPEED;
        }
    
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        if (distance <= FIRE_RANGE) {
            const turret_to_player = Math.atan2(distance_y, distance_x)
            const aligned = Math.abs(this.turret.rotation - turret_to_player)
    
            const normalized_alignment = Math.min(aligned, Math.abs(2 * Math.PI - aligned))
    
            if (this.fireCooldown <= 0 && normalized_alignment <= ALIGNMENT_THRESHOLD)
            {
                console.log("Firing at player!");
                this.fire_projectile();
                this.fireCooldown = 30; // Example cooldown
            }
            else
            {
                this.fireCooldown--;
            }
        }





        //projectile update
        for(let i = this.projectile.length - 1; i >= 0; i++)
        {
            this.projectile[i].update(c)

            //Remove projectiles that are off-screen
            if (this.projectile[i].position.x + 10 < 0 ||
                this.projectile[i].position.x - 10 > c.canvas.width ||
                this.projectile[i].position.y + 10 < 0 ||
                this.projectile[i].position.y - 10 > c.canvas.height)
            {
                this.projectile.splice(i,1)
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
                position_offset: {x: 0, y: 0},
                image_source: './enemy_projectile.png',
            })
        )
    }

    search_routine(target)
    {

    }
}