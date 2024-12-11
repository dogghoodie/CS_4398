const audioFiles = {
  leaderboardMusic: './audio/secondaryMenuMusic.mp3',
  clickSound: './audio/menuClick.mp3',
};

function playAudio(key) {
  const audio = new Audio(audioFiles[key]);

  audio.volume = 0.5;

  if (key === 'secondaryMenuMusic') {
    audio.loop = true;
  }
  audio.play();
}
