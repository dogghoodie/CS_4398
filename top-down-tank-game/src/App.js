import React, { useRef } from 'react';
import './App.css';

function App() {
  const canvasRef = useRef(null); // Referencing cnavas directlyt

  return (
    <div className="App">
      <h1 style={{ color: '#6272a4' }}>Game Hud</h1>
      <canvas
        id="gameBackground"
        width="1600"
        height="1000"
        style={{ backgroundColor: 'black' }}
        ref={canvasRef}
      >
      </canvas>
    </div>
  );
}

export default App;
