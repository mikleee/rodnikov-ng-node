const productSupplierService = require("../service/product.supplier.service");
const {sendJson, sendFile} = require("./controller.util");

class ProductSupplierController {

    list(req, res, next) {
        sendJson(res, productSupplierService.getAll());
    }

    supplier(req, res, next) {
        const id = req.params['id'];
        sendJson(res, productSupplierService.findById(id));
    }

    submit(req, res, next) {
        sendJson(res, productSupplierService.saveOrUpdate(req.body));
    }

    delete(req, res, next) {
        const id = req.params['id'];
        sendJson(res, productSupplierService.delete(id));
    }

    async getLogo(req, res, next) {
        const id = req.params['id'];
        sendFile(res, await productSupplierService.getLogo(id));
    }

    uploadLogo(req, res, next) {
        const id = req.body.id;
        let logo = req.files?.logo;
        sendJson(res, productSupplierService.uploadLogo(id, logo));
    }

    removeLogo(req, res, next) {
        const id = req.params['id'];
        sendJson(res, productSupplierService.removeLogo(id));
    }

}


module.exports = new ProductSupplierController();