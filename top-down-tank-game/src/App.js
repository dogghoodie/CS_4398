import React, { useRef, useEffect, useState } from 'react';
import './App.css';

function App() {
  const canvasRef = useRef(null); // referencing canvas directly
  const [position, setPosition] = useState({ x: 50, y: 50 }); // initial character position
  const characterSize = 50;

  // deal with user input
  const handleKeyDown = (event) => {
    setPosition((prevPosition) => {

      const newPosition = { ...prevPosition };
      const step = 10; // move speed
      const canvasWidth = 1600;
      const canvasHeight = 700;

      // arrows and wasd
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
          newPosition.y = Math.max(newPosition.y - step, 0);
          break;

        case 'ArrowDown':
        case 's':
          newPosition.y = Math.min(newPosition.y + step, canvasHeight - characterSize);
          break;

        case 'ArrowLeft':
        case 'a':
          newPosition.x = Math.max(newPosition.x - step, 0);
          break;

        case 'ArrowRight':
        case 'd':
          newPosition.x = Math.min(newPosition.x + step, canvasWidth - characterSize);
          break;

        default:
          break;
      }

      return newPosition;
    });
  };

  // update canvas when the position changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // redraw backgroundColor
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // add character
    context.fillStyle = '#50fa7b';
    context.fillRect(position.x, position.y, characterSize, characterSize);

    // listener event fo handlekeydown
    window.addEventListener('keydown', handleKeyDown);

    // cleanup event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position]); // re-run on position change

  return (
    <div className="App">
      <h1 style={{ color: '#6272a4' }}>Game Hud</h1>
      <canvas
        id="gameBackground"
        width="1600"
        height="700"
        style={{ backgroundColor: 'black' }}
        ref={canvasRef}
      >
      </canvas>
    </div>
  );
}

export default App;
