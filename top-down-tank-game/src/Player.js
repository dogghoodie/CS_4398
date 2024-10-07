export class Player
{
    constructor(x, y, image_height, image_width, canvasHeight, canvasWidth)
    {
        this.x = x;                         //this is the player's x position on the canvas
        this.y = y;                         //this is the player's y position on the canvas
        this.image_height = image_height;   //this is the player's hitbox height & image height
        this.image_width = image_width;     //this is the player's hitbox width & image width
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;
        this.step = 10;                     //this is the player's speed
    }

    move(key) //moving the player around
    {
        // arrows and wasd
        switch (key)
        {
            case 'ArrowUp':
            case 'w':
                this.y = Math.max(this.y - this.step, 0); 
                break;

            case 'ArrowDown':
            case 's':
                this.y = Math.min(this.y + this.step, this.canvasHeight - this.image_height);
                break;

            case 'ArrowLeft':
            case 'a':
                this.x = Math.max(this.x - this.step, 0);
                break;

            case 'ArrowRight':
            case 'd':
                this.x = Math.min(this.x + this.step, this.canvasWidth - this.image_width);
                break;

            default:
                break;
        }
    }

    draw(context)
    {
        context.fillStyle = '#50fa7b';
        context.fillRect(this.x, this.y, this.image_height, this.image_width);
    }
}