var mongoose = require('../mongoose.wrapper');

var productPriceShema = mongoose.Schema({
    _id: String,
    type: Number,
    value: Number
});

var productSchema = mongoose.Schema({
    id: String,
    code: String,
    description: String,
    type: Number,
    color: Number,
    prices: [productPriceShema],
    quantity: Number
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;
