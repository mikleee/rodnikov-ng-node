const router = require('express').Router();

const configurationController = require("../controller/configuration.controller");
const authController = require("../controller/auth.controller");


router.get('/list', authController.checkAuthForRestCall, configurationController.list);
router.get('/configuration', authController.checkAuthForRestCall, configurationController.configuration);
router.post('/submit', authController.checkAuthForRestCall, configurationController.submit);


module.exports = router;