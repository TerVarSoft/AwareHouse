(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.controller('SellingItemEditCtrl',
        ['$scope', '$mdDialog', 'SellingConstant','product', function ($scope, $mdDialog, SellingConstant, product) {
            $scope.sellingItem = {};
            $scope.sellingItem.product = product;
            $scope.sellingItem.price = product.prices[0] ? product.prices[0].value : 0;

            $scope.productPriceTypes = SellingConstant.PRODUCT_PRICE_TYPES;

            $scope.save = function() {
                $mdDialog.hide($scope.sellingItem);
            }

            $scope.cancel = function() {
                $mdDialog.cancel();
            }
        }]);
})();