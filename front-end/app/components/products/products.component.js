(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.controller('ProductsCtrl', 
        ['$scope', 'ipc', 'Products', function ($scope, ipc, Products) {

            ipc.send('get-products', '');

            $scope.$on('products:updated', function(event, products) {
                $scope.products = products;
                $scope.$apply();
            });
    }]);
})();

