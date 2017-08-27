const winston = require('./../winston.wrapper');
const _ = require('lodash/core');
const { ipcMain } = require('electron');

const loggingOptions = { layer: "ipc", file: "products.ipc.js" };

const ProductService = require('./../services/products.service')();

const ProductsIpc = function (windows) {

    var init = function () {

        ipcMain.on('get-products', () => {
            winston.info('Requesting all products', loggingOptions);

            ProductService.findAll().then(function (products) {
                notifyWindows('products:updated', products);
            });
        });

        ipcMain.on('save-product', (event, productToUpdate) => {
            winston.info(`Request to save product: ${productToUpdate.code}`, loggingOptions);
            winston.verbose(`${JSON.stringify(productToUpdate)}`);

            ProductService.save(productToUpdate).then(productUpdated => {
                if (productUpdated) {
                    notifyWindows('product:updated', productUpdated);
                } else {
                    notifyWindows('product:errorUpdate', '');
                }
            });
        });

        ipcMain.on('delete-product', (event, productToDelete) => {
            winston.info(`Request to delete product: ${productToDelete.code}`, loggingOptions);

            ProductService.remove(productToDelete).then(productDeletedId => {
                notifyWindows('product:deleted', productDeletedId);
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

module.exports = ProductsIpc;