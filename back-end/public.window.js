const windowManager = require('electron-window-manager');
const Menu = require('electron').Menu;
const adminWindow = require('./admin.window');

var publicWindow = windowManager.createNew('public', 'Publico',
    'file://' + __dirname + './../public-end/index.html', false, {
        'width': 1000,
        'height': 700,
        'showDevTools': true,
        'resizable': true
    });

var publicMenu = [
    {
        label: 'Opciones',
        submenu: [
            {
                label: 'Administracion',
                click: function () {
                    adminWindow.open();
                },
                accelerator: 'CmdOrCtrl+A'
            }
        ]
    }, {
        label: 'Ventana',
        submenu: [
            {
                label: 'Refrescar',
                accelerator: 'CmdOrCtrl+R',
                click: function (item, focusedWindow) {
                    if (focusedWindow)
                        focusedWindow.reload();
                }
            },
            {
                label: 'On/Off Pantalla completa',
                accelerator: (function () {
                    if (process.platform == 'darwin')
                        return 'Ctrl+Command+F';
                    else
                        return 'F11';
                })(),
                click: function (item, focusedWindow) {
                    if (focusedWindow)
                        focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                }
            },
            {
                label: 'Herramientas de desarrollador',
                accelerator: (function () {
                    if (process.platform == 'darwin')
                        return 'Alt+Command+I';
                    else
                        return 'Ctrl+Shift+I';
                })(),
                click: function (item, focusedWindow) {
                    if (focusedWindow)
                        focusedWindow.toggleDevTools();
                }
            }
        ]
    }
];
publicWindow.set('menu', Menu.buildFromTemplate(publicMenu));

module.exports = publicWindow;