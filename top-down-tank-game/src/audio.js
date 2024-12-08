import { Howl } from 'howler';

// If you're reading this, you can
// implement any of these sounds with NAME.play();

export const menuMusic = new Howl({
  src: ['../public/audio/menuMusic.mp3'],
  loop: true,
  volume: 1.0,
})

// Tried implementing this in renderer.js but it 
// breaks the entire menu to call this dependecy in renderer.
export const menuClickSound = new Howl({
  src: ['../public/audio/menuClick.mp3'],
  loop: false,
  volume: 1.0,
})

export const engineSound = new Howl({
  src: ['../public/audio/engine.mp3'],
  loop: true,
  volume: 1.0,
})

export const fireSound = new Howl({
  src: ['../public/audio/fire.mp3'],
  loop: false,
  volume: 1.0,
})

export const reload0Sound = new Howl({
  src: ['../public/audio/reload1.mp3'],
  loop: false,
  volume: 1.0,
})

export const reload1Sound = new Howl({
  src: ['../public/audio/reload2.mp3'],
  loop: false,
  volume: 1.0,
})

export const reload2Sound = new Howl({
  src: ['../public/audio/reload3.mp3'],
  loop: false,
  volume: 1.0,
})

export const tireSound = new Howl({
  src: ['../public/audio/tire.mp3'],
  loop: true,
  volume: 1.0,
})
