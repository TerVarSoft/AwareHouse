(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.constant('SellingsPrintConstant', {
        SELLINGS_TABLE_COLUMNS: [
            {
                dataKey: "product",
                title: "Producto"
            }, {
                dataKey: "quantity",
                title: "Cantidad"
            }, {
                dataKey: "price",
                title: "Precio"
            }, {
                dataKey: "total",
                title: "Total"
            }
        ]
    });
})();