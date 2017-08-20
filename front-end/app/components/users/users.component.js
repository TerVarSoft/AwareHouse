(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.controller('UsersCtrl', ['$scope', function ($scope) {

        $scope.$parent.title = "Usuarios";
        $scope.test = "Helllo users!!";

        $scope.newUser = {};

        $scope.users = [
            {
                role: 0,
                name: "Mirko",
                lastName: "Terrazas",
                code: "asf58dsf"
            },{
                role: 0,
                name: "Wilmer",
                lastName: "Terrazas",
                code: "afsd95qtr"
            },{
                role: 1,
                name: "Damaris",
                lastName: "Terrazas",
                code: "urtsev834f"
            }
        ];

        $scope.onSaveUser = function() {
            console.log($scope.newUser);
        }

    }]);
})();