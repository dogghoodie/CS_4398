const audioFiles = {
  menuMusic: './audio/menuMusic.mp3',
  clickSound: './audio/menuClick.mp3',
};

function playAudio(key) {
  const audio = new Audio(audioFiles[key]);

  if (key === 'menuMusic') {
    audio.loop = true;
  }
  audio.play();
}
