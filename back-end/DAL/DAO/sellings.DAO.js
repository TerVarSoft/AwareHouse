const mongoose = require('mongoose');
const winston = require('./../../winston.wrapper');
const _ = require('lodash');
var sellingMongo = require('../mongo/models/selling.model');

const loggingOptions = { layer: "dal", file: "sellings.DAO.js" };

const SellingDAO = function () {

    const findAll = function (options) {
        const itemsPerPage = options.limit || 10;
        const now = new Date();
        const sellingsDayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        const sellingsDayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);

        return sellingMongo.count().then(count => {
            return sellingMongo.aggregate([{
                $match: { createdAt: { $gte: sellingsDayStart, $lt: sellingsDayEnd } },
            }, {
                $group: {
                    _id: null,
                    total: {
                        $sum: { $multiply: ['$price', '$quantity'] }
                    }
                }
            }]).then(totalData => {
                return sellingMongo.find({})
                    .sort('-createdAt')
                    .skip((options.page - 1) * itemsPerPage)
                    .limit(itemsPerPage)
                    .then(sellings => {
                        return {
                            meta: {
                                count: count,
                                totalDay: totalData[0] ? totalData[0].total : 0
                            },
                            data: sellings.map(selling => {
                                selling.id = selling._id;
                                return selling.toObject();
                            })
                        }
                    });
            });
        });
    }

    const findWithStatistics = function (options) {
        const itemsPerPage = options.limit || 10;

        const start = new Date(options.start);
        const end = new Date(options.end);
        const sellingsDayStart = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0);
        const sellingsDayEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate() + 1, 0, 0, 0);

        winston.info(`Sellings with statistics retrieving from: ${sellingsDayStart}, to: ${sellingsDayEnd}`, loggingOptions);

        const query = { createdAt: { $gte: sellingsDayStart, $lt: sellingsDayEnd } };

        return sellingMongo.count(query).then(count => {
            return sellingMongo.aggregate([{
                $match: query,
            }, {
                $project: {
                    'createdAt': { $subtract: ['$createdAt', 4 * 60 * 60 * 1000] },
                    'total': { $multiply: ['$price', '$quantity'] },
                    'totalRevenue': { $multiply: ['$quantity', { $subtract: ['$price', '$realPrice'] }] }
                }
            }, {
                $group: {
                    _id: { "year": { "$year": "$createdAt" }, "month": { "$month": "$createdAt" }, "day": { "$dayOfMonth": "$createdAt" } },
                    totalPerDay: { $sum: '$total' },
                    revenueTotalPerDay: { $sum: '$totalRevenue' }
                },
            }, {
                $group: {
                    _id: null,
                    total: { $sum: '$totalPerDay' },
                    totalAvg: { $avg: '$totalPerDay' },
                    revenueAvg: { $avg: '$revenueTotalPerDay' }
                }
            }]).then(statisticsData => {
                winston.info(`Statistics:`, statisticsData);

                return sellingMongo.find(query)
                    .sort('-createdAt')
                    .skip((options.page - 1) * itemsPerPage)
                    .limit(itemsPerPage)
                    .then(sellings => {
                        return {
                            meta: {
                                count: count,
                                averagePerDay: statisticsData[0] ? statisticsData[0].totalAvg : 0,
                                revenueAvg: statisticsData[0] ? statisticsData[0].revenueAvg : 0,
                                total: statisticsData[0] ? statisticsData[0].total : 0
                            },
                            data: sellings.map(selling => {
                                selling.id = selling._id;
                                return selling.toObject();
                            })
                        }
                    });
            })

        });
    }

    const findByCode = function (code) {
        return sellingMongo.find({ code: code })
            .then(sellings => {
                return sellings.map(selling => {
                    selling.id = selling._id;
                    return selling.toObject();
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
        findWithStatistics: findWithStatistics,
        findByCode: findByCode,
        createMultiple: createMultiple,
        update: update,
        remove: remove
    }
}

module.exports = SellingDAO;
