(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.controller('SellingItemEditCtrl',
        ['$scope', '$mdDialog', 'product', function ($scope, $mdDialog, product) {    
            $scope.selling = {};
            $scope.selling.product = product;

            $scope.save = function() {
                $mdDialog.hide($scope.selling);
            }

            $scope.cancel = function() {
                $mdDialog.cancel();
            }
        }]);
})();