(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.directive('productView', [function() {
        return {
            scope: {
                product: '='
            },
            templateUrl: './app/components/products/product-view/product-view.view.html'
        }
    }]);
})();