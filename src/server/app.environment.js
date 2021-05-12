const logger = require("./service/logger").createLogger('app.environment');


let arguments = process.argv;

let properties = arguments
    .reduce((acc, argument) => {
        if (argument.includes('=')) {
            let parts = argument.split('=');
            acc[parts[0]] = parts[1];
        }
        return acc;
    }, {});


let profile = properties.profile || '';
logger.info(`Starting with ${profile} profile`);

let config;
// noinspection JSUnreachableSwitchBranches
switch (profile) {
    case '':
        config = {};
        break;
    case 'dev':
        config = {
            environmentDbUrl: 'mongodb://localhost:27017/rodnikov',
            environmentDbTestData: true,
        }
        break;
    case 'heroku':
        config = configProperties = {
            environmentDbUrl: 'mongodb+srv://rodnikov:rodnikov@rodnikov.bbr0r.mongodb.net/rodnikov?retryWrites=true&w=majority',
            environmentDbTestData: true,
        }
        break;
    default:
        throw `Profile ${profile} is not supported`;
}

let defaultProperties = {
    environmentDbUrl: 'mongodb://localhost:27017/rodnikov',
    environmentDbTestData: true,
    environmentAppPort: 3000,
}

config = {...defaultProperties, ...config};
for (const [k, v] of Object.entries(config)) {
    logger.info(`${k} = ${v}`);
}


module.exports = config;