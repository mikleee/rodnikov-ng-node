const router = require('express').Router();

const productSupplierController = require("../controller/product.supplier.controller");
const authController = require("../controller/auth.controller");


router.get('/list', productSupplierController.list);
router.get('/supplier/:id', authController.checkAuthForRestCall, productSupplierController.supplier);
router.post('/submit', authController.checkAuthForRestCall, productSupplierController.submit);
router.post('/delete/:id', authController.checkAuthForRestCall, productSupplierController.delete);


module.exports = router;
