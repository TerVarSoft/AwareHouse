const { ipcMain } = require('electron');

var ProductService = require('./../services/products.service')();

var ProductsIpc = function(mainWindow) {

    var init = function() {
        var self = this;
        ipcMain.on('get-products', () => {
            console.log("Requesting products...");

            ProductService.find().then(function(products) {
                console.log(products);
                mainWindow.webContents.send('products', products);
            });
        });
    }

    return {
        init: init 
    }
}

module.exports = ProductsIpc;