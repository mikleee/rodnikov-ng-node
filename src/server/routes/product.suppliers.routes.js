const Router = require("./router");
const productSupplierService = require("../service/product.supplier.service");
const router = new Router();

router.get('/list', async (req, res, next) => {
    return await productSupplierService.getAll();
});

router.get('/supplier/:id', async (req, res, next) => {
    const id = req.params['id'];
    return await productSupplierService.findById(id);
});

router.post('/submit', async (req, res, next) => {
    let supplier = JSON.parse(req.body.supplier);
    let logo = req.files?.logo;
    return await productSupplierService.saveOrUpdate(supplier, logo);
});

router.post('/delete/:id', async (req, res, next) => {
    const id = req.params['id'];
    await productSupplierService.delete(id);
});

module.exports = router.getRouter();
