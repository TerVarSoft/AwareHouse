const winston = require('./../winston.wrapper');
const _ = require('lodash/core');
const { ipcMain } = require('electron');
const UserService = require('./../services/users.service')();

const loggingOptions = { layer: "ipc", file: "public.ipc.js" };

const PublicIpc = function (windows, adminWindow) {

    var init = function () {

        ipcMain.on('open-admin', (event, accessCode) => {
            winston.info('Request to open Admin', loggingOptions);

            UserService.validateAdminCode(accessCode).then(isAdmin => {
                if(isAdmin) {
                    adminWindow.open();
                } else {
                    winston.warn('The user is not admin, Request to open Admin denied', loggingOptions);
                    notifyWindows('public:noAdminRole', '');
                }
            });
            
            
        });

        function notifyWindows(channel, data) {
            _.each(windows, window => {
                if (window.object) {
                    window.content().send(channel, data);
                }
            });
        }
    }

    return {
        init: init
    }
}

module.exports = PublicIpc;