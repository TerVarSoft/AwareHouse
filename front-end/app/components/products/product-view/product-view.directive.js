(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.directive('productView', ['ProductsUtil', function (ProductsUtil) {
        return {
            scope: {
                product: '=',
                editProduct: '=onEditProduct',
                deleteProduct: '=onDeleteProduct'
            },
            templateUrl: './app/components/products/product-view/product-view.view.html',
            controller: ['$scope', 'ProductsUtil', function ($scope, ProductsUtil) {
                $scope.productTypes = ProductsUtil.getProductTypes();
                $scope.priceTypes = ProductsUtil.getProductPriceTypes();
                $scope.colors = ProductsUtil.getProductColors();
            }]
        }
    }]);
})();