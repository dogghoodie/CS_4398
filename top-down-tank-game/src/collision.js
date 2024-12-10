// src/collision.js

export function projectile_collision(target, projectile) {
    const distance_x = projectile.position.x - target.position.x;
    const distance_y = projectile.position.y - target.position.y;
  
    // Collision check based on bounding boxes
    const x_collision = Math.abs(distance_x) <= (projectile.width / 2 + target.width / 2);
    const y_collision = Math.abs(distance_y) <= (projectile.height / 2 + target.height / 2);
  
    return x_collision && y_collision;
  }
  