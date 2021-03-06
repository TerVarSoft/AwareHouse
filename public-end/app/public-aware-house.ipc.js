(function () {
    'use strict';

    var publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.run(['$rootScope', 'electron',
        function ($rootScope, electron) {

            /**Products */
            electron.ipcRenderer.on('products:updated', (event, msg) => {
                $rootScope.$broadcast('products:updated', msg);
            });

            /**Sellings */
            electron.ipcRenderer.on('sellings:created', (event, msg) => {
                $rootScope.$broadcast('sellings:created', msg);
            });

            electron.ipcRenderer.on('sellings:updated', (event, msg) => {
                $rootScope.$broadcast('sellings:updated', msg);
            });

            electron.ipcRenderer.on('selling:rejectCreation', (event, msg) => {
                $rootScope.$broadcast('selling:rejectCreation', msg);
            });            

            /**Public */
            electron.ipcRenderer.on('public:askPassword', (event, data) => {
                $rootScope.$broadcast('public:askPassword', data);
            });

            electron.ipcRenderer.on('public:noAdminRole', (event, data) => {
                $rootScope.$broadcast('public:noAdminRole', data);
            });
        }
    ]);
})();


