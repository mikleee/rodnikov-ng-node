const ModelService = require("./model.service");
const {modelsToMap, modelsToIds, addToBundle} = require("./util.service");
const {ProductAttributeWrapper} = require("../wrapper/product.attribute.model.wrapper");
const {ProductAttribute} = require("../db/product.attribute.model");
const {ProductAttributeTemplate} = require("../db/product.attribute.template.model");
const logger = require("./logger").createLogger('product.attributes.service');


class ProductAttributesService extends ModelService {

    constructor() {
        super(ProductAttribute);
    }

    async getAttributeWrappersForProduct(id) {
        let results = Object.values(await this.getAttributeWrappersForProductsByIds([id]));
        return results[0] || [];
    }

    async getAttributeWrappersForProducts(products) {
        return this.getAttributeWrappersForProductsByIds(
            modelsToIds(products)
        );
    }


    async saveOrUpdateProductAttributes(productAttribute) {
        let existingAttribute = await ProductAttribute.findOne(
            {product: productAttribute.product, template: productAttribute.template}
        );
        if (existingAttribute) {
            existingAttribute.value = productAttribute.value;
            return await existingAttribute.save();
        } else {
            return await ProductAttribute.create(productAttribute);
        }
    }

    async getAttributeWrappersForProductsByIds(productIds) {
        let result = {};
        if (productIds.length) {
            let source = await Promise.all([
                ProductAttributeTemplate.find(),
                ProductAttribute.find({product: {$in: productIds}})
            ]);

            let attributeTemplatesMap = modelsToMap(source[0]);
            for (const attribute of source[1]) {
                let template = attributeTemplatesMap[attribute.template];
                if (template) {
                    let attributeWrapper = this.#convertToWrapperFromAttributeAndTemplate(attribute, template);
                    addToBundle(result, attribute.product, attributeWrapper);
                } else {
                    logger.warn(`Product attribute template ${attribute.template} doesn't exist`);
                }
            }
        }
        return result;
    }

    async convertToWrapper(attribute) {
        let template = await ProductAttributeTemplate.findById(attribute.template);
        return this.#convertToWrapperFromAttributeAndTemplate(attribute, template);
    }

    #convertToWrapperFromAttributeAndTemplate(attribute, template) {
        let attributeWrapper = new ProductAttributeWrapper();
        attributeWrapper.id = attribute.id;
        attributeWrapper.name = template?.name;
        attributeWrapper.value = attribute.value;
        attributeWrapper.template = template?.id;
        return attributeWrapper;
    }

}


module.exports = new ProductAttributesService();