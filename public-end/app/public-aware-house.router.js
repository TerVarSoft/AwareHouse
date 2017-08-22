(function () {
    'use strict';

    var publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.config(
        [
            '$routeProvider',
            
            function ($routeProvider) {
                $routeProvider.when(
                    '/sellings', {
                        templateUrl: './app/components/sellings/sellings.view.html',
                        controller : "SellingsCtrl"
                    }
                );

                $routeProvider.otherwise({redirectTo: '/sellings'});     
            }
        ]
    );
})();