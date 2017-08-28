const winston = require('./../winston.wrapper');
const _ = require('lodash');
const ProductDao = require('./../DAL/DAO/products.DAO')();
const UsersDAO = require('./../DAL/DAO/users.DAO')();
const SellingDAO = require('./../DAL/DAO/sellings.DAO')();

const loggingOptions = { layer: "services", file: "sellings.service.js" };

const SellingService = function () {

    var PRODUCT_COLORS = [
        { key: 0, value: 'Natural' },
        { key: 1, value: 'Titanio' },
        { key: 2, value: 'Champagne' },
        { key: 3, value: 'Blanco' },
    ];

    const requestSellingCreate = function (request) {
        return UsersDAO.findByCode(request.userCode).then(function (user) {
            if (user) {

                return save(request.sellings, user).then(() => {
                    return findAll({ page: 1 });
                })
            } else {
                winston.warn(`No user found by code, Rejecting the selling creation`,
                    loggingOptions);

                return null;
            }
        });
    }

    const save = function (sellings, user) {
        const productIds = _.map(sellings, selling => {
            return selling.productId;
        });

        return ProductDao.findByIds(productIds).then(products => {

            sellings = _.map(sellings, selling => {
                var sellingProduct = _.find(products, ['id', selling.productId]);

                /**Update product after selling */
                sellingProduct.quantity = sellingProduct.quantity - selling.quantity;
                sellingProduct.quantity = sellingProduct.quantity >= 0 ?
                    sellingProduct.quantity : 0;
                ProductDao.update(sellingProduct);

                selling.seller = `${user.name} ${user.lastName}`;
                selling.realPrice = sellingProduct.realPrice;
                selling.product = `${sellingProduct.code} - ${sellingProduct.description} (${PRODUCT_COLORS[sellingProduct.color].value})`

                return selling;
            });

            return SellingDAO.createMultiple(sellings);
        });
    }

    const findAll = function (options) {
        return SellingDAO.findAll(options);
    }

    const findByCode = function (code) {
        return SellingDAO.findByCode(code);
    }

    const findWithStatistics = function (options) {
        return SellingDAO.findWithStatistics(options);
    }

    const remove = function (sellingToDelete) {
        return SellingsDAO.remove(sellingToDelete);
    }

    return {
        findAll: findAll,
        findByCode: findByCode,
        findWithStatistics: findWithStatistics,
        requestSellingCreate: requestSellingCreate,
        save: save,
        remove: remove
    }
}

module.exports = SellingService;