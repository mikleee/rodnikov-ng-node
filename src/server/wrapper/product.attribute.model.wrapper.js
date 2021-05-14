const {BaseWrapper} = require("./base.model.wrapper");

class ProductAttributeWrapper extends BaseWrapper {
    templateId;
    name;
    value;
}

module.exports.ProductAttributeWrapper = ProductAttributeWrapper;