(function () {
    'use strict';

    const publicAwareHouseApp = angular.module('publicAwareHouseApp');

    publicAwareHouseApp.service('PrintManager', ['$log', function ($log) {
        let documentPDF;
        let defaultTitle;
        let xPositionForInfoLeft;
        let xPositionForInfoRight;
        let xPositionForInfo;
        let yPositionForInfo;

        this.init = function () {
            defaultTitle = 'ALUIMPORT';
            xPositionForInfoLeft = 15;
            xPositionForInfoRight = 100;
            xPositionForInfo = xPositionForInfoLeft;
            yPositionForInfo = 30;
            documentPDF = new jsPDF('l', 'mm', [215, 140]);
        }

        this.setTitle = function (title) {
            documentPDF.setFont('Times', 'bold');
            documentPDF.setFontSize(14);
            documentPDF.text(title || defaultTitle, 105, 22, 'center');
        }

        this.addInfo = function (key, data) {
            documentPDF.setFontSize(10);
            documentPDF.text(`${key}: ${data}`, xPositionForInfo, yPositionForInfo);

            if (xPositionForInfo == xPositionForInfoLeft) {
                xPositionForInfo = xPositionForInfoRight;
            }
            else {
                xPositionForInfo = xPositionForInfoLeft;
                yPositionForInfo += 5;
            }
        }

        this.addTable = function (columns, data) {
            var pageContent = function (data) {
                documentPDF.setFont('Arial', 'bold');
                documentPDF.setFontSize(14);
                documentPDF.setTextColor(180, 130, 30);
                documentPDF.text("ALUIMPORT", 105, data.settings.margin.top, 'center');

                documentPDF.setFontSize(8);
                documentPDF.setTextColor(0, 0, 0);
                documentPDF.text(`Av. Villazon Km.5 (Frente a Ceramica Nacional)\n    Telf.: 4541557 - Cel.: 65350916 - 79755150\n             o escribanos al WhatsApp`, 105, documentPDF.internal.pageSize.height - 10, 'center');
            };

            documentPDF.autoTable(columns, data, {
                addPageContent: pageContent,
                startY: yPositionForInfo,
                headerStyles: { halign: 'center' },
                styles: {
                    fontSize: 7.5,
                    halign: 'right',
                    lineWidth: 0.2,
                    lineColor: [0, 0, 0]
                },
                columnStyles: {
                    product: { halign: 'left' }
                }
            });
        }

        this.print = function (fileName) {
            let finalFileName = `${fileName}.pdf`;
            $log.info(`Generating:  ${finalFileName}`);

            documentPDF.save(finalFileName);
        }
    }]);
})();