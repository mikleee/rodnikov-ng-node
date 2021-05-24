const ModelService = require("./model.service");
const enums = require("../db/model.enum");
const {ProductSupplier} = require("../db/product.supplier.model");
const {Product} = require("../db/product.model");
const documentService = require("./document.service");


class ProductSupplierService extends ModelService {

    constructor() {
        super(ProductSupplier);
    }

    async saveOrUpdate(model, logoFile) {
        let result = await super.saveOrUpdate(model);

        if (logoFile) {
            if (result.logo) {
                await documentService.delete(result.logo);
            }
            result.logo = await documentService.createFromFile(logoFile, enums.DocumentType.PRODUCT_SUPPLIER_LOGO);
            await super.saveOrUpdate(result);
            result = super.findById(result._id);
        }
        return result;
    }


    async delete(id) {
        let promises = [];
        let supplier = await this.findById(id);
        if (supplier.logo) {
            promises.push(documentService.delete(supplier.logo));
        }
        promises.push(Product.updateMany({supplier: id}, {supplier: null}));
        promises.push(super.delete(id));
        return await Promise.all(promises);
    }

}


module.exports = new ProductSupplierService();