import { Tank } from "./tank"

export class Player extends Tank
{
    constructor({ position, velocity })
    {
        super({
            position,
            velocity,
            rotation: 45, //generates a number between 0-359,
            width: 125,
            height: 125,
            image_source: './player.png'
        })
    }
}
