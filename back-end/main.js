const app = require('electron').app;  // Module to control application life.
const windowManager = require('electron-window-manager');
const BrowserWindow = require('electron').BrowserWindow;  // Module to create native browser window.
const adminWindow = require('./admin.window');
const publicWindow = require('./public.window');
const Menu = require('electron').Menu;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function () {
    // Create the browser window.
    windowManager.init({});

    /**Specifi Ipc Configurations */
    var ProductsIpc = require('./ipc/products.ipc')([adminWindow, publicWindow]);
    var UsersIpc = require('./ipc/users.ipc')([adminWindow, publicWindow]);

    ProductsIpc.init();
    UsersIpc.init();

    publicWindow.open();
});

