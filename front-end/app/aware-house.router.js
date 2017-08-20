(function () {
    'use strict';

    var awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.config(
        [
            '$routeProvider', '$mdIconProvider',
            
            function ($routeProvider, $mdIconProvider) {
                $routeProvider.when(
                    '/products', {
                        templateUrl: './app/components/products/products.view.html',
                        controller : "ProductsCtrl"
                    }
                );

                $routeProvider.when(
                    '/users', {
                        templateUrl: './app/components/users/users.view.html',
                        controller : "UsersCtrl"
                    }
                );

                $routeProvider.otherwise({redirectTo: '/products'});
                
                $mdIconProvider
                    .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
                    .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24)
                    .defaultIconSet('img/icons/sets/core-icons.svg', 24);                
            }
        ]
    );
})();