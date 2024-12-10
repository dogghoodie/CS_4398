import React, { useRef, useEffect, useState } from 'react';
import { Player } from './player.js';
import { Enemy } from './enemy.js';
import { Reticle } from './reticle.js';
import { Projectile } from './projectile.js';
import { Reload } from './reload.js';
import { gameMusic } from './audio.js';
import { engineSound, tireSound } from './audio.js';
import { fireSound, impactSound, reload0Sound, reload1Sound, reload2Sound } from './audio.js';


const { ipcRenderer } = window.require('electron');

const App = () => {
  const canvasRef = useRef(null); // Create a reference to the canvas
  const [paused, setPaused] = useState(false); // State to track if the game paused

  // Refs to store game objects persistently
  const playerRef = useRef(null);
  const reticleRef = useRef(null);
  const reloadRef = useRef(null);
  const enemyRef = useRef([]);
  const animationIdRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const keysRef = useRef({
    w: { pressed: false },
    s: { pressed: false },
    a: { pressed: false },
    d: { pressed: false },
    space: { pressed: false },
    escape: { pressed: false },
  });

  const pausedRef = useRef(paused);
  const scoreRef = useRef(0);
  const scoreIntervalRef = useRef(null);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);


  useEffect(() => {
    const canvas = canvasRef.current
    const c = canvas.getContext('2d')

    canvas.width = window.innerWidth - 8
    canvas.height = window.innerHeight - 8

    //=======================
    // OBJECT DECLARATION
    //=======================
    playerRef.current = new Player({
      position: { x: canvas.width / 2 - 50, y: canvas.height / 2 - 50 },
      velocity: { x: 0, y: 0 },
    })

    reticleRef.current = new Reticle({
      position: {
        x: mouseRef.current.x,
        y: mouseRef.current.y,
      }
    })

    reloadRef.current = new Reload({
      position: {
        x: mouseRef.current.x,
        y: mouseRef.current.y,
      }
    })

    const number_of_enemies = 3
    enemyRef.current = []
    for (let i = 0; i < number_of_enemies; i++) {
      const rand_x = Math.random() * canvas.width
      const rand_y = Math.random() * canvas.height

      enemyRef.current.push(
        new Enemy({
          position: { x: rand_x, y: rand_y },
          velocity: { x: 0, y: 0 },
        })
      )
    }

    //=======================
    // LISTENERS
    //=======================
    const handleMouseMove = (event) => {
      if (pausedRef.current) return;
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY,
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    const SPEED = 2.0
    const ROTATIONAL_SPEED = 0.03
    const FRICTION = 0.01

    //=======================
    // GAME LOOP
    //=======================
    let animationId;

    function projectile_collision(target, projectile) {
      const distance_x = projectile.position.x - target.position.x
      const distance_y = projectile.position.y - target.position.y

      // Collision check
      const x_collision = Math.abs(distance_x) <= (projectile.width / 2 + target.width / 2)
      const y_collision = Math.abs(distance_y) <= (projectile.height / 2 + target.height / 2)

      if (x_collision && y_collision) {
        return true
      }

      return false
    }

    const animate = () => {
      animationIdRef.current = window.requestAnimationFrame(animate);

      if (paused) {
        // If the game is paused, do not update the game state
        return;
      }

      // Clear the canvas on each frame to avoid drawing over the previous frames
      c.clearRect(0, 0, canvas.width, canvas.height)

      //=======================
      // Object Animations
      //=======================


      // Player Management
      playerRef.current.update(c, mouseRef.current)

      // GUI Management
      reticleRef.current.update(c, mouseRef.current)
      reloadRef.current.update(c, mouseRef.current)


      // Enemy Management
      for (let i = enemyRef.current.length - 1; i >= 0; i--) {
        const enemy = enemyRef.current[i]
        enemy.update(c, playerRef.current.position)

        for (let j = playerRef.current.projectile.length - 1; j >= 0; j--) {
          const projectile = playerRef.current.projectile[j]

          if (projectile_collision(enemy, projectile)) {
            impactSound.play();
            enemyRef.current.splice(i, 1)
            playerRef.current.projectile.splice(j, 1)
            scoreRef.current += 100
          }
        }
      }

      //=======================
      // USER INPUT
      //=======================

      // Handle movement based on key presses
      const keys = keysRef.current;
      playerRef.current.velocity.x = 0
      playerRef.current.velocity.y = 0


      //=======================
      // USER INPUT
      //=======================
      if (keys.w.pressed) {

        playerRef.current.velocity.x = Math.cos(playerRef.current.rotation) * SPEED
        playerRef.current.velocity.y = Math.sin(playerRef.current.rotation) * SPEED
      }
      else {
        playerRef.current.velocity.x *= FRICTION
        playerRef.current.velocity.y *= FRICTION
      }

      if (keys.s.pressed) {
        playerRef.current.velocity.x = -Math.cos(playerRef.current.rotation)
        playerRef.current.velocity.y = -Math.sin(playerRef.current.rotation)
      }

      if (keys.d.pressed) playerRef.current.rotation += ROTATIONAL_SPEED
      if (keys.a.pressed) playerRef.current.rotation -= ROTATIONAL_SPEED

      if (keys.space.pressed) {
        if (reloadRef.current.reloadStage === 0) {
          // First spacebar press: Open the chamber
          reload0Sound.play();
          reloadRef.current.load_progress = 1     // Start reload progress bar
          reloadRef.current.reloadStage = 1       // Change from 0-empty to 1-loading
          keys.space.pressed = false              // Stop from holding space bar
        }

        else if (reloadRef.current.reloadStage === 1) {
          reload1Sound.play();
          reloadRef.current.reloadStage = 2        // Change from 1-loading to 2-loaded
          reload2Sound.play();
          keys.space.pressed = false    // Stop from holding space bar
        }
      }

      //=======================
      // DRAW SCORE ON CANVAS
      //=======================
      c.font = '48px Arial';
      c.textBaseline = 'top';

      c.fillStyle = 'white';
      const scoreText = 'Score: ';
      c.fillText(scoreText, 20, 20);

      // Measure the width of "Score: " to position the score number
      const textWidth = c.measureText(scoreText).width;
      c.fillStyle = 'lime';
      c.fillText(scoreRef.current.toString(), 20 + textWidth, 20);
    };

    animate();

    //=======================
    // KEY EVENT LISTNERS
    //=======================
    const handleKeyDown = (event) => {
      if (event.code === 'Escape') {
        togglePause();
        return;
      }
      if (pausedRef.current) return;              // Ignore other keys when paused
      const keys = keysRef.current;
      switch (event.code) {
        case 'KeyW': keys.w.pressed = true; break;
        case 'KeyS': keys.s.pressed = true; break;
        case 'KeyA': keys.a.pressed = true; break;
        case 'KeyD': keys.d.pressed = true; break;
        case 'Space': keys.space.pressed = true; break;
        default: break;
      }
    };

    const handleKeyUp = (event) => {
      if (event.code === 'Escape') return;
      if (pausedRef.current) return;              // Ignore other keys when paused
      const keys = keysRef.current;
      switch (event.code) {
        case 'KeyW': keys.w.pressed = false; break;
        case 'KeyS': keys.s.pressed = false; break;
        case 'KeyA': keys.a.pressed = false; break;
        case 'KeyD': keys.d.pressed = false; break;
        case 'Space': keys.space.pressed = false; break;
        default: break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const handleMouseDown = (event) => {
      if (pausedRef.current) return;
      if (reloadRef.current.canShoot)             // Left mouse button clicked and can shoot
      {
        playerRef.current.fire_projectile()
        fireSound.play();
        // Fire a projectile if allowed to shoot
        scoreRef.current += 10; // 10 points

        // Lock shooting until the condition is met (e.g., projectile leaves the screen)
        reloadRef.current.canShoot = false
        reloadRef.current.reloadStage = 0
      }
    };

    window.addEventListener('mousedown', handleMouseDown);

    // Listen for IPC messages to toggle pause
    ipcRenderer.on('toggle-pause', () => {
      togglePause();
    });

    // Function to toggle pause state
    const togglePause = () => {
      setPaused((prevPaused) => !prevPaused);

      if (!pausedRef.current) {
        // If pausing, reset keys
        const keys = keysRef.current;
        keys.w.pressed = false;
        keys.s.pressed = false;
        keys.a.pressed = false;
        keys.d.pressed = false;
        keys.space.pressed = false;
      }
    };

    // Cleanup event listeners and cancel animation frame
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      ipcRenderer.removeAllListeners('toggle-pause');
      window.cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  // Game music settings.
  // This can probably be moved somewhere better place ? idk
  useEffect(() => {
    gameMusic.play();
    gameMusic.loop(true);
    gameMusic.volume(0.3);

    return () => {
      gameMusic.stop();
    };
  }, []);


  // This controls the engine sound for the tank.
  // This can probably be moved somewhere better as well but
  // I'm leaving it here for now.
  useEffect(() => {
    // Start playing the engine sound when the game starts
    engineSound.play();

    const updateEngineSound = () => {
      const speed = Math.sqrt(
        playerRef.current.velocity.x ** 2 + playerRef.current.velocity.y ** 2
      );

      const maxSpeed = 2.0;
      const normalizedVolume = Math.min(speed / maxSpeed, 1); // Normalize speed to a 0-1 range

      const minVolume = 0.1;
      const maxVolume = 0.3;
      const scalingFactor = 0.2; // Adjust this value for slower scaling 0.1-1
      const finalVolume = minVolume + (Math.pow(normalizedVolume, scalingFactor) * (maxVolume - minVolume));

      console.log('Speed:', speed, 'Final Volume:', finalVolume);
      engineSound.volume(finalVolume);
    };

    // Attach update function to the animation frame loop
    const animateEngineSound = () => {
      updateEngineSound();
      requestAnimationFrame(animateEngineSound);
    };
    animateEngineSound();

    // Stop the engine sound when the game ends or unmount
    return () => {
      engineSound.stop();
    };
  }, []);

  // Handle pause/unpause by stopping/resuming the game loop
  useEffect(() => {
    if (paused) {
      // Additional logic if needed when the game is paused
      // For example, you might want to show a pause menu or overlay
    } else {
      // Resume the game loop if needed
      // However, since the game loop checks the 'paused' state,
      // it will automatically resume updating when 'paused' is false
    }
  }, [paused]);

  const returnToMainMenu = () => {
    ipcRenderer.send('navigate-to', 'menu');
  };

  // paused game menu
  return (
    <div style={{ position: 'relative' }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
      {paused && (
        <div style={styles.overlay}>
          <div style={styles.pauseText}>Game Paused</div>
          <button style={styles.button} onClick={() => setPaused(false)}>Resume Game</button>
          <button style={styles.button} onClick={returnToMainMenu}>Main Menu</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  pauseText: {
    color: 'white',
    fontSize: '48px',
    marginBottom: '20px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '24px',
    backgroundColor: '#50fa7b',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    margin: '10px',
  },
};

export default App;
