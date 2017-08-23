const mongoose = require('mongoose');
const winston = require('./../../winston.wrapper');
var sellingMongo = require('../mongo/models/selling.model');

const loggingOptions = { layer: "dal", file: "sellings.DAO.js" };

const SellingDAO = function () {

    const findAll = function () {
        return sellingMongo.find({})
            .sort('code')
            .then((sellings) => {
                return sellings.map(selling => {
                    selling.id = selling._id;
                    return selling.toObject();
                });
            })
    }

    const create = function (newSellingtData) {
        let newSelling = new sellingMongo(newSellingtData);

        return newSelling.save(() => { }).then(savedSelling => {
            winston.info(`Selling created successfully: ${savedSelling.code} with id: ${savedSelling._id}`);
            winston.verbose(`${savedSelling}`, loggingOptions);

            savedSelling.id = savedSelling._id;
            return savedSelling.toObject();
        });
    }

    const update = function (sellingToUpdate) {
        return sellingMongo
            .findById(sellingToUpdate.id)
            .then(foundSelling => {
                winston.verbose(`Found Selling: ${foundSelling.code} with id: ${foundSelling._id}`);

                foundSelling.code = sellingToUpdate.code;

                return foundSelling.save().then(savedSelling => {
                    winston.info(`Selling saved successfully: ${savedSelling.code} with id: ${savedSelling._id}`);
                    winston.verbose(`${savedSelling}`, loggingOptions);

                    savedSelling.id = savedSelling._id;
                    return savedSelling.toObject();
                });
            }, () => {
                winston.verbose(`No selling found with ${id}`);
            });
    }

    const remove = function (sellingtToDelete) {
        return sellingMongo
            .findById(sellingtToDelete.id)
            .then(foundSelling => {
                winston.verbose(`Found Selling: ${foundSelling.code} with id: ${foundSelling._id}`);

                return foundSelling.remove().then(() => {
                    winston.info(`Selling deleted successfully: ${foundSelling.code} with id: ${foundSelling._id}`);

                    return foundSelling._id.toString();
                });
            });
    }

    return {
        findAll: findAll,
        create: create,
        update: update,
        remove: remove
    }
}

module.exports = SellingDAO;
