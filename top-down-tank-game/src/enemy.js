import { Tank } from "./tank";
import { Turret } from "./turret";

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
            rotation_offset: 29,
            position_offset: {x: -25, y: 0},
        })
    }
}