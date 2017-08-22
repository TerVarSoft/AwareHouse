(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.directive('productSearch', [function () {

        return {
            scope: {
                products: '=',
                createSelling: '=onCreateSelling'
            },
            templateUrl: './app/components/sellings/product-search/product-search.view.html',
            controller: ['$scope', '$mdDialog', 'ipc', function ($scope, $mdDialog, ipc) {
                ipc.send('get-products', '');
                
                $scope.$on('products:updated', function(event, products) {
                    $scope.products = products;
                    $scope.products.map( function (product) {
                        product.value = product.description.toLowerCase();
                        return product;
                    });
        
                    $scope.$apply();
                });
                
                $scope.productsQuery = function (query) {
                    var results = query ? $scope.products.filter(createFilterFor(query)) : $scope.products, deferred;
                    return results;
                }

                function createFilterFor(query) {
                    var lowercaseQuery = angular.lowercase(query);

                    return function filterFn(item) {
                        return (item.value.indexOf(lowercaseQuery) === 0);
                    };
                }

               
            }]
        }
    }]);
})();