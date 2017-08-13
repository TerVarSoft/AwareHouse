(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.controller('ProductsCtrl', 
        ['$scope', 'ipc', 'Products', function ($scope, ipc, Products) {

            $scope.product = [];
            $scope.selectedProduct = {};

            ipc.send('get-products', '');

            $scope.$on('products:updated', function(event, products) {
                $scope.products = products;
                $scope.selectedProduct = products[0];
                $scope.$apply();
            });

            $scope.selectProduct = function(product) {
                $scope.selectedProduct = product;
            } 
    }]);
})();

