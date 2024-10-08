export class Player
{
    constructor(x, y, image_height, image_width)
    {
      this.x = x; //player x position on canvas
      this.y = y; //player y position on canvas
      this.angle = 0; //player angle
      this.image_height = image_height; //player's image height & hitbox
      this.image_width = image_width; //player's image width and hitbox
      this.forward_speed = .5; //speed to move foward
      //this.forward_max_speed = 6; //prevents the tank from moving faster than this speed
      this.backward_speed = .2; //speed to move backward
      //this.backward_max_speed = 4; //prevents the tank from moving faster than this speed
      this.currentSpeed = 0;
      this.friction = .1; //adds friction to decay player speed
      this.left_turn_speed = 2; //turn speed left, reduce when left tracks hit
      this.right_turn_speed = 2; //turn speed right, reduce when right tracks hit
      this.currentTurningSpeed = 0;
      this.turning_friction = 1;
    }
    
    draw(context)
    {
        context.save(); // Save the current state of the canvas

        //figure out how to put our x and y at the "center"
        //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate
        //this.dimension / 2 for both = center of image
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
        this.currentSpeed = this.forward_speed;
        this.x += Math.cos((this.angle * Math.PI) / 180) * this.forward_speed;
        this.y += Math.sin((this.angle * Math.PI) / 180) * this.forward_speed;
    }
    
    //move the character backward
    moveBackward()
    {
        this.currentSpeed = this.backward_speed;
        this.x -= Math.cos((this.angle * Math.PI) / 180) * this.backward_speed;
        this.y -= Math.sin((this.angle * Math.PI) / 180) * this.backward_speed;
    }

    //change the angle left
    //we have to MINUS to turn left
    turnLeft()
    {
        this.angle -= this.left_turn_speed;
    }

    //change the angle right
    //we have to ADD to turn right
    turnRight()
    {
        this.angle += this.right_turn_speed;
    }

    applyFriction()
    {
        // Apply friction to slow down the player gradually
        if (this.currentSpeed > 0)
        {
            this.currentSpeed -= this.friction; // Decrease speed if moving forward
            if (this.currentSpeed < 0)
            {
                this.currentSpeed = 0; // Prevent negative speed
            }
        }
        
        else if (this.currentSpeed < 0)
        {
            this.currentSpeed += this.friction; // Decrease speed if moving backward

            if (this.currentSpeed > 0)
            {
                this.currentSpeed = 0; // Prevent positive speed
            }                
        }
    
        // Apply movement based on current speed
        this.x += Math.cos((this.angle * Math.PI) / 180) * this.currentSpeed;
        this.y += Math.sin((this.angle * Math.PI) / 180) * this.currentSpeed;
    }

    applyTurningFriction()
    {
        // Apply friction to slow down the turning gradually
        if (this.currentTurningSpeed !== 0)
        {
            this.currentTurningSpeed -= this.turning_friction * Math.sign(this.currentTurningSpeed); // Decrease turning speed
            
            if (Math.abs(this.currentTurningSpeed) < this.turning_friction)
            {
                this.currentTurningSpeed = 0; // Stop turning if speed is below the friction threshold
            }
        }
    }

    maange_input(keyStates)
    {
        if(keyStates['ArrowUp'] || keyStates['w'])
        {
            this.moveForward();
        }
    
        if(keyStates['ArrowDown'] || keyStates['s'])
        {
            this.moveBackward();
        }
    
        if(keyStates['ArrowLeft'] || keyStates['a'])
        {
            this.turnLeft();
        }
    
        if(keyStates['ArrowRight'] || keyStates['d'])
        {
            this.turnRight();
        }

        this.applyFriction();
        this.applyTurningFriction();
    }
    

  }
  