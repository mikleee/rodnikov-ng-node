const productAttributeTemplateService = require("../service/product.attribute.template.service");
const {sendJson} = require("./controller.util");


class ProductAttributeTemplateController {

    list(req, res, next) {
        sendJson(res, productAttributeTemplateService.getAll());
    }

    async template(req, res, next) {
        const id = req.params['id'];
        sendJson(res, productAttributeTemplateService.findById(id));
    }

    async submit(req, res, next) {
        sendJson(res, productAttributeTemplateService.saveOrUpdate(req.body));
    }

    delete(req, res, next) {
        const id = req.params['id'];
        sendJson(res, productAttributeTemplateService.delete(id));
    }

}


module.exports = new ProductAttributeTemplateController();
