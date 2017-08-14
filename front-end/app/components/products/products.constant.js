(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.constant('ProductConstant', {
        PRODUCT_TYPES: [
            {key: 0, value: 'Perfil de Aluminio', icon: 'border_all'},
            {key: 1, value: 'Accesorio', icon: 'build'}
        ],
        PRODUCT_COLORS: [
            {key: 0, value: 'Verde'},
            {key: 1, value: 'Azul'},
            {key: 2, value: 'Cafe'},
            {key: 3, value: 'Negro'}
        ],
        PRODUCT_PRICE_TYPES: [
            {key: 0, value: '25%'},
            {key: 1, value: '50%'},
            {key: 2, value: '65%'},
            {key: 3, value: '60%'}
        ]
    });
})();