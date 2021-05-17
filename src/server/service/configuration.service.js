const ModelService = require("./model.service");
const {Configuration} = require("../db/configuration.model");
const enums = require("../db/model.enum");
const logger = require("./logger").createLogger('configuration.service');

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
        let initialValue = result?.value;
        if (result) {
            result.value = model.value;
            result = await result.save()
        } else {
            result = await Configuration.create({key: model.key, value: model.value});
        }
        if (initialValue !== model.value) {
            logger.info(`Update ${model.key} form '${initialValue}' to '${model.value}'`)
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
            logger.warn(`${result} + is not valid number for ${key}`);
            return 0;
        } else {
            return Number(result);
        }
    }

    async getBooleanByKey(key, defaultValue) {
        let result = await this.getValueByKey(key, defaultValue);
        return result === true || (typeof result === 'string' && 'true' === result.toUpperCase());
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