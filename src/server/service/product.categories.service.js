const ModelService = require("./model.service");
const {ProductCategory} = require("../db/product.category.model");

class ProductCategoriesService extends ModelService {

    constructor() {
        super(ProductCategory);
    }

    async getTree() {
        let all = await super.getAll();
        return this.assignSubcategories(all);
    }

    async getTreeTop() {
        const all = await this.getTree();
        return all.filter(g => !g.parent);
    }

    async getRelatedCategories(categoryId) {
        let result = [];
        let categories = this.toMap(await this.getTree());
        let category = categories[categoryId];
        if (category) {
            result.push(category);
            await (async function findAllSub(category) {
                for (const sub of category.categories || []) {
                    result.push(sub);
                    await findAllSub(sub);
                }
            })(category);
        }
        return result;
    }

    assignSubcategories(all) {
        const result = [];
        const idMapping = {};
        const parentChildMapping = {};

        for (const category of all) {
            result.push(category);
            idMapping[category.id] = category;
            if (category.parent) {
                let arr = parentChildMapping[category.parent] || [];
                arr.push(category.id);
                parentChildMapping[category.parent] = arr;
            }
        }

        result.forEach(category => {
            category.categories = (parentChildMapping[category.id] || []).map(c => idMapping[c]);
        });
        return result;
    }

}


module.exports = new ProductCategoriesService();