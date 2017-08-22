(function () {
    'use strict';
  
    const publicAwareHouseApp = angular.module('publicAwareHouseApp');
  
    publicAwareHouseApp.controller('SellingsCtrl',
    ['$scope', '$timeout', '$q', '$mdDialog', 'ipc', function($scope, $timeout, $q, $mdDialog, ipc) {
        
        $scope.$parent.title = "Ventas";
        $scope.sellingCartItems = [];  
        
        $scope.createSelling = function (event, product) {
            $mdDialog.show({
                controller: 'SellingItemEditCtrl',
                templateUrl: './app/components/sellings/selling-item-edit/selling-item-edit.view.html',
                parent: angular.element(document.body),
                locals: {
                    product: product,
                },
                targetEvent: event,
                clickOutsideToClose: true
            }).then(function (selling) {
                addSellingToCart(selling);
                console.log(selling);
            }, function () {});
        }

        function addSellingToCart(selling) {
            $scope.sellingCartItems.push(selling);
        }
    }]);
})();