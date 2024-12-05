const { ipcRenderer } = require('electron');

document.getElementById('StartGame')?.addEventListener('click', () => {
  ipcRenderer.send('navigate-to', 'index');
});

document.getElementById('StartGame2')?.addEventListener('click', () => {
  ipcRenderer.send('navigate-to', 'game');
});

document.getElementById('Leaderboard')?.addEventListener('click', () => {
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