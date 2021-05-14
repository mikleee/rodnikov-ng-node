const Router = require("./router");
const productAttributeTemplateService = require("../service/product.attribute.template.service");
const router = new Router();

router.get('/list', async (req, res, next) => {
    return await productAttributeTemplateService.getAll();
});

router.get('/template/:id', async (req, res, next) => {
    const id = req.params['id'];
    return await productAttributeTemplateService.findById(id);
});

router.post('/submit', async (req, res, next) => {
    return await productAttributeTemplateService.saveOrUpdate(req.body);
});

router.post('/delete/:id', async (req, res, next) => {
    const id = req.params['id'];
    await productAttributeTemplateService.delete(id);
});


module.exports = router.getRouter();
