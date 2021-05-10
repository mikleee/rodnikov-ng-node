const {DatatableResponse} = require("../wrapper/datatable.model.wrappers")
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

    async search(keyword, limit, showSensitiveData) {
        if (keyword) {
            let filter = {
                $or: [
                    {name: {$regex: '.*' + keyword + '.*', $options: 'i'}}
                ]
            };
            {
                let results = await Promise.all([
                    ProductCategory.find({name: {$regex: '.*' + keyword + '.*', $options: 'i'}}),
                    ProductSupplier.find({name: {$regex: '.*' + keyword + '.*', $options: 'i'}}),
                ]);
                if (results[0].length) {
                    let ids = productService.toIds(results[0]);
                    filter.$or.push({category: {$in: ids}});
                }
                if (results[1].length) {
                    let ids = productService.toIds(results[1]);
                    filter.$or.push({supplier: {$in: ids}});
                }
            }

            let products;
            let count;

            if (isNaN(limit)) {
                let results = await Product.find(filter);
                products = results;
                count = results.length;
            } else {
                let results = await Promise.all([
                    Product.find(filter).limit(+limit),
                    Product.find(filter).count(),
                ]);
                products = results[0];
                count = results[1];
            }
            return new DatatableResponse(
                await productService.toWrappers(products, showSensitiveData),
                count
            );
        } else {
            return new DatatableResponse();
        }
    }

    async #getShowcaseProductsQuery(request) {
        let query;

        query = Product.find();
        if (request.category) {
            let categories = await productCategoriesService.getRelatedCategories(request.category);
            query.where({category: {$in: categories.map(c => c.id)}});
        }

        if (request.suppliers?.length) {
            query.where({supplier: {$in: request.suppliers}});
        }

        return query;
    }

}


module.exports = new ProductShowcaseService();