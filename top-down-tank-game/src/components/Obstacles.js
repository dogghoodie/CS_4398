// classes for all of the obstacles in the game

// first test obstacle class
export class Obstacle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // draw the obstacle on the screen according to size
  // set in App.js
  draw(context) {
    context.fillStyle = '#ffb86c';
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
