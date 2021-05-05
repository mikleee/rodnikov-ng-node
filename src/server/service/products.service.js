const ModelService = require("./model.service");
const enums = require("../db/model.enum");
const {ProductSupplier} = require("../db/product.supplier.model");
const documentService = require("./document.service");
const {Product} = require("../db/product.model");


class ProductSupplierService extends ModelService {

    constructor() {
        super(Product);
    }


    async saveOrUpdate(model, mainImage, images) {
        let result = await super.saveOrUpdate(model);
        let needUpdate = false;


        if (mainImage) {
            await this._invalidateMainImage(result);
            result.mainImage = await documentService.createFromFile(mainImage, enums.DocumentType.PRODUCT_IMG)
            needUpdate = true;
        }

        if (images && images.length) {
            await this._invalidateImages(result);
            result.images = [];
            for (const image of images) {
                result.images.push(await documentService.createFromFile(image, enums.DocumentType.PRODUCT_IMG));
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
        await this._invalidateImages(product);
        return await super.delete(id);
    }

    async _invalidateMainImage(product) {
        if (product.mainImage) {
            await documentService.delete(product.mainImage);
            product.mainImage = null;
            await super.saveOrUpdate(product);
        }
    }

    async _invalidateImages(product) {
        if (product.images) {
            for (const img of product.images) {
                await documentService.delete(img);
            }
            product.images = [];
            await super.saveOrUpdate(product);
        }
    }
}


module.exports = new ProductSupplierService();