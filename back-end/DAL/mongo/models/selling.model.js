var mongoose = require('../mongoose.wrapper');
const AutoIncrement = require('mongoose-sequence')(mongoose);

var sellingItemSchema = mongoose.Schema({
    quantity: Number,
    productId: String,
    product: String,
});

var sellingSchema = mongoose.Schema({
    id: String,
    code: Number,
    createdAt:  {type: Date, default: Date.now},
    sellerId: String,
    seller: String,
    items: [sellingItemSchema]
});

sellingSchema.plugin(AutoIncrement, {inc_field: 'code'});

var Selling = mongoose.model('Selling', sellingSchema);

module.exports = Selling;
