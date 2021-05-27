const ModelService = require("./model.service");
const enums = require("../db/model.enum");
const configurationService = require("./configuration.service");
const productAttributesService = require("./product.attributes.service");
const productImageService = require("./product.image.service");
const {ProductWrapper} = require("../wrapper/product.model.wrapper");
const {Product} = require("../db/product.model");


class ProductService extends ModelService {

    constructor() {
        super(Product);
    }

    async getAllWrappers(user) {
        let all = await this.getAll();
        return await this.toWrappers(all, user);
    }

    async getWrapperById(id, showSensitiveData) {
        let product = await this.findById(id);
        return this._toWrapper(product, showSensitiveData);
    }

    async toWrappers(products, user) {
        let result = [];
        if (!products?.length) {
            return result;
        }

        let attributes = await productAttributesService.getAttributeWrappersForProducts(products);
        let images = await productImageService.getProductImagesWrappersForProducts(products);
        let globalPriceUplift = await configurationService.getNumberByKey(enums.ConfigurationKey.PRICE_UPLIFT, 0);
        let usdToUah = await configurationService.getNumberByKey(enums.ConfigurationKey.CURRENCY_USD_TO_UAH, 0);

        for (const product of products) {
            let productWrapper = new ProductWrapper();
            productWrapper.id = product.id;
            productWrapper.code = product.code;
            productWrapper.name = product.name;
            productWrapper.description = product.description;
            productWrapper.category = product.category;
            productWrapper.supplier = product.supplier;

            let cost = product.cost || 0;
            let priceUplift = product.priceUplift;
            let margin = cost * ((priceUplift ?? globalPriceUplift) / 100);
            let price = cost + margin;

            productWrapper.price = price;
            productWrapper.priceUah = price * usdToUah;

            if (user != null) {
                productWrapper.priceUplift = product.priceUplift;
                productWrapper.cost = cost;
                productWrapper.margin = margin;
            }

            productWrapper.attributes = attributes[product.id] || [];
            productWrapper.images = images[product.id] || [];

            result.push(productWrapper);
        }

        return result;
    }

    async _toWrapper(product, showSensitiveData) {
        let results = await this.toWrappers(product ? [product] : [], showSensitiveData);
        return results[0];
    }

}


module.exports = new ProductService();