const productSupplierService = require("../service/product.categories.service");
const {sendJson} = require("./controller.util");


class ProductCategoryController {

    list(req, res, next) {
        sendJson(res, productSupplierService.getAll());
    }

    category(req, res, next) {
        const id = req.params['id'];
        sendJson(res, productSupplierService.findById(id));
    }

    submit(req, res, next) {
        let supplier = JSON.parse(req.body.supplier);
        let logo = req.files?.logo;
        sendJson(res, productSupplierService.saveOrUpdate(supplier, logo));
    }

    delete(req, res, next) {
        const id = req.params['id'];
        sendJson(res, productSupplierService.delete(id));
    }

}


module.exports = new ProductCategoryController();