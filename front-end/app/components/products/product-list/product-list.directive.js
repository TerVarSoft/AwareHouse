(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.directive('productList', ['ProductConstant', function(ProductConstant) {
        
        return {
            scope: {
                products: '=',
                selectProduct: '=onSelectProduct'
            },
            templateUrl: './app/components/products/product-list/product-list.view.html',
            link:  function postLink(scope, element, attrs) {
                scope.productTypes = ProductConstant.PRODUCT_TYPES;
            }
        }
    }]);
})();