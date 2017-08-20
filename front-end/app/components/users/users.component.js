(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.controller('UsersCtrl', ['$scope', function($scope) {
        
        $scope.$parent.title = "Usuarios";
        $scope.test = "Helllo users!!";

    }]);
})();