var winston = require('winston');

winston.level = 'debug';

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            level: 'verbose',
            timestamp: function () {
                return new Date().toLocaleString();
            },
        })
    ]
});

module.exports = logger;
