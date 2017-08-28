(function () {
    'use strict';

    const awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.controller('StatisticsCtrl',
        ['$scope', 'ipc', function ($scope, ipc) {
            $scope.$parent.title = "Estadisticas";

            $scope.startDate = new Date();
            $scope.endDate = new Date();
            $scope.statisticsData = { meta: { count: 0, total: 0, averagePerDay: 0, revenueAvg: 0 } };

            $scope.selligsListOptions = {
                limit: 8,
                page: 1
            };

            $scope.calculate = function () {
                ipc.send('get-statistics', {
                    start: $scope.startDate,
                    end: $scope.endDate,
                    limit: $scope.selligsListOptions.limit,
                    page: 1,
                });
            }

            $scope.getSellings = function () {
                ipc.send('get-statistics', {
                    start: $scope.startDate,
                    end: $scope.endDate,
                    limit: $scope.selligsListOptions.limit,
                    page: $scope.selligsListOptions.page,
                });
            }

            $scope.$on('statistics:updated', function (event, statisticsData) {

                $scope.statisticsData.meta = statisticsData.meta;
                $scope.statisticsData.sellings = _.map(statisticsData.data, selling => {
                    selling.createdAt = moment(selling.createdAt)
                        .format('YYYY/MM/DD HH:mm:ss');

                    return selling;
                });
                $scope.$apply();
            });

            $scope.calculate();
        }]);
})();