const winston = require('./../winston.wrapper');
const { ipcMain } = require('electron');

const loggingOptions = { layer: "ipc", file: "products.ipc.js" };

const ProductService = require('./../services/products.service')();

const ProductsIpc = function(mainWindow) {

    var init = function() {
        var self = this;
        ipcMain.on('get-products', () => {
            winston.info('Requesting all products', loggingOptions);

            ProductService.findAll().then(function(products) {
                mainWindow.webContents.send('products:updated', products);
            });
        });

        ipcMain.on('save-product', (event, productToUpdate) => {
            winston.info(`Request to save product: ${productToUpdate.code}`, loggingOptions);
            winston.verbose(`${JSON.stringify(productToUpdate)}`);

            ProductService.save(productToUpdate).then(productUpdated => {
                if(productToUpdate) {
                    mainWindow.webContents.send('product:updated', productUpdated);
                } else {
                    mainWindow.webContents.send('product:errorUpdate', '');
                }
            });
        });

        ipcMain.on('delete-product', (event, productToDelete) => {
            winston.info(`Request to delete product: ${productToDelete.code}`, loggingOptions);

            ProductService.remove(productToDelete).then(productDeletedId => {
                console.log(productDeletedId);
                mainWindow.webContents.send('product:deleted', productDeletedId);
            });
        });
    }

    return {
        init: init 
    }
}

module.exports = ProductsIpc;