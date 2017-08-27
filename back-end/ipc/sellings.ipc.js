const winston = require('./../winston.wrapper');
const _ = require('lodash/core');
const { ipcMain } = require('electron');

const loggingOptions = { layer: "ipc", file: "sellings.ipc.js" };

const SellingService = require('./../services/sellings.service')();
const ProductService = require('./../services/products.service')();

const SellingsIpc = function (windows) {

    var init = function () {

         ipcMain.on('get-sellings', (event, request) => {
            winston.info(`Requesting page ${request.page} from sellings`, loggingOptions);

            SellingService.findAll(request).then(function (sellings) {
                notifyWindows('sellings:updated', sellings);
            });
        });

        ipcMain.on('request-selling-create', (event, request) => {
            winston.info('Requesting to create a selling', loggingOptions);
            
            SellingService.requestSellingCreate(request).then(sellingsResponse => {
                if(sellingsResponse){
                    notifyWindows('sellings:created', sellingsResponse);

                    ProductService.findAll().then(function (products) {
                        notifyWindows('products:updated', products);
                    });
                } else {
                    notifyWindows('selling:rejectCreation', '');
                }
            });
        });

        ipcMain.on('save-selling', (event, sellingToUpdate) => {
            winston.info(`Request to save selling: ${sellingToUpdate.code}`, loggingOptions);
            winston.verbose(`${JSON.stringify(sellingToUpdate)}`);

            SellingService.save(sellingToUpdate).then(sellingUpdated => {
                if (sellingUpdated) {
                    notifyWindows('selling:updated', sellingUpdated);
                } else {
                    notifyWindows('selling:errorUpdate', '');
                }
            });
        });

        ipcMain.on('delete-selling', (event, sellingToDelete) => {
            winston.info(`Request to delete selling: ${sellingToDelete.code}`, loggingOptions);

            SellingService.remove(sellingToDelete).then(sellingDeletedId => {
                notifyWindows('selling:deleted', sellingDeletedId);
            });
        });

        function notifyWindows(channel, data) {
            _.each(windows, window => {
                if(window.object) {
                    window.content().send(channel, data);
                }
            });
        }
    }

    return {
        init: init
    }
}

module.exports = SellingsIpc;