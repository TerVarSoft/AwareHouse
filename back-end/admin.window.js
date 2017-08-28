const windowManager = require('electron-window-manager');
const Menu = require('electron').Menu;

var adminWindow = windowManager.createNew('admin', 'Administracion',
    'file://' + __dirname + './../front-end/index.html', false, {
        'width': 1000,
        'height': 700,
        'showDevTools': true,
        'resizable': true
    });

var adminMenu = [
    {
        label: 'Modulos',
        submenu: [
            {
                label: 'Productos',
                click: function () {
                    adminWindow.content().send('routes:change', '/products');
                },
                accelerator: 'CmdOrCtrl+P'
            }, {
                label: 'Usuarios',
                click: function () {
                    adminWindow.content().send('routes:change', '/users');
                },
                accelerator: 'CmdOrCtrl+U'
            }, {
                label: 'Estadisticas',
                click: function () {
                    adminWindow.content().send('routes:change', '/statistics');
                },
                accelerator: 'CmdOrCtrl+T'
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
adminWindow.set('menu', Menu.buildFromTemplate(adminMenu));

module.exports = adminWindow;