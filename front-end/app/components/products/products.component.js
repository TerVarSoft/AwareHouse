(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.controller('ProductsCtrl', 
        ['$scope', 'electron', 'ipc', 'Products', function ($scope, electron, ipc, Products) {
            var imagePath = 'https://material.angularjs.org/latest/img/list/60.jpeg';

            console.log(Products.get());

            console.log(Products.getTest(), "greaat!!!");

            electron.shell.beep();

            ipc.send('get-products', '');

            $scope.products = Products.get();
    }]);
})();

