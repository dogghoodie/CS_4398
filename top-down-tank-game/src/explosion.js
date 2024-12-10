
const explosionFramePaths = [
  './images/Explosion_A.png',
  './images/Explosion_B.png',
  './images/Explosion_C.png',
  './images/Explosion_D.png',
  './images/Explosion_E.png',
  './images/Explosion_F.png',
  './images/Explosion_G.png',
  './images/Explosion_H.png',
];


const explosionFrames = explosionFramePaths.map((path) => {
  const img = new Image();
  img.src = path;
  return img;
});

export class Explosion {
  constructor({ position }) {
    this.position = position; // Position of the explosion
    this.frames = explosionFrames; // Array of preloaded frames
    this.frameIndex = 0; // Current frame index
    this.finished = false; // Whether the animation is complete
    this.frameInterval = 2; // Frames to display each image
    this.frameCounter = 0; // Internal counter
  }

  update(c) {
    if (this.finished) return; // Skip if animation is complete

    // Draw the current frame
    const currentFrame = this.frames[this.frameIndex];
    c.drawImage(
      currentFrame,
      this.position.x, // Position relative to canvas
      this.position.y,
      100, // Width of the explosion
      100  // Height of the explosion
    );

    // Handle animation timing
    this.frameCounter++;
    if (this.frameCounter >= this.frameInterval) {
      this.frameCounter = 0;
      this.frameIndex++;

      // Check if animation is complete
      if (this.frameIndex >= this.frames.length) {
        this.finished = true;
      }
    }
  }
}

