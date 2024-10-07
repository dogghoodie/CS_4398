export class Player
{
    constructor(x, y, image_height, image_width)
    {
      this.x = x;
      this.y = y;
      this.image_height = image_height;
      this.image_width = image_width;
    }
  
    //draw the player on the canvas
    draw(context)
    {
      context.fillStyle = '#50fa7b';
      context.fillRect(this.x, this.y, this.image_height, this.image_width);
    }

    //update the player's position
    setPosition(x, y)
    {
        this.x = x;
        this.y = y;
    }
  }
  