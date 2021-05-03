const ModelService = require("./model.service");
const enums = require("../db/model.enum");
const {ProductSupplier} = require("../db/product.supplier.model");
const documentService = require("./document.service");


class ProductSupplierService extends ModelService {

    constructor() {
        super(ProductSupplier);
    }


    async saveOrUpdate(model, logoFile) {
        let result = await super.saveOrUpdate(model);

        if (logoFile) {
            await this._invalidateLogo(result);
            result.logo = await documentService.createFromFile(logoFile, enums.DocumentType.PRODUCT_SUPPLIER_LOGO);
            await super.saveOrUpdate(result);
            result = super.findById(result._id);
        }

        return result;
    }


    async delete(id) {
        let supplier = await this.findById(id);
        await this._invalidateLogo(supplier);
        return await super.delete(id);
    }

    async _invalidateLogo(supplier) {
        if (supplier.logo) {
            await documentService.delete(supplier.logo);
            supplier.logo = null;
            await super.saveOrUpdate(supplier);
        }
    }
}


module.exports = new ProductSupplierService();