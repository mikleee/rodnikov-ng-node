const router = require('express').Router();

const productAttributeTemplateController = require("../controller/product.attribute.template.controller");
const authController = require("../controller/auth.controller");

router.get('/list', productAttributeTemplateController.list);
router.get('/template/:id', productAttributeTemplateController.template);
router.post('/submit', authController.checkAuthForRestCall, productAttributeTemplateController.submit);
router.post('/delete', authController.checkAuthForRestCall, productAttributeTemplateController.delete);


module.exports = router;