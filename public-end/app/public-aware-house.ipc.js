(function () {
    'use strict';

    var publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.run(['$rootScope', 'electron',
        function ($rootScope, electron) {

            /**Products */
            electron.ipcRenderer.on('products:updated', (event, msg) => {
                console.log('asfdsafsf');
                $rootScope.$broadcast('products:updated', msg);
            });
        }
    ]);
})();


