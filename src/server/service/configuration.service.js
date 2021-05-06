const ModelService = require("./model.service");
const {Configuration} = require("../db/configuration.model");

class ConfigurationService extends ModelService {

    constructor() {
        super(Configuration);
    }

    findByKey(key) {
        return Configuration.findOne({key: key});
    }

}

module.exports = new ConfigurationService();