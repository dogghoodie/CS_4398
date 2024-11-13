import React, { useRef, useEffect } from 'react';
import { Player } from './player.js';
import { Turret } from './turret.js';
import { Reticle } from './reticle.js';
import { Projectile } from './projectile.js';
import { Reload } from './reload.js';

const App = () => {
  const canvasRef = useRef(null); // Create a reference to the canvas
  let mouse = { x: 0, y: 0 }; // Track mouse position without re-rendering

  // Define turret offset
  const turretOffset = { x: 50, y: 0 }; // 50px to the right of the player

  // Lock flag for shooting
  let canShoot = true
  let reloadStage = 0 // 0: not reloading, 1: open chamber, 2: load chamber

  useEffect(() => {
    const canvas = canvasRef.current
    const c = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    //=======================
    // OBJECT DECLARATION
    //=======================
    const player = new Player({
      position: { x: canvas.width / 2 - 50, y: canvas.height / 2 - 50 },
      velocity: { x: 0, y: 0 },
    })

    const turret = new Turret({
      position: {
        x: player.position.x + turretOffset.x,  // 50px to the right of the player
        y: player.position.y + turretOffset.y,  // same vertical position as player
      },
    });

    const reticle = new Reticle({
      position: {
        x: mouse.x,
        y: mouse.y,
      }
    })

    const reload = new Reload({
      position: {
        x: mouse.x,
        y: mouse.y,
      }
    })

    const keys = {
      w: { pressed: false },
      s: { pressed: false },
      a: { pressed: false },
      d: { pressed: false },
      space: { pressed: false },
    }

    // Handle mouse position globally
    const handleMouseMove = (event) => {
      mouse = {
        x: event.clientX,
        y: event.clientY,
      }
    }


    //=======================
    // LISTENERS
    //=======================
    window.addEventListener('mousemove', handleMouseMove)    

    const SPEED = 2.0
    const ROTATIONAL_SPEED = 0.03
    const FRICTION = 0.01
    const PROJECTILE_SPEED = 250
    const projectiles = []


    //=======================
    // GAME LOOP
    //=======================
    function animate()
    {
      window.requestAnimationFrame(animate);

      // Clear the canvas on each frame to avoid drawing over the previous frames
      c.clearRect(0, 0, canvas.width, canvas.height)

      // Object Animations
      player.update(c)
      turret.update(c, player.position, mouse)
      reticle.update(c, mouse)
      reload.update(c, mouse)

      for (let i = projectiles.length - 1; i >= 0; i--) {
        const projectile = projectiles[i]
        projectile.update(c)

        // Remove projectiles that are off-screen
        if (projectile.position.x + 10 < 0 || projectile.position.x - 10 > canvas.width ||
            projectile.position.y + 10 < 0 || projectile.position.y - 10 > canvas.height)
        {
          projectiles.splice(i, 1)
        }
      }

      // Handle movement based on key presses
      player.velocity.x = 0
      player.velocity.y = 0


      //=======================
      // USER INPUT
      //=======================
      if (keys.w.pressed)
      {
        player.velocity.x = Math.cos(player.rotation) * SPEED
        player.velocity.y = Math.sin(player.rotation) * SPEED
      }
      
      else if (!keys.w.pressed)
      {
        player.velocity.x *= FRICTION
        player.velocity.y *= FRICTION
      }

      if (keys.s.pressed)
      {
        player.velocity.x = -Math.cos(player.rotation)
        player.velocity.y = -Math.sin(player.rotation)
      }

      if (keys.d.pressed) player.rotation += ROTATIONAL_SPEED
      if (keys.a.pressed) player.rotation -= ROTATIONAL_SPEED



    if (keys.space.pressed)
    {
      if (reloadStage === 0 && !canShoot)
      {
        // First spacebar press: Open the chamber
        reload.eject_chamber = true
        reloadStage = 1               // Move to the next reload stage
        keys.space.pressed = false
      }
      
      else if (reloadStage === 1)
      {
        // Second spacebar press: Load the chamber
        reload.eject_chamber = true  // Reset eject chamber
        reload.load_chamber = true    
        reload.load_progress = 1    // Start load progress
        reloadStage = 2               // Finalize reload
      }
    }
    
    // After loading is complete, reset the reload state
    if (reload.load_chamber && reload.load_progress >= 100)
    {
        reload.load_chamber = false  // Complete reload
        canShoot = true              // Allow shooting again
        reloadStage = 0              // Reset reload stage
    }
    
    };

    animate();

    //=======================
    // KEY EVENT LISTNERS
    //=======================
    window.addEventListener('keydown', (event) => {
      switch (event.code)
      {
        case 'KeyW': keys.w.pressed = true; break
        case 'KeyS': keys.s.pressed = true; break
        case 'KeyA': keys.a.pressed = true; break
        case 'KeyD': keys.d.pressed = true; break
        case 'Space' : keys.space.pressed = true; break
        default: break
      }
    });

    window.addEventListener('keyup', (event) => {
      switch (event.code)
      {
        case 'KeyW': keys.w.pressed = false; break
        case 'KeyS': keys.s.pressed = false; break
        case 'KeyA': keys.a.pressed = false; break
        case 'KeyD': keys.d.pressed = false; break
        case 'Space' : keys.space.pressed = false; break
        default: break
      }
    });

    window.addEventListener('mousedown', (event) => {
      if (event.button === 0 && canShoot) // Left mouse button clicked and can shoot
      {
        // Fire a projectile if allowed to shoot
        projectiles.push(
          new Projectile({
            position: {
              x: turret.position.x + Math.cos(turret.rotation) * 1,
              y: turret.position.y + Math.sin(turret.rotation) * 1,
            },
            
            velocity: {
              x: Math.cos(turret.rotation) * PROJECTILE_SPEED,
              y: Math.sin(turret.rotation) * PROJECTILE_SPEED,
            }
          })
        )

        // Lock shooting until the condition is met (e.g., projectile leaves the screen)
        canShoot = false
      }
    });

    // Cleanup mouse event listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [])

  return <canvas ref={canvasRef} />;

}

export default App;