const { app, BrowserWindow, ipcMain } = require('electron/main');
const path = require('node:path');

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 1000,
    minWidth: 1400,
    minHeight: 1000,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'build', 'menu.html'));
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().lenght === 0) {
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
  }
});

ipcMain.on('toggle-pause', () => {
  mainWindow.webContents.send('toggle-pause');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
