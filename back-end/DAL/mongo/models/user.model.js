var mongoose = require('../mongoose.wrapper');

var userSchema = mongoose.Schema({
    id: String,
    role: Number,
    code: String,
    name: String,
    lastName: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
