export class Player
{
    constructor(x, y, image_height, image_width)
    {
      this.x = x;
      this.y = y;
      this.image_height = image_height;
      this.image_width = image_width;
      this.forward_speed = 5; //speed to move foward
      this.backward_speed = 2; //speed to move backward
      this.angle = 0; //player angle
      this.angle_speed = 5; //angle speed
    }
  
    //draw the player on the canvas
    draw(context)
    {
      context.fillStyle = '#50fa7b';
      context.fillRect(this.x, this.y, this.image_height, this.image_width);
      
      //figure out how to put our x and y at the "center"
      //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate
      //this.dimension / 2 for both = center of image
      //x and y for their position
      context.translate(this.image_width/2, this.image_height/2);
      
      //figure out how to rotate?
      //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate
      context.rotate(this.angle * Math.PI / 180); //in radians
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
    //we have to ADD to turn left
    turnLeft()
    {
        this.angle += this.angle_speed;
    }

    //change the angle right
    //we have to MINUS to turn right
    turnRight()
    {
        this.angle -= this.angle_speed;
    }

    //wont be necessary when the above functions are complete
    //update the player's position
    setPosition(x, y)
    {
        this.x = x;
        this.y = y;
    }
  }
  