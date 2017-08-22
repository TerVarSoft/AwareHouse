const winston = require('./../winston.wrapper');
const _ = require('lodash/core');
const { ipcMain } = require('electron');

const loggingOptions = { layer: "ipc", file: "users.ipc.js" };

const UserService = require('./../services/users.service')();

const UsersIpc = function (windows) {

    var init = function () {

        ipcMain.on('get-users', () => {
            winston.info('Requesting all users', loggingOptions);

            UserService.findAll().then(function (users) {
                notifyWindows('users:updated', users);
            });
        });

        ipcMain.on('save-user', (event, userToUpdate) => {
            winston.info(`Request to save user: ${userToUpdate.name}`, loggingOptions);
            winston.verbose(`${JSON.stringify(userToUpdate)}`, loggingOptions);

            UserService.save(userToUpdate).then(userUpdated => {
                if (userUpdated) {
                    notifyWindows('user:updated', userUpdated);
                } else {
                    notifyWindows('user:errorUpdated', '');
                }
            });
        });

        ipcMain.on('delete-user', (event, userToDelete) => {
            winston.info(`Request to delete user: ${userToDelete.name}`, loggingOptions);

            UserService.remove(userToDelete).then(userDeletedId => {
                notifyWindows('user:deleted', userDeletedId);
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

module.exports = UsersIpc;