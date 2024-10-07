import { useState, useEffect, useRef } from 'react';
import { Player } from './player'; // Import the Player class

function App() {
  const canvasRef = useRef(null);

  const [position, setPosition] = useState({ x: 50, y: 50 }); // State to track player position
  const playerSize = 50;
  let playerInstance = null; // Declare player instance outside state

  // Update position based on keypress
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
          newPosition.y = Math.min(newPosition.y + step, canvasHeight - playerSize);
          break;
        case 'ArrowLeft':
        case 'a':
          newPosition.x = Math.max(newPosition.x - step, 0);
          break;
        case 'ArrowRight':
        case 'd':
          newPosition.x = Math.min(newPosition.x + step, canvasWidth - playerSize);
          break;
        default:
          break;
      }

      return newPosition; // Return updated position
    });
  };

  useEffect(() =>
  {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    playerInstance = new Player(position.x, position.y, playerSize);

    // Add event listener for keydown
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // This effect only runs once to attach key listeners

  useEffect(() =>
  {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw background
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Update player position and draw
    playerInstance = new Player(position.x, position.y, playerSize);
    playerInstance.draw(context);

  }, [position]); // This effect re-runs when the position changes

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
