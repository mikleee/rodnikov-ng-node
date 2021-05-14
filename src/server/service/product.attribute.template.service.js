const ModelService = require("./model.service");
const {ProductAttribute} = require("../db/product.attribute.model");
const {ProductAttributeTemplate} = require("../db/product.attribute.template.model");


class ProductAttributeTemplateService extends ModelService {

    constructor() {
        super(ProductAttributeTemplate);
    }

    async delete(id) {
        return await Promise.all([
            await ProductAttribute.deleteMany({template: id}),
            await super.delete(id),
        ]);
    }

}


module.exports = new ProductAttributeTemplateService();