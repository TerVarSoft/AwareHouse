const winston = require('./../winston.wrapper');
const _ = require('lodash');
const ProductDao = require('./../DAL/DAO/products.DAO')();
const UsersDAO = require('./../DAL/DAO/users.DAO')();
const SellingDAO = require('./../DAL/DAO/sellings.DAO')();

const loggingOptions = { layer: "services", file: "sellings.service.js" };

const SellingService = function () {

    const requestSellingCreate = function (request) {
        return UsersDAO.findByCode(request.userCode).then(function (user) {
            if (user) {

                request.selling.sellerId = user.id;
                return SellingDAO.create(request.selling).then(() => {
                    return findAll();
                })
            } else {
                winston.warn(`No user found by code, Rejecting the selling creation`,
                    loggingOptions);

                return null;
            }
        });
    }

    const findAll = function () {
        return SellingDAO.findAll().then(sellings => {
            const productIds = _.flatMap(sellings, selling => {
                return _.map(selling.items, sellingItem => {
                    return sellingItem.productId;
                })
            });

            const userIds = _.map(sellings, selling => selling.sellerId);

            return UsersDAO.findByIds(userIds).then(users => {
                return ProductDao.findByIds(productIds, { properties: 'code' }).then(products => {
                    return _.map(sellings, selling => {
                        var seller = _.find(users, ['id', selling.sellerId]);

                        return {
                            createdAt: selling.createdAt,
                            code: selling.code,
                            seller: `${seller.name} ${seller.lastName}`,
                            items: _.map(selling.items, item => {

                                var productCode = _.find(products, ['id', item.productId]).code;
                                
                                return {
                                    quantity: item.quantity,
                                    product: productCode
                                }
                            })
                        }
                    });
                })
            });

        });
    }

    const save = function (sellingToUpdate) {
        if (!sellingToUpdate.id) {
            winston.verbose(`No selling id found for: ${sellingToUpdate.code}, Creating the selling`,
                loggingOptions);

            return SellingDAO.create(sellingToUpdate);
        } else {
            return SellingDAO.update(sellingToUpdate);
        }
    }

    const remove = function (sellingToDelete) {
        return SellingsDAO.remove(sellingToDelete);
    }

    return {
        findAll: findAll,
        requestSellingCreate: requestSellingCreate,
        save: save,
        remove: remove
    }
}

module.exports = SellingService;