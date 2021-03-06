const mongoose = require('mongoose');
const winston = require('./../../winston.wrapper');
const _ = require('lodash/core');
var userMongo = require('../mongo/models/user.model');

const loggingOptions = { layer: "dal", file: "users.DAO.js" };

const UserDAO = function () {

    const findAll = function () {
        return userMongo.find({})
            .sort('name')
            .then((users) => {
                return users.map(user => {
                    user.id = user._id;
                    return user.toObject();
                });
            })
    }

    const findById = function (userId) {
        return userMongo.findById(userId);
    }

    const findByIds = function (userIds) {
        return userMongo.find({
            '_id': {
                $in: _.map(userIds, userId => new mongoose.Types.ObjectId(userId))
            }
        }).then(users => {
            return users.map(user => {
                user.id = user._id;
                return user.toObject();
            });
        });
    }

    const findByCode = function (code) {
        return userMongo.findOne({ code: code })
            .then(foundUser => {
                if (foundUser) {
                    foundUser.id = foundUser._id;
                    winston.verbose(`Found User by code: ${foundUser.name} with id: ${foundUser._id}`);
                } else {
                    winston.warn(`No user found by code`);
                }

                return foundUser;
            });
    }

    const create = function (newUserData) {
        let newUser = new userMongo(newUserData);

        return newUser.save(() => { }).then(savedUser => {
            winston.info(`User created successfully: ${savedUser.code} with id: ${savedUser._id}`);
            winston.verbose(`${savedUser}`, loggingOptions);

            savedUser.id = savedUser._id;
            return savedUser.toObject();
        });
    }

    const update = function (userToUpdate) {
        return userMongo
            .findById(userToUpdate.id)
            .then(foundUser => {
                winston.verbose(`Found User: ${foundUser.name} with id: ${foundUser._id}`);

                foundUser.role = userToUpdate.role;
                foundUser.name = userToUpdate.name;
                foundUser.lastName = userToUpdate.lastName;
                foundUser.code = userToUpdate.code;

                return foundUser.save().then(savedUser => {
                    winston.info(`User saved successfully: ${savedUser.name} with id: ${savedUser._id}`);
                    winston.verbose(`${savedUser}`, loggingOptions);

                    savedUser.id = savedUser._id;
                    return savedUser.toObject();
                });
            }, () => {
                winston.verbose(`No user found with ${id}`);
            });
    }

    const remove = function (userToDelete) {
        return userMongo
            .findById(userToDelete.id)
            .then(foundUser => {
                winston.verbose(`Found User: ${foundUser.name} with id: ${foundUser._id}`);

                return foundUser.remove().then(() => {
                    winston.info(`User deleted successfully: ${foundUser.code} with id: ${foundUser._id}`);

                    return foundUser._id.toString();
                });
            });
    }

    return {
        findAll: findAll,
        findByIds: findByIds,
        findById: findById,
        findByCode: findByCode,
        create: create,
        update: update,
        remove: remove
    }
}

module.exports = UserDAO;
