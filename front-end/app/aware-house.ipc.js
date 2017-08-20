(function () {
    'use strict';

    var awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.run(['$rootScope', '$log', 'electron', 'Products',
        function($rootScope, $log, electron, Products) {
            
            electron.ipcRenderer.on('products:updated', (event, msg) => {
                $rootScope.$broadcast('products:updated',msg);
            });

            electron.ipcRenderer.on('product:updated', (event, msg) => {
                $rootScope.$broadcast('product:updated',msg);
            });

            electron.ipcRenderer.on('product:deleted', (event, msg) => {
                $rootScope.$broadcast('product:deleted',msg);
            });
            
            /** Error Handlers */

            electron.ipcRenderer.on('product:errorUpdate', (event, msg) => {
                $log.error("Error when attemping to save a product");
            });
        }
    ]);
})();


