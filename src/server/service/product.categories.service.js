const ModelService = require("./model.service");
const {ProductCategory} = require("../db/product.category.model");

class ProductCategoriesService extends ModelService {

    constructor() {
        super(ProductCategory);
    }

}

module.exports = new ProductCategoriesService();