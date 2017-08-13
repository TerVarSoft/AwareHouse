(function () {
    'use strict';

    var awareHouseApp = angular.module('awareHouseApp');

    awareHouseApp.run(['electron', 'Products',
        function(electron, Products) {
            
            electron.ipcRenderer.on('products', (event, msg) => {
                console.log(msg);
                console.log("Los productos llegaron en el canal correcto!");
                Products.set(msg);
            });
        }
    ]);
})();


