import { Player } from './player'; // Import the Player class
import { Obstacle } from './Obstacles';

export class CollisionChecker {
  constructor(obstacles) {
    this.obstacles = obstacles;
  }

  checkCollision(player) {
    for (const obstacle of this.obstacles) {
      if (
        player.x < obstacle.x + obstacle.width &&
        player.y < obstacle.y + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y + player.height > obstacle.y
      ) {
        return true
      }
    }
    return false
  }
}

