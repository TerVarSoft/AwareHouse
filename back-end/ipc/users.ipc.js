const winston = require('./../winston.wrapper');
const { ipcMain } = require('electron');

const loggingOptions = { layer: "ipc", file: "users.ipc.js" };

const UserService = require('./../services/users.service')();

const UsersIpc = function(mainWindow) {

    var init = function() {
        var self = this;
        ipcMain.on('get-users', () => {
            winston.info('Requesting all users', loggingOptions);

            UserService.findAll().then(function(users) {
                mainWindow.webContents.send('users:updated', users);
            });
        });

        ipcMain.on('save-user', (event, userToUpdate) => {
            winston.info(`Request to save user: ${userToUpdate.name}`, loggingOptions);
            winston.verbose(`${JSON.stringify(userToUpdate)}`, loggingOptions);

            UserService.save(userToUpdate).then(userUpdated => {
                if(userUpdated) {
                    mainWindow.webContents.send('user:updated', userUpdated);
                } else {
                    mainWindow.webContents.send('user:errorUpdate', '');
                }
            });
        });

        ipcMain.on('delete-user', (event, userToDelete) => {
            winston.info(`Request to delete user: ${userToDelete.name}`, loggingOptions);

            UserService.remove(userToDelete).then(userDeletedId => {
                mainWindow.webContents.send('user:deleted', userDeletedId);
            });
        });
    }

    return {
        init: init 
    }
}

module.exports = UsersIpc;