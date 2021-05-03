const Router = require("./router");
const productGroupService = require("../service/product.group.service");
const router = new Router();

router.get('/list', async (req, res, next) => {
    return await productGroupService.getAll();
});

router.get('/group/:id', async (req, res, next) => {
    const id = req.params['id'];
    return await productGroupService.findById(id);
});

router.post('/group/submit', async (req, res, next) => {
    return await productGroupService.saveOrUpdate(req.body);
});

router.post('/group/delete/:id', async (req, res, next) => {
    const id = req.params['id'];
    await productGroupService.delete(id);
});


module.exports = router.getRouter();
