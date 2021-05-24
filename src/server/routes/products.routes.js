const router = require('express').Router();

const productController = require("../controller/product.controller");
const authController = require("../controller/auth.controller");


router.get('/list', authController.checkAuthForRestCall, productController.list);
router.get('/showcase', productController.showcase);
router.get('/search', productController.search);
router.get('/product/:id', productController.product);
router.post('/submit', authController.checkAuthForRestCall, productController.submit);
router.post('/delete/:id', authController.checkAuthForRestCall, productController.delete);


module.exports = router;