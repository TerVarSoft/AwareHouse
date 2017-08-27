(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.directive('productList', ['ProductsUtil', function (ProductsUtil) {

        return {
            scope: {
                products: '=',
                selectProduct: '=onSelectProduct'
            },
            templateUrl: './app/components/products/product-list/product-list.view.html',
            controller: ['$scope', function ($scope) {
                $scope.productTypes = ProductsUtil.getProductTypes();
                $scope.productColors = ProductsUtil.getProductColors();
                $scope.queryFilter = { tags: '' };
                
                $scope.search = function () {
                    $scope.queryFilter.tags = $scope.searchText;
                }
            }]
        }
    }]);
})();