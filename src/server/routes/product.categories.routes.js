const router = require('express').Router();

const productCategoryController = require("../controller/product.category.controller");
const authController = require("../controller/auth.controller");


router.get('/list', productCategoryController.list);
router.get('/category/:id', authController.checkAuthForRestCall, productCategoryController.category);
router.post('/submit', authController.checkAuthForRestCall, productCategoryController.submit);
router.post('/delete/:id', authController.checkAuthForRestCall, productCategoryController.delete);


module.exports = router;