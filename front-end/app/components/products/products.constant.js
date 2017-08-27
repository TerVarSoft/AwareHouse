(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    /**IMPORTANT: This key value pairs need to be in orden!
     *  in favour of easy access */
    awareHouseApp.constant('ProductConstant', {
        PRODUCT_TYPES: [
            { key: 0, value: 'Perfil de Aluminio', icon: 'border_all' },
            { key: 1, value: 'Accesorio', icon: 'build' }
        ],
        PRODUCT_COLORS: [
            { key: 0, value: 'Natural', style: {'color': '#fff', 'border-style': 'solid', 'border-color': 'black' , 'border-width': '2px','background-color':'#c2c4c3'} },
            { key: 1, value: 'Titanio', style: {'color': '#fff', 'border-style': 'solid', 'border-color': 'black' , 'border-width': '2px','background-color':'#b79e5e'} },
            { key: 2, value: 'Champagne', style: {'color': '#fff', 'border-style': 'solid', 'border-color': 'black' , 'border-width': '2px','background-color':'#7d4617'} },
            { key: 3, value: 'Blanco', style: {'color': '#000', 'border-style': 'solid', 'border-color': 'black' , 'border-width': '2px','background-color':'#f5f5f7'} },
        ],
        PRODUCT_PRICE_TYPES: [
            { key: 0, value: 'Publico' },
            { key: 1, value: 'Precio 2' },
            { key: 2, value: 'Precio 3' },
            { key: 3, value: 'Precio 4' }
        ]
    });
})();