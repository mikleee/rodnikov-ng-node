var express = require('express');
var router = express.Router();


const authController = require("../controller/auth.controller");


router.get([
    '/catalogue**',
    '/configuration**'
], [authController.checkAuthForRenderCall, render]);

router.get('**', render);


function render(req, res, next) {
    res.render('main', {title: 'Express'});
}


module.exports = router;
