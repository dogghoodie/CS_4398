import React, { useState, useEffect, useRef } from 'react';
import { Player } from './player'; // Import the Player class
import './App.css';

function App()
{
  const canvasRef = useRef(null); // Reference the canvas element
  const [player] = useState(new Player(400, 400, 30, 60));
  const [keyStates, setKeyStates] = useState({}); // Track key states

  const draw = (context) =>
  {
    context.clearRect(0,0, 1600, 1000) //redraw the canvas
    player.draw(context); //then we draw the player
  };
  
  const handleKeyDown = (event) =>
  {
    setKeyStates((prevState) =>
    ({
      ...prevState,
      [event.key]: true,
    }));
  };

  const handleKeyUp = (event) =>
  {
    setKeyStates((prevState) =>
    ({
      ...prevState,
      [event.key]: false,
    }));
  };

  //Create player instance and update on every render
  useEffect(() =>
  {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const gameLoop = () =>
    {
      //initial draw
      draw(context);

      if(keyStates['ArrowUp'] || keyStates['w'])
      {
        player.moveForward();
      }
  
      if(keyStates['ArrowDown'] || keyStates['s'])
      {
        player.moveBackward();
      }
  
      if(keyStates['ArrowLeft'] || keyStates['a'])
      {
        player.turnLeft();
      }
  
      if(keyStates['ArrowRight'] || keyStates['d'])
      {
        player.turnRight();
      }

      requestAnimationFrame(gameLoop);
    }

    gameLoop();

    // Attach keydown event listener
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Cleanup keydown event listener on component unmount
    return () =>
    {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };

  }, [player, keyStates]); // This runs every time the position changes

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
