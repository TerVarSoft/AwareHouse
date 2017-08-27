var mongoose = require('../mongoose.wrapper');

var productPriceSchema = mongoose.Schema({
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
    tags: String,
    realPrice: Number,
    prices: [productPriceSchema],
    quantity: Number
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;
