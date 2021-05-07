const mongoose = require('mongoose');
const schemaBuilder = require("./db.schema.builder");
const Schema = mongoose.Schema;


let schema = schemaBuilder.buildSchema({
    name: Schema.Types.String,
    parent: {type: Schema.Types.ObjectId, ref: 'ProductCategory'},
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
});

const ProductCategory = mongoose.model('ProductCategory', schema);


module.exports.ProductCategory = ProductCategory;