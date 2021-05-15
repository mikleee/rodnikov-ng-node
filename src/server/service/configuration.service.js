const ModelService = require("./model.service");
const {Configuration} = require("../db/configuration.model");
const enums = require("../db/model.enum");

class ConfigurationService extends ModelService {

    constructor() {
        super(Configuration);
    }


    async getAllConfigurations() {
        let allowedKeys = Object.values(enums.ConfigurationKey);
        let result = await super.getAll();
        let persistedKeys = result.map(c => c.key);

        for (const key of allowedKeys) {
            if (!persistedKeys.includes(key)) {
                result.push({key: key, value: null});
            }
        }
        return result;
    }

    async saveOrUpdateConfigurations(models) {
        return await Promise.all(
            models.map(m => this.saveOrUpdateConfiguration(m))
        )
    }

    async saveOrUpdateConfiguration(model) {
        let result = await this.findByKey(model.key);
        if (result) {
            result.value = model.value;
            return await result.save()
        } else {
            result = await Configuration.create({key: model.key, value: model.value});
        }
        return result;
    }

    findByKey(key) {
        return Configuration.findOne({key: key});
    }

    async getNumberByKey(key, defaultValue) {
        let result = await this.getValueByKey(key, defaultValue);
        if (result == null) {
            return null;
        } else if (isNaN(result)) {
            return 0;
        } else {
            return Number(result);
        }
    }

    async getValueByKey(key, defaultValue) {
        let config = await this.findByKey(key);
        let result;
        if (config) {
            result = config.value;
        }
        return result ?? defaultValue;
    }

}

module.exports = new ConfigurationService();