(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.controller('SellingPrintCtrl',
        ['$scope', '$mdDialog', function ($scope, $mdDialog) {
            $scope.code;
            $scope.date = new Date();

            $scope.save = function () {
                $mdDialog.hide([$scope.printType, $scope.code, $scope.date]);
            }

            $scope.cancel = function () {
                $mdDialog.cancel();
            }
        }]);
})();