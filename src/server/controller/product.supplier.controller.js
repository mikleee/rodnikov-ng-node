const productSupplierService = require("../service/product.supplier.service");
const {sendJson} = require("./controller.util");

class ProductSupplierController {

    list(req, res, next) {
        sendJson(res, productSupplierService.getAll());
    }

    supplier(req, res, next) {
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


module.exports = new ProductSupplierController();