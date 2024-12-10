const { app, BrowserWindow, ipcMain } = require('electron/main');
const path = require('node:path');
const axios = require('axios');

let currentUsername = '(default)';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 1000,
    minWidth: 1400,
    minHeight: 1000,
    resizable: false,
    maximizable: false,
    minimizable: false,
    fullscreenable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname, 'public', 'logo192.png')
  });

  mainWindow.loadFile(path.join(__dirname, 'build', 'menu.html'));
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

ipcMain.on('navigate-to', (event, page) => {
  if (page === 'leaderboard') {
    mainWindow.loadFile(path.join(__dirname, 'build', 'leaderboard.html'));
  } else if (page === 'index' || page === 'game') {
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
  } else if (page === 'menu') {
    mainWindow.loadFile(path.join(__dirname, 'build', 'menu.html'));
  } else if (page === 'changename') {
    mainWindow.loadFile(path.join(__dirname, 'build', 'changename.html'));
  }
});

ipcMain.on('toggle-pause', () => {
  mainWindow.webContents.send('toggle-pause');
});

ipcMain.on('update-username', (event, newUsername) => {
  currentUsername = newUsername; // Update the username

  // notify all renderer processes (including App.js) about the username change
  BrowserWindow.getAllWindows().forEach((window) => {
    window.webContents.send('username-updated', currentUsername);
  });

  // Optionally, send a success response back to the sender
  event.sender.send('username-update-success');
});

ipcMain.on('get-username', (event) => {
  event.sender.send('current-username', currentUsername);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
