const { ipcRenderer } = require('electron');

document.getElementById('Leaderboard')?.addEventListener('click', () => {
  ipcRenderer.send('navigate-to', 'leaderboard');
});

document.getElementById('Back')?.addEventListener('click', () => {
  ipcRenderer.send('navigate-to', 'index');
});
