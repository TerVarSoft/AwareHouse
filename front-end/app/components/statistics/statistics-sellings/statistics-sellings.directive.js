(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.directive('statisticsSellings', [function () {

        return {
            scope: {
                sellingsData: '=sellingsData',
                query: '=queryOptions',
                getSellings: '=onGetSellings',
                print: '=onPrint'
            },
            templateUrl: './app/components/statistics/statistics-sellings/statistics-sellings.view.html',
        }
    }]);
})();