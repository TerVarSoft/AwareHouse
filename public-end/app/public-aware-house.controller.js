(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.controller('PublicAwareHouseCtrl', ['$scope', '$rootScope', '$mdDialog', '$mdToast', 'ipc',
        function ($scope, $rootScope, $mdDialog, $mdToast, ipc) {

            $scope.title = "Ventas";

            $scope.$on('public:askPassword', function (event, data) {
                $mdDialog.show({
                    controller: 'AskPasswordCtrl',
                    templateUrl: './app/components/shared/ask-password/ask-password.view.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                }).then(function (password) {
                    ipc.send('open-admin', password);
                }, function () {});
            });

            $scope.$on('public:noAdminRole', function (event, data) {
                $scope.notify('Oops! parece que no eres administrador');
            });

            $scope.notify = function (message) {
                const toast = $mdToast.simple()
                    .content(message)
                    .hideDelay(3000)
                    .position('bottom right')

                $mdToast.show(toast);
            }
        }]);
})();