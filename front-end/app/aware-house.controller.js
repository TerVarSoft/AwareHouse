(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.controller('AwareHouseCtrl', ['$scope', '$rootScope', '$location',
        function ($scope, $rootScope, $location) {

            $scope.title = "";

            $rootScope.remote = require('electron').remote;
            var Menu = $rootScope.remote.Menu;

            var menu = new Menu();
            var tpl = [
                {
                    label: 'Administracion',
                    submenu: [
                        {
                            label: 'Productos',
                            click: function () {
                                console.log("testing products")
                                $location.path('/products');
                                $scope.$apply();
                            },
                            accelerator: 'CmdOrCtrl+P'
                        },
                        {
                            label: 'Usuarios',
                            click: function () {
                                $location.path('/users');
                                $scope.$apply();
                            },
                            accelerator: 'CmdOrCtrl+U'
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

            menu = Menu.buildFromTemplate(tpl);
            Menu.setApplicationMenu(menu);
        }]);
})();