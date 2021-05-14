const Router = require("./router");
const productAttributesService = require("../service/product.attributes.service");
const router = new Router();

router.get('/list-for-product/:id', async (req, res, next) => {
    const id = req.params['id'];
    return await productAttributesService.getAttributeWrappersForProduct(id);
});

router.post('/submit', async (req, res, next) => {
    let result = await productAttributesService.saveOrUpdateProductAttributes(req.body);
    return await productAttributesService.convertToWrapper(result);
});

router.post('/delete/:id', async (req, res, next) => {
    const id = req.params['id'];
    await productAttributesService.delete(id);
});


module.exports = router.getRouter();
