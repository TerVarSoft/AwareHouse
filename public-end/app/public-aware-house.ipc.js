(function () {
    'use strict';

    var publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.run(['$rootScope', 'electron',
        function ($rootScope, electron) {

            /**Products */
            electron.ipcRenderer.on('products:updated', (event, msg) => {
                $rootScope.$broadcast('products:updated', msg);
            });

            /**Admin */
            electron.ipcRenderer.on('admin:askPassword', (event, data) => {
                $rootScope.$broadcast('admin:askPassword', data);
            });
        }
    ]);
})();


