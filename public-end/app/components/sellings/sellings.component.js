(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.controller('SellingsCtrl',
        ['$scope', '$timeout', '$q', '$mdDialog', 'ipc', function ($scope, $timeout, $q, $mdDialog, ipc) {

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

            $scope.print = function (event) {
                var confirm = $mdDialog.prompt()
                    .title('Imprimir Venta')
                    .textContent('Codigo')
                    .placeholder('Codigo de la Venta')
                    .targetEvent(event)
                    .ok('Guardar')
                    .cancel('Cancelar');

                $mdDialog.show(confirm).then(function (code) {
                    savePDF(code);
                }, function () {
                    $scope.status = 'supuestamente lo negativo';
                });
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
                $scope.sellingsData.count = sellingsData.meta.count;
                $scope.sellingsData.sellings = _.map(sellingsData.data, selling => {
                    selling.createdAt = moment(selling.createdAt)
                        .format('YYYY/MM/DD HH:mm:ss');

                    return selling;
                });
            }

            function savePDF(code) {
                var sellings = findSelling(code);

                sellings = _.map(sellings, selling => {
                    selling.total = selling.quantity * selling.price;

                    return selling;
                });

                var sellingTotal = _.reduce(sellings, function (sum, selling) {
                    return sum + selling.total;
                }, 0);

                if (!sellings || sellings.length < 1) {
                    $scope.$parent.notify("No tenemos una venta con ese codigo!");
                    return;
                }

                var sellingDate = moment(sellings[0].createdAt).format('YYYY/MM/DD HH:mm:ss');
                var documentPDF = new jsPDF();

                var columns = [
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
                ];

                documentPDF.setFont('Times', 'bold', 40);
                documentPDF.setFontSize(40);
                documentPDF.text('ALUIMPORT', 105, 40, 'center');

                documentPDF.setFontSize(14);
                documentPDF.text(`Codigo de Venta: ${sellings[0].code}`, 20, 60);
                documentPDF.text(`Fecha: ${sellingDate}`, 20, 70);
                documentPDF.text(`Vendedor: ${sellings[0].seller}`, 20, 80);
                documentPDF.text(`Total: ${sellingTotal}  Bs.`, 20, 90);

                documentPDF.autoTable(columns, selling.items, { startY: 100 });

                documentPDF.save('Reporte Venta ' + sellings[0].code + '.pdf');
            }

            function findSelling(code) {
                return _.find($scope.sellingsData.sellings, function (selling) {
                    return selling.code == code;
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