(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.directive('productSearch', [function () {

        return {
            scope: {
                productSelect: '=onProductSelect'
            },
            templateUrl: './app/components/sellings/product-search/product-search.view.html',
            controller: ['$scope', '$mdDialog', 'ipc', function ($scope, $mdDialog, ipc) {
                ipc.send('get-products', '');
                
                $scope.productsQuery = function (query) {
                    var results = query ? $scope.products.filter(createFilterFor(query)) : $scope.products;
                    return results;
                }

                function createFilterFor (query) {
                    var lowercaseQuery = angular.lowercase(query);

                    return function filterFn (product) {
                        return (product.description.toLowerCase().indexOf(lowercaseQuery) === 0);
                    };
                }

                $scope.$on('products:updated', function(event, products) {
                    $scope.products = products;
                    $scope.$apply();
                });
            }]
        }
    }]);
})();