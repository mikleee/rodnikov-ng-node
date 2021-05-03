const mongoose = require('mongoose');
const Document = require('./document.model');
const schemaBuilder = require('./db.schema.builder');
const Schema = mongoose.Schema;


let schema = schemaBuilder.buildSchema({
    name: Schema.Types.String,
    logo: {type: Schema.Types.ObjectId, ref: 'Document'}
});


const ProductSupplier = mongoose.model('ProductSupplier', schema);


module.exports.ProductSupplier = ProductSupplier;