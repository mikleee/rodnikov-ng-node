const ModelService = require("./model.service");
const {ProductGroup} = require("../db/product.group.model");

class ProductGroupService extends ModelService {

    constructor() {
        super(ProductGroup);
    }

}

module.exports = new ProductGroupService();