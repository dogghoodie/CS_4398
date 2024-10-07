import React, { useState, useEffect, useRef } from 'react';
import { Player } from './player'; // Import the Player class
import './App.css';

function App()
{
  const canvasRef = useRef(null); // Reference the canvas element
  const [player] = useState(new Player(400, 400, 30, 60));

  const draw = (context) =>
  {
    context.clearRect(0,0, 1600, 1000) //redraw the canvas
    player.draw(context); //then we draw the player
  };

  // Handle keyboard input to move the player
  const handleKeyDown = (event) =>
  {
    if(event.key == 'ArrowUp' || event.key == 'w')
    {
      player.moveForward();
    }

    if(event.key == 'ArrowDown' || event.key == 's')
    {
      player.moveBackward();
    }

    if(event.key == 'ArrowLeft' || event.key == 'a')
    {
      player.turnLeft();
    }

    if(event.key == 'ArrowRight' || event.key == 'd')
    {
      player.turnRight();
    }

    //redraws the canvase after updating the player's position
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    draw(context);
  };

  //Create player instance and update on every render
  useEffect(() =>
  {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    //initial draw
    draw(context);

    // Attach keydown event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup keydown event listener on component unmount
    return () =>
    {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, [player]); // This runs every time the position changes

  return (
    <div className="App">
      <h1 style={{ color: '#6272a4' }}>Game Hud</h1>
      <canvas
        id="gameBackground"
        width="1600"
        height="1000"
        style={{ backgroundColor: 'black' }}
        ref={canvasRef}
      ></canvas>
    </div>
  );
}

export default App;
