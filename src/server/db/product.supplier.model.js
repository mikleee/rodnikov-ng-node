const mongoose = require('mongoose');
const schemaBuilder = require('./db.schema.builder');
const Schema = mongoose.Schema;


let schema = schemaBuilder.buildSchema({
    name: {type: Schema.Types.String, unique: true},
    logo: {type: Schema.Types.ObjectId, ref: 'Document'},
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
});


const ProductSupplier = mongoose.model('ProductSupplier', schema);


module.exports.ProductSupplier = ProductSupplier;