(function () {
    'use strict';

    var publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.config(
        [
            '$routeProvider', '$mdThemingProvider',

            function ($routeProvider, $mdThemingProvider) {
                $routeProvider.when(
                    '/sellings', {
                        templateUrl: './app/components/sellings/sellings.view.html',
                        controller: "SellingsCtrl"
                    }
                );

                $routeProvider.otherwise({ redirectTo: '/sellings' });

                $mdThemingProvider.theme('default')
                    .primaryPalette('teal')
                    .accentPalette('light-blue');

            }
        ]
    );
})();