(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.controller('SellingItemEditCtrl',
        ['$scope', '$mdDialog', 'product', function ($scope, $mdDialog, product) {
            $scope.sellingItem = {};
            $scope.sellingItem.product = product;

            $scope.save = function() {
                $mdDialog.hide($scope.sellingItem);
            }

            $scope.cancel = function() {
                $mdDialog.cancel();
            }
        }]);
})();