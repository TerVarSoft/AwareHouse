var ProductDAO = require('./../DAL/DAO/products.DAO')();

var ProductService = function() {
    var find = function() {
        return ProductDAO.find();
    }

    return {
        find: find
    }
}

module.exports = ProductService;