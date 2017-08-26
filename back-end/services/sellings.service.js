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
                return save(request.selling).then(() => {
                    return findAll();
                })
            } else {
                winston.warn(`No user found by code, Rejecting the selling creation`,
                    loggingOptions);

                return null;
            }
        });
    }

    const save = function (sellingToUpdate) {
        const productIds = _.map(sellingToUpdate.items, sellingItem => {
            return sellingItem.productId;
        });

        return UsersDAO.findById(sellingToUpdate.sellerId).then(seller => {
            return ProductDao.findByIds(productIds).then(products => {

                sellingToUpdate.seller = `${seller.name} ${seller.lastName}`,

                    sellingToUpdate.items = _.map(sellingToUpdate.items, sellingItem => {
                        var sellingItemProduct = _.find(products, ['id', sellingItem.productId]);

                        /**Update product after selling */
                        sellingItemProduct.quantity = sellingItemProduct.quantity - sellingItem.quantity;
                        sellingItemProduct.quantity = sellingItemProduct.quantity >= 0 ? sellingItemProduct.quantity : 0;
                        ProductDao.update(sellingItemProduct);

                        return {
                            quantity: sellingItem.quantity,
                            price: sellingItem.price,
                            productId: sellingItem.productId,
                            product: `${sellingItemProduct.code} - ${sellingItemProduct.description}`
                        }
                    })

                if (!sellingToUpdate.id) {
                    winston.verbose(`No selling id found for: ${sellingToUpdate.code}, Creating the selling`,
                        loggingOptions);

                    return SellingDAO.create(sellingToUpdate).then();
                } else {
                    return SellingDAO.update(sellingToUpdate);
                }
            });
        });
    }

    const findAll = function () {
        return SellingDAO.findAll();
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