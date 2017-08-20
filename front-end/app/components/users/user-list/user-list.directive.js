(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.directive('userList', ['UserConstant', function(UserConstant) {
        
        return {
            scope: {
                users: '='
            },
            templateUrl: './app/components/users/user-list/user-list.view.html',
            link:  function postLink(scope, element, attrs) {
                scope.roles = UserConstant.USER_ROLES;
            }
        }
    }]);
})();