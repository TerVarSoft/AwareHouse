(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.directive('sellingItemsCart', [function() {
        
        return {
            scope: {
                sellings: '=items',
                createSellingBatch: '=onCreateSellingBatch',
                removeAllSellingsFromCart: '=onRemoveAllSellingsFromCart',
                removeSellingFromCart: '=onRemoveSellingFromCart'
            },
            templateUrl: './app/components/sellings/selling-items-cart/selling-items-cart.view.html'
        }
    }]);
})();