(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.directive('productList', [function() {
        return {
            scope: {
                products: '=',
                onSelectProduct: '='
            },
            templateUrl: './app/components/products/product-list/product-list.view.html'
        }
    }]);
})();