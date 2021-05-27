const mongoose = require('mongoose');
const schemaBuilder = require("./db.schema.builder");
const {Product} = require("./product.model");
const Schema = mongoose.Schema;


let schema = schemaBuilder.buildSchema({
    name: {type: Schema.Types.String, unique: true, required: true},
    parent: {type: Schema.Types.ObjectId, ref: 'ProductCategory'},
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
});
schemaBuilder.onDelete(schema, function (category) {
    return Promise.all([
        Product.updateMany({category: category._id}, {category: null}),
        ProductCategory.updateMany({parent: category._id}, {parent: null}),
    ])
});
const ProductCategory = mongoose.model('ProductCategory', schema);


module.exports.ProductCategory = ProductCategory;