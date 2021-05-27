const ModelService = require("./model.service");
const {ProductSupplierWrapper} = require("../wrapper/product.supplier.wrapper");
const {NotFoundException} = require("../exception/exceptions");
const {ProductSupplier, ProductSupplierLogo} = require("../db/product.supplier.model");
const {createDocumentFromFile, populateDocumentFromFile, modelsToIds, modelsToMap} = require("./util.service");


class ProductSupplierService extends ModelService {

    constructor() {
        super(ProductSupplier);
    }

    async getAllWrappers() {
        let all = await this.getAll();
        return await ProductSupplierService.#toWrappers(all);
    }

    async getWrapper(supplierId) {
        let supplier = await this.#getSupplier(supplierId);
        return await ProductSupplierService.#toWrapper(supplier);
    }

    getLogo(logoId) {
        return ProductSupplierLogo.findOne({_id: logoId});
    }

    async uploadLogo(supplierId, logoFile) {
        let supplier = await this.#getSupplier(supplierId);
        await ProductSupplierLogo.deleteMany({supplier: supplierId});
        let result = createDocumentFromFile(logoFile);
        result.supplier = supplier;
        result = await ProductSupplierLogo.create(result);
        return {id: result.id.toString()};
    }

    async removeLogo(supplierId) {
        await this.#getSupplier(supplierId);
        return ProductSupplierLogo.deleteMany({supplier: supplierId});
    }


    static async #toWrappers(suppliers) {
        let result = [];
        if (!suppliers?.length) {
            return result;
        }

        let ids = modelsToIds(suppliers);
        const logos = await ProductSupplierLogo.find({supplier: {$in: ids}});
        const logosMap = {};
        for (const logo of logos) {
            logosMap[logo.supplier.toString()] = logo;
        }

        for (const supplier of suppliers) {
            let supplierWrapper = new ProductSupplierWrapper();
            supplierWrapper.id = supplier.id;
            supplierWrapper.name = supplier.name;
            supplierWrapper.logo = logosMap[supplier.id]?.id;
            result.push(supplierWrapper);
        }

        return result;
    }

    static async #toWrapper(supplier) {
        return (await ProductSupplierService.#toWrappers([supplier]))[0];
    }

    async #getSupplier(supplierId) {
        let supplier = await this.findById(supplierId);
        if (!supplier) {
            return Promise.reject(new NotFoundException())
        }
        return supplier;
    }

}


module.exports = new ProductSupplierService();