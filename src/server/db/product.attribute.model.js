const mongoose = require('mongoose');
const schemaBuilder = require("./db.schema.builder");
const Schema = mongoose.Schema;


let schema = schemaBuilder.buildSchema({
    product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
    template: {type: Schema.Types.ObjectId, ref: 'Template', required: true},
    value: {type: Schema.Types.Mixed, required: true},
});

const ProductAttribute = mongoose.model('ProductAttribute', schema);


module.exports.ProductAttribute = ProductAttribute;