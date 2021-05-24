const router = require('express').Router();

const authController = require("../controller/auth.controller");


router.get('/session', authController.getSession);
router.post('/login', authController.login);
router.post('/logout', authController.logout);


module.exports = router;