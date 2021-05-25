const mongoose = require('mongoose');
const schemaBuilder = require('./db.schema.builder');
const Schema = mongoose.Schema;


let productSupplierSchema = schemaBuilder.buildSchema({
    name: {type: Schema.Types.String, unique: true},
    logo: {type: Schema.Types.ObjectId, ref: 'ProductSupplierLogo'}
});
const ProductSupplier = mongoose.model('ProductSupplier', productSupplierSchema);


let productSupplierLogoSchema = schemaBuilder.buildSchema({
    name: Schema.Types.String,
    contentType: Schema.Types.String,
    content: Schema.Types.Buffer,
});
const ProductSupplierLogo = mongoose.model('ProductSupplierLogo', productSupplierLogoSchema);


module.exports = {
    ProductSupplier: ProductSupplier,
    ProductSupplierLogo: ProductSupplierLogo,
}