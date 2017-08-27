(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.controller('SellingsCtrl',
        ['$scope', '$timeout', '$q', '$mdDialog', 'ipc', 'SellingsPrint', function ($scope, $timeout, $q, $mdDialog, ipc, SellingsPrint) {

            $scope.$parent.title = "Ventas";
            $scope.newSellings = [];
            $scope.sellingsData = {};

            $scope.listOptions = {
                limit: 10,
                page: 1
            };

            ipc.send('get-sellings', $scope.listOptions);

            $scope.getSellings = function () {
                ipc.send('get-sellings', $scope.listOptions);
            }

            $scope.addToCart = function (product) {
                if (product) {
                    $mdDialog.show({
                        controller: 'SellingEditCtrl',
                        templateUrl: './app/components/sellings/selling-edit/selling-edit.view.html',
                        parent: angular.element(document.body),
                        locals: {
                            product: product,
                        },
                        clickOutsideToClose: true
                    }).then(function (sellingItem) {
                        addToCart(sellingItem);
                    }, function () { });
                }
            }

            $scope.askSellerPassword = function () {
                $mdDialog.show({
                    controller: 'AskPasswordCtrl',
                    templateUrl: './app/components/shared/ask-password/ask-password.view.html',
                    parent: angular.element(document.body),
                    clickOutsideToClose: true,
                }).then(function (password) {
                    requestSellingCreate(password);
                }, function () { });
            }

            $scope.removeSellingFromCart = function (selling) {
                _.pull($scope.newSellings, selling);
            }

            $scope.removeAllSellingsFromCart = function () {
                $scope.newSellings = [];
            }

            $scope.printSingleReport = function (event) {
                var confirm = $mdDialog.prompt()
                    .title('Imprimir Venta')
                    .textContent('Codigo')
                    .placeholder('Codigo de la Venta')
                    .targetEvent(event)
                    .ok('Guardar')
                    .cancel('Cancelar');

                $mdDialog.show(confirm).then(function (code) {
                    SellingsPrint.printSingleReport(code);
                }, function () { });
            };

            /** Ipc Event Handlers */
            $scope.$on('sellings:created', function (event, sellingsData) {
                updateSellings(sellingsData)

                $scope.newSellings = [];
                $scope.listOptions.page = 1;
                $scope.$apply();
            });

            $scope.$on('sellings:updated', function (event, sellingsData) {
                updateSellings(sellingsData)

                $scope.$apply();
            });

            $scope.$on('selling:rejectCreation', function (event, data) {
                $scope.$parent.notify('Tu codigo no es correcto!');
            });

            function updateSellings(sellingsData) {
                $scope.sellingsData.meta = sellingsData.meta;
                $scope.sellingsData.sellings = _.map(sellingsData.data, selling => {
                    selling.createdAt = moment(selling.createdAt)
                        .format('YYYY/MM/DD HH:mm:ss');

                    return selling;
                });
            }
            function addToCart(sellingItem) {
                $scope.newSellings.push(sellingItem);
            }

            function requestSellingCreate(userCode) {

                var request = {
                    userCode: userCode,
                    sellings: _.map($scope.newSellings, selling => {
                        return {
                            quantity: selling.quantity,
                            price: selling.price,
                            productId: selling.product.id
                        }
                    })
                }

                ipc.send('request-selling-create', request);
            }
        }]);
})();