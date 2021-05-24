const router = require('express').Router();

const productAttributeController = require("../controller/product.attribute.controller");
const authController = require("../controller/auth.controller");

router.get('/list-for-product/:id', productAttributeController.listForProduct);
router.post('/submit', authController.checkAuthForRestCall, productAttributeController.submit);
router.post('/delete', authController.checkAuthForRestCall, productAttributeController.delete);


module.exports = router;