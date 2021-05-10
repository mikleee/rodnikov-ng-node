const ModelService = require("./model.service");
const withTransaction = require("../db/db.transaction-runner");
const {Document} = require("../db/document.model");
const enums = require("../db/model.enum");
const productSupplierService = require("../service/product.supplier.service");
const {NotFoundException} = require("../exception/exceptions");
const {ProductSupplier} = require("../db/product.supplier.model");

class DocumentService extends ModelService {

    constructor() {
        super(Document);
    }

    updateWithFile(id, file) {
        return this.findByIdAndUpdate(id, this._populateFromFile({}, file));
    }

    createFromFile(file, type) {
        return this.saveOrUpdate({
            type: type,
            ...this._populateFromFile({}, file)
        });
    }

    async attachDocumentsTo(files, documentType, targetObjectId) {
        const toInsert = files.map(file => this.formFileToDocument(file, documentType));
        const documents = await Document.insertMany(toInsert);

        switch (documentType) {
            case enums.DocumentType.PRODUCT_SUPPLIER_LOGO:
                let supplier = await ProductSupplier.findById(targetObjectId);
                if (supplier == null) {
                    throw new NotFoundException(`product supplier ${targetObjectId} not found`);
                }
                if (supplier.logo) {
                    await Document.findByIdAndDelete(supplier.logo);
                }
                supplier.logo = documents[0];
                await supplier.save();
                break;
            case enums.DocumentType.PRODUCT_GROUP_IMG:
            case enums.DocumentType.PRODUCT_IMG:
            default:
                throw new Error(`document type ${documentType} is not supported`);
        }


        return this.toIds(documents);
    }


    _populateFromFile(doc, file) {
        doc.name = file.name;
        doc.contentType = file.mimetype;
        doc.content = file.data;
        return doc;
    }

}

module.exports = new DocumentService();