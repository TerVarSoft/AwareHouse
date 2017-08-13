var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/awarehouse', {
  useMongoClient: true
});

module.exports = mongoose;
