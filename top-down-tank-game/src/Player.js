export class Player {
    constructor(x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
    }
  
    draw(context) {
      context.fillStyle = '#50fa7b';
      context.fillRect(this.x, this.y, this.size, this.size);
    }
  }
  