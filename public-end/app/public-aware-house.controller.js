(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.controller('PublicAwareHouseCtrl', ['$scope', '$rootScope', '$mdDialog',
        function ($scope, $rootScope, $mdDialog) {

            $scope.title = "Ventas";

            $scope.$on('admin:askPassword', function (event, data) {
                $mdDialog.show({
                    controller: 'AskPasswordCtrl',
                    templateUrl: './app/components/shared/ask-password/ask-password.view.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                }).then(function (password) {
                    ipc.send('open-admin', password);
                }, function () {});
            });
        }]);
})();