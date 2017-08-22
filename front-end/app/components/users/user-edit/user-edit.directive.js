(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.directive('userEdit', ['UserConstant', function(UserConstant) {
        
        return {
            scope: {
                user: '=',
                create: '=onCreateUser'
            },
            templateUrl: './app/components/users/user-edit/user-edit.view.html',
            link:  function postLink(scope, element, attrs) {
                scope.roles = UserConstant.USER_ROLES;
            }
        }
    }]);
})();