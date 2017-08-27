var mongoose = require('../mongoose.wrapper');
const AutoIncrement = require('mongoose-sequence')(mongoose);

var sellingSchema = mongoose.Schema({
    id: String,
    code: Number,
    createdAt:  {type: Date, default: Date.now},
    seller: String,
    quantity: Number,
    price: Number,
    productId: String,
    product: String,
});

sellingSchema.plugin(AutoIncrement, {inc_field: 'code'});

var Selling = mongoose.model('Selling', sellingSchema);

module.exports = Selling;
