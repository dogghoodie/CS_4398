export class Player
{
    constructor(x, y, image_height, image_width)
    {
      this.x = x;
      this.y = y;
      this.image_height = image_height;
      this.image_width = image_width;
      this.angle = 0; //add player angle
      this.angle_speed = 5; //add angle speed
    }
  
    //draw the player on the canvas
    draw(context)
    {
      context.fillStyle = '#50fa7b';
      context.fillRect(this.x, this.y, this.image_height, this.image_width);
      //figure out how to put our x and y at the "center"
      //figure out how to rotate?
      //once figure out how we translate the image
    }
    
    //move the character forward
    moveForward()
    {

    }
    
    //move the character backward
    moveBackward()
    {

    }

    //change the angle left
    turnLeft()
    {

    }

    //change the angle right
    turnRight()
    {

    }

    //wont be necessary when the above functions are complete
    //update the player's position
    setPosition(x, y)
    {
        this.x = x;
        this.y = y;
    }
  }
  