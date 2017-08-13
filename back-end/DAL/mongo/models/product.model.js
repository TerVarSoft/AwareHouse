var mongoose = require('../mongoose.wrapper');

var productSchema = mongoose.Schema({
    code: String,
    description: String,
    type: Number,
    color: String,
    price: [Number],
    quantity: Number
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;
