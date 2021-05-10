const productCategoriesService = require("./product.categories.service");
const productService = require("./products.service");
const {ProductSupplier} = require("../db/product.supplier.model");
const {ProductCategory} = require("../db/product.category.model");
const {Product} = require("../db/product.model");


class ProductShowcaseService {


    async getShowcaseProducts(request, showSensitiveData) {
        let query = await this.#getShowcaseProductsQuery(request);
        let products = await query;
        return await productService.toWrappers(products, showSensitiveData);
    }

    async #getShowcaseProductsQuery(request) {
        let query;
        if (request.keyword) {
            let results = await Promise.all([
                ProductCategory.find({name: {$regex: '.*' + request.keyword + '.*', $options: 'i'}}),
                ProductSupplier.find({name: {$regex: '.*' + request.keyword + '.*', $options: 'i'}}),
            ]);

            let filter = {
                $or: [
                    {name: {$regex: '.*' + request.keyword + '.*', $options: 'i'}}
                ]
            };
            if (results[0].length) {
                let ids = productService.toIds(results[0]);
                filter.$or.push({category: {$in: ids}});
            }
            if (results[1].length) {
                let ids = productService.toIds(results[1]);
                filter.$or.push({supplier: {$in: ids}});
            }

            query = Product.find(filter);
        } else {
            query = Product.find();
            if (request.category) {
                let categories = await productCategoriesService.getRelatedCategories(request.category);
                query.where({category: {$in: categories.map(c => c.id)}});
            }

            if (request.suppliers?.length) {
                query.where({supplier: {$in: request.suppliers}});
            }
        }
        return query;
    }

}


module.exports = new ProductShowcaseService();