const ModelService = require("./model.service");
const enums = require("../db/model.enum");
const documentService = require("./document.service");
const configurationService = require("./configuration.service");
const productAttributesService = require("./product.attributes.service");
const {ProductWrapper} = require("../wrapper/product.model.wrapper");
const {Product} = require("../db/product.model");


class ProductSupplierService extends ModelService {

    constructor() {
        super(Product);
    }

    async getAllWrappers(showSensitiveData) {
        let all = await this.getAll();
        return await this.toWrappers(all, showSensitiveData);
    }

    async getWrapperById(id, showSensitiveData) {
        let product = await this.findById(id);
        return this._toWrapper(product, showSensitiveData);
    }

    async saveOrUpdate(model, mainImage, additionalImages) {
        let result = await super.saveOrUpdate(model);
        let needUpdate = false;


        if (mainImage) {
            await this._invalidateMainImage(result);
            result.mainImage = await documentService.createFromFile(mainImage, enums.DocumentType.PRODUCT_IMG)
            needUpdate = true;
        }

        if (additionalImages?.length) {
            await this._invalidateAdditionalImages(result);
            result.additionalImages = [];
            for (const image of additionalImages) {
                result.additionalImages.push(await documentService.createFromFile(image, enums.DocumentType.PRODUCT_IMG));
            }
            needUpdate = true;
        }

        if (needUpdate) {
            await super.saveOrUpdate(result);
            result = super.findById(result._id);
        }

        return result;
    }


    async delete(id) {
        let product = await this.findById(id);
        await this._invalidateMainImage(product);
        await this._invalidateAdditionalImages(product);
        return await super.delete(id);
    }

    async _invalidateMainImage(product) {
        if (product.mainImage) {
            await documentService.delete(product.mainImage);
            product.mainImage = null;
            await super.saveOrUpdate(product);
        }
    }

    async _invalidateAdditionalImages(product) {
        if (product.images) {
            for (const img of product.images) {
                await documentService.delete(img);
            }
            product.images = [];
            await super.saveOrUpdate(product);
        }
    }

    async toWrappers(products, showSensitiveData) {
        let result = [];
        if (!products?.length) {
            return result;
        }

        let attributes = await productAttributesService.getAttributeWrappersForProducts(products);
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
            productWrapper.mainImage = product.mainImage;
            productWrapper.additionalImages = product.additionalImages;

            let cost = product.cost || 0;
            let priceUplift = product.priceUplift || 0;
            let margin = cost * ((priceUplift ?? globalPriceUplift) / 100);
            let price = cost + margin;

            productWrapper.price = price;
            productWrapper.priceUah = price * usdToUah;

            if (showSensitiveData) {
                productWrapper.priceUplift = product.priceUplift;
                productWrapper.cost = cost;
                productWrapper.margin = margin;
            }

            productWrapper.attributes = attributes[product.id] || [];

            result.push(productWrapper);
        }

        return result;
    }

    async _toWrapper(product, showSensitiveData) {
        let results = await this.toWrappers(product ? [product] : [], showSensitiveData);
        return results[0];
    }

}


module.exports = new ProductSupplierService();