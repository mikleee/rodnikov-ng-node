const Router = require("./router");
const productsService = require("../service/products.service");
const router = new Router();

router.get('/list', async (req, res, next) => {
    return await productsService.getAll();
});

router.get('/product/:id', async (req, res, next) => {
    const id = req.params['id'];
    return await productsService.findById(id);
});

router.post('/product/submit', async (req, res, next) => {
    let supplier = JSON.parse(req.body.product);
    let mainImage = req.files?.mainImage;
    let images = router.toFiles(req.files?.images);
    return await productsService.saveOrUpdate(supplier, mainImage, images);
});

router.post('/product/delete/:id', async (req, res, next) => {
    const id = req.params['id'];
    await productsService.delete(id);
});

module.exports = router.getRouter();
