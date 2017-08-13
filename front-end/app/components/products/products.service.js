(function() {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.service('Products', [function() {
        this.products = [];
        
        this.set = function(newProducts) {
            console.log("settting", newProducts);
            this.products = newProducts;
        }

        this.getTest = function() {
            return this.products;
        }

        this.get = function() {
            return [{
                code: 'ab001',
                type: 0,
                description: 'Descripcion del producto 1',
                quantity: 200,
                prices: [20, 30, 40]
            }, {
                code: 'ab002',
                type: 1,
                description: 'Descripcion del producto 2',
                quantity: 200,
                prices: [20, 30, 40]
            }, {
                code: 'ab003',
                type: 1,
                description: 'Descripcion del producto 3',
                quantity: 200,
                prices: [20, 30, 40]
            }];
        }
    }]);
})();