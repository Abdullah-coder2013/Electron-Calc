const { app, BrowserWindow } = require("electron");
require("update-electron-app")();
const path = require("path");
const createWindow = () => {
  const win = new BrowserWindow({
    width: 348,
    height: 590,
    icon: "./favicon.ico",
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "src/renderer.js")
    },
  });

  win.loadFile("./src/index.html");
  win.setMenu(null)
  win.resizable = false;
  
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.once("ready", () => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});