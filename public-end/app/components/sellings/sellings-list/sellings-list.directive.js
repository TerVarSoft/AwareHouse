(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.directive('sellingsList', [function () {

        return {
            scope: {
                sellings: '=sellings',
                createSellingBatch: '=onCreateSellingBatch'
            },
            templateUrl: './app/components/sellings/sellings-list/sellings-list.view.html',
            link: function (scope, element, attrs) {
                scope.$watch('sellings', function (newValue, oldValue) {
                    if (newValue) {
                        scope.sellingItems = _.flatMap(scope.sellings, selling => {

                            return _.map(selling.items, sellingItem => {
                                sellingItem.createdAt = moment(selling.createdAt)
                                    .format('YYYY/MM/DD HH:mm:ss');
                                sellingItem.sellingCode = selling.code;
                                sellingItem.seller = selling.seller;

                                return sellingItem;
                            });
                        });
                    }
                }, true);
            },
            controller: function ($scope) {
                //$scope.sellingItems = _.flatMap($scope.sellings, selling => selling.items);
            }
        }
    }]);
})();