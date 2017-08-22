(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.controller('AwareHouseCtrl', ['$scope', '$location',
        function ($scope, $location) {

            $scope.title = "";

            $scope.$on('routes:change', function (event, route) {
                $location.path(route);
                $scope.$apply();
            });
        }]);
})();