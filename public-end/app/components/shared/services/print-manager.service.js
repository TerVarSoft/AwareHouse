(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.service('PrintManager', ['$log', function ($log) {
        let documentPDF;
        let defaultTitle;
        let yPositionForInfo;

        this.init = function () {
            defaultTitle = 'ALUIMPORT';
            yPositionForInfo = 60;
            documentPDF = new jsPDF();
        }

        this.setTitle = function (title) {
            documentPDF.setFont('Times', 'bold');
            documentPDF.setFontSize(24);
            documentPDF.text(title || defaultTitle, 105, 40, 'center');
        }

        this.addInfo = function (key, data) {
            documentPDF.setFontSize(14);
            documentPDF.text(`${key}: ${data}`, 20, yPositionForInfo);
            yPositionForInfo += 10;
        }

        this.addTable = function (columns, data) {
            documentPDF.autoTable(columns, data, { startY: yPositionForInfo });
        }

        this.print = function (fileName) {
            let finalFileName = `${fileName}.pdf`;
            $log.info(`Generating:  ${finalFileName}`);

            documentPDF.save(finalFileName);
        }
    }]);
})();