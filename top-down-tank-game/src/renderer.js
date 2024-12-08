const { ipcRenderer } = require('electron');
// This also breaks.
// const { menuClickSound } = require('audio.js');

document.getElementById('StartGame')?.addEventListener('click', () => {
  ipcRenderer.send('navigate-to', 'index');
});

document.getElementById('StartGame2')?.addEventListener('click', () => {
  ipcRenderer.send('navigate-to', 'game');
});

document.getElementById('Leaderboard')?.addEventListener('click', () => {
  // This breaks the menu??? why??
  // menuClickSound.play();
  ipcRenderer.send('navigate-to', 'leaderboard');
});

document.getElementById('Back')?.addEventListener('click', () => {
  ipcRenderer.send('navigate-to', 'menu');
});

document.getElementById('Pause')?.addEventListener('click', () => {
  ipcRenderer.send('toggle-pause');
});

ipcRenderer.on('navigate-to-menu', () => {
  ipcRenderer.send('navigate-to', 'menu');
})
