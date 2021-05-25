const ModelService = require("./model.service");
const {ProductSupplier, ProductSupplierLogo} = require("../db/product.supplier.model");
const {Product} = require("../db/product.model");
const {createDocumentFromFile} = require("./util.service");


class ProductSupplierService extends ModelService {

    constructor() {
        super(ProductSupplier);
    }

    async delete(id) {
        let promises = [];
        let supplier = await this.findById(id);
        promises.push(ProductSupplierService.#removeLogoImpl(supplier));
        promises.push(Product.updateMany({supplier: id}, {supplier: null}));
        promises.push(super.delete(id));
        return await Promise.all(promises);
    }

    getLogo(logoId) {
        return ProductSupplierLogo.findOne({_id: logoId});
    }

    async uploadLogo(supplierId, logoFile) {
        let supplier = await this.findById(supplierId);
        await ProductSupplierService.#removeLogoImpl(supplier);

        let result;
        if (logoFile) {
            supplier.logo = await ProductSupplierLogo.create(createDocumentFromFile(logoFile));
            result = {id: supplier.logo.id.toString()};
        } else {
            supplier.logo = null;
            result = {id: null};
        }
        await super.saveOrUpdate(supplier);
        return result;
    }

    async removeLogo(supplierId) {
        let supplier = await this.findById(supplierId);
        await ProductSupplierService.#removeLogoImpl(supplier);
    }

    static #removeLogoImpl(supplier) {
        if (supplier.logo) {
            return ProductSupplierLogo.deleteOne({_id: supplier.logo});
        } else {
            return Promise.resolve();
        }
    }

}


module.exports = new ProductSupplierService();