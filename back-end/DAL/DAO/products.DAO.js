var productMongo = require('../mongo/models/product.model');

var ProductDAO = function() {

    var find = function() {
        return productMongo.find({}).then((products) => {
            return products.map(product => product._doc);
        });
    }

    return {
        find: find
    }
}

module.exports = ProductDAO;
