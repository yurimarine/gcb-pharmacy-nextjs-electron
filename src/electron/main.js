const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    // width: 1200,
    // height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"), // <-- load here
    },
  });

  const isDev = !app.isPackaged;
  if (isDev) {
    win.loadURL("http://localhost:3000");
  } else {
    win.loadFile(path.join(__dirname, "../out/index.html"));
  }
}

ipcMain.handle("exit-app", () => {
  app.quit();
});

app.whenReady().then(createWindow);
