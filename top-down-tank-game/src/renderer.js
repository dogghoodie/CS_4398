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

document.getElementById('ChangeName')?.addEventListener('click', () => {
  ipcRenderer.send('navigate-to', 'changename');
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

document.addEventListener('DOMContentLoaded', () => {
  const changenameForm = document.getElementById('changename-form');
  if (changenameForm) {
    changenameForm.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent the default form submission
      
      const usernameInput = document.getElementById('username-input');
      const newUsername = usernameInput.value.trim();

      if (newUsername === '') {
        alert('Username cannot be empty.');
        return;
      } const MAX_USERNAME_LENGTH = 20;
      if (newUsername.length > MAX_USERNAME_LENGTH) {
        alert(`Username cannot exceed ${MAX_USERNAME_LENGTH} characters.`);
        return;
      } const validUsernameRegex = /^[a-zA-Z0-9_]+$/;
      if (!validUsernameRegex.test(newUsername)) {
        alert('Username can only contain letters, numbers, and underscores.');
        return;
      }

      // Send the new username to the main process via IPC
      ipcRenderer.send('update-username', newUsername);
    });
  }
});

ipcRenderer.on('username-update-success', () => {
  alert('Username updated successfully!');
  ipcRenderer.send('navigate-to', 'menu');
});

ipcRenderer.on('username-update-failure', (event, message) => {
  alert('Failed to update username: ' + message);
});