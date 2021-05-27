const {BaseWrapper} = require("./base.model.wrapper");

class ProductWrapper extends BaseWrapper {
    code;
    name;
    description;
    category;
    supplier;
    priceUplift;
    cost;
    price;
    priceUah;
    margin;
    attributes;
    images;
}

module.exports.ProductWrapper = ProductWrapper;