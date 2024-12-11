const audioFiles = {
  leaderboardMusic: './audio/secondaryMenuMusic.mp3',
  clickSound: './audio/menuClick.mp3',
};

function playAudio(key) {
  const audio = new Audio(audioFiles[key]);

  if (key === 'leaderboardMusic') {
    audio.loop = true;
  }
  audio.play();
}
