(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.directive('productList', ['ProductsUtil', function(ProductsUtil) {
        
        return {
            scope: {
                products: '=',
                selectProduct: '=onSelectProduct'
            },
            templateUrl: './app/components/products/product-list/product-list.view.html',
            link:  function postLink(scope, element, attrs) {
                scope.productTypes = ProductsUtil.getProductTypes();
                scope.productColors = ProductsUtil.getProductColors();
            }
        }
    }]);
})();