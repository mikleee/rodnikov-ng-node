const mongoose = require('mongoose');
const schemaBuilder = require('./db.schema.builder');
const {Product} = require("./product.model");
const Schema = mongoose.Schema;


let productSupplierSchema = schemaBuilder.buildSchema({
    name: {type: Schema.Types.String, unique: true}
});
schemaBuilder.onDelete(productSupplierSchema, function (supplier) {
    return Promise.all([
        Product.updateMany({supplier: supplier._id}, {supplier: null}),
        ProductSupplierLogo.deleteMany({supplier: supplier._id}),
    ])
});
const ProductSupplier = mongoose.model('ProductSupplier', productSupplierSchema);


let productSupplierLogoSchema = schemaBuilder.buildSchema({
    supplier: {type: Schema.Types.ObjectId, ref: 'ProductSupplier'},
    name: Schema.Types.String,
    contentType: Schema.Types.String,
    content: Schema.Types.Buffer,
});
const ProductSupplierLogo = mongoose.model('ProductSupplierLogo', productSupplierLogoSchema);


module.exports = {
    ProductSupplier: ProductSupplier,
    ProductSupplierLogo: ProductSupplierLogo,
}