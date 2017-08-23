var mongoose = require('../mongoose.wrapper');


var sellingSchema = mongoose.Schema({
    id: String,
    code: String
});

var Selling = mongoose.model('Selling', sellingSchema);

module.exports = Selling;
