import React, { useState, useEffect, useRef } from 'react';
import { Player } from './player'; // Import the Player class
import './App.css';

function App() {
  const canvasRef = useRef(null); // Reference the canvas element

  const [position, setPosition] = useState({ x: 50, y: 50 }); // State to track player position
  const playerWidth = 50;
  const playerHeight = 50;

  // Handle keyboard input to move the player
  const handleKeyDown = (event) =>
  {
    setPosition((prevPosition) =>
    {
      const newPosition = { ...prevPosition };
      const step = 10;
      const canvasWidth = 1600;
      const canvasHeight = 1000;

      switch (event.key) {
        case 'ArrowUp':
        case 'w':
          newPosition.y = Math.max(newPosition.y - step, 0);
          break;
        case 'ArrowDown':
        case 's':
          newPosition.y = Math.min(newPosition.y + step, canvasHeight - playerHeight);
          break;
        case 'ArrowLeft':
        case 'a':
          newPosition.x = Math.max(newPosition.x - step, 0);
          break;
        case 'ArrowRight':
        case 'd':
          newPosition.x = Math.min(newPosition.x + step, canvasWidth - playerWidth);
          break;
        default:
          break;
      }

      return newPosition; // Return updated position
    });
  };

  //Create player instance and update on every render
  useEffect(() =>
  {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    //Clears the canvas, prevents "snaking"
    context.clearRect(0, 0, canvas.width, canvas.height);

    //Redraws the background?
    //context.fillStyle = 'black';
    //context.fillRect(0, 0, canvas.width, canvas.height);

    // Create a new player instance and draw at the updated position
    const playerInstance = new Player(position.x, position.y, playerHeight, playerWidth);
    playerInstance.draw(context);

    // Attach keydown event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup keydown event listener on component unmount
    return () =>
    {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position]); // This runs every time the position changes

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
