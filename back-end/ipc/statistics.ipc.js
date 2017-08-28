const winston = require('./../winston.wrapper');
const _ = require('lodash/core');
const { ipcMain } = require('electron');

const loggingOptions = { layer: "ipc", file: "statistics.ipc.js" };

const SellingssService = require('./../services/sellings.service')();

const StatisticsIpc = function (windows) {

    var init = function () {

        ipcMain.on('get-statistics', (event, request) => {
            winston.info('Requesting statistics', loggingOptions);

            SellingssService.findWithStatistics(request).then(function (statisticsResponse) {
                notifyWindows('statistics:updated', statisticsResponse);
            });
        });

        function notifyWindows(channel, data) {
            _.each(windows, window => {
                window.content().send(channel, data);
            });
        }
    }

    return {
        init: init
    }
}

module.exports = StatisticsIpc;