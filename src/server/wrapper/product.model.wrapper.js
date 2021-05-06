const {BaseWrapper} = require("./base.model.wrapper");

class ProductWrapper extends BaseWrapper {
    name;
    description;
    group;
    supplier;
    mainImage;
    additionalImages;
    priceUplift;
    cost;
    price;
    priceUah;
    margin;
}

module.exports.ProductWrapper = ProductWrapper;