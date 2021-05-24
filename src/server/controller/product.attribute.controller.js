const productAttributesService = require("../service/product.attributes.service");
const {sendJson} = require("./controller.util");


class ProductAttributeController {

    listForProduct(req, res, next) {
        const id = req.params['id'];
        sendJson(res, productAttributesService.getAttributeWrappersForProduct(id));
    }

    async submit(req, res, next) {
        let result = await productAttributesService.saveOrUpdateProductAttributes(req.body);
        sendJson(res, productAttributesService.convertToWrapper(result));
    }

    delete(req, res, next) {
        const id = req.params['id'];
        sendJson(res, productAttributesService.delete(id));
    }

}


module.exports = new ProductAttributeController();
