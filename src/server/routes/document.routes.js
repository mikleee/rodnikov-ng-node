const router = require('express').Router();

const documentController = require("../controller/document.controller");


router.get('/download/:id', documentController.download);
router.get('/get/:id', documentController.get);
router.post('/delete/:id', documentController.delete);


module.exports = router;
