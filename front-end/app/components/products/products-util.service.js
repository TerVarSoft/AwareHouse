(function() {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.service('ProductsUtil', ['ProductConstant', function(ProductConstant) {

        this.getProductColors = function() {
            return ProductConstant.PRODUCT_COLORS;
        }

        this.getProductTypes = function() {
            return ProductConstant.PRODUCT_TYPES;
        }

        this.getProductPriceTypes = function() {
            return ProductConstant.PRODUCT_PRICE_TYPES;
        }

        this.getFilteredProductPrices = function(productPrices) {
            var productPricesByKey = 
            _.map(productPrices, productPrice => ({key: productPrice.type}));

            return _.differenceBy(ProductConstant.PRODUCT_PRICE_TYPES,
                productPricesByKey, 'key');
        }
    }]);
})();