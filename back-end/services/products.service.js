const winston = require('./../winston.wrapper');
const ProductDAO = require('./../DAL/DAO/products.DAO')();

const loggingOptions = { layer: "services", file: "products.service.js" };

const ProductService = function() {
    const findAll = function() {
        return ProductDAO.findAll();
    }

    const save = function(productToUpdate) {
        if(!productToUpdate.id) {
            winston.verbose(`No product id found for: ${productToUpdate.code}, Creating the product` , 
                loggingOptions);

            return ProductDAO.create(productToUpdate);
        } else {
            return ProductDAO.update(productToUpdate);
        }
    }

    const remove = function(productToDelete) {
        return ProductDAO.remove(productToDelete);
    }

    return {
        findAll: findAll,
        save: save,
        remove: remove
    }
}

module.exports = ProductService;