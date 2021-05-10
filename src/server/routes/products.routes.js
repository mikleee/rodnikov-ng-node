const Router = require("./router");
const productsService = require("../service/products.service");
const productsShowcaseService = require("../service/products.showcase.service");
const {ShowcaseWrapperRequest} = require("../wrapper/showcase.model.wrappers");
const router = new Router();

router.get('/list', async (req, res, next) => {
    return await productsService.getAllWrappers(true);
});

router.get('/showcase', async (req, res, next) => {
    let query = req.query;

    let request = new ShowcaseWrapperRequest();
    request.keyword = query['keyword'];
    request.category = query['category'];
    request.suppliers = router.toArray(query['suppliers']);
    return await productsShowcaseService.getShowcaseProducts(request, true);
});

router.get('/product/:id', async (req, res, next) => {
    const id = req.params['id'];
    return await productsService.getWrapperById(id, true);
});

router.post('/product/submit', async (req, res, next) => {
    let supplier = JSON.parse(req.body.product);
    let mainImage = req.files?.mainImage;
    let additionalImages = router.toArray(req.files?.additionalImages);
    let result = await productsService.saveOrUpdate(supplier, mainImage, additionalImages);
    return productsService._toWrapper(result, true);
});

router.post('/product/delete/:id', async (req, res, next) => {
    const id = req.params['id'];
    await productsService.delete(id);
});

module.exports = router.getRouter();
