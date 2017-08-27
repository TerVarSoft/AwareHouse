(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.directive('sellingsList', [function () {

        return {
            scope: {
                sellingsData: '=sellingsData',
                query: '=queryOptions',
                getSellings: '=onGetSellings',
                print: '=onPrint'
            },
            templateUrl: './app/components/sellings/sellings-list/sellings-list.view.html',
        }
    }]);
})();