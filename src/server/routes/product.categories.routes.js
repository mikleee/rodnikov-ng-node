const Router = require("./router");
const productCategoryService = require("../service/product.categories.service");
const router = new Router();

router.get('/list', async (req, res, next) => {
    return await productCategoryService.getAll();
});

router.get('/category/:id', async (req, res, next) => {
    const id = req.params['id'];
    return await productCategoryService.findById(id);
});

router.post('/category/submit', async (req, res, next) => {
    return await productCategoryService.saveOrUpdate(req.body);
});

router.post('/group/delete/:id', async (req, res, next) => {
    const id = req.params['id'];
    await productCategoryService.delete(id);
});


module.exports = router.getRouter();
