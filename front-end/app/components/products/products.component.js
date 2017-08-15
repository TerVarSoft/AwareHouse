(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.controller('ProductsCtrl',
        ['$scope', '$mdDialog', 'ipc', 'Products', function ($scope, $mdDialog, ipc, Products) {

            $scope.product = [];
            $scope.selectedProduct = {};

            ipc.send('get-products', '');

            $scope.$on('products:updated', function (event, products) {
                $scope.products = products;
                $scope.selectedProduct = products[0];
                $scope.$apply();
            });

            $scope.selectProduct = function (product) {
                $scope.selectedProduct = product;
            }

            $scope.createProduct = function (event) {

                $mdDialog.show({
                    controller: 'ProductEditCtrl',
                    templateUrl: './app/components/products/product-edit/product-edit.view.html',
                    parent: angular.element(document.body),
                    locals: {
                        product: {},
                    },
                    targetEvent: event,
                    clickOutsideToClose: true,
                    fullscreen: false 
                }).then(function (answer) {
                }, function () {
                });
            }

            $scope.editProduct = function (event, product) {

                $mdDialog.show({
                    controller: 'ProductEditCtrl',
                    templateUrl: './app/components/products/product-edit/product-edit.view.html',
                    parent: angular.element(document.body),
                    locals: {
                        product: product,
                    },
                    targetEvent: event,
                    clickOutsideToClose: true,
                    fullscreen: false 
                }).then(function (answer) {
                }, function () {
                });
            }
        }]);
})();

