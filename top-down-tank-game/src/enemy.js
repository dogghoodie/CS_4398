import { Tank } from "./tank";

export class Enemy extends Tank
{
    constructor({ position, velocity })
    {
        super({
            position,
            velocity,
            rotation: Math.floor(Math.random() * 359), //generates a number between 0-359
            width: 125,
            height: 125,
            image_source: './enemy.png'
        })
    }
}