const ModelService = require("./model.service");
const {ProductAttributeTemplate} = require("../db/product.attribute.template.model");


class ProductAttributeTemplateService extends ModelService {

    constructor() {
        super(ProductAttributeTemplate);
    }

}


module.exports = new ProductAttributeTemplateService();