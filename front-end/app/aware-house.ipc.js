(function () {
    'use strict';

    var awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.run(['$rootScope', 'electron', 'Products',
        function($rootScope, electron, Products) {
            
            electron.ipcRenderer.on('products', (event, msg) => {
                $rootScope.$broadcast('products:updated',msg);
            });
        }
    ]);
})();


