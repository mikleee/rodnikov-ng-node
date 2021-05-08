const mongoose = require('mongoose');
const appConfig = require('../app.config')
const logger = require('../service/logger').createLogger('db')

let dbUrl = appConfig["db.url"];


let db = mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    poolSize: 10,
    useUnifiedTopology: true
});
db.then(
    value => logger.info(`Success on connecting to ${dbUrl}`),
    reason => logger.error(`Error on connecting to ${dbUrl}: ${reason.stack}`)
)

if (appConfig["db.test.data"]) {
    require('./db.test-data')
}

module.exports = db;




