(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.directive('sellingItemsCart', [function() {
        
        return {
            scope: {
                sellings: '=sellings',
                finishSelling: '=onFinishSelling',
                removeAllSellingsFromCart: '=onRemoveAllSellingsFromCart',
                removeSellingFromCart: '=onRemoveSellingFromCart'
            },
            templateUrl: './app/components/sellings/sellings-cart/sellings-cart.view.html',
            controller: ['$scope', 'SellingConstant', function($scope, SellingConstant) {
                $scope.productColors = SellingConstant.PRODUCT_COLORS;
            }]
        }
    }]);
})();