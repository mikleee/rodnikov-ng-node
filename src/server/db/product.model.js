const mongoose = require('mongoose');
const schemaBuilder = require("./db.schema.builder");
const Schema = mongoose.Schema;


let schema = schemaBuilder.buildSchema({
    name: Schema.Types.String,
    description: Schema.Types.String,
    price: Schema.Types.Number,
    uplift: Schema.Types.Number,
    group: {type: Schema.Types.ObjectId, ref: 'ProductGroup'},
    supplier: {type: Schema.Types.ObjectId, ref: 'ProductSupplier'},
    mainImage: {type: Schema.Types.ObjectId, ref: 'Document'},
    images: [{type: Schema.Types.ObjectId, ref: 'Document'}]
});


const Product = mongoose.model('Product', schema);

module.exports.Product = Product;