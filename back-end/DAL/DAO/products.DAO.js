const mongoose = require('mongoose');
const winston = require('./../../winston.wrapper');
var productMongo = require('../mongo/models/product.model');

const loggingOptions = { layer: "dal", file: "products.DAO.js" };

const ProductDAO = function () {

    const findAll = function () {
        return productMongo.find({})
            .sort('code')
            .then((products) => {
                return products.map(product => {
                    product.id = product._id;
                    return product.toObject();
                });
            })
    }

    const create = function (newProductData) {
        let newProduct = new productMongo(newProductData);

        return newProduct.save(() => { }).then(savedProduct => {
            winston.info(`Product created successfully: ${savedProduct.code} with id: ${savedProduct._id}`);
            winston.verbose(`${savedProduct}`, loggingOptions);

            savedProduct.id = savedProduct._id;
            return savedProduct.toObject();
        });
    }

    const update = function (productToUpdate) {
        return productMongo
            .findById(productToUpdate.id)
            .then(foundProduct => {
                winston.verbose(`Found Product: ${foundProduct.code} with id: ${foundProduct._id}`);

                foundProduct.type = productToUpdate.type;
                foundProduct.code = productToUpdate.code;
                foundProduct.description = productToUpdate.description;
                foundProduct.quantity = productToUpdate.quantity;
                foundProduct.color = productToUpdate.color;
                foundProduct.prices = productToUpdate.prices;

                return foundProduct.save().then(savedProduct => {
                    winston.info(`Product saved successfully: ${savedProduct.code} with id: ${savedProduct._id}`);
                    winston.verbose(`${savedProduct}`, loggingOptions);

                    savedProduct.id = savedProduct._id;
                    return savedProduct.toObject();
                });
            }, () => {
                winston.verbose(`No product found with ${id}`);
            });
    }

    const remove = function (productToDelete) {
        return productMongo
            .findById(productToDelete.id)
            .then(foundProduct => {
                winston.verbose(`Found Product: ${foundProduct.code} with id: ${foundProduct._id}`);

                return foundProduct.remove().then(() => {
                    winston.info(`Product deleted successfully: ${foundProduct.code} with id: ${foundProduct._id}`);

                    return foundProduct._id.toString();
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

module.exports = ProductDAO;
