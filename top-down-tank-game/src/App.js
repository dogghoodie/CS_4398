import React, { useRef, useEffect, useState } from 'react';
import { Player } from './Player'; //import from Player.js
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const [player, setPlayer] = useState(null); // Create a player object

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const playerInstance = new Player(50, 50, 50, 50, canvas.width, canvas.height); // Initialize player

    setPlayer(playerInstance); // Store player instance in state

    const handleKeyDown = (event) => {
      playerInstance.move(event.key);
      setPlayer({ ...playerInstance }); // Force a re-render
    };

    // Listener for key events
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw player if it's available
    if (player) {
      player.draw(context);
    }
  }, [player]);

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