const router = require('express').Router();

const productImageController = require("../controller/product.image.controller");
const authController = require("../controller/auth.controller");


router.get('/get/:id', productImageController.getImage);
router.post('/upload', authController.checkAuthForRestCall, productImageController.uploadImages);
router.post('/make-main', authController.checkAuthForRestCall, productImageController.makeImageMain);
router.post('/delete/:id', authController.checkAuthForRestCall, productImageController.delete);

module.exports = router;