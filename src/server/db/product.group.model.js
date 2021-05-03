const mongoose = require('mongoose');
const schemaBuilder = require("./db.schema.builder");
const Schema = mongoose.Schema;


let schema = schemaBuilder.buildSchema({
    name: Schema.Types.String,
    parent: {type: Schema.Types.ObjectId, ref: 'ProductGroup'},
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
});

const ProductGroup = mongoose.model('ProductGroup', schema);


module.exports.ProductGroup = ProductGroup;