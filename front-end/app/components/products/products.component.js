(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.controller('ProductsCtrl',
        ['$scope', '$log', '$mdDialog', 'ipc', 'Products', function ($scope, $log, $mdDialog, ipc, Products) {

            $scope.product = [];
            $scope.selectedProduct = {};

            ipc.send('get-products', '');

            $scope.selectProduct = function (product) {
                $scope.selectedProduct = product;
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
                }).then(function (productUpdated) {
                    saveProduct(productUpdated);
                }, function () {});
            }

            $scope.deleteProduct = function (event, product) {
                var deleteConfirm = $mdDialog.confirm()
                    .ariaLabel('deleteProduct')
                    .title(`Borrando...!`)
                    .textContent(`Estas seguro de borrar el producto ${product.code}?`)
                    .targetEvent(event)
                    .ok('Borrar')
                    .cancel('Cancelar');
      
                $mdDialog.show(deleteConfirm).then(function() {
                    deleteProduct(product);
                }, function() {});
            }
            
            function saveProduct(productToUpdate) {
                ipc.send('save-product', productToUpdate);
            }

            function deleteProduct(productToDelete) {
                ipc.send('delete-product', productToDelete);
            }

            /** Ipc Event Handlers */
            $scope.$on('products:updated', function (event, products) {
                $scope.products = products;
                $scope.selectedProduct = products[0];
                $scope.$apply();
            });

            $scope.$on('product:updated', function (event, productUpdated) {
                $log.info(`product: ${productUpdated.code} saved successfully`);
                $log.debug(productUpdated);

                var productToUpdateIndex = 
                    _.findIndex($scope.products, ['id', productUpdated.id]);
                _.pullAt($scope.products, productToUpdateIndex);
                
                if(productToUpdateIndex >= 0) {
                    $scope.products.splice(productToUpdateIndex, 0, productUpdated);
                } else {
                    $scope.products.splice(0, 0, productUpdated);
                }
                
                $scope.selectedProduct = productUpdated;
                $scope.$apply();
            });

            $scope.$on('product:deleted', function (event, productDeletedId) {
                $log.info(`product: ${$scope.selectedProduct.code} deleted successfully`);
                $log.debug(`product deleted id: ${productDeletedId}`);
                
                var productToDeleteIndex = 
                    _.findIndex($scope.products, ['id', productDeletedId]);
                _.pullAt($scope.products, productToDeleteIndex);

                $scope.selectedProduct = $scope.products[0];
                $scope.$apply();
            });
        }]);
})();

