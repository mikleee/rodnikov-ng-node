const mongoose = require('mongoose');
const schemaBuilder = require("./db.schema.builder");
const Schema = mongoose.Schema;


let schema = schemaBuilder.buildSchema({
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    template: [{type: Schema.Types.ObjectId, ref: 'Template'}],
    value: Schema.Types.Mixed
});

const ProductAttribute = mongoose.model('ProductAttribute', schema);


module.exports.ProductAttribute = ProductAttribute;