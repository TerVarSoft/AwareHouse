(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    /**IMPORTANT: This key value pairs need to be in orden!
     *  in favour of easy access */
    awareHouseApp.constant('UserConstant', {
        USER_ROLES: [
            {key: 0, value: 'Administrador'},
            {key: 1, value: 'Vendedor'}
        ]
    });
})();