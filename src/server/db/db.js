const mongoose = require('mongoose');
const environment = require('../app.environment')
const logger = require('../service/logger').createLogger('db')

let dbUrl = environment.environmentDbUrl;


let db = mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    poolSize: 10,
    useUnifiedTopology: true
});
db.then(
    value => logger.info(`Success on connecting to ${dbUrl}`),
    reason => logger.error(`Error on connecting to ${dbUrl}: ${reason.stack}`)
)

if (environment.environmentDbTestData) {
    require('./db.test-data')
}

module.exports = db;




