(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.controller('ProductEditCtrl',
        ['$scope', '$mdDialog', 'ProductConstant', 'product', function ($scope, $mdDialog, ProductConstant, product) {

            $scope.product = _.clone(product);
            $scope.colors = ProductConstant.PRODUCT_COLORS;
            $scope.types = ProductConstant.PRODUCT_TYPES;

            $scope.priceTypes = ProductConstant.PRODUCT_PRICE_TYPES;

            $scope.cancel = function() {
                $mdDialog.cancel();
            }
        }]);
})();