(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.controller('AskPasswordCtrl', ['$scope', '$mdDialog',
        function ($scope, $mdDialog) {

            $scope.password = "";

            $scope.save = function () {
                $mdDialog.hide($scope.password);
            }

            $scope.cancel = function () {
                $mdDialog.cancel();
            }
        }]);
})();