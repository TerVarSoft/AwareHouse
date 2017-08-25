(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.controller('ProductEditCtrl',
        ['$scope', '$mdDialog', 'ProductsUtil', 'product', function ($scope, $mdDialog, ProductsUtil, product) {

            $scope.product = _.cloneDeep(product);
            $scope.product.prices = $scope.product.prices || [];
            $scope.product.color = $scope.product.color || 0;
            $scope.product.type = $scope.product.type || 0;
            $scope.newPrice = { type: 0 };

            $scope.colors = ProductsUtil.getProductColors();
            $scope.types = ProductsUtil.getProductTypes();
            $scope.priceTypes = ProductsUtil.getProductPriceTypes();
            $scope.priceTypesToDisplay =
                ProductsUtil.getFilteredProductPrices($scope.product.prices);

            $scope.addNewPrice = function () {
                $scope.product.prices.push(_.clone($scope.newPrice));
                $scope.priceTypesToDisplay =
                    ProductsUtil.getFilteredProductPrices($scope.product.prices);
                $scope.newPrice = {};
            }

            $scope.removePrice = function (price) {
                _.pull($scope.product.prices, price);
                $scope.priceTypesToDisplay =
                    ProductsUtil.getFilteredProductPrices($scope.product.prices);
            }

            $scope.save = function () {
                $mdDialog.hide($scope.product);
            }

            $scope.cancel = function () {
                $mdDialog.cancel();
            }
        }]);
})();