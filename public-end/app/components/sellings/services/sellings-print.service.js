(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.service('SellingsPrint', ['electron', 'ipc', 'PrintManager', 'SellingsPrintConstant',
        function (electron, ipc, PrintManager, SellingsPrintConstant) {
            this.sellingsByCode = [];

            this.printSingleReport = function (code) {
                ipc.send('get-sellings-single-report', code);
            }

            this.printDateReport = function (date) {
                ipc.send('get-sellings-date-report', date);
            }

            this.printQuotation = function (sellings) {
                PrintManager.init();
                PrintManager.setTitle("Proforma");
                PrintManager.addInfo("");
            }

            electron.ipcRenderer.on('sellings:singleReport', (event, sellingsData) => {
                let sellings = formatSellings(sellingsData);

                PrintManager.init();
                PrintManager.setTitle('Nota de Entrega');
                PrintManager.addInfo('Codigo de Venta', sellings[0].code);
                PrintManager.addInfo('Fecha', moment(sellings[0].createdAt).format('YYYY/MM/DD HH:mm:ss'));
                PrintManager.addInfo('Vendedor', sellings[0].seller);
                PrintManager.addInfo('Total', getSellingsBatchTotal(sellings));
                PrintManager.addTable(SellingsPrintConstant.SELLINGS_TABLE_COLUMNS, sellings);

                PrintManager.print(`Reporte de Venta ${sellings[0].code}`);
            });

            electron.ipcRenderer.on('sellings:dateReport', (event, sellings) => {
                PrintManager.init();
                PrintManager.setTitle("Reporte del Dia");
                PrintManager.addInfo("");
            });

            function formatSellings(sellings) {
                return _.map(sellings, selling => {
                    selling.total = selling.quantity * selling.price;

                    return selling;
                });
            }

            function getSellingsBatchTotal(sellings) {
                return _.reduce(sellings, function (sum, selling) {
                    return sum + selling.total;
                }, 0);
            }
        }]);
})();


