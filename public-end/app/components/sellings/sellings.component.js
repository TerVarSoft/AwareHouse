(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.controller('SellingsCtrl',
        ['$scope', '$timeout', '$q', '$mdDialog', 'ipc', function ($scope, $timeout, $q, $mdDialog, ipc) {

            $scope.$parent.title = "Ventas";
            $scope.newSelling = { items: [] };
            $scope.sellings = [];

            ipc.send('get-sellings', '');

            $scope.addToCart = function (product) {
                if (product) {
                    $mdDialog.show({
                        controller: 'SellingItemEditCtrl',
                        templateUrl: './app/components/sellings/selling-item-edit/selling-item-edit.view.html',
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
                _.pull($scope.newSelling.items, selling);
            }

            $scope.removeAllSellingsFromCart = function () {
                $scope.newSelling.items = [];
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

            function savePDF(code) {
                var selling = findSelling(code);

                if (!selling) {
                    $scope.$parent.notify("No tenemos una venta con ese codigo!");
                    return;
                }

                var sellingDate = moment(selling.createdAt).format('YYYY/MM/DD HH:mm:ss');
                var documentPDF = new jsPDF();

                var columns = [
                    {
                        dataKey: "product",
                        title: "Producto"
                    },
                    {
                        dataKey: "quantity",
                        title: "Cantidad"
                    }
                ];

                documentPDF.setFont('Times', 'bold', 40);
                documentPDF.setFontSize(40);
                documentPDF.text('ALUIMPORT', 105, 40, 'center');

                documentPDF.setFontSize(14);
                documentPDF.text('Codigo de Venta: ' + selling.code, 20, 60);
                documentPDF.text('Fecha: ' + sellingDate, 20, 70);
                documentPDF.text('Vendedor: ' + selling.seller, 20, 80);

                documentPDF.autoTable(columns, selling.items, { startY: 90 });

                documentPDF.save('Reporte Venta ' + selling.code + '.pdf');
            }

            function findSelling(code) {
                return _.find($scope.sellings, function (selling) {
                    return selling.code == code;
                });
            }

            function addToCart(sellingItem) {
                $scope.newSelling.items.push(sellingItem);
            }

            function requestSellingCreate(userCode) {
                var sellingToUpdate = {
                    items: _.map($scope.newSelling.items, sellingItem => {
                        return {
                            quantity: sellingItem.quantity,
                            productId: sellingItem.product.id
                        }
                    })
                };

                var request = {
                    userCode: userCode,
                    selling: sellingToUpdate
                }

                ipc.send('request-selling-create', request);
            }

            /** Ipc Event Handlers */
            $scope.$on('sellings:updated', function (event, sellings) {
                $scope.sellings = sellings;
                $scope.newSelling = { items: [] };
                $scope.$apply();
            });

            $scope.$on('selling:rejectCreation', function (event, data) {
                $scope.$parent.notify('Tu codigo no es correcto!');
            });
        }]);
})();