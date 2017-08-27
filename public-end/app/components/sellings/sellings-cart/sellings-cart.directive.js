(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.directive('sellingItemsCart', [function () {

        return {
            scope: {
                sellings: '=sellings',
                finishSellingParent: '=onFinishSelling',
                removeAllSellingsFromCartParent: '=onRemoveAllSellingsFromCart',
                removeSellingFromCartParent: '=onRemoveSellingFromCart'
            },
            templateUrl: './app/components/sellings/sellings-cart/sellings-cart.view.html',
            controller: ['$scope', 'SellingConstant', function ($scope, SellingConstant) {
                $scope.productColors = SellingConstant.PRODUCT_COLORS;
                $scope.cartTotal = 0;

                $scope.finishSelling = function() {
                    $scope.cartTotal = 0;
                    $scope.finishSellingParent();
                }

                $scope.removeSellingFromCart = function(selling) {
                    $scope.cartTotal -= selling.price * selling.quantity;
                    $scope.removeSellingFromCartParent(selling);
                }

                $scope.removeAllSellingsFromCart = function() {
                    $scope.cartTotal = 0;
                    $scope.removeAllSellingsFromCartParent();
                }
            }]
        }
    }]);
})();