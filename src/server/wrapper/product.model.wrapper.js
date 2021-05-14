const {BaseWrapper} = require("./base.model.wrapper");

class ProductWrapper extends BaseWrapper {
    code;
    name;
    description;
    category;
    supplier;
    mainImage;
    additionalImages;
    priceUplift;
    cost;
    price;
    priceUah;
    margin;
    attributes;
}

module.exports.ProductWrapper = ProductWrapper;