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
      this.left_turn_speed = 5; //turn speed left, reduce when left tracks hit
      this.right_turn_speed = 5; //turn speed right, reduce when right tracks hit
      
      this.angle_speed = 5; //angle speed
    }
  
    /*
    //draw the player on the canvas
    draw(context)
    {
        context.fillStyle = '#50fa7b';
        context.fillRect(this.x, this.y, this.image_width, this.image_height); // Directly draw without rotation
    }
    */
    
    
    
    draw(context)
    {
        context.save(); // Save the current state of the canvas

        //figure out how to put our x and y at the "center"
        //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate
        //this.dimension / 2 for both = center of image
        //x and y for their position
        // Move the canvas' origin to the center of the player
        context.translate(this.x + this.image_width / 2, this.y + this.image_height / 2);

        //figure out how to rotate?
        //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate
        context.rotate((this.angle * Math.PI) / 180); //in radians

        context.fillStyle = '#50fa7b';       
        
        //once figure out how we translate the image
        context.fillRect(-this.image_width / 2, -this.image_height / 2, this.image_width, this.image_height);

        context.restore(); // Restore the canvas state
    }
    

    //move the character forward
    moveForward()
    {
        this.x += Math.cos((this.angle * Math.PI) / 180) * this.forward_speed;
        this.y += Math.sin((this.angle * Math.PI) / 180) * this.forward_speed;
    }
    
    //move the character backward
    moveBackward()
    {
        this.x -= Math.cos((this.angle * Math.PI) / 180) * this.backward_speed;
        this.y -= Math.sin((this.angle * Math.PI) / 180) * this.backward_speed;
    }

    //change the angle left
    //we have to ADD to turn left
    turnLeft()
    {
        this.angle += this.left_turn_speed;
    }

    //change the angle right
    //we have to MINUS to turn right
    turnRight()
    {
        this.angle -= this.right_turn_speed;
    }
  }
  