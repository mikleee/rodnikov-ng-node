const configurationService = require("./configuration.service");
const enums = require("../db/model.enum");
const fetch = require("node-fetch");
const logger = require("./logger").createLogger('configuration.service');


class CurrencyRateSyncService {
    intervalId;

    constructor() {
    }

    async schedule() {
        let enabled = await configurationService.getBooleanByKey(enums.ConfigurationKey.CURRENCY_USD_TO_UAH_SYNC_ENABLED, false);
        await this.updateConfig(enabled);
    }

    async updateConfig(enabled) {
        this.#stopSync();
        if (enabled) {
            await this.syncCurrencyRate();
            this.#startSync()
        }
    }

    async syncCurrencyRate() {
        let result = await this.#getCurrencyRate();
        await configurationService.saveOrUpdateConfigurations([
            {
                key: enums.ConfigurationKey.CURRENCY_USD_TO_UAH,
                value: result
            }
        ]);
    }


    #startSync() {
        this.intervalId = setInterval(async () => {
            await this.syncCurrencyRate()
        }, 1000 * 60 * 30);
    }

    #stopSync() {
        if (this.intervalId) {
            clearInterval(this.intervalId)
        }
    }

    async #getCurrencyRate() {
        let result;
        let url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
        try {
            let response = await fetch(url);
            let body = await response.json();
            for (const i of body) {
                if ('USD' === i.ccy && 'UAH' === i.base_ccy) {
                    result = Number(i.sale).toFixed(2);
                    break;
                }
            }
        } catch (e) {
            logger.error(e.stack);
        }
        if (isNaN(result)) {
            throw `Can't retrieve USD UAH rate from ${url}`;
        }

        return result;
    }

}


module.exports = new CurrencyRateSyncService();