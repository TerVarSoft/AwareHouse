const mongoose = require('mongoose');
const winston = require('./../../winston.wrapper');
const _ = require('lodash');
var sellingMongo = require('../mongo/models/selling.model');

const loggingOptions = { layer: "dal", file: "sellings.DAO.js" };

const SellingDAO = function () {

    const findAll = function (options) {
        const itemsPerPage = options.limit || 10;

        return sellingMongo.count().then(count => {
            return sellingMongo.find({})
                .sort('-createdAt')
                .skip((options.page - 1) * itemsPerPage)
                .limit(itemsPerPage)
                .then(sellings => {
                    return {
                        meta: {
                            count: count
                        },
                        data: sellings.map(selling => {
                            selling.id = selling._id;
                            return selling.toObject();
                        })
                    }
                });
        });
    }


    const createMultiple = function (newSellings) {


        let newFirstSelling = new sellingMongo(_.pullAt(newSellings, [0])[0]);

        return newFirstSelling.save().then(firstSellCreated => {

            newSellings = _.map(newSellings, selling => {
                selling.code = firstSellCreated.code;
                return selling;
            });

            return sellingMongo.insertMany(newSellings).then(savedSellings => {

                savedSellings.splice(0, 0, firstSellCreated);

                winston.info(`Sellings created successfully: ${savedSellings.length}`, loggingOptions);
                winston.verbose(`${savedSellings}`, loggingOptions);
                return savedSellings.map(selling => {
                    selling.id = selling._id;
                    return selling.toObject();
                });
            });
        });

        return newSellings.create(newSellings).then(savedSelling => {
            winston.info(`Selling created successfully with id: ${savedSelling._id}`);
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
        createMultiple: createMultiple,
        update: update,
        remove: remove
    }
}

module.exports = SellingDAO;
