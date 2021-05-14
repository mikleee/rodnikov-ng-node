const ModelService = require("./model.service");
const {modelsToMap, modelsToIds, addToBundleBundle} = require("./util.service");
const {ProductAttributeWrapper} = require("../wrapper/product.attribute.model.wrapper");
const {ProductAttribute} = require("../db/product.attribute.model");
const {ProductAttributeTemplate} = require("../db/product.attribute.template.model");
const logger = require("./logger").createLogger('product.attributes.service');


class ProductAttributesService extends ModelService {

    constructor() {
        super(ProductAttribute);
    }

    async getAttributeWrappersForProducts(products) {
        let result = {};
        if (products.length) {
            let source = await Promise.all([
                ProductAttributeTemplate.find(),
                ProductAttribute.find({product: {$in: modelsToIds(products)}})
            ]);

            let attributeTemplatesMap = modelsToMap(source[0]);
            for (const attribute of source[1]) {
                let template = attributeTemplatesMap[attribute.template];
                if (template) {
                    let attributeWrapper = new ProductAttributeWrapper();
                    attributeWrapper.id = attribute.id;
                    attributeWrapper.templateId = template.id;
                    attributeWrapper.name = template.name;
                    attributeWrapper.value = attribute.value;
                    addToBundleBundle(result, attribute.product, attributeWrapper);
                } else {
                    logger.warn(`Product attribute template ${attribute.template} doesn't exist`);
                }
            }
        }
        return result;
    }

}


module.exports = new ProductAttributesService();