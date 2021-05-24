const configurationService = require("../service/configuration.service");
const configurationSaveService = require("../service/configuration.save.service");
const {sendJson} = require("./controller.util");


class ConfigurationController {

    list(req, res, next) {
        sendJson(res, configurationService.getAllConfigurations());
    }

    configuration(req, res, next) {
        const key = req.query['key'];
        sendJson(res, configurationService.findByKey(key));
    }

    submit(req, res, next) {
        sendJson(res, configurationSaveService.saveOrUpdateConfigurations(req.body));
    }

}


module.exports = new ConfigurationController();