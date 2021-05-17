const Router = require("./router");
const configurationService = require("../service/configuration.service");
const configurationSaveService = require("../service/configuration.save.service");
const router = new Router();

router.get('/list', async (req, res, next) => {
    return await configurationService.getAllConfigurations();
});

router.get('/configuration', async (req, res, next) => {
    const key = req.query['key'];
    return await configurationService.findByKey(key);
});

router.post('/submit', async (req, res, next) => {
    return await configurationSaveService.saveOrUpdateConfigurations(req.body);
});


module.exports = router.getRouter();
