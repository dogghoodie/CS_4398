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

  mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
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


// I know event is never read but keep
ipcMain.on('navigate-to', (event, page) => {
  if (page === 'leaderboard') {
    mainWindow.loadFile(path.join(__dirname, 'build', 'leaderboard.html'));
  } else if (page === 'index') {
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
