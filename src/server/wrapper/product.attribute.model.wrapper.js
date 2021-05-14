const {BaseWrapper} = require("./base.model.wrapper");

class ProductAttributeWrapper extends BaseWrapper {
    name;
    value;
    template;
}

module.exports.ProductAttributeWrapper = ProductAttributeWrapper;