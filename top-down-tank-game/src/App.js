import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 style={{ color: '#6272a4' }}>Game Hud</h1>
      <canvas
        id="gameBackground"
        width="1600"
        height="1000"
        style={{ backgroundColor: 'black' }}>
      </canvas>
    </div>
  );
}

export default App;
