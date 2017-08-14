(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.directive('productView', ['ProductConstant', function(ProductConstant) {
        return {
            scope: {
                product: '=',
                editProduct: '=onEditProduct'
            },
            templateUrl: './app/components/products/product-view/product-view.view.html',
            link:  function postLink(scope, element, attrs) {
                scope.productTypes = ProductConstant.PRODUCT_TYPES;
            }
        }
    }]);
})();