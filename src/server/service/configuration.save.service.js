const configurationService = require("./configuration.service");
const currencyRateSyncService = require("./currency.rate.synch.service");
const enums = require("../db/model.enum");

class ConfigurationSaveService {

    async saveOrUpdateConfigurations(models) {
        await configurationService.saveOrUpdateConfigurations(models);
        for (const model of models) {
            switch (model.key) {
                case enums.ConfigurationKey.CURRENCY_USD_TO_UAH_SYNC_ENABLED:
                    await currencyRateSyncService.updateConfig(model.value)
                    break;

            }
        }
        return models;
    }

}

module.exports = new ConfigurationSaveService();