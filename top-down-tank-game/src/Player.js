import { Tank } from "./tank"
import { Turret } from "./turret"

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
    }

}
