(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.directive('sellingItemsCart', [function() {
        
        return {
            scope: {
                selling: '=selling',
                finishSelling: '=onFinishSelling',
                removeAllSellingsFromCart: '=onRemoveAllSellingsFromCart',
                removeSellingFromCart: '=onRemoveSellingFromCart'
            },
            templateUrl: './app/components/sellings/selling-items-cart/selling-items-cart.view.html'
        }
    }]);
})();