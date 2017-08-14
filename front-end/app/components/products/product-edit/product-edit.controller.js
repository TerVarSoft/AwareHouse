(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.controller('ProductEditCtrl',
        ['$scope', 'ProductConstant', 'product', function ($scope, ProductConstant, product) {

            $scope.product = _.clone(product);
            $scope.colors = ProductConstant.PRODUCT_COLORS;
            $scope.types = ProductConstant.PRODUCT_TYPES;

            $scope.priceTypes = [
                "20%",
                "50%",
                "80%",
                "90%",
            ]
        }]);
})();