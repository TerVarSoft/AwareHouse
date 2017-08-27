const winston = require('./../winston.wrapper');
var randomstring = require("randomstring");
const UserDAO = require('./../DAL/DAO/users.DAO')();

const loggingOptions = { layer: "services", file: "users.service.js" };

const UserService = function () {
    const findAll = function () {
        return UserDAO.findAll();
    }

    const save = function (userToUpdate) {
        if (!userToUpdate.id) {
            winston.verbose(`No user id found for: ${userToUpdate.name}, Creating the user`,
                loggingOptions);

            userToUpdate.code = randomstring.generate({
                length: 4,
                readable: true,
                capitalization: 'lowercase'
            });

            return UserDAO.create(userToUpdate);
        } else {
            return UserDAO.update(userToUpdate);
        }
    }

    const remove = function (userToDelete) {
        return UserDAO.remove(userToDelete);
    }

    const validateAdminCode = function (code) {
        return UserDAO.findByCode(code).then(user => {
            // True if Admin
            return (user && user.role == 0);
        });
    }

    return {
        findAll: findAll,
        save: save,
        remove: remove,
        validateAdminCode: validateAdminCode
    }
}

module.exports = UserService;