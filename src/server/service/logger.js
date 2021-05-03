const winston = require('winston');


const format = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss:SSS'
    }),
    winston.format.printf((obj) => {
        return `[${obj.timestamp}] [${obj.level.toUpperCase()}] [${obj.loggerName || 'root'}]: ${obj.message}`;
    })
);


function createLogger(name) {
    const logger = winston.createLogger({
        level: 'debug',
        format: format,
        defaultMeta: {loggerName: name},
        transports: [
            //
            // - Write all logs with level `error` and below to `error.log`
            // - Write all logs with level `info` and below to `combined.log`
            //
            new winston.transports.File({filename: 'error.log', level: 'error'}),
            new winston.transports.File({filename: 'log.log'}),
        ],
    });


    if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: format,
        }));
    }
    return logger;
}


module.exports = {
    createLogger: createLogger
}