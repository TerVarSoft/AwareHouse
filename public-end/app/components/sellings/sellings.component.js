(function () {
    'use strict';
  
    const publicAwareHouseApp = angular.module('publicAwareHouseApp');
  
    publicAwareHouseApp.controller('SellingsCtrl',
    ['$scope', '$timeout', '$q', '$mdDialog', 'ipc', function($scope, $timeout, $q, $mdDialog, ipc) {
        
        $scope.$parent.title = "Ventas";
        $scope.sellingCartItems = [];
        $scope.sellingBatch = [];  
        
        $scope.createSelling = function (product) {
            if(product) {
                $mdDialog.show({
                    controller: 'SellingItemEditCtrl',
                    templateUrl: './app/components/sellings/selling-item-edit/selling-item-edit.view.html',
                    parent: angular.element(document.body),
                    locals: {
                        product: product,
                    },
                    clickOutsideToClose: true
                }).then(function (selling) {
                    addSellingToCart(selling);
                }, function () {});
            }
        }

        function addSellingToCart(selling) {
            $scope.sellingCartItems.push(selling);
        }

        $scope.createSellingBatch = function createSellingBatch(sellingBatch) {
            $scope.sellingBatch = sellingBatch;
            $scope.sellingCartItems = [];
        }
    }]);
})();