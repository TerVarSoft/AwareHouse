(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.directive('sellingsList', [function() {
        
        return {
            scope: {
                sellingsBatch: '=items',
                createSellingBatch: '=onCreateSellingBatch'
            },
            templateUrl: './app/components/sellings/sellings-list/sellings-list.view.html'
        }
    }]);
})();