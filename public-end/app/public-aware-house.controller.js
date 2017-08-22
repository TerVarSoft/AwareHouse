(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.controller('PublicAwareHouseCtrl', ['$scope', '$rootScope', '$location',
        function ($scope, $rootScope, $location) {

            $scope.title = "Ventas";
        }]);
})();