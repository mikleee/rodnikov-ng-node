const mongoose = require('mongoose');
const schemaBuilder = require("./db.schema.builder");
const Schema = mongoose.Schema;


let schema = schemaBuilder.buildSchema({
    name: {type: Schema.Types.String, unique: true, required: true},
    parent: {type: Schema.Types.ObjectId, ref: 'ProductCategory'},
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
});

const ProductCategory = mongoose.model('ProductCategory', schema);


module.exports.ProductCategory = ProductCategory;